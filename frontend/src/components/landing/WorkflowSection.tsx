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
      color: 'text-[#C46824]',
      bg: 'bg-[#FAF0E4]',
      border: 'border-[#DFCDBA]',
    },
    {
      num: '02',
      title: 'PREPROCESS',
      subtitle: 'Geospatial Prep',
      description: 'Tile raster into 512x512 windows, normalize multi-band channels.',
      icon: Sliders,
      color: 'text-[#8C4615]',
      bg: 'bg-[#FAF0E4]',
      border: 'border-[#DFCDBA]',
    },
    {
      num: '03',
      title: 'AI ANALYSIS',
      subtitle: 'Deep Learning',
      description: 'Run semantic segmentation models to extract feature masks.',
      icon: Cpu,
      color: 'text-[#C46824]',
      bg: 'bg-[#FAF0E4]',
      border: 'border-[#DFCDBA]',
    },
    {
      num: '04',
      title: 'VECTORIZE',
      subtitle: 'GIS Features',
      description: 'Polygonize contours into GeoJSON candidate boundaries.',
      icon: Layers,
      color: 'text-[#1E5B75]',
      bg: 'bg-[#E9F3F7]',
      border: 'border-[#BDDBE6]',
    },
    {
      num: '05',
      title: 'VALIDATE',
      subtitle: 'Topology Checks',
      description: 'Execute OGC spatial difference and overlap integrity rules.',
      icon: ShieldCheck,
      color: 'text-[#2D6A4F]',
      bg: 'bg-[#EAEFEA]',
      border: 'border-[#B9D1BE]',
    },
    {
      num: '06',
      title: 'VERIFY',
      subtitle: 'Human Review',
      description: 'Surveyor and field officer ground-truth inspection and sign-off.',
      icon: BadgeCheck,
      color: 'text-[#2D6A4F]',
      bg: 'bg-[#EAEFEA]',
      border: 'border-[#B9D1BE]',
    },
  ];

  return (
    <section id="workflow-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E8DFD3]">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#8C4615] font-bold uppercase tracking-wider mb-3 px-3 py-1 bg-[#F0E6D8] border border-[#DFCDBA] rounded-full">
          <BadgeCheck className="w-3.5 h-3.5 text-[#C46824]" />
          <span>Sequential Processing Pipeline</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1B18] tracking-tight">
          How Aerial Imagery Becomes Verified GIS Data
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#5C5248]">
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
              className="p-5 rounded-2xl beige-card beige-card-hover flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[#8C7E70] group-hover:text-[#C46824]">
                    {step.num}
                  </span>
                  <div className={`p-2 rounded-xl ${step.bg} ${step.color} border ${step.border} shadow-sm`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="text-xs font-mono font-bold tracking-wider text-[#1E1B18] uppercase">{step.title}</div>
                <div className="text-xs text-[#7A6F64] font-medium mt-0.5 mb-2">{step.subtitle}</div>
                <p className="text-[11px] text-[#6B6054] leading-relaxed">
                  {step.description}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-[#C4B7A6] pointer-events-none">
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
