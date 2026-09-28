import React from 'react';
import { Layers, Server, Cpu, Database, Box } from 'lucide-react';

export const TechnologySection: React.FC = () => {
  const techCategories = [
    {
      category: 'Frontend & WebGIS',
      icon: Layers,
      color: 'text-emerald-400',
      technologies: [
        { name: 'React 19', desc: 'Modern component runtime' },
        { name: 'TypeScript', desc: 'Strict type safety' },
        { name: 'Tailwind CSS', desc: 'Utility styling & tokens' },
        { name: 'MapLibre GL', desc: 'Hardware-accelerated WebGL map' },
      ],
    },
    {
      category: 'Backend & Gateway',
      icon: Server,
      color: 'text-green-400',
      technologies: [
        { name: 'Node.js & Express', desc: 'High-throughput REST API' },
        { name: 'TypeScript', desc: 'Typed domain models' },
        { name: 'JWT Security', desc: 'Role-based token auth' },
        { name: 'Multer & FS', desc: 'Large raster stream handler' },
      ],
    },
    {
      category: 'AI & Computer Vision',
      icon: Cpu,
      color: 'text-emerald-300',
      technologies: [
        { name: 'PyTorch 2.2+', desc: 'Deep learning inference' },
        { name: 'SegFormer-B0', desc: 'Transformer segmentation' },
        { name: 'ResNet34-UNet', desc: 'Building footprint model' },
        { name: 'Rasterio & GDAL', desc: 'Spatial raster windowing' },
      ],
    },
    {
      category: 'GIS & Spatial Engine',
      icon: Database,
      color: 'text-teal-400',
      technologies: [
        { name: 'PostGIS / Shapely', desc: 'Planar spatial geometry' },
        { name: 'OGC GeoJSON', desc: 'Standard vector exchange' },
        { name: 'ST_Overlaps', desc: 'Automated topology engine' },
        { name: 'jsPDF Autotable', desc: 'Certified PDF generation' },
      ],
    },
  ];

  return (
    <section id="technology-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-emerald-950">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-3">
          <Box className="w-4 h-4 text-emerald-400" />
          <span>Production Architecture</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Enterprise Technology Stack
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-300">
          Built on proven, production-grade geospatial and deep learning foundations adhering to OGC standards.
        </p>
      </div>

      {/* 4 Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {techCategories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-3xl oled-card flex flex-col justify-between shadow-lg hover:border-emerald-500/50 transition-all hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center space-x-3 mb-5">
                  <div className={`p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800/60 ${cat.color} shadow-[0_0_10px_rgba(52,211,153,0.15)]`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white">{cat.category}</h3>
                </div>

                <div className="space-y-3">
                  {cat.technologies.map((t, tIdx) => (
                    <div key={tIdx} className="p-3 rounded-xl bg-[#08150f] border border-emerald-950">
                      <div className="text-xs font-bold text-emerald-300 font-mono">{t.name}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{t.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-emerald-950 text-[10px] font-mono text-emerald-400 font-semibold uppercase">
                ACTIVE COMPONENT
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
