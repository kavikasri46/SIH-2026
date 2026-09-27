import { Router, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db/index.js';
import { authenticateJWT, AuthRequest, requireRole } from '../middleware/auth.js';
import { calculatePolygonAreaSqm, calculatePerimeterMeters } from '../services/gisTopology.js';

export const gisRouter = Router();

// GET /api/projects/:projectId/parcels - Get all candidate parcels for WebGIS
gisRouter.get('/:projectId/parcels', authenticateJWT, (req: AuthRequest, res: Response): void => {
  const { status, confidence, search } = req.query;

  let query = 'SELECT * FROM parcels WHERE project_id = ?';
  const params: any[] = [req.params.projectId];

  if (status) {
    query += ' AND status = ?';
    params.push(status);
  }

  if (confidence) {
    query += ' AND confidence_level = ?';
    params.push(confidence);
  }

  if (search) {
    query += ' AND (parcel_number LIKE ? OR surveyor_notes LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }

  query += ' ORDER BY parcel_number ASC';

  const rawParcels = db.prepare(query).all(...params) as any[];

  const parcels = rawParcels.map(p => ({
    ...p,
    geometry: typeof p.geometry === 'string' ? JSON.parse(p.geometry) : p.geometry,
    provenance_metadata: p.provenance_metadata ? (typeof p.provenance_metadata === 'string' ? JSON.parse(p.provenance_metadata) : p.provenance_metadata) : {},
  }));

  // Return GeoJSON FeatureCollection format for direct WebGIS rendering
  const featureCollection = {
    type: 'FeatureCollection',
    features: parcels.map(p => ({
      type: 'Feature',
      id: p.id,
      geometry: p.geometry,
      properties: {
        id: p.id,
        parcelNumber: p.parcel_number,
        areaSqm: p.area_sqm,
        perimeterM: p.perimeter_m,
        confidenceScore: p.confidence_score,
        confidenceLevel: p.confidence_level,
        status: p.status,
        landUse: p.land_use_category,
        provenance: p.provenance_metadata,
        surveyorNotes: p.surveyor_notes,
        createdAt: p.created_at,
        updatedAt: p.updated_at,
      },
    })),
  };

  res.json({ success: true, data: featureCollection });
});

// GET /api/projects/:projectId/buildings - Get building footprints
gisRouter.get('/:projectId/buildings', authenticateJWT, (req: AuthRequest, res: Response): void => {
  const raw = db.prepare('SELECT * FROM buildings WHERE project_id = ?').all(req.params.projectId) as any[];

  const featureCollection = {
    type: 'FeatureCollection',
    features: raw.map(b => ({
      type: 'Feature',
      id: b.id,
      geometry: typeof b.geometry === 'string' ? JSON.parse(b.geometry) : b.geometry,
      properties: {
        id: b.id,
        parcelId: b.parcel_id,
        footprintAreaSqm: b.footprint_area_sqm,
        estimatedHeightM: b.estimated_height_m,
        confidenceScore: b.confidence_score,
        status: b.status,
      },
    })),
  };

  res.json({ success: true, data: featureCollection });
});

// GET /api/projects/:projectId/roads - Get road network
gisRouter.get('/:projectId/roads', authenticateJWT, (req: AuthRequest, res: Response): void => {
  const raw = db.prepare('SELECT * FROM roads WHERE project_id = ?').all(req.params.projectId) as any[];

  const featureCollection = {
    type: 'FeatureCollection',
    features: raw.map(r => ({
      type: 'Feature',
      id: r.id,
      geometry: typeof r.geometry === 'string' ? JSON.parse(r.geometry) : r.geometry,
      properties: {
        id: r.id,
        roadName: r.road_name,
        lengthM: r.length_m,
        estimatedWidthM: r.estimated_width_m,
        roadType: r.road_type,
        confidenceScore: r.confidence_score,
        status: r.status,
      },
    })),
  };

  res.json({ success: true, data: featureCollection });
});

// PATCH /api/parcels/:id - Surveyor editing vertex / notes / status
gisRouter.patch(
  '/parcels/:id',
  authenticateJWT,
  requireRole(['ADMIN', 'SURVEYOR', 'GIS_ANALYST']),
  (req: AuthRequest, res: Response): void => {
    const { geometry, surveyorNotes, status } = req.body;
    const existing = db.prepare('SELECT * FROM parcels WHERE id = ?').get(req.params.id) as any;

    if (!existing) {
      res.status(404).json({ success: false, error: 'Parcel not found.' });
      return;
    }

    let areaSqm = existing.area_sqm;
    let perimeterM = existing.perimeter_m;
    let geometryJson = existing.geometry;
    let newStatus = status || existing.status;

    if (geometry) {
      areaSqm = calculatePolygonAreaSqm(geometry);
      perimeterM = calculatePerimeterMeters(geometry);
      geometryJson = JSON.stringify(geometry);
      if (!status) {
        newStatus = 'HUMAN_EDITED';
      }
    }

    const provenance = existing.provenance_metadata ? JSON.parse(existing.provenance_metadata) : {};
    provenance.last_edited_by = req.user!.fullName;
    provenance.last_edited_at = new Date().toISOString();

    db.prepare(`
      UPDATE parcels
      SET geometry = ?,
          area_sqm = ?,
          perimeter_m = ?,
          status = ?,
          surveyor_notes = COALESCE(?, surveyor_notes),
          provenance_metadata = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      geometryJson,
      areaSqm,
      perimeterM,
      newStatus,
      surveyorNotes || null,
      JSON.stringify(provenance),
      req.params.id
    );

    // Record immutable audit log
    db.prepare(`
      INSERT INTO audit_logs (id, user_id, action, entity_type, entity_id, old_value, new_value, ip_address)
      VALUES (?, ?, 'PARCEL_GEOMETRY_EDITED', 'PARCEL', ?, ?, ?, ?)
    `).run(
      uuidv4(),
      req.user!.id,
      req.params.id,
      JSON.stringify({ geometry: existing.geometry, area: existing.area_sqm }),
      JSON.stringify({ geometry: geometryJson, area: areaSqm, newStatus }),
      req.ip || '127.0.0.1'
    );

    res.json({
      success: true,
      message: 'Parcel geometry and attributes updated successfully.',
      data: {
        id: req.params.id,
        areaSqm,
        perimeterM,
        status: newStatus,
      },
    });
  }
);
