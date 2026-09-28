import React from 'react';
import { Upload, Sliders, Cpu, Layers, ShieldCheck, BadgeCheck, ArrowRight } from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'UPLOAD',
      subtitle: 'Drone Imagery',
      description: 'Ingest raw high-resolution UAV orthomosaics and spatial rasters.',
      icon: Upload,
      color: 'text-emerald-400',
    },
    {
      num: '02',
      title: 'PREPROCESS',
      subtitle: 'Geospatial Prep',
      description: 'Tile raster into 512x512 windows, normalize multi-band channels.',
      icon: Sliders,
      color: 'text-green-400',
    },
    {
      num: '03',
      title: 'AI ANALYSIS',
      subtitle: 'Deep Learning',
      description: 'Run semantic segmentation models to extract feature masks.',
      icon: Cpu,
      color: 'text-emerald-300',
    },
    {
      num: '04',
      title: 'VECTORIZE',
      subtitle: 'GIS Features',
      description: 'Polygonize contours into GeoJSON candidate boundaries.',
      icon: Layers,
      color: 'text-teal-400',
    },
    {
      num: '05',
      title: 'VALIDATE',
      subtitle: 'Topology Checks',
      description: 'Execute OGC spatial difference and overlap integrity rules.',
      icon: ShieldCheck,
      color: 'text-green-300',
    },
    {
      num: '06',
      title: 'VERIFY',
      subtitle: 'Human Review',
      description: 'Surveyor and field officer ground-truth inspection and sign-off.',
      icon: BadgeCheck,
      color: 'text-emerald-400',
    },
  ];

  return (
    <section id="workflow-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-emerald-950">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-3">
          <BadgeCheck className="w-4 h-4 text-emerald-400" />
          <span>Sequential Processing Pipeline</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          How Aerial Imagery Becomes Verified GIS Data
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-300">
          A systematic six-stage pipeline bridging raw drone collection with official surveyor governance.
        </p>
      </div>

      {/* 6-Stage Workflow Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl oled-card hover:border-emerald-500/50 transition-all hover:-translate-y-1 shadow-md flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-emerald-400">
                    {step.num}
                  </span>
                  <div className={`p-2 rounded-xl bg-emerald-950/80 border border-emerald-800/60 ${step.color} shadow-[0_0_8px_rgba(52,211,153,0.15)]`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="text-xs font-mono font-bold tracking-wider text-white uppercase">{step.title}</div>
                <div className="text-xs text-slate-400 font-medium mt-0.5 mb-2">{step.subtitle}</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-emerald-900 pointer-events-none">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
};
