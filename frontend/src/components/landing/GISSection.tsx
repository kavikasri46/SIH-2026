import React from 'react';
import { Layers, ArrowRight, Compass, ShieldCheck } from 'lucide-react';

export const GISSection: React.FC = () => {
  const pipelineStages = [
    'Aerial Image',
    'Segmentation Mask',
    'Contours',
    'Polygons',
    'Topology Validation',
    'GIS Layer',
  ];

  return (
    <section id="gis-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-emerald-950">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-3">
          <Layers className="w-4 h-4 text-emerald-400" />
          <span>Spatial Vectorization</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          From Pixels to GIS Features
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-300">
          Transform continuous raster inference channels into discrete, attributed, and topology-checked vector geometry layers.
        </p>
      </div>

      {/* Pipeline Stages Connected Strip */}
      <div className="mb-12 p-4 sm:p-6 rounded-3xl oled-card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {pipelineStages.map((stage, idx) => (
            <React.Fragment key={idx}>
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-400 font-mono text-xs flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white">{stage}</span>
              </div>
              {idx < pipelineStages.length - 1 && (
                <div className="hidden lg:block text-emerald-800">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Map-Style Visualization Card */}
      <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-emerald-900/50 bg-[#030805] shadow-2xl p-6 sm:p-8 flex flex-col justify-between select-none">
        
        {/* Top Controls & North Arrow */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center space-x-2 bg-black/80 border border-emerald-900/60 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-300 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>LAYER: CANDIDATE_PARCELS_WGS84</span>
          </div>

          {/* North Arrow & Scale Indicator */}
          <div className="flex items-center space-x-4 bg-black/80 border border-emerald-900/60 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-300 backdrop-blur-md">
            <div className="flex items-center space-x-1">
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>N</span>
            </div>
            <span className="text-slate-600">|</span>
            <span>SCALE 1:500</span>
          </div>
        </div>

        {/* Center SVG Vector GIS Layer */}
        <svg viewBox="0 0 800 400" className="absolute inset-0 w-full h-full pointer-events-none opacity-80">
          {/* Topographic GIS Grid Pattern */}
          <line x1="0" y1="100" x2="800" y2="100" stroke="#0e2417" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="0" y1="200" x2="800" y2="200" stroke="#0e2417" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="0" y1="300" x2="800" y2="300" stroke="#0e2417" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="200" y1="0" x2="200" y2="400" stroke="#0e2417" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="400" y1="0" x2="400" y2="400" stroke="#0e2417" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="600" y1="0" x2="600" y2="400" stroke="#0e2417" strokeWidth="1" strokeDasharray="4 4" />

          {/* Candidate Parcels Vector Polygons */}
          <polygon points="60,60 220,60 220,180 60,180" stroke="#22c55e" strokeWidth="2" fill="rgba(34, 197, 94, 0.12)" />
          <polygon points="230,60 390,60 390,180 230,180" stroke="#22c55e" strokeWidth="2" fill="rgba(34, 197, 94, 0.12)" />
          <polygon points="400,60 560,60 560,180 400,180" stroke="#22c55e" strokeWidth="2" fill="rgba(34, 197, 94, 0.12)" />
          <polygon points="570,60 730,60 730,180 570,180" stroke="#22c55e" strokeWidth="2" fill="rgba(34, 197, 94, 0.12)" />

          <polygon points="60,220 220,220 220,340 60,340" stroke="#22c55e" strokeWidth="2" fill="rgba(34, 197, 94, 0.12)" />
          <polygon points="230,220 390,220 390,340 230,340" stroke="#22c55e" strokeWidth="2" fill="rgba(34, 197, 94, 0.12)" />
          <polygon points="400,220 560,220 560,340 400,340" stroke="#22c55e" strokeWidth="2" fill="rgba(34, 197, 94, 0.12)" />
          <polygon points="570,220 730,220 730,340 570,340" stroke="#22c55e" strokeWidth="2" fill="rgba(34, 197, 94, 0.12)" />

          {/* Building Footprints inside Parcels */}
          <polygon points="90,85 190,85 190,155 90,155" stroke="#f59e0b" strokeWidth="2" fill="rgba(245, 158, 11, 0.25)" />
          <polygon points="260,85 360,85 360,155 260,155" stroke="#f59e0b" strokeWidth="2" fill="rgba(245, 158, 11, 0.25)" />
          <polygon points="430,85 530,85 530,155 430,155" stroke="#f59e0b" strokeWidth="2" fill="rgba(245, 158, 11, 0.25)" />

          {/* Road Network Corridor */}
          <line x1="0" y1="200" x2="800" y2="200" stroke="#10b981" strokeWidth="6" strokeDasharray="16 8" />
        </svg>

        {/* Bottom Coordinates & Topology Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 z-10 pt-4 border-t border-emerald-950">
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <span>PROJECTION: EPSG:4326 (WGS84)</span>
            <span className="text-slate-600">|</span>
            <span>OGC SIMPLE FEATURES VALIDATED</span>
          </div>

          <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-mono font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>0 Topology Overlaps Detected</span>
          </div>
        </div>

      </div>

    </section>
  );
};
