export type UserRole = 'ADMIN' | 'SURVEYOR' | 'GIS_ANALYST' | 'FIELD_OFFICER' | 'VIEWER';

export type FeatureStatus =
  | 'AI_GENERATED'
  | 'REFERENCE'
  | 'HUMAN_EDITED'
  | 'FIELD_VERIFIED'
  | 'APPROVED'
  | 'REJECTED';

export type ConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW' | 'UNAVAILABLE';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  department?: string;
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
  status: string;
  created_by_name?: string;
  created_at: string;
  total_parcels?: number;
  verified_parcels?: number;
  total_buildings?: number;
  total_roads?: number;
  open_topology_issues?: number;
}

export interface GeoJSONFeature {
  type: 'Feature';
  id: string;
  geometry: {
    type: string;
    coordinates: any;
  };
  properties: {
    id: string;
    parcelNumber?: string;
    areaSqm?: number;
    perimeterM?: number;
    confidenceScore?: number;
    confidenceLevel?: ConfidenceLevel;
    status: FeatureStatus;
    landUse?: string;
    provenance?: any;
    surveyorNotes?: string;
    footprintAreaSqm?: number;
    estimatedHeightM?: number;
    roadName?: string;
    lengthM?: number;
    roadType?: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

export interface GeoJSONFeatureCollection {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
}

export interface TopologyError {
  id: string;
  project_id: string;
  error_type: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  affected_feature_ids: string[];
  description: string;
  status: 'OPEN' | 'RESOLVED';
  resolution_notes?: string;
  created_at: string;
}

export interface AIModelRecord {
  id: string;
  name: string;
  version: string;
  architecture: string;
  task_type: string;
  weights_path: string | null;
  classes: string[];
  status: 'APPROVED' | 'NOT_AVAILABLE' | 'TRAINING';
  evaluation_metrics: Record<string, any> | null;
}

export interface LayerVisibility {
  parcels: boolean;
  buildings: boolean;
  roads: boolean;
  topology: boolean;
  orthomosaic: boolean;
  labels: boolean;
}
