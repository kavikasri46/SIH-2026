import React from 'react';
import { Project, User } from '../types';
import {
  Compass,
  UserCircle,
  LogOut,
  Plus,
  AlertTriangle,
  Cpu,
  FileText,
  UploadCloud,
  Map as MapIcon,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  user: User | null;
  projects: Project[];
  activeProject: Project | null;
  activeTab: 'STUDIO' | 'MAP';
  onTabChange: (tab: 'STUDIO' | 'MAP') => void;
  onSelectProject: (project: Project) => void;
  onOpenNewProject: () => void;
  onOpenAIModal: () => void;
  onOpenTopologyModal: () => void;
  onOpenReportModal: () => void;
  onOpenAuthModal: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  projects,
  activeProject,
  activeTab,
  onTabChange,
  onSelectProject,
  onOpenNewProject,
  onOpenAIModal,
  onOpenTopologyModal,
  onOpenReportModal,
  onOpenAuthModal,
  onLogout,
}) => {
  const getRoleBadgeColor = (role?: string) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-purple-900/60 text-purple-300 border-purple-700/50';
      case 'SURVEYOR':
        return 'bg-blue-900/60 text-blue-300 border-blue-700/50';
      case 'GIS_ANALYST':
        return 'bg-emerald-900/60 text-emerald-300 border-emerald-700/50';
      case 'FIELD_OFFICER':
        return 'bg-amber-900/60 text-amber-300 border-amber-700/50';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <header className="h-14 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between z-30 select-none">
      {/* Brand & Project Selector */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-cadastral-600 flex items-center justify-center text-white font-bold shadow-md shadow-cadastral-900/30">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-sm tracking-tight text-slate-100">SIH26012 Cadastral GIS</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cadastral-900/80 text-cadastral-400 border border-cadastral-700/40">
                UAV AI Platform
              </span>
            </div>
            <div className="text-[11px] text-slate-400">Urban Parcel & Cadastral Mapping</div>
          </div>
        </div>

        <div className="h-6 w-px bg-slate-800 mx-1" />

        {/* Studio / Map View Switcher */}
        <div className="flex items-center bg-slate-800/80 p-0.5 rounded-lg border border-slate-700">
          <button
            onClick={() => onTabChange('STUDIO')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
              activeTab === 'STUDIO'
                ? 'bg-cadastral-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Image Studio</span>
          </button>

          <button
            onClick={() => onTabChange('MAP')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
              activeTab === 'MAP'
                ? 'bg-cadastral-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span>WebGIS Map</span>
          </button>
        </div>

        <div className="h-6 w-px bg-slate-800 mx-1" />

        {/* Project Selector Dropdown */}
        <div className="flex items-center space-x-2">
          <select
            value={activeProject?.id || ''}
            onChange={(e) => {
              const p = projects.find((x) => x.id === e.target.value);
              if (p) onSelectProject(p);
            }}
            className="bg-slate-800/90 border border-slate-700 hover:border-slate-600 text-xs text-slate-200 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-cadastral-500 font-medium"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.city})
              </option>
            ))}
          </select>

          <button
            onClick={onOpenNewProject}
            className="flex items-center space-x-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-2.5 py-1.5 rounded-md transition-colors"
            title="Create New Cadastral Survey Project"
          >
            <Plus className="w-3.5 h-3.5 text-slate-400" />
            <span>New Survey</span>
          </button>
        </div>
      </div>

      {/* Quick Action Badges */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onOpenAIModal}
          className="flex items-center space-x-1.5 text-xs bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-md transition-colors"
        >
          <Cpu className="w-3.5 h-3.5 text-cadastral-400" />
          <span>AI Registry</span>
        </button>

        <button
          onClick={onOpenTopologyModal}
          className={`flex items-center space-x-1.5 text-xs px-3 py-1.5 rounded-md border transition-colors ${
            (activeProject?.open_topology_issues || 0) > 0
              ? 'bg-amber-950/40 text-amber-300 border-amber-800/60 hover:bg-amber-900/40'
              : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          <span>Topology Issues ({activeProject?.open_topology_issues ?? 0})</span>
        </button>

        <button
          onClick={onOpenReportModal}
          className="flex items-center space-x-1.5 text-xs bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-md transition-colors"
        >
          <FileText className="w-3.5 h-3.5 text-emerald-400" />
          <span>Export PDF</span>
        </button>

        <div className="h-6 w-px bg-slate-800 mx-2" />

        {/* User Profile & Role Info */}
        {user ? (
          <div className="flex items-center space-x-3">
            <div className="flex flex-col items-end">
              <span className="text-xs font-medium text-slate-200">{user.fullName}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${getRoleBadgeColor(user.role)}`}>
                {user.role}
              </span>
            </div>
            <button
              onClick={onLogout}
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-md transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuthModal}
            className="flex items-center space-x-1.5 text-xs bg-cadastral-600 hover:bg-cadastral-500 text-white font-medium px-3 py-1.5 rounded-md shadow transition-colors"
          >
            <UserCircle className="w-4 h-4" />
            <span>Login</span>
          </button>
        )}
      </div>
    </header>
  );
};
