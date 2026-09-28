import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';

interface CTASectionProps {
  onLaunchPlatform: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onLaunchPlatform }) => {
  const scrollToWorkflow = () => {
    const element = document.getElementById('workflow-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E8DFD3]">
      <div className="relative rounded-3xl bg-gradient-to-r from-[#F4EDE2] via-[#FAF6F0] to-[#F4EDE2] border-2 border-[#DFCDBA] p-8 sm:p-14 text-center overflow-hidden shadow-xl">
        
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#E8DAC5]/50 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-3xl mx-auto space-y-6">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#FFFFFF] border border-[#DFCDBA] text-[#8C4615] text-xs font-mono font-bold shadow-sm">
            <Compass className="w-3.5 h-3.5 text-[#C46824]" />
            <span>Ready for Deployment</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E1B18] tracking-tight leading-tight">
            Start With Your Drone Imagery.
          </h2>

          <p className="text-sm sm:text-base text-[#5C5248] max-w-2xl mx-auto leading-relaxed">
            Upload aerial imagery, analyze geographic features, and review AI-assisted GIS outputs in one streamlined, surveyor-validated workflow.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onLaunchPlatform}
              className="beige-pill-primary group flex items-center space-x-2 px-7 py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>Launch Platform</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-[#E59858]" />
            </button>

            <button
              onClick={scrollToWorkflow}
              className="beige-pill-secondary px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              View Workflow
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
