export type UserRole = 'ADMIN' | 'SURVEYOR' | 'GIS_ANALYST' | 'FIELD_OFFICER' | 'VIEWER';

export type ProjectStatus =
  | 'CREATED'
  | 'IMAGERY_UPLOADED'
  | 'PREPROCESSING'
  | 'AI_PROCESSING'
  | 'GIS_PROCESSING'
  | 'VALIDATION'
  | 'REVIEW'
  | 'FIELD_VERIFICATION'
  | 'APPROVED'
  | 'ARCHIVED'
  | 'FAILED';

export type FeatureStatus =
  | 'AI_GENERATED'
  | 'REFERENCE'
  | 'HUMAN_EDITED'
  | 'FIELD_VERIFIED'
  | 'APPROVED'
  | 'REJECTED';

export type ConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW' | 'UNAVAILABLE';

export type TopologyErrorType =
  | 'OVERLAP'
  | 'GAP'
  | 'SELF_INTERSECTION'
  | 'DUPLICATE'
  | 'SLIVER'
  | 'INVALID_RING'
  | 'DISCONNECTED';

export interface User {
  id: string;
  email: string;
  password_hash: string;
  full_name: string;
  role: UserRole;
  department?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  name: string;
  survey_area: string;
  district: string;
  city: string;
  state: string;
  description: string;
  crs: string;
  bbox: [number, number, number, number] | null;
  status: ProjectStatus;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface ImageryMetadata {
  id: string;
  project_id: string;
  filename: string;
  original_name: string;
  file_path: string;
  file_size_bytes: number;
  file_format: string;
  resolution_cm: number;
  crs: string;
  bounds: {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
  };
  dimensions: {
    width: number;
    height: number;
  };
  bands_count: number;
  is_orthorectified: boolean;
  quality_score: number;
  upload_status: string;
  created_at: string;
}

export interface GeoJSONGeometry {
  type: 'Polygon' | 'MultiPolygon' | 'LineString' | 'MultiLineString' | 'Point';
  coordinates: any;
}

export interface CandidateParcel {
  id: string;
  project_id: string;
  parcel_number: string;
  geometry: GeoJSONGeometry;
  area_sqm: number;
  perimeter_m: number;
  confidence_score: number | null;
  confidence_level: ConfidenceLevel;
  status: FeatureStatus;
  land_use_category: string;
  provenance_metadata: {
    model_name?: string;
    model_version?: string;
    dataset_version?: string;
    inferred_at?: string;
    edited_by?: string;
    verified_by?: string;
    is_simulated?: boolean;
    verification_notes?: string;
  };
  surveyor_notes?: string;
  created_by_job?: string;
  created_at: string;
  updated_at: string;
}

export interface BuildingFeature {
  id: string;
  project_id: string;
  parcel_id?: string;
  geometry: GeoJSONGeometry;
  footprint_area_sqm: number;
  estimated_height_m?: number;
  confidence_score: number | null;
  status: FeatureStatus;
  provenance_metadata: Record<string, any>;
  created_at: string;
}

export interface RoadFeature {
  id: string;
  project_id: string;
  road_name?: string;
  geometry: GeoJSONGeometry;
  length_m: number;
  estimated_width_m?: number;
  road_type: string;
  confidence_score: number | null;
  status: FeatureStatus;
  created_at: string;
}

export interface TopologyError {
  id: string;
  project_id: string;
  error_type: TopologyErrorType;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  affected_feature_ids: string[];
  geometry?: GeoJSONGeometry;
  description: string;
  status: 'OPEN' | 'RESOLVED' | 'IGNORED';
  resolution_notes?: string;
  created_at: string;
  resolved_at?: string;
}

export interface FieldSurvey {
  id: string;
  parcel_id: string;
  project_id: string;
  officer_id: string;
  officer_name?: string;
  gps_latitude: number;
  gps_longitude: number;
  gps_accuracy_m: number;
  photos: string[];
  boundary_agreed: boolean;
  officer_notes: string;
  verification_status: string;
  submitted_at: string;
}

export interface AuditLog {
  id: string;
  user_id: string;
  user_name?: string;
  action: string;
  entity_type: string;
  entity_id: string;
  old_value?: any;
  new_value?: any;
  ip_address?: string;
  timestamp: string;
}
