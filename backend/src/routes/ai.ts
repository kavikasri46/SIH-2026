import { Router, Response } from 'express';
import { AIService } from '../services/aiService.js';
import { authenticateJWT, AuthRequest, requireRole } from '../middleware/auth.js';
import { JobProcessor } from '../services/jobProcessor.js';
import { db } from '../db/index.js';

export const aiRouter = Router();

// GET /api/ai/models - List all registered AI models with verified physical weight statuses
aiRouter.get('/models', authenticateJWT, (req: AuthRequest, res: Response): void => {
  const models = AIService.listModels();
  res.json({ success: true, data: models });
});

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

      // If available, initiate job
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
