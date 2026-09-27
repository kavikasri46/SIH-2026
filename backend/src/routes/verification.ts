import { Router, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db/index.js';
import { authenticateJWT, AuthRequest, requireRole } from '../middleware/auth.js';

export const verificationRouter = Router();

// POST /api/parcels/:id/verify - Surveyor verification / approval workflow
verificationRouter.post(
  '/parcels/:id/verify',
  authenticateJWT,
  requireRole(['ADMIN', 'SURVEYOR', 'GIS_ANALYST']),
  (req: AuthRequest, res: Response): void => {
    const { action, notes } = req.body; // action: 'APPROVE' | 'REJECT' | 'SEND_TO_FIELD'

    const parcel = db.prepare('SELECT * FROM parcels WHERE id = ?').get(req.params.id) as any;
    if (!parcel) {
      res.status(404).json({ success: false, error: 'Parcel not found.' });
      return;
    }

    let newStatus = parcel.status;
    if (action === 'APPROVE') newStatus = 'APPROVED';
    else if (action === 'REJECT') newStatus = 'REJECTED';
    else if (action === 'SEND_TO_FIELD') newStatus = 'FIELD_VERIFICATION';

    const provenance = parcel.provenance_metadata ? JSON.parse(parcel.provenance_metadata) : {};
    provenance.verified_by = req.user!.fullName;
    provenance.verified_at = new Date().toISOString();
    provenance.verification_decision = action;

    db.prepare(`
      UPDATE parcels
      SET status = ?, surveyor_notes = COALESCE(?, surveyor_notes), provenance_metadata = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(newStatus, notes || null, JSON.stringify(provenance), req.params.id);

    // Audit log
    db.prepare(`
      INSERT INTO audit_logs (id, user_id, action, entity_type, entity_id, old_value, new_value, ip_address)
      VALUES (?, ?, ?, 'PARCEL', ?, ?, ?, ?)
    `).run(
      uuidv4(),
      req.user!.id,
      `PARCEL_${action}`,
      req.params.id,
      JSON.stringify({ oldStatus: parcel.status }),
      JSON.stringify({ newStatus, notes }),
      req.ip || '127.0.0.1'
    );

    res.json({
      success: true,
      message: `Parcel status updated to ${newStatus}.`,
      data: { id: req.params.id, status: newStatus },
    });
  }
);

// POST /api/field-surveys - Ground truthing submission from Field Officer
verificationRouter.post(
  '/field-surveys',
  authenticateJWT,
  requireRole(['ADMIN', 'SURVEYOR', 'FIELD_OFFICER']),
  (req: AuthRequest, res: Response): void => {
    const { parcelId, projectId, gpsLat, gpsLng, gpsAccuracyM, boundaryAgreed, officerNotes, photos } = req.body;

    if (!parcelId || !projectId || gpsLat === undefined || gpsLng === undefined) {
      res.status(400).json({ success: false, error: 'parcelId, projectId, gpsLat, and gpsLng are required.' });
      return;
    }

    const surveyId = uuidv4();

    db.prepare(`
      INSERT INTO field_surveys (id, parcel_id, project_id, officer_id, gps_latitude, gps_longitude, gps_accuracy_m, photos, boundary_agreed, officer_notes, verification_status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'VERIFIED')
    `).run(
      surveyId,
      parcelId,
      projectId,
      req.user!.id,
      gpsLat,
      gpsLng,
      gpsAccuracyM || 0.05,
      photos ? JSON.stringify(photos) : '[]',
      boundaryAgreed ? 1 : 0,
      officerNotes || 'Field physical beacon verification completed.'
    );

    // Update parcel status
    db.prepare("UPDATE parcels SET status = 'FIELD_VERIFIED', updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(parcelId);

    res.status(201).json({
      success: true,
      message: 'Field ground truth survey recorded successfully.',
      data: { surveyId, parcelId, status: 'FIELD_VERIFIED' },
    });
  }
);
