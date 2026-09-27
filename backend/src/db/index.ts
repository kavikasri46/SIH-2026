import fs from 'fs';
import path from 'path';
import { config } from '../config.js';

export interface DatabaseSchema {
  users: any[];
  projects: any[];
  imagery: any[];
  ai_models: any[];
  processing_jobs: any[];
  parcels: any[];
  buildings: any[];
  roads: any[];
  topology_errors: any[];
  field_surveys: any[];
  audit_logs: any[];
}

const defaultSchema: DatabaseSchema = {
  users: [],
  projects: [],
  imagery: [],
  ai_models: [],
  processing_jobs: [],
  parcels: [],
  buildings: [],
  roads: [],
  topology_errors: [],
  field_surveys: [],
  audit_logs: [],
};

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storagePath = path.resolve(__dirname, '../../cadastral_store.json');

class StoreDatabase {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.load();
  }

  private load(): DatabaseSchema {
    try {
      if (fs.existsSync(storagePath)) {
        const raw = fs.readFileSync(storagePath, 'utf8');
        return { ...defaultSchema, ...JSON.parse(raw) };
      }
    } catch (err) {
      console.error('Failed to load JSON database store, initializing new store:', err);
    }
    return JSON.parse(JSON.stringify(defaultSchema));
  }

  public save(): void {
    try {
      fs.writeFileSync(storagePath, JSON.stringify(this.data, null, 2), 'utf8');
    } catch (err) {
      console.error('Failed to write database store:', err);
    }
  }

  public prepare(sql: string) {
    const trimmed = sql.trim();

    return {
      get: (...params: any[]) => {
        const result = this.executeQuery(trimmed, params);
        return Array.isArray(result) ? result[0] || undefined : result;
      },
      all: (...params: any[]) => {
        const result = this.executeQuery(trimmed, params);
        return Array.isArray(result) ? result : [result];
      },
      run: (...params: any[]) => {
        this.executeMutation(trimmed, params);
        this.save();
        return { changes: 1 };
      },
    };
  }

  public exec(sql: string) {
    // Schema initialized in memory
    this.save();
  }

  private executeQuery(sql: string, params: any[]): any {
    this.data = this.load();
    const lower = sql.toLowerCase();

    // SELECT COUNT(*)
    if (lower.startsWith('select count(*)')) {
      const match = lower.match(/from\s+([a-z_]+)/);
      if (match) {
        const table = match[1] as keyof DatabaseSchema;
        let rows = this.data[table] || [];

        if (lower.includes('where project_id = ?') && params[0]) {
          rows = rows.filter(r => r.project_id === params[0]);
        }
        if (lower.includes("status in ('approved', 'field_verified')")) {
          rows = rows.filter(r => r.status === 'APPROVED' || r.status === 'FIELD_VERIFIED');
        }
        if (lower.includes("status = 'open'")) {
          rows = rows.filter(r => r.status === 'OPEN');
        }

        return { count: rows.length };
      }
      return { count: 0 };
    }

    // USERS
    if (lower.includes('from users')) {
      if (lower.includes('where email = ?')) {
        return this.data.users.find(u => u.email === params[0]);
      }
      if (lower.includes('where id = ?')) {
        return this.data.users.find(u => u.id === params[0]);
      }
      return this.data.users;
    }

    // PROJECTS
    if (lower.includes('from projects')) {
      if (lower.includes('where p.id = ?') || lower.includes('where id = ?')) {
        const p = this.data.projects.find(x => x.id === params[0]);
        if (!p) return undefined;
        const user = this.data.users.find(u => u.id === p.created_by);
        return { ...p, created_by_name: user?.full_name || 'System' };
      }

      return this.data.projects.map(p => {
        const user = this.data.users.find(u => u.id === p.created_by);
        const parcels = this.data.parcels.filter(x => x.project_id === p.id);
        const verified = parcels.filter(x => x.status === 'APPROVED' || x.status === 'FIELD_VERIFIED');
        const buildings = this.data.buildings.filter(x => x.project_id === p.id);
        const roads = this.data.roads.filter(x => x.project_id === p.id);
        const errors = this.data.topology_errors.filter(x => x.project_id === p.id && x.status === 'OPEN');

        return {
          ...p,
          created_by_name: user?.full_name || 'System',
          total_parcels: parcels.length,
          verified_parcels: verified.length,
          total_buildings: buildings.length,
          total_roads: roads.length,
          open_topology_issues: errors.length,
        };
      });
    }

    // IMAGERY
    if (lower.includes('from imagery')) {
      if (lower.includes('where project_id = ?')) {
        return this.data.imagery.filter(img => img.project_id === params[0]);
      }
      if (lower.includes('where id = ?')) {
        return this.data.imagery.find(img => img.id === params[0]);
      }
      return this.data.imagery;
    }

    // AI MODELS
    if (lower.includes('from ai_models')) {
      if (lower.includes('where id = ?')) {
        return this.data.ai_models.find(m => m.id === params[0]);
      }
      return this.data.ai_models;
    }

    // PARCELS
    if (lower.includes('from parcels')) {
      if (lower.includes('where id = ?')) {
        return this.data.parcels.find(p => p.id === params[0]);
      }
      let items = this.data.parcels;
      if (lower.includes('where project_id = ?')) {
        items = items.filter(p => p.project_id === params[0]);
      }
      return items;
    }

    // BUILDINGS
    if (lower.includes('from buildings')) {
      if (lower.includes('where project_id = ?')) {
        return this.data.buildings.filter(b => b.project_id === params[0]);
      }
      return this.data.buildings;
    }

    // ROADS
    if (lower.includes('from roads')) {
      if (lower.includes('where project_id = ?')) {
        return this.data.roads.filter(r => r.project_id === params[0]);
      }
      return this.data.roads;
    }

    // TOPOLOGY ERRORS
    if (lower.includes('from topology_errors')) {
      if (lower.includes('where project_id = ?')) {
        return this.data.topology_errors.filter(e => e.project_id === params[0]);
      }
      return this.data.topology_errors;
    }

    // PROCESSING JOBS
    if (lower.includes('from processing_jobs')) {
      if (lower.includes('where id = ?')) {
        return this.data.processing_jobs.find(j => j.id === params[0]);
      }
      if (lower.includes('where project_id = ?')) {
        return this.data.processing_jobs.filter(j => j.project_id === params[0]);
      }
      return this.data.processing_jobs;
    }

    // AUDIT LOGS
    if (lower.includes('from audit_logs')) {
      let logs = [...this.data.audit_logs].reverse();
      return logs.map(l => {
        const u = this.data.users.find(x => x.id === l.user_id);
        return {
          ...l,
          user_name: u?.full_name || 'System Admin',
          user_email: u?.email || 'admin@cadastral.gov.in',
          user_role: u?.role || 'ADMIN',
        };
      });
    }

    return [];
  }

  private executeMutation(sql: string, params: any[]): void {
    const lower = sql.toLowerCase();

    // INSERT INTO users
    if (lower.includes('insert into users')) {
      this.data.users.push({
        id: params[0],
        email: params[1],
        password_hash: params[2],
        full_name: params[3],
        role: params[4],
        department: params[5],
        is_active: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }

    // INSERT INTO ai_models
    else if (lower.includes('insert into ai_models')) {
      this.data.ai_models.push({
        id: params[0],
        name: params[1],
        version: params[2],
        architecture: params[3],
        task_type: params[4],
        weights_path: params[5],
        input_size: params[6],
        classes: params[7],
        status: params[8],
        evaluation_metrics: params[9],
        device: params[10],
        created_at: new Date().toISOString(),
      });
    }

    // INSERT INTO projects
    else if (lower.includes('insert into projects')) {
      this.data.projects.push({
        id: params[0],
        name: params[1],
        survey_area: params[2],
        district: params[3],
        city: params[4],
        state: params[5],
        description: params[6],
        crs: params[7],
        bbox: params[8],
        status: params[9] || 'CREATED',
        created_by: params[10],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }

    // UPDATE projects
    else if (lower.includes('update projects')) {
      if (lower.includes("status = 'imagery_uploaded'")) {
        const p = this.data.projects.find(x => x.id === params[0]);
        if (p) p.status = 'IMAGERY_UPLOADED';
      } else if (lower.includes("status = 'ai_processing'")) {
        const p = this.data.projects.find(x => x.id === params[0]);
        if (p) p.status = 'AI_PROCESSING';
      } else {
        const id = params[3] || params[0];
        const p = this.data.projects.find(x => x.id === id);
        if (p) {
          if (params[0]) p.status = params[0];
          if (params[1]) p.description = params[1];
          if (params[2]) p.bbox = params[2];
          p.updated_at = new Date().toISOString();
        }
      }
    }

    // INSERT INTO imagery
    else if (lower.includes('insert into imagery')) {
      this.data.imagery.push({
        id: params[0],
        project_id: params[1],
        filename: params[2],
        original_name: params[3],
        file_path: params[4],
        file_size_bytes: params[5],
        file_format: params[6],
        resolution_cm: params[7],
        crs: params[8],
        bounds: params[9],
        dimensions: params[10],
        bands_count: params[11],
        is_orthorectified: 1,
        quality_score: params[12],
        upload_status: 'COMPLETED',
        created_at: new Date().toISOString(),
      });
    }

    // INSERT INTO parcels
    else if (lower.includes('insert into parcels')) {
      this.data.parcels.push({
        id: params[0],
        project_id: params[1],
        parcel_number: params[2],
        geometry: params[3],
        area_sqm: params[4],
        perimeter_m: params[5],
        confidence_score: params[6],
        confidence_level: params[7],
        status: params[8],
        land_use_category: params[9],
        provenance_metadata: params[10],
        surveyor_notes: params[11],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }

    // UPDATE parcels
    else if (lower.includes('update parcels')) {
      const id = params[params.length - 1];
      const p = this.data.parcels.find(x => x.id === id);
      if (p) {
        if (lower.includes("status = 'field_verified'")) {
          p.status = 'FIELD_VERIFIED';
        } else if (lower.includes('set geometry = ?')) {
          p.geometry = params[0];
          p.area_sqm = params[1];
          p.perimeter_m = params[2];
          p.status = params[3];
          if (params[4]) p.surveyor_notes = params[4];
          if (params[5]) p.provenance_metadata = params[5];
        } else if (lower.includes('set status = ?')) {
          p.status = params[0];
          if (params[1]) p.surveyor_notes = params[1];
          if (params[2]) p.provenance_metadata = params[2];
        }
        p.updated_at = new Date().toISOString();
      }
    }

    // INSERT INTO buildings
    else if (lower.includes('insert into buildings')) {
      this.data.buildings.push({
        id: params[0],
        project_id: params[1],
        parcel_id: params[2],
        geometry: params[3],
        footprint_area_sqm: params[4],
        estimated_height_m: params[5],
        confidence_score: params[6],
        status: params[7],
        provenance_metadata: params[8],
        created_at: new Date().toISOString(),
      });
    }

    // INSERT INTO roads
    else if (lower.includes('insert into roads')) {
      this.data.roads.push({
        id: params[0],
        project_id: params[1],
        road_name: params[2],
        geometry: params[3],
        length_m: params[4],
        estimated_width_m: params[5],
        road_type: params[6],
        confidence_score: params[7],
        status: params[8],
        created_at: new Date().toISOString(),
      });
    }

    // INSERT INTO topology_errors
    else if (lower.includes('insert into topology_errors')) {
      this.data.topology_errors.push({
        id: params[0],
        project_id: params[1],
        error_type: params[2],
        severity: params[3],
        affected_feature_ids: params[4],
        geometry: params[5],
        description: params[6],
        status: params[7] || 'OPEN',
        created_at: new Date().toISOString(),
      });
    }

    // DELETE FROM topology_errors
    else if (lower.includes('delete from topology_errors')) {
      const projectId = params[0];
      this.data.topology_errors = this.data.topology_errors.filter(e => e.project_id !== projectId);
    }

    // UPDATE topology_errors
    else if (lower.includes('update topology_errors')) {
      const id = params[1];
      const err = this.data.topology_errors.find(e => e.id === id);
      if (err) {
        err.status = 'RESOLVED';
        err.resolution_notes = params[0];
        err.resolved_at = new Date().toISOString();
      }
    }

    // INSERT INTO field_surveys
    else if (lower.includes('insert into field_surveys')) {
      this.data.field_surveys.push({
        id: params[0],
        parcel_id: params[1],
        project_id: params[2],
        officer_id: params[3],
        gps_latitude: params[4],
        gps_longitude: params[5],
        gps_accuracy_m: params[6],
        photos: params[7],
        boundary_agreed: params[8],
        officer_notes: params[9],
        verification_status: params[10],
        submitted_at: new Date().toISOString(),
      });
    }

    // INSERT INTO processing_jobs
    else if (lower.includes('insert into processing_jobs')) {
      this.data.processing_jobs.push({
        id: params[0],
        project_id: params[1],
        imagery_id: params[2],
        model_id: params[3],
        job_type: params[4],
        status: 'PROCESSING',
        progress_percent: 10,
        stage_description: 'Initializing pipeline and validating geospatial metadata...',
        started_at: params[5],
        created_at: new Date().toISOString(),
      });
    }

    // UPDATE processing_jobs
    else if (lower.includes('update processing_jobs')) {
      const id = params[5];
      const j = this.data.processing_jobs.find(x => x.id === id);
      if (j) {
        j.progress_percent = params[0];
        j.stage_description = params[1];
        j.status = params[2];
        j.error_message = params[3];
        if (params[4]) j.finished_at = params[4];
      }
    }

    // INSERT INTO audit_logs
    else if (lower.includes('insert into audit_logs')) {
      this.data.audit_logs.push({
        id: params[0],
        user_id: params[1],
        action: params[2],
        entity_type: params[3],
        entity_id: params[4],
        old_value: params[5],
        new_value: params[6],
        ip_address: params[7],
        created_at: new Date().toISOString(),
      });
    }
  }
}

export const db = new StoreDatabase();

export function initDatabase() {
  db.exec('');
}
