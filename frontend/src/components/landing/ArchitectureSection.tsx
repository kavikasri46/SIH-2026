import React from 'react';
import { Workflow, ArrowDown } from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  return (
    <section id="architecture-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E8DFD3]">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#8C4615] font-bold uppercase tracking-wider mb-3 px-3 py-1 bg-[#F0E6D8] border border-[#DFCDBA] rounded-full">
          <Workflow className="w-3.5 h-3.5 text-[#C46824]" />
          <span>System Architecture</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1B18] tracking-tight">
          Complete Dataflow & Processing Engine
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#5C5248]">
          How UAV orthomosaic rasters flow from raw ingestion to legally verified cadastral outputs.
        </p>
      </div>

      {/* Architecture Visual Diagram Container */}
      <div className="p-6 sm:p-10 rounded-3xl beige-card shadow-lg space-y-6">
        
        {/* Row 1: Ingestion & Preprocessing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#DFCDBA] text-center">
            <div className="text-xs font-mono text-[#8C4615] uppercase font-bold mb-1">DATA SOURCE</div>
            <div className="text-sm font-bold text-[#1E1B18]">UAV Drone Orthomosaic (5cm GSD GeoTIFF)</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#DFCDBA] text-center">
            <div className="text-xs font-mono text-[#8C4615] uppercase font-bold mb-1">RASTER PREPROCESSOR</div>
            <div className="text-sm font-bold text-[#1E1B18]">512x512 Window Tiling & Overlap Normalization</div>
          </div>
        </div>

        <div className="flex justify-center text-[#C46824]">
          <ArrowDown className="w-5 h-5" />
        </div>

        {/* Row 2: AI Microservice */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-[#FAF0E4] via-[#F5E6D3] to-[#FAF0E4] border border-[#DFCDBA] text-center shadow-sm">
          <div className="text-xs font-mono text-[#8C4615] uppercase font-bold mb-1">DEEP LEARNING SEGMENTATION</div>
          <div className="text-base font-bold text-[#1E1B18]">PyTorch Engine (SegFormer-B0 / ResNet34-UNet)</div>
        </div>

        <div className="flex justify-center text-[#C46824]">
          <ArrowDown className="w-5 h-5" />
        </div>

        {/* Row 3: Feature Extraction Branches */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#DFCDBA] text-center">
            <div className="text-xs font-mono text-[#C46824] font-bold mb-1">BUILDINGS</div>
            <div className="text-xs font-semibold text-[#5C5248]">Connected Components & Footprints</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#DFCDBA] text-center">
            <div className="text-xs font-mono text-[#8C4615] font-bold mb-1">ROADS</div>
            <div className="text-xs font-semibold text-[#5C5248]">Centerline & Corridor Clearances</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#DFCDBA] text-center">
            <div className="text-xs font-mono text-[#2D6A4F] font-bold mb-1">LAND USE</div>
            <div className="text-xs font-semibold text-[#5C5248]">Vegetation & Open Plot Classes</div>
          </div>
        </div>

        <div className="flex justify-center text-[#C46824]">
          <ArrowDown className="w-5 h-5" />
        </div>

        {/* Row 4: GIS Topology & Human Verification */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#DFCDBA] text-center">
            <div className="text-xs font-mono text-[#1E5B75] uppercase font-bold mb-1">GIS TOPOLOGY VALIDATOR</div>
            <div className="text-sm font-bold text-[#1E1B18]">ST_Overlaps, Micro-Slivers & Gap Cleansing</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#DFCDBA] text-center">
            <div className="text-xs font-mono text-[#2D6A4F] uppercase font-bold mb-1">SURVEYOR VERIFICATION</div>
            <div className="text-sm font-bold text-[#1E1B18]">WebGIS Review & Mobile dGPS Ground-Truthing</div>
          </div>
        </div>

        <div className="flex justify-center text-[#C46824]">
          <ArrowDown className="w-5 h-5" />
        </div>

        {/* Row 5: Certified Export */}
        <div className="p-4 rounded-2xl bg-[#FAF0E4] border border-[#DFCDBA] text-center shadow-md">
          <div className="text-xs font-mono text-[#8C4615] uppercase font-bold mb-1">LEGALLY CERTIFIED OUTPUT</div>
          <div className="text-sm font-bold text-[#1E1B18]">Official Cadastral Survey Summary PDF & OGC GeoJSON Package</div>
        </div>

      </div>

    </section>
  );
};
