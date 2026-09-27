import { Router, Response } from 'express';
import { db } from '../db/index.js';
import { authenticateJWT, AuthRequest } from '../middleware/auth.js';

export const jobRouter = Router();

// GET /api/jobs/:id - Single job status
jobRouter.get('/:id', authenticateJWT, (req: AuthRequest, res: Response): void => {
  const job = db.prepare('SELECT * FROM processing_jobs WHERE id = ?').get(req.params.id) as any;
  if (!job) {
    res.status(404).json({ success: false, error: 'Processing job not found.' });
    return;
  }

  res.json({
    success: true,
    data: {
      ...job,
      logs: job.logs ? JSON.parse(job.logs) : [],
    },
  });
});

// GET /api/projects/:projectId/jobs - List jobs for a project
jobRouter.get('/project/:projectId', authenticateJWT, (req: AuthRequest, res: Response): void => {
  const jobs = db.prepare('SELECT * FROM processing_jobs WHERE project_id = ? ORDER BY created_at DESC').all(req.params.projectId) as any[];

  res.json({
    success: true,
    data: jobs.map(j => ({
      ...j,
      logs: j.logs ? JSON.parse(j.logs) : [],
    })),
  });
});
