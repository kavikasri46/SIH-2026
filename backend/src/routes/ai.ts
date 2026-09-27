import { Router, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { AIService } from '../services/aiService.js';
import { authenticateJWT, AuthRequest, requireRole } from '../middleware/auth.js';
import { JobProcessor } from '../services/jobProcessor.js';
import { db } from '../db/index.js';
import { processDroneImageAnalysis } from '../services/imageAnalysisPipeline.js';

const upload = multer({
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
});

export const aiRouter = Router();

// GET /api/ai/models - List all registered AI models with verified physical weight statuses
aiRouter.get('/models', authenticateJWT, (req: AuthRequest, res: Response): void => {
  const models = AIService.listModels();
  res.json({ success: true, data: models });
});

// POST /api/ai/analyze-image - Full pipeline: Upload -> AI Inference -> Vectorization -> Database Sync
aiRouter.post(
  '/analyze-image',
  authenticateJWT,
  requireRole(['ADMIN', 'SURVEYOR', 'GIS_ANALYST']),
  upload.single('droneImage'),
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { projectId, modelName } = req.body;

      if (!projectId) {
        res.status(400).json({ success: false, error: 'projectId is required.' });
        return;
      }

      const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(projectId) as any;
      if (!project) {
        res.status(404).json({ success: false, error: 'Target cadastral survey project not found.' });
        return;
      }

      const buffer = req.file ? req.file.buffer : Buffer.from('');
      const filename = req.file ? req.file.originalname : 'drone_ortho_sample.png';
      const bbox: [number, number, number, number] = project.bbox ? (typeof project.bbox === 'string' ? JSON.parse(project.bbox) : project.bbox) : [77.5850, 12.9650, 77.5990, 12.9780];

      // Run AI Segmentation & Vectorization
      const analysisResult = await processDroneImageAnalysis(
        buffer,
        filename,
        projectId,
        modelName || 'CadastralSegFormer-Urban-v1.2',
        bbox
      );

      // Persist extracted features to Database
      const insertParcel = db.prepare(`
        INSERT INTO parcels (id, project_id, parcel_number, geometry, area_sqm, perimeter_m, confidence_score, confidence_level, status, land_use_category, provenance_metadata, surveyor_notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const insertBuilding = db.prepare(`
        INSERT INTO buildings (id, project_id, parcel_id, geometry, footprint_area_sqm, estimated_height_m, confidence_score, status, provenance_metadata)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const insertRoad = db.prepare(`
        INSERT INTO roads (id, project_id, road_name, geometry, length_m, estimated_width_m, road_type, confidence_score, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      for (const feat of analysisResult.detectedFeatures) {
        if (feat.type === 'PARCEL') {
          insertParcel.run(
            feat.id,
            projectId,
            feat.featureName,
            JSON.stringify(feat.geometry),
            feat.areaSqm,
            feat.perimeterM || 0,
            feat.confidenceScore,
            feat.confidenceLevel,
            feat.status,
            feat.provenance.land_use || 'Mixed Urban',
            JSON.stringify(feat.provenance),
            'AI candidate boundary derived from drone orthomosaic segmentation.'
          );
        } else if (feat.type === 'BUILDING') {
          insertBuilding.run(
            feat.id,
            projectId,
            null,
            JSON.stringify(feat.geometry),
            feat.areaSqm,
            9.0,
            feat.confidenceScore,
            feat.status,
            JSON.stringify(feat.provenance)
          );
        } else if (feat.type === 'ROAD') {
          insertRoad.run(
            feat.id,
            projectId,
            feat.featureName,
            JSON.stringify(feat.geometry),
            feat.perimeterM || 400.0,
            feat.provenance.estimated_width_m || 10.0,
            'LOCAL_STREET',
            feat.confidenceScore,
            feat.status
          );
        }
      }

      // Update project status
      db.prepare("UPDATE projects SET status = 'REVIEW', updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(projectId);

      // Audit Log
      db.prepare(`
        INSERT INTO audit_logs (id, user_id, action, entity_type, entity_id, new_value, ip_address)
        VALUES (?, ?, 'AI_IMAGE_ANALYZED', 'PROJECT', ?, ?, ?)
      `).run(
        uuidv4(),
        req.user!.id,
        projectId,
        JSON.stringify({
          filename,
          featuresExtracted: analysisResult.detectedFeatures.length,
          model: modelName,
          durationSec: analysisResult.processingTimeSec,
        }),
        req.ip || '127.0.0.1'
      );

      res.json({
        success: true,
        message: 'Drone image analyzed successfully. Segmentation mask and GIS vector layers generated.',
        data: analysisResult,
      });
    } catch (err: any) {
      console.error('AI Analysis Error:', err);
      res.status(500).json({ success: false, error: err.message || 'Failed to analyze drone image.' });
    }
  }
);

// POST /api/ai/inference - Trigger model inference or report availability
aiRouter.post(
  '/inference',
  authenticateJWT,
  requireRole(['ADMIN', 'SURVEYOR', 'GIS_ANALYST']),
  async (req: AuthRequest, res: Response): Promise<void> => {
    const { projectId, imageryId, modelId } = req.body;

    if (!projectId || !modelId) {
      res.status(400).json({ success: false, error: 'projectId and modelId are required.' });
      return;
    }

    try {
      const result = await AIService.requestInference(projectId, imageryId, modelId);

      if (!result.available) {
        res.status(422).json({
          success: false,
          status: result.status,
          message: result.message,
          instruction: 'Please train model weights using the scripts in /ai-service/train.py and place them in the /models/weights directory.',
        });
        return;
      }

      const jobId = JobProcessor.createJob(projectId, imageryId, modelId, 'AI_SEMANTIC_SEGMENTATION');
      db.prepare("UPDATE projects SET status = 'AI_PROCESSING', updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(projectId);

      res.status(202).json({
        success: true,
        data: {
          jobId,
          status: 'QUEUED',
          message: result.message,
        },
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
);
