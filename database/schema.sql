-- ====================================================================
-- SIH26012: Cadastral Feature Extraction & Urban Parcel Mapping Schema
-- PostgreSQL 16 + PostGIS 3.4
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 2. ENUMS
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('ADMIN', 'SURVEYOR', 'GIS_ANALYST', 'FIELD_OFFICER', 'VIEWER');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE project_status AS ENUM (
        'CREATED', 'IMAGERY_UPLOADED', 'PREPROCESSING', 'AI_PROCESSING',
        'GIS_PROCESSING', 'VALIDATION', 'REVIEW', 'FIELD_VERIFICATION',
        'APPROVED', 'ARCHIVED', 'FAILED'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE feature_status AS ENUM (
        'AI_GENERATED', 'REFERENCE', 'HUMAN_EDITED', 'FIELD_VERIFIED', 'APPROVED', 'REJECTED'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE confidence_level AS ENUM ('HIGH', 'MEDIUM', 'LOW', 'UNAVAILABLE');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE topology_error_type AS ENUM (
        'OVERLAP', 'GAP', 'SELF_INTERSECTION', 'DUPLICATE', 'SLIVER', 'INVALID_RING', 'DISCONNECTED'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE model_status AS ENUM ('TRAINING', 'VALIDATING', 'APPROVED', 'DEPLOYED', 'ARCHIVED', 'NOT_AVAILABLE');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'VIEWER',
    department VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS projects (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    survey_area VARCHAR(255) NOT NULL,
    district VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    description TEXT,
    crs VARCHAR(50) DEFAULT 'EPSG:4326',
    bbox JSONB,
    status VARCHAR(50) NOT NULL DEFAULT 'CREATED',
    created_by VARCHAR(36) REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. IMAGERY TABLE
CREATE TABLE IF NOT EXISTS imagery (
    id VARCHAR(36) PRIMARY KEY,
    project_id VARCHAR(36) REFERENCES projects(id) ON DELETE CASCADE,
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    file_format VARCHAR(20) NOT NULL,
    resolution_cm NUMERIC(6, 2),
    crs VARCHAR(50) DEFAULT 'EPSG:4326',
    bounds JSONB,
    dimensions JSONB,
    bands_count INTEGER DEFAULT 3,
    is_orthorectified BOOLEAN DEFAULT TRUE,
    quality_score NUMERIC(5, 2),
    upload_status VARCHAR(50) DEFAULT 'COMPLETED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. AI MODELS TABLE
CREATE TABLE IF NOT EXISTS ai_models (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    version VARCHAR(50) NOT NULL,
    architecture VARCHAR(100) NOT NULL,
    task_type VARCHAR(100) NOT NULL,
    weights_path TEXT,
    input_size INTEGER DEFAULT 512,
    classes JSONB NOT NULL,
    status VARCHAR(50) DEFAULT 'NOT_AVAILABLE',
    evaluation_metrics JSONB,
    device VARCHAR(20) DEFAULT 'cpu',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. PROCESSING JOBS TABLE
CREATE TABLE IF NOT EXISTS processing_jobs (
    id VARCHAR(36) PRIMARY KEY,
    project_id VARCHAR(36) REFERENCES projects(id) ON DELETE CASCADE,
    imagery_id VARCHAR(36) REFERENCES imagery(id),
    model_id VARCHAR(36) REFERENCES ai_models(id),
    job_type VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'QUEUED',
    progress_percent INTEGER DEFAULT 0,
    stage_description TEXT,
    error_message TEXT,
    logs JSONB DEFAULT '[]'::jsonb,
    started_at TIMESTAMP WITH TIME ZONE,
    finished_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. CANDIDATE PARCELS TABLE
CREATE TABLE IF NOT EXISTS parcels (
    id VARCHAR(36) PRIMARY KEY,
    project_id VARCHAR(36) REFERENCES projects(id) ON DELETE CASCADE,
    parcel_number VARCHAR(100),
    geometry JSONB NOT NULL,
    area_sqm NUMERIC(12, 2) NOT NULL,
    perimeter_m NUMERIC(12, 2),
    confidence_score NUMERIC(5, 2),
    confidence_level VARCHAR(20) DEFAULT 'UNAVAILABLE',
    status VARCHAR(50) DEFAULT 'AI_GENERATED',
    land_use_category VARCHAR(100),
    provenance_metadata JSONB,
    surveyor_notes TEXT,
    created_by_job VARCHAR(36) REFERENCES processing_jobs(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. BUILDINGS TABLE
CREATE TABLE IF NOT EXISTS buildings (
    id VARCHAR(36) PRIMARY KEY,
    project_id VARCHAR(36) REFERENCES projects(id) ON DELETE CASCADE,
    parcel_id VARCHAR(36) REFERENCES parcels(id) ON DELETE SET NULL,
    geometry JSONB NOT NULL,
    footprint_area_sqm NUMERIC(12, 2) NOT NULL,
    estimated_height_m NUMERIC(6, 2),
    confidence_score NUMERIC(5, 2),
    status VARCHAR(50) DEFAULT 'AI_GENERATED',
    provenance_metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. ROADS TABLE
CREATE TABLE IF NOT EXISTS roads (
    id VARCHAR(36) PRIMARY KEY,
    project_id VARCHAR(36) REFERENCES projects(id) ON DELETE CASCADE,
    road_name VARCHAR(255),
    geometry JSONB NOT NULL,
    length_m NUMERIC(12, 2) NOT NULL,
    estimated_width_m NUMERIC(6, 2),
    road_type VARCHAR(50) DEFAULT 'LOCAL_STREET',
    confidence_score NUMERIC(5, 2),
    status VARCHAR(50) DEFAULT 'AI_GENERATED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. TOPOLOGY ERRORS TABLE
CREATE TABLE IF NOT EXISTS topology_errors (
    id VARCHAR(36) PRIMARY KEY,
    project_id VARCHAR(36) REFERENCES projects(id) ON DELETE CASCADE,
    error_type VARCHAR(50) NOT NULL,
    severity VARCHAR(20) NOT NULL DEFAULT 'HIGH',
    affected_feature_ids JSONB NOT NULL,
    geometry JSONB,
    description TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'OPEN',
    resolution_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- 12. FIELD VERIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS field_surveys (
    id VARCHAR(36) PRIMARY KEY,
    parcel_id VARCHAR(36) REFERENCES parcels(id) ON DELETE CASCADE,
    project_id VARCHAR(36) REFERENCES projects(id) ON DELETE CASCADE,
    officer_id VARCHAR(36) REFERENCES users(id),
    gps_latitude NUMERIC(10, 7) NOT NULL,
    gps_longitude NUMERIC(10, 7) NOT NULL,
    gps_accuracy_m NUMERIC(6, 2),
    photos JSONB DEFAULT '[]'::jsonb,
    boundary_agreed BOOLEAN NOT NULL DEFAULT FALSE,
    officer_notes TEXT,
    verification_status VARCHAR(50) DEFAULT 'VERIFIED',
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS audit_logs (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id VARCHAR(36) NOT NULL,
    old_value JSONB,
    new_value JSONB,
    ip_address VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
