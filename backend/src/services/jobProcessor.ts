import { v4 as uuidv4 } from 'uuid';
import { db } from '../db/index.js';
import { validateParcelsTopology } from './gisTopology.js';

export class JobProcessor {
  static createJob(projectId: string, imageryId: string | null, modelId: string | null, jobType: string): string {
    const jobId = uuidv4();
    const stmt = db.prepare(`
      INSERT INTO processing_jobs (id, project_id, imagery_id, model_id, job_type, status, progress_percent, stage_description, started_at)
      VALUES (?, ?, ?, ?, ?, 'PROCESSING', 10, 'Initializing pipeline and validating geospatial metadata...', ?)
    `);
    stmt.run(jobId, projectId, imageryId, modelId, jobType, new Date().toISOString());
    return jobId;
  }

  static updateProgress(jobId: string, percent: number, stage: string, status: string = 'PROCESSING', error: string | null = null) {
    const finishedAt = status === 'COMPLETED' || status === 'FAILED' ? new Date().toISOString() : null;
    const stmt = db.prepare(`
      UPDATE processing_jobs
      SET progress_percent = ?, stage_description = ?, status = ?, error_message = ?, finished_at = COALESCE(?, finished_at)
      WHERE id = ?
    `);
    stmt.run(percent, stage, status, error, finishedAt, jobId);
  }

  static runTopologyScan(projectId: string): number {
    const rawParcels = db.prepare('SELECT id, parcel_number, geometry FROM parcels WHERE project_id = ?').all(projectId) as any[];
    const parcels = rawParcels.map(p => ({
      id: p.id,
      parcel_number: p.parcel_number,
      geometry: typeof p.geometry === 'string' ? JSON.parse(p.geometry) : p.geometry,
    }));

    const issues = validateParcelsTopology(parcels);

    // Clear previous open issues for this project
    db.prepare('DELETE FROM topology_errors WHERE project_id = ?').run(projectId);

    const insertErr = db.prepare(`
      INSERT INTO topology_errors (id, project_id, error_type, severity, affected_feature_ids, description, status)
      VALUES (?, ?, ?, ?, ?, ?, 'OPEN')
    `);

    for (const issue of issues) {
      insertErr.run(
        uuidv4(),
        projectId,
        issue.errorType,
        issue.severity,
        JSON.stringify(issue.affectedFeatureIds),
        issue.description
      );
    }

    return issues.length;
  }
}
