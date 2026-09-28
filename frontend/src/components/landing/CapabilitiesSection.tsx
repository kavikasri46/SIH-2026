import React from 'react';
import { Camera, Scan, Building2, Route, Layers, ShieldCheck } from 'lucide-react';

export const CapabilitiesSection: React.FC = () => {
  const capabilities = [
    {
      icon: Camera,
      title: 'Drone Imagery',
      description: 'Upload and process high-resolution aerial imagery, orthomosaics, and tiled rasters in standard geospatial formats.',
      accent: 'text-[#C46824]',
      bg: 'bg-[#FAF0E4]',
      border: 'border-[#DFCDBA]',
    },
    {
      icon: Scan,
      title: 'AI Image Analysis',
      description: 'Extract meaningful visual features from imagery using trained deep learning semantic segmentation architectures.',
      accent: 'text-[#8C4615]',
      bg: 'bg-[#FAF0E4]',
      border: 'border-[#DFCDBA]',
    },
    {
      icon: Building2,
      title: 'Building Extraction',
      description: 'Generate building footprint candidates from imagery to calculate rooftop dimensions and structural density.',
      accent: 'text-[#C46824]',
      bg: 'bg-[#FAF0E4]',
      border: 'border-[#DFCDBA]',
    },
    {
      icon: Route,
      title: 'Road Extraction',
      description: 'Identify road networks and transportation corridors to delineate physical setback clearances.',
      accent: 'text-[#2D6A4F]',
      bg: 'bg-[#EAEFEA]',
      border: 'border-[#B9D1BE]',
    },
    {
      icon: Layers,
      title: 'GIS Processing',
      description: 'Convert detected raster contours into spatially structured vector polygons, topology rules, and GeoJSON layers.',
      accent: 'text-[#1E5B75]',
      bg: 'bg-[#E9F3F7]',
      border: 'border-[#BDDBE6]',
    },
    {
      icon: ShieldCheck,
      title: 'Human Verification',
      description: 'Review, edit, and verify AI-generated candidate features with surveyor inspection workflows before final approval.',
      accent: 'text-[#2D6A4F]',
      bg: 'bg-[#EAEFEA]',
      border: 'border-[#B9D1BE]',
    },
  ];

  return (
    <section id="capabilities-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E8DFD3]">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#8C4615] font-bold uppercase tracking-wider mb-3 px-3 py-1 bg-[#F0E6D8] border border-[#DFCDBA] rounded-full">
          <Layers className="w-3.5 h-3.5 text-[#C46824]" />
          <span>Core Capabilities</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1B18] tracking-tight">
          End-to-End Geospatial Intelligence Architecture
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#5C5248]">
          Modular capabilities designed to transform raw aerial sensor data into validated, GIS-compliant spatial records.
        </p>
      </div>

      {/* 6 Capability Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {capabilities.map((cap, idx) => {
          const Icon = cap.icon;
          return (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl beige-card beige-card-hover flex flex-col justify-between group"
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl ${cap.bg} ${cap.accent} border ${cap.border} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-sm`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1E1B18] mb-2">{cap.title}</h3>
                <p className="text-xs sm:text-sm text-[#6B6054] leading-relaxed">
                  {cap.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EFE8DC] flex items-center justify-between text-xs font-mono text-[#8C7E70]">
                <span>STAGE 0{idx + 1}</span>
                <span className={`${cap.accent} font-semibold flex items-center space-x-1`}>
                  <span>Production Ready</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
