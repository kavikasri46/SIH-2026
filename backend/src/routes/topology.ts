import { Router, Response } from 'express';
import { db } from '../db/index.js';
import { authenticateJWT, AuthRequest, requireRole } from '../middleware/auth.js';
import { JobProcessor } from '../services/jobProcessor.js';

export const topologyRouter = Router();

// GET /api/projects/:projectId/topology - List all topology errors
topologyRouter.get('/:projectId/topology', authenticateJWT, (req: AuthRequest, res: Response): void => {
  const projectId = req.params.projectId as string;
  const raw = db.prepare('SELECT * FROM topology_errors WHERE project_id = ? ORDER BY created_at DESC').all(projectId) as any[];

  const errors = raw.map(e => ({
    ...e,
    affected_feature_ids: typeof e.affected_feature_ids === 'string' ? JSON.parse(e.affected_feature_ids) : e.affected_feature_ids,
    geometry: e.geometry ? (typeof e.geometry === 'string' ? JSON.parse(e.geometry) : e.geometry) : null,
  }));

  res.json({ success: true, data: errors });
});

// POST /api/projects/:projectId/topology/scan - Trigger live topology engine scan
topologyRouter.post(
  '/:projectId/topology/scan',
  authenticateJWT,
  requireRole(['ADMIN', 'SURVEYOR', 'GIS_ANALYST']),
  (req: AuthRequest, res: Response): void => {
    const projectId = req.params.projectId as string;
    const issuesFound = JobProcessor.runTopologyScan(projectId);

    res.json({
      success: true,
      message: `Topology validation scan complete. Found ${issuesFound} topology issue(s).`,
      issuesCount: issuesFound,
    });
  }
);

// POST /api/topology/:id/resolve - Mark topology error as resolved
topologyRouter.post(
  '/:id/resolve',
  authenticateJWT,
  requireRole(['ADMIN', 'SURVEYOR', 'GIS_ANALYST']),
  (req: AuthRequest, res: Response): void => {
    const { resolutionNotes } = req.body;
    const id = req.params.id as string;
    db.prepare(`
      UPDATE topology_errors
      SET status = 'RESOLVED', resolution_notes = ?, resolved_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(resolutionNotes || 'Manually validated and resolved by surveyor.', id);

    res.json({ success: true, message: 'Topology issue marked as resolved.' });
  }
);
