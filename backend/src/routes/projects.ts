import { Router, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db/index.js';
import { authenticateJWT, AuthRequest, requireRole } from '../middleware/auth.js';

export const projectRouter = Router();

// GET /api/projects - List all projects with summary stats
projectRouter.get('/', authenticateJWT, (req: AuthRequest, res: Response): void => {
  const projects = db.prepare(`
    SELECT 
      p.*,
      u.full_name as created_by_name,
      (SELECT COUNT(*) FROM parcels WHERE project_id = p.id) as total_parcels,
      (SELECT COUNT(*) FROM parcels WHERE project_id = p.id AND status IN ('APPROVED', 'FIELD_VERIFIED')) as verified_parcels,
      (SELECT COUNT(*) FROM buildings WHERE project_id = p.id) as total_buildings,
      (SELECT COUNT(*) FROM roads WHERE project_id = p.id) as total_roads,
      (SELECT COUNT(*) FROM topology_errors WHERE project_id = p.id AND status = 'OPEN') as open_topology_issues
    FROM projects p
    LEFT JOIN users u ON p.created_by = u.id
    ORDER BY p.created_at DESC
  `).all() as any[];

  const formatted = projects.map(p => ({
    ...p,
    bbox: p.bbox ? JSON.parse(p.bbox) : null,
  }));

  res.json({ success: true, data: formatted });
});

// GET /api/projects/:id - Single project details
projectRouter.get('/:id', authenticateJWT, (req: AuthRequest, res: Response): void => {
  const project = db.prepare(`
    SELECT p.*, u.full_name as created_by_name
    FROM projects p
    LEFT JOIN users u ON p.created_by = u.id
    WHERE p.id = ?
  `).get(req.params.id) as any;

  if (!project) {
    res.status(404).json({ success: false, error: 'Project not found.' });
    return;
  }

  // Fetch project stats
  const stats = {
    parcelsCount: (db.prepare('SELECT COUNT(*) as count FROM parcels WHERE project_id = ?').get(project.id) as any).count,
    verifiedParcelsCount: (db.prepare("SELECT COUNT(*) as count FROM parcels WHERE project_id = ? AND status IN ('APPROVED', 'FIELD_VERIFIED')").get(project.id) as any).count,
    buildingsCount: (db.prepare('SELECT COUNT(*) as count FROM buildings WHERE project_id = ?').get(project.id) as any).count,
    roadsCount: (db.prepare('SELECT COUNT(*) as count FROM roads WHERE project_id = ?').get(project.id) as any).count,
    topologyErrorsCount: (db.prepare("SELECT COUNT(*) as count FROM topology_errors WHERE project_id = ? AND status = 'OPEN'").get(project.id) as any).count,
  };

  res.json({
    success: true,
    data: {
      ...project,
      bbox: project.bbox ? JSON.parse(project.bbox) : null,
      stats,
    },
  });
});

// POST /api/projects - Create a new project (Admin, Surveyor, GIS_Analyst)
projectRouter.post(
  '/',
  authenticateJWT,
  requireRole(['ADMIN', 'SURVEYOR', 'GIS_ANALYST']),
  (req: AuthRequest, res: Response): void => {
    const { name, surveyArea, district, city, state, description, crs, bbox } = req.body;

    if (!name || !surveyArea || !district || !city || !state) {
      res.status(400).json({ success: false, error: 'Name, surveyArea, district, city, and state are required.' });
      return;
    }

    const projectId = uuidv4();
    const crsValue = crs || 'EPSG:4326';
    const bboxValue = bbox ? JSON.stringify(bbox) : null;

    db.prepare(`
      INSERT INTO projects (id, name, survey_area, district, city, state, description, crs, bbox, status, created_by)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'CREATED', ?)
    `).run(projectId, name, surveyArea, district, city, state, description || null, crsValue, bboxValue, req.user!.id);

    // Audit log
    db.prepare(`
      INSERT INTO audit_logs (id, user_id, action, entity_type, entity_id, new_value, ip_address)
      VALUES (?, ?, 'PROJECT_CREATED', 'PROJECT', ?, ?, ?)
    `).run(uuidv4(), req.user!.id, projectId, JSON.stringify({ name, district, city }), req.ip || '127.0.0.1');

    res.status(201).json({
      success: true,
      data: { id: projectId, name, surveyArea, district, city, state, crs: crsValue, status: 'CREATED' },
    });
  }
);

// PATCH /api/projects/:id - Update status / details
projectRouter.patch(
  '/:id',
  authenticateJWT,
  requireRole(['ADMIN', 'SURVEYOR', 'GIS_ANALYST']),
  (req: AuthRequest, res: Response): void => {
    const { status, description, bbox } = req.body;
    const existing = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id) as any;

    if (!existing) {
      res.status(404).json({ success: false, error: 'Project not found.' });
      return;
    }

    db.prepare(`
      UPDATE projects
      SET status = COALESCE(?, status),
          description = COALESCE(?, description),
          bbox = COALESCE(?, bbox),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      status || null,
      description || null,
      bbox ? JSON.stringify(bbox) : null,
      req.params.id
    );

    res.json({ success: true, message: 'Project successfully updated.' });
  }
);
