import React from 'react';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';

interface CTASectionProps {
  onLaunchPlatform: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onLaunchPlatform }) => {
  const scrollToWorkflow = () => {
    const element = document.getElementById('workflow-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-emerald-950">
      <div className="relative rounded-3xl bg-gradient-to-r from-[#07160e] via-[#051009] to-[#030805] border border-emerald-500/40 p-8 sm:p-14 text-center overflow-hidden shadow-2xl">
        
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-3xl mx-auto space-y-6">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ready for Deployment</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Start With Your Drone Imagery.
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Upload aerial imagery, analyze geographic features, and review AI-assisted GIS outputs in one streamlined, surveyor-validated workflow.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onLaunchPlatform}
              className="oled-pill-green group flex items-center space-x-2 px-7 py-3.5 rounded-2xl text-white font-bold text-sm shadow-xl shadow-emerald-950 transition-all hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>Launch Platform</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={scrollToWorkflow}
              className="px-6 py-3.5 rounded-2xl bg-[#08150f] hover:bg-emerald-950/60 text-slate-200 font-semibold text-sm border border-emerald-900/60 transition-all"
            >
              View Workflow
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
