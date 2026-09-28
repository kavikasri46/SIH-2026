import { Client } from 'pg';
import fs from 'fs';
import path from 'path';

const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_aG1JoOR6utPE@ep-morning-water-b4e7ryr9-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require';

async function migrateAndSeed() {
  console.log('🚀 Connecting to Neon PostgreSQL...');
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Connected to Neon database.');

    // 1. Read and apply schema.sql
    const schemaPath = path.resolve(process.cwd(), '../database/schema.sql');
    if (fs.existsSync(schemaPath)) {
      console.log('Applying database/schema.sql...');
      const schemaSql = fs.readFileSync(schemaPath, 'utf8');
      await client.query(schemaSql);
      console.log('✅ PostgreSQL Schema & PostGIS tables created successfully.');
    }

    // 2. Read existing store and populate Neon
    const storePath = path.resolve(process.cwd(), 'cadastral_store.json');
    if (fs.existsSync(storePath)) {
      console.log('Seeding initial data from cadastral_store.json...');
      const raw = fs.readFileSync(storePath, 'utf8');
      const store = JSON.parse(raw);

      // Seed Users
      for (const u of store.users || []) {
        await client.query(
          `INSERT INTO users (id, email, password_hash, full_name, role, department, is_active, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
           ON CONFLICT (id) DO UPDATE SET
             email = EXCLUDED.email,
             full_name = EXCLUDED.full_name,
             role = EXCLUDED.role;`,
          [u.id, u.email, u.password_hash, u.full_name, u.role, u.department, u.is_active ?? true, u.created_at || new Date(), u.updated_at || new Date()]
        );
      }
      console.log(`✅ Seeded ${(store.users || []).length} users.`);

      // Seed Projects
      for (const p of store.projects || []) {
        await client.query(
          `INSERT INTO projects (id, name, survey_area, district, city, state, description, crs, bbox, status, created_by, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
           ON CONFLICT (id) DO UPDATE SET
             name = EXCLUDED.name,
             status = EXCLUDED.status;`,
          [p.id, p.name, p.survey_area, p.district, p.city, p.state, p.description, p.crs || 'EPSG:4326', JSON.stringify(p.bbox || []), p.status, p.created_by, p.created_at || new Date(), p.updated_at || new Date()]
        );
      }
      console.log(`✅ Seeded ${(store.projects || []).length} projects.`);

      // Seed AI Models
      for (const m of store.ai_models || []) {
        await client.query(
          `INSERT INTO ai_models (id, name, version, architecture, task_type, weights_path, input_size, classes, status, evaluation_metrics, device, created_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
           ON CONFLICT (id) DO NOTHING;`,
          [m.id, m.name, m.version || '1.0.0', m.architecture, m.task_type, m.weights_path, 512, JSON.stringify(m.classes || []), m.status, JSON.stringify(m.evaluation_metrics || {}), 'cpu', m.created_at || new Date()]
        );
      }
      console.log(`✅ Seeded ${(store.ai_models || []).length} AI models.`);

      // Seed Parcels
      for (const pcl of store.parcels || []) {
        await client.query(
          `INSERT INTO parcels (id, project_id, parcel_number, geometry, area_sqm, perimeter_m, confidence_score, confidence_level, status, land_use_category, surveyor_notes, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
           ON CONFLICT (id) DO NOTHING;`,
          [
            pcl.id,
            pcl.project_id,
            pcl.parcel_number,
            JSON.stringify(pcl.geometry),
            pcl.area_sqm || 100,
            pcl.perimeter_m || 50,
            pcl.confidence_score || 0.95,
            pcl.confidence_level || 'HIGH',
            pcl.status || 'AI_GENERATED',
            pcl.land_use || 'Mixed Residential',
            pcl.surveyor_notes || '',
            pcl.created_at || new Date(),
            pcl.updated_at || new Date(),
          ]
        );
      }
      console.log(`✅ Seeded ${(store.parcels || []).length} spatial parcels.`);

      // Seed Buildings
      for (const bld of store.buildings || []) {
        await client.query(
          `INSERT INTO buildings (id, project_id, parcel_id, geometry, footprint_area_sqm, estimated_height_m, confidence_score, status, created_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
           ON CONFLICT (id) DO NOTHING;`,
          [
            bld.id,
            bld.project_id,
            bld.parcel_id || null,
            JSON.stringify(bld.geometry),
            bld.footprint_area_sqm || 100,
            bld.estimated_height_m || 8,
            0.96,
            bld.status || 'APPROVED',
            bld.created_at || new Date(),
          ]
        );
      }
      console.log(`✅ Seeded ${(store.buildings || []).length} buildings.`);

      // Seed Roads
      for (const rd of store.roads || []) {
        await client.query(
          `INSERT INTO roads (id, project_id, road_name, geometry, length_m, estimated_width_m, road_type, confidence_score, status, created_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
           ON CONFLICT (id) DO NOTHING;`,
          [
            rd.id,
            rd.project_id,
            rd.road_name,
            JSON.stringify(rd.geometry),
            rd.length_m || 500,
            rd.width_m || 12,
            rd.road_type || 'LOCAL_STREET',
            0.98,
            rd.status || 'APPROVED',
            rd.created_at || new Date(),
          ]
        );
      }
      console.log(`✅ Seeded ${(store.roads || []).length} roads.`);

      // Seed Topology Errors
      for (const top of store.topology_errors || []) {
        await client.query(
          `INSERT INTO topology_errors (id, project_id, error_type, severity, description, affected_feature_ids, status, created_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           ON CONFLICT (id) DO NOTHING;`,
          [
            top.id,
            top.project_id,
            top.error_type || 'OVERLAP',
            top.severity || 'HIGH',
            top.description || 'Spatial boundary discrepancy',
            JSON.stringify(top.affected_feature_ids || []),
            top.status || 'OPEN',
            top.created_at || new Date(),
          ]
        );
      }
      console.log(`✅ Seeded ${(store.topology_errors || []).length} topology errors.`);
    }

    console.log('\n🎉 ALL MIGRATIONS AND SEEDS APPLIED TO NEON POSTGRESQL SUCCESSFULLY!');
    await client.end();
  } catch (err: any) {
    console.error('❌ Migration error:', err);
    process.exit(1);
  }
}

migrateAndSeed();
