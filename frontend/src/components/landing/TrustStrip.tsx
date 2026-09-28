import React from 'react';
import { Scan, Layers, ShieldCheck, MapPin } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const items = [
    {
      icon: Scan,
      title: 'AI-Powered',
      subtitle: 'Image Analysis',
      accent: 'text-[#C46824]',
      bg: 'bg-[#FAF0E4]',
      border: 'border-[#DFCDBA]',
    },
    {
      icon: Layers,
      title: 'GIS-Ready',
      subtitle: 'Spatial Vectors',
      accent: 'text-[#2D6A4F]',
      bg: 'bg-[#EAEFEA]',
      border: 'border-[#B9D1BE]',
    },
    {
      icon: ShieldCheck,
      title: 'Human-in-the-Loop',
      subtitle: 'Verification',
      accent: 'text-[#1E5B75]',
      bg: 'bg-[#E9F3F7]',
      border: 'border-[#BDDBE6]',
    },
    {
      icon: MapPin,
      title: 'Field-Ready',
      subtitle: 'DGPS Workflow',
      accent: 'text-[#8C4615]',
      bg: 'bg-[#FAF0E4]',
      border: 'border-[#DFCDBA]',
    },
  ];

  return (
    <section className="border-y border-[#E8DFD3] bg-[#F4EDE2]/75 py-7 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl beige-card beige-card-hover flex items-center space-x-3.5"
            >
              <div className={`p-3 rounded-xl ${item.bg} ${item.accent} border ${item.border} flex-shrink-0 shadow-sm`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-[#1E1B18] leading-tight">{item.title}</div>
                <div className="text-xs text-[#7A6F64] mt-0.5">{item.subtitle}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
