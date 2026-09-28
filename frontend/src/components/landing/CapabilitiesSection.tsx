import React from 'react';
import { Camera, Scan, Building2, Route, Layers, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const CapabilitiesSection: React.FC = () => {
  const capabilities = [
    {
      icon: Camera,
      title: 'Drone Imagery',
      description: 'Upload and process high-resolution aerial imagery, orthomosaics, and tiled rasters in standard geospatial formats.',
      accent: 'text-emerald-400',
      bg: 'bg-emerald-950/80',
      border: 'border-emerald-700/50',
    },
    {
      icon: Scan,
      title: 'AI Image Analysis',
      description: 'Extract meaningful visual features from imagery using trained deep learning semantic segmentation architectures.',
      accent: 'text-green-400',
      bg: 'bg-green-950/80',
      border: 'border-green-700/50',
    },
    {
      icon: Building2,
      title: 'Building Extraction',
      description: 'Generate building footprint candidates from imagery to calculate rooftop dimensions and structural density.',
      accent: 'text-emerald-300',
      bg: 'bg-emerald-950/80',
      border: 'border-emerald-700/50',
    },
    {
      icon: Route,
      title: 'Road Extraction',
      description: 'Identify road networks and transportation corridors to delineate physical setback clearances.',
      accent: 'text-teal-400',
      bg: 'bg-teal-950/80',
      border: 'border-teal-700/50',
    },
    {
      icon: Layers,
      title: 'GIS Processing',
      description: 'Convert detected raster contours into spatially structured vector polygons, topology rules, and GeoJSON layers.',
      accent: 'text-green-300',
      bg: 'bg-green-950/80',
      border: 'border-green-700/50',
    },
    {
      icon: ShieldCheck,
      title: 'Human Verification',
      description: 'Review, edit, and verify AI-generated candidate features with surveyor inspection workflows before final approval.',
      accent: 'text-emerald-400',
      bg: 'bg-emerald-950/80',
      border: 'border-emerald-700/50',
    },
  ];

  return (
    <section id="capabilities-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-emerald-950">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-3">
          <Layers className="w-4 h-4 text-emerald-400" />
          <span>Core Capabilities</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          End-to-End Geospatial Intelligence Architecture
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-300">
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
              className="p-6 sm:p-7 rounded-3xl oled-card hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-2xl flex flex-col justify-between group"
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl ${cap.bg} ${cap.accent} border ${cap.border} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(52,211,153,0.2)]`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{cap.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {cap.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-950 flex items-center justify-between text-xs font-mono text-slate-400">
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
