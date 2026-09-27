import { Router, Response } from 'express';
import { db } from '../db/index.js';
import { authenticateJWT, AuthRequest } from '../middleware/auth.js';

export const reportRouter = Router();

// GET /api/projects/:projectId/summary - Aggregated cadastral survey metrics
reportRouter.get('/:projectId/summary', authenticateJWT, (req: AuthRequest, res: Response): void => {
  const { projectId } = req.params;
  const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(projectId) as any;

  if (!project) {
    res.status(404).json({ success: false, error: 'Project not found.' });
    return;
  }

  const parcels = db.prepare('SELECT * FROM parcels WHERE project_id = ?').all(projectId) as any[];
  const buildings = db.prepare('SELECT * FROM buildings WHERE project_id = ?').all(projectId) as any[];
  const roads = db.prepare('SELECT * FROM roads WHERE project_id = ?').all(projectId) as any[];
  const topologyErrors = db.prepare('SELECT * FROM topology_errors WHERE project_id = ?').all(projectId) as any[];

  // Calculate status breakdown
  const statusCounts: Record<string, number> = {
    AI_GENERATED: 0,
    HUMAN_EDITED: 0,
    FIELD_VERIFIED: 0,
    APPROVED: 0,
    REJECTED: 0,
  };

  let totalParcelAreaSqm = 0;
  for (const p of parcels) {
    statusCounts[p.status] = (statusCounts[p.status] || 0) + 1;
    totalParcelAreaSqm += Number(p.area_sqm || 0);
  }

  let totalBuildingFootprintSqm = 0;
  for (const b of buildings) {
    totalBuildingFootprintSqm += Number(b.footprint_area_sqm || 0);
  }

  let totalRoadLengthM = 0;
  for (const r of roads) {
    totalRoadLengthM += Number(r.length_m || 0);
  }

  res.json({
    success: true,
    data: {
      project: {
        id: project.id,
        name: project.name,
        surveyArea: project.survey_area,
        district: project.district,
        city: project.city,
        state: project.state,
        crs: project.crs,
        status: project.status,
      },
      metrics: {
        totalParcels: parcels.length,
        totalParcelAreaSqm: Math.round(totalParcelAreaSqm * 100) / 100,
        statusBreakdown: statusCounts,
        verificationRatePercent: parcels.length > 0 ? Math.round(((statusCounts.APPROVED + statusCounts.FIELD_VERIFIED) / parcels.length) * 100) : 0,
        totalBuildings: buildings.length,
        totalBuildingFootprintSqm: Math.round(totalBuildingFootprintSqm * 100) / 100,
        totalRoads: roads.length,
        totalRoadLengthM: Math.round(totalRoadLengthM * 100) / 100,
        openTopologyIssues: topologyErrors.filter(e => e.status === 'OPEN').length,
        resolvedTopologyIssues: topologyErrors.filter(e => e.status === 'RESOLVED').length,
      },
    },
  });
});
