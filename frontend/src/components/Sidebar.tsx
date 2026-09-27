import React from 'react';
import { Project, LayerVisibility } from '../types';
import { Layers, Eye, EyeOff, Building2, Milestone, ShieldCheck, AlertCircle, History, Info, Search } from 'lucide-react';

interface SidebarProps {
  activeProject: Project | null;
  layers: LayerVisibility;
  onToggleLayer: (layerKey: keyof LayerVisibility) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeProject,
  layers,
  onToggleLayer,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}) => {
  return (
    <aside className="w-72 bg-slate-900/95 border-r border-slate-800 flex flex-col h-[calc(100vh-3.5rem)] text-xs select-none">
      {/* Search & Filter Header */}
      <div className="p-3 border-b border-slate-800 space-y-2">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Search parcel ID or notes..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-md pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cadastral-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-md px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-cadastral-500 font-medium"
        >
          <option value="">All Verification Statuses</option>
          <option value="AI_GENERATED">AI Generated Candidate</option>
          <option value="HUMAN_EDITED">Human Edited (Surveyor)</option>
          <option value="FIELD_VERIFIED">Field Ground-Truthed</option>
          <option value="APPROVED">Legally Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {/* Layers Switchboard */}
      <div className="p-3 border-b border-slate-800">
        <div className="flex items-center justify-between text-slate-400 font-semibold uppercase tracking-wider text-[10px] mb-2">
          <span>WebGIS Layer Control</span>
          <Layers className="w-3.5 h-3.5" />
        </div>

        <div className="space-y-1.5">
          {/* Candidate Parcels Layer */}
          <div
            onClick={() => onToggleLayer('parcels')}
            className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
              layers.parcels ? 'bg-slate-800/80 text-slate-200' : 'bg-slate-900 text-slate-400 hover:bg-slate-800/40'
            }`}
          >
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded border border-cadastral-400 bg-cadastral-500/30" />
              <span className="font-medium">Cadastral Parcels</span>
            </div>
            {layers.parcels ? <Eye className="w-3.5 h-3.5 text-cadastral-400" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
          </div>

          {/* Building Footprints Layer */}
          <div
            onClick={() => onToggleLayer('buildings')}
            className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
              layers.buildings ? 'bg-slate-800/80 text-slate-200' : 'bg-slate-900 text-slate-400 hover:bg-slate-800/40'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Building Footprints</span>
            </div>
            {layers.buildings ? <Eye className="w-3.5 h-3.5 text-amber-400" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
          </div>

          {/* Roads Layer */}
          <div
            onClick={() => onToggleLayer('roads')}
            className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
              layers.roads ? 'bg-slate-800/80 text-slate-200' : 'bg-slate-900 text-slate-400 hover:bg-slate-800/40'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Milestone className="w-3.5 h-3.5 text-rose-400" />
              <span>Road Network</span>
            </div>
            {layers.roads ? <Eye className="w-3.5 h-3.5 text-rose-400" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
          </div>

          {/* Topology Warning Layer */}
          <div
            onClick={() => onToggleLayer('topology')}
            className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
              layers.topology ? 'bg-slate-800/80 text-slate-200' : 'bg-slate-900 text-slate-400 hover:bg-slate-800/40'
            }`}
          >
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-3.5 h-3.5 text-orange-400" />
              <span>Topology Errors</span>
            </div>
            {layers.topology ? <Eye className="w-3.5 h-3.5 text-orange-400" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
          </div>

          {/* Orthomosaic Basemap */}
          <div
            onClick={() => onToggleLayer('orthomosaic')}
            className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
              layers.orthomosaic ? 'bg-slate-800/80 text-slate-200' : 'bg-slate-900 text-slate-400 hover:bg-slate-800/40'
            }`}
          >
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-emerald-600" />
              <span>Satellite Basemap</span>
            </div>
            {layers.orthomosaic ? <Eye className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
          </div>
        </div>
      </div>

      {/* Survey Project Metadata & Summary */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3">
        <div className="flex items-center justify-between text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
          <span>Survey Metadata</span>
          <Info className="w-3.5 h-3.5" />
        </div>

        {activeProject ? (
          <div className="bg-slate-800/40 border border-slate-800 rounded-lg p-3 space-y-2 text-slate-300">
            <div>
              <div className="text-[10px] text-slate-400">Project Area</div>
              <div className="font-semibold text-slate-100">{activeProject.survey_area}</div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-slate-400">District:</span> {activeProject.district}
              </div>
              <div>
                <span className="text-slate-400">City:</span> {activeProject.city}
              </div>
              <div>
                <span className="text-slate-400">State:</span> {activeProject.state}
              </div>
              <div>
                <span className="text-slate-400">CRS:</span> <span className="font-mono text-cadastral-400">{activeProject.crs}</span>
              </div>
            </div>
            <div className="text-[11px] pt-1 border-t border-slate-700/60">
              <span className="text-slate-400">Status:</span>{' '}
              <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-cadastral-300">
                {activeProject.status}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-slate-400 text-center py-4">No survey selected</div>
        )}

        {/* Live Cadastral Feature Statistics */}
        <div className="bg-slate-800/30 border border-slate-800 rounded-lg p-3 space-y-2">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Dataset Inventory</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-800/60 p-2 rounded border border-slate-700/50">
              <div className="text-[10px] text-slate-400">Total Parcels</div>
              <div className="text-base font-bold text-slate-100">{activeProject?.total_parcels ?? 0}</div>
            </div>
            <div className="bg-slate-800/60 p-2 rounded border border-slate-700/50">
              <div className="text-[10px] text-slate-400">Verified</div>
              <div className="text-base font-bold text-emerald-400">{activeProject?.verified_parcels ?? 0}</div>
            </div>
            <div className="bg-slate-800/60 p-2 rounded border border-slate-700/50">
              <div className="text-[10px] text-slate-400">Buildings</div>
              <div className="text-base font-bold text-amber-300">{activeProject?.total_buildings ?? 0}</div>
            </div>
            <div className="bg-slate-800/60 p-2 rounded border border-slate-700/50">
              <div className="text-[10px] text-slate-400">Roads</div>
              <div className="text-base font-bold text-rose-300">{activeProject?.total_roads ?? 0}</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
