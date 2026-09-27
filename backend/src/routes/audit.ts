import { Router, Response } from 'express';
import { db } from '../db/index.js';
import { authenticateJWT, AuthRequest, requireRole } from '../middleware/auth.js';

export const auditRouter = Router();

// GET /api/audit - View immutable audit trail
auditRouter.get(
  '/',
  authenticateJWT,
  requireRole(['ADMIN', 'SURVEYOR', 'GIS_ANALYST']),
  (req: AuthRequest, res: Response): void => {
    const { entityType, entityId, limit } = req.query;

    let query = `
      SELECT a.*, u.full_name as user_name, u.email as user_email, u.role as user_role
      FROM audit_logs a
      LEFT JOIN users u ON a.user_id = u.id
    `;
    const params: any[] = [];

    if (entityType) {
      query += ' WHERE a.entity_type = ?';
      params.push(entityType);
      if (entityId) {
        query += ' AND a.entity_id = ?';
        params.push(entityId);
      }
    } else if (entityId) {
      query += ' WHERE a.entity_id = ?';
      params.push(entityId);
    }

    query += ' ORDER BY a.created_at DESC LIMIT ?';
    params.push(parseInt(limit as string, 10) || 50);

    const logs = db.prepare(query).all(...params) as any[];

    res.json({
      success: true,
      data: logs.map(l => ({
        ...l,
        old_value: l.old_value ? JSON.parse(l.old_value) : null,
        new_value: l.new_value ? JSON.parse(l.new_value) : null,
      })),
    });
  }
);
