import { User, Project, GeoJSONFeatureCollection, TopologyError, AIModelRecord } from '../types';

const API_BASE = '/api';

export function getAuthToken(): string | null {
  return localStorage.getItem('cadastral_token');
}

export function setAuthToken(token: string) {
  localStorage.setItem('cadastral_token', token);
}

export function removeAuthToken() {
  localStorage.removeItem('cadastral_token');
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || 'Network request failed');
  }

  return data;
}

export const api = {
  // Auth
  login: (credentials: { email: string; password: string }) =>
    request<{ success: boolean; data: { token: string; user: User } }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  getCurrentUser: () =>
    request<{ success: boolean; data: User }>('/auth/me'),

  // Projects
  getProjects: () =>
    request<{ success: boolean; data: Project[] }>('/projects'),

  getProject: (id: string) =>
    request<{ success: boolean; data: Project & { stats: any } }>(`/projects/${id}`),

  createProject: (data: any) =>
    request<{ success: boolean; data: Project }>('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  uploadImagery: (projectId: string, formData: FormData) =>
    request<{ success: boolean; message: string; data: any }>(`/projects/${projectId}/imagery`, {
      method: 'POST',
      body: formData,
    }),

  // GIS Layers
  getParcels: (projectId: string, params?: { status?: string; confidence?: string; search?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return request<{ success: boolean; data: GeoJSONFeatureCollection }>(
      `/projects/${projectId}/parcels${query ? `?${query}` : ''}`
    );
  },

  getBuildings: (projectId: string) =>
    request<{ success: boolean; data: GeoJSONFeatureCollection }>(`/projects/${projectId}/buildings`),

  getRoads: (projectId: string) =>
    request<{ success: boolean; data: GeoJSONFeatureCollection }>(`/projects/${projectId}/roads`),

  updateParcelGeometry: (id: string, data: { geometry?: any; surveyorNotes?: string; status?: string }) =>
    request<{ success: boolean; message: string; data: any }>(`/gis/parcels/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  verifyParcel: (id: string, action: 'APPROVE' | 'REJECT' | 'SEND_TO_FIELD', notes?: string) =>
    request<{ success: boolean; message: string; data: any }>(`/parcels/${id}/verify`, {
      method: 'POST',
      body: JSON.stringify({ action, notes }),
    }),

  submitFieldSurvey: (data: {
    parcelId: string;
    projectId: string;
    gpsLat: number;
    gpsLng: number;
    gpsAccuracyM?: number;
    boundaryAgreed: boolean;
    officerNotes?: string;
    photos?: string[];
  }) =>
    request<{ success: boolean; message: string; data: any }>('/field-surveys', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Topology
  getTopologyErrors: (projectId: string) =>
    request<{ success: boolean; data: TopologyError[] }>(`/projects/${projectId}/topology`),

  runTopologyScan: (projectId: string) =>
    request<{ success: boolean; message: string; issuesCount: number }>(`/projects/${projectId}/topology/scan`, {
      method: 'POST',
    }),

  resolveTopologyError: (id: string, notes?: string) =>
    request<{ success: boolean; message: string }>(`/topology/${id}/resolve`, {
      method: 'POST',
      body: JSON.stringify({ resolutionNotes: notes }),
    }),

  // AI Models
  getAIModels: () =>
    request<{ success: boolean; data: AIModelRecord[] }>('/ai/models'),

  triggerInference: (data: { projectId: string; modelId: string; imageryId?: string }) =>
    request<{ success: boolean; message: string; data: any }>('/ai/inference', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Summary and Reports
  getProjectSummary: (projectId: string) =>
    request<{ success: boolean; data: any }>(`/projects/${projectId}/summary`),

  getAuditLogs: (params?: { entityType?: string; entityId?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return request<{ success: boolean; data: any[] }>(`/audit${query ? `?${query}` : ''}`);
  },
};
