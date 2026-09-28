import React from 'react';
import { Workflow, ArrowDown, ArrowRight, ShieldCheck, Cpu, Database, Map, FileCheck } from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  return (
    <section id="architecture-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-emerald-950/60">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-3">
          <Workflow className="w-4 h-4 text-emerald-400" />
          <span>System Architecture</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Complete Dataflow & Processing Engine
        </h2>
        <p className="mt-3 text-sm sm:text-base text-zinc-400">
          How UAV orthomosaic rasters flow from raw ingestion to legally verified cadastral outputs.
        </p>
      </div>

      {/* Architecture Visual Diagram Container */}
      <div className="p-6 sm:p-10 rounded-3xl bg-[#060e0a]/90 border border-emerald-900/50 shadow-2xl space-y-6">
        
        {/* Row 1: Ingestion & Preprocessing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-[#030605] border border-emerald-900/40 text-center">
            <div className="text-xs font-mono text-emerald-400 uppercase font-bold mb-1">DATA SOURCE</div>
            <div className="text-sm font-bold text-white">UAV Drone Orthomosaic (5cm GSD GeoTIFF)</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#030605] border border-emerald-900/40 text-center">
            <div className="text-xs font-mono text-emerald-400 uppercase font-bold mb-1">RASTER PREPROCESSOR</div>
            <div className="text-sm font-bold text-white">512x512 Window Tiling & Overlap Normalization</div>
          </div>
        </div>

        <div className="flex justify-center text-emerald-600/70">
          <ArrowDown className="w-5 h-5" />
        </div>

        {/* Row 2: AI Microservice */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-emerald-900/40 to-emerald-950/80 border border-emerald-500/40 text-center">
          <div className="text-xs font-mono text-emerald-400 uppercase font-bold mb-1">DEEP LEARNING SEGMENTATION</div>
          <div className="text-base font-bold text-white">PyTorch Engine (SegFormer-B0 / ResNet34-UNet)</div>
        </div>

        <div className="flex justify-center text-emerald-600/70">
          <ArrowDown className="w-5 h-5" />
        </div>

        {/* Row 3: Feature Extraction Branches */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#030605] border border-emerald-900/40 text-center">
            <div className="text-xs font-mono text-emerald-300 font-bold mb-1">BUILDINGS</div>
            <div className="text-xs font-semibold text-zinc-300">Connected Components & Footprints</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#030605] border border-emerald-900/40 text-center">
            <div className="text-xs font-mono text-emerald-300 font-bold mb-1">ROADS</div>
            <div className="text-xs font-semibold text-zinc-300">Centerline & Corridor Clearances</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#030605] border border-emerald-900/40 text-center">
            <div className="text-xs font-mono text-emerald-300 font-bold mb-1">LAND USE</div>
            <div className="text-xs font-semibold text-zinc-300">Vegetation & Open Plot Classes</div>
          </div>
        </div>

        <div className="flex justify-center text-emerald-600/70">
          <ArrowDown className="w-5 h-5" />
        </div>

        {/* Row 4: GIS Topology & Human Verification */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-[#030605] border border-emerald-900/40 text-center">
            <div className="text-xs font-mono text-emerald-400 uppercase font-bold mb-1">GIS TOPOLOGY VALIDATOR</div>
            <div className="text-sm font-bold text-white">ST_Overlaps, Micro-Slivers & Gap Cleansing</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#030605] border border-emerald-800/60 text-center">
            <div className="text-xs font-mono text-emerald-400 uppercase font-bold mb-1">SURVEYOR VERIFICATION</div>
            <div className="text-sm font-bold text-white">WebGIS Review & Mobile dGPS Ground-Truthing</div>
          </div>
        </div>

        <div className="flex justify-center text-emerald-600/70">
          <ArrowDown className="w-5 h-5" />
        </div>

        {/* Row 5: Certified Export */}
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/60 text-center shadow-[0_0_25px_rgba(16,185,129,0.15)]">
          <div className="text-xs font-mono text-emerald-400 uppercase font-bold mb-1">LEGALLY CERTIFIED OUTPUT</div>
          <div className="text-sm font-bold text-white">Official Cadastral Survey Summary PDF & OGC GeoJSON Package</div>
        </div>

      </div>

    </section>
  );
};
