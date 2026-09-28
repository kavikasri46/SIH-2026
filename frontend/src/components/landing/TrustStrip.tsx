import React from 'react';
import { Scan, Layers, ShieldCheck, MapPin } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const items = [
    {
      icon: Scan,
      title: 'AI-Powered',
      subtitle: 'Image Analysis',
      accent: 'text-emerald-400',
      bg: 'bg-emerald-950/80',
      border: 'border-emerald-700/50',
    },
    {
      icon: Layers,
      title: 'GIS-Ready',
      subtitle: 'Spatial Vectors',
      accent: 'text-green-400',
      bg: 'bg-green-950/80',
      border: 'border-green-700/50',
    },
    {
      icon: ShieldCheck,
      title: 'Human-in-the-Loop',
      subtitle: 'Verification',
      accent: 'text-teal-400',
      bg: 'bg-teal-950/80',
      border: 'border-teal-700/50',
    },
    {
      icon: MapPin,
      title: 'Field-Ready',
      subtitle: 'DGPS Workflow',
      accent: 'text-emerald-300',
      bg: 'bg-emerald-950/80',
      border: 'border-emerald-700/50',
    },
  ];

  return (
    <section className="border-y border-emerald-900/40 bg-[#060c08]/90 py-7 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl oled-card hover:border-emerald-500/50 flex items-center space-x-3.5 transition-all hover:-translate-y-0.5"
            >
              <div className={`p-3 rounded-xl ${item.bg} ${item.accent} border ${item.border} flex-shrink-0 shadow-[0_0_10px_rgba(52,211,153,0.15)]`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-white leading-tight">{item.title}</div>
                <div className="text-xs text-slate-400 mt-0.5">{item.subtitle}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
