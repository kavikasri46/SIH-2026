import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { WebGISMap } from './components/WebGISMap';
import { FeatureInspector } from './components/FeatureInspector';
import { DroneAnalysisWorkspace } from './components/DroneAnalysisWorkspace';
import { NewProjectModal } from './components/NewProjectModal';
import { AIModelModal } from './components/AIModelModal';
import { TopologyModal } from './components/TopologyModal';
import { FieldVerificationModal } from './components/FieldVerificationModal';
import { CadastralReportModal } from './components/CadastralReportModal';
import { AuthModal } from './components/AuthModal';
import { api, getAuthToken, setAuthToken, removeAuthToken } from './services/api';
import {
  User,
  Project,
  GeoJSONFeature,
  GeoJSONFeatureCollection,
  LayerVisibility,
} from './types';

export const App: React.FC = () => {
  // Navigation State: AI Studio vs WebGIS Map
  const [activeTab, setActiveTab] = useState<'STUDIO' | 'MAP'>('STUDIO');

  // Authentication State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Projects State
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // GIS Data State
  const [parcels, setParcels] = useState<GeoJSONFeatureCollection | null>(null);
  const [buildings, setBuildings] = useState<GeoJSONFeatureCollection | null>(null);
  const [roads, setRoads] = useState<GeoJSONFeatureCollection | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<GeoJSONFeature | null>(null);

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Layer Visibility State
  const [layers, setLayers] = useState<LayerVisibility>({
    parcels: true,
    buildings: true,
    roads: true,
    topology: true,
    orthomosaic: true,
    labels: true,
  });

  // Modals State
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isTopologyOpen, setIsTopologyOpen] = useState(false);
  const [isFieldVerificationOpen, setIsFieldVerificationOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  // 1. Check current user on mount or auto-login with default surveyor
  useEffect(() => {
    const initAuth = async () => {
      const token = getAuthToken();
      if (token) {
        try {
          const res = await api.getCurrentUser();
          setCurrentUser(res.data);
        } catch (err) {
          removeAuthToken();
        }
      } else {
        try {
          const res = await api.login({
            email: 'surveyor@cadastral.gov.in',
            password: 'Password@123',
          });
          setAuthToken(res.data.token);
          setCurrentUser(res.data.user);
        } catch (err) {
          console.error('Auto login fallback:', err);
        }
      }
    };
    initAuth();
  }, []);

  // 2. Load projects only when authenticated
  useEffect(() => {
    if (currentUser) {
      loadProjects();
    }
  }, [currentUser]);

  const loadProjects = async () => {
    try {
      const res = await api.getProjects();
      setProjects(res.data);
      if (res.data.length > 0 && !activeProject) {
        setActiveProject(res.data[0]);
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
    }
  };

  // 3. Load GIS Layers whenever active project or filters change
  useEffect(() => {
    if (activeProject) {
      loadGISLayers(activeProject.id);
    }
  }, [activeProject, searchQuery, statusFilter]);

  const loadGISLayers = async (projectId: string) => {
    try {
      const [parcelsRes, buildingsRes, roadsRes] = await Promise.all([
        api.getParcels(projectId, {
          search: searchQuery || undefined,
          status: statusFilter || undefined,
        }),
        api.getBuildings(projectId),
        api.getRoads(projectId),
      ]);

      setParcels(parcelsRes.data);
      setBuildings(buildingsRes.data);
      setRoads(roadsRes.data);

      if (selectedFeature) {
        const updated = parcelsRes.data.features.find((f) => f.id === selectedFeature.id);
        if (updated) setSelectedFeature(updated);
      }
    } catch (err) {
      console.error('Failed to load GIS layers:', err);
    }
  };

  const handleToggleLayer = (layerKey: keyof LayerVisibility) => {
    setLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const handleUpdateGeometry = async (id: string, newCoords: number[][], notes?: string) => {
    if (!activeProject) return;
    const geometry = {
      type: 'Polygon',
      coordinates: [newCoords],
    };
    await api.updateParcelGeometry(id, { geometry, surveyorNotes: notes });
    await loadGISLayers(activeProject.id);
    await refreshActiveProject();
  };

  const handleVerify = async (
    id: string,
    action: 'APPROVE' | 'REJECT' | 'SEND_TO_FIELD',
    notes?: string
  ) => {
    if (!activeProject) return;
    await api.verifyParcel(id, action, notes);
    await loadGISLayers(activeProject.id);
    await refreshActiveProject();
  };

  const refreshActiveProject = async () => {
    if (!activeProject) return;
    const res = await api.getProject(activeProject.id);
    setActiveProject(res.data);
  };

  const handleLogout = () => {
    removeAuthToken();
    setCurrentUser(null);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-900 text-slate-100 overflow-hidden select-none">
      {/* 1. TOP NAVIGATION BAR */}
      <Navbar
        user={currentUser}
        projects={projects}
        activeProject={activeProject}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSelectProject={(p) => setActiveProject(p)}
        onOpenNewProject={() => setIsNewProjectOpen(true)}
        onOpenAIModal={() => setIsAIModalOpen(true)}
        onOpenTopologyModal={() => setIsTopologyOpen(true)}
        onOpenReportModal={() => setIsReportOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* 2. MAIN APPLICATION CONTENT AREA */}
      <main className="flex-1 flex overflow-hidden">
        {activeTab === 'STUDIO' ? (
          /* TAB 1: AI DRONE IMAGE ANALYSIS STUDIO */
          <DroneAnalysisWorkspace
            activeProject={activeProject}
            onNavigateToMap={() => setActiveTab('MAP')}
            onSelectFeatureForMap={(feat) => {
              setSelectedFeature(feat);
              setActiveTab('MAP');
            }}
            onRefreshData={() => {
              if (activeProject) {
                loadGISLayers(activeProject.id);
                refreshActiveProject();
              }
            }}
          />
        ) : (
          /* TAB 2: INTERACTIVE 3-COLUMN WEBGIS WORKBENCH */
          <>
            <Sidebar
              activeProject={activeProject}
              layers={layers}
              onToggleLayer={handleToggleLayer}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
            />

            <WebGISMap
              parcels={parcels}
              buildings={buildings}
              roads={roads}
              layers={layers}
              selectedFeature={selectedFeature}
              onSelectFeature={setSelectedFeature}
            />

            <FeatureInspector
              feature={selectedFeature}
              onClose={() => setSelectedFeature(null)}
              onUpdateGeometry={handleUpdateGeometry}
              onVerify={handleVerify}
              onOpenFieldVerification={() => setIsFieldVerificationOpen(true)}
            />
          </>
        )}
      </main>

      {/* 3. MODAL DIALOGS */}
      <NewProjectModal
        isOpen={isNewProjectOpen}
        onClose={() => setIsNewProjectOpen(false)}
        onProjectCreated={(newP) => {
          setProjects((prev) => [newP, ...prev]);
          setActiveProject(newP);
        }}
      />

      <AIModelModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        activeProject={activeProject}
      />

      <TopologyModal
        isOpen={isTopologyOpen}
        onClose={() => setIsTopologyOpen(false)}
        activeProject={activeProject}
        onRefreshProject={refreshActiveProject}
      />

      <FieldVerificationModal
        isOpen={isFieldVerificationOpen}
        onClose={() => setIsFieldVerificationOpen(false)}
        feature={selectedFeature}
        activeProject={activeProject}
        onVerificationSubmitted={() => {
          if (activeProject) {
            loadGISLayers(activeProject.id);
            refreshActiveProject();
          }
        }}
      />

      <CadastralReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        activeProject={activeProject}
        parcels={parcels}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(u) => setCurrentUser(u)}
      />
    </div>
  );
};
