import React from 'react';
import { ArrowRight, Check, ChevronDown, Sparkles } from 'lucide-react';
import { DroneScene } from './DroneScene';

interface HeroSectionProps {
  onLaunchPlatform: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onLaunchPlatform }) => {
  const scrollToWorkflow = () => {
    const element = document.getElementById('workflow-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-6 pb-10 lg:pt-10 lg:pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      
      {/* Subtle Background Emerald Grid Accent */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[320px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[280px] bg-green-500/12 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Main Split Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
        
        {/* LEFT COLUMN: Hero Copy & Actions */}
        <div className="lg:col-span-6 flex flex-col items-start text-left space-y-5">
          
          {/* Hero Badge with Subtle Pulsing Status */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#08150f] border border-emerald-500/40 shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-mono text-emerald-300 font-semibold tracking-wide uppercase drop-shadow-[0_0_6px_rgba(52,211,153,0.6)]">
              AI + GIS + Drone Intelligence
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold tracking-tight text-white leading-[1.14]">
            Turn Drone Imagery <br />
            Into{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-teal-300 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(52,211,153,0.3)]">
              Geospatial Intelligence.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
            Analyze aerial imagery, extract meaningful geographic features, generate candidate GIS boundaries, and accelerate human verification with AI-assisted geospatial workflows.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1 w-full sm:w-auto">
            <button
              onClick={onLaunchPlatform}
              className="oled-pill-green group flex items-center justify-center space-x-2 px-6 py-3.5 rounded-2xl text-white font-bold text-sm shadow-xl shadow-emerald-950 transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
            >
              <span>Launch Platform</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={scrollToWorkflow}
              className="flex items-center justify-center space-x-2 px-6 py-3.5 rounded-2xl bg-[#08150f] hover:bg-emerald-950/60 text-slate-200 font-semibold text-sm border border-emerald-900/60 transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
            >
              <span>Explore How It Works</span>
            </button>
          </div>

          {/* Trust Checkmarks */}
          <div className="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full border-t border-emerald-950 text-xs font-medium text-slate-300">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                <Check className="w-3 h-3" />
              </div>
              <span>AI-assisted analysis</span>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-green-950 border border-green-500/50 flex items-center justify-center text-green-400">
                <Check className="w-3 h-3" />
              </div>
              <span>GIS-ready outputs</span>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-teal-950 border border-teal-500/50 flex items-center justify-center text-teal-400">
                <Check className="w-3 h-3" />
              </div>
              <span>Human verification</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Drone & GIS Map Visualization */}
        <div className="lg:col-span-6 flex items-center justify-center w-full">
          <DroneScene />
        </div>

      </div>

      {/* Bottom Scroll Indicator */}
      <div className="mt-8 flex flex-col items-center justify-center text-center">
        <button
          onClick={scrollToWorkflow}
          className="group flex flex-col items-center space-y-1 text-xs text-slate-400 hover:text-emerald-400 transition-colors focus:outline-none"
        >
          <span className="font-mono text-[10px] tracking-wider uppercase">Explore the workflow</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </div>

    </section>
  );
};
