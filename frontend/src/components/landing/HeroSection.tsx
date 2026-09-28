import React from 'react';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
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
      
      {/* Subtle Background Warm Radial Accents */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[320px] bg-[#E8DAC5]/40 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[280px] bg-[#F2E0CD]/35 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Main Split Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
        
        {/* LEFT COLUMN: Hero Copy & Actions */}
        <div className="lg:col-span-6 flex flex-col items-start text-left space-y-5">
          
          {/* Hero Badge with Subtle Pulsing Status */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#DFCDBA] shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C46824] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C46824]" />
            </span>
            <span className="text-[11px] font-mono text-[#8C4615] font-bold tracking-wide uppercase">
              AI + GIS + Drone Intelligence
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold tracking-tight text-[#1E1B18] leading-[1.14]">
            Turn Drone Imagery <br />
            Into{' '}
            <span className="bg-gradient-to-r from-[#C46824] via-[#B85D1B] to-[#94420D] bg-clip-text text-transparent">
              Geospatial Intelligence.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#5C5248] max-w-xl leading-relaxed">
            Analyze aerial imagery, extract meaningful geographic features, generate candidate GIS boundaries, and accelerate human verification with AI-assisted geospatial workflows.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1 w-full sm:w-auto">
            <button
              onClick={onLaunchPlatform}
              className="beige-pill-primary group flex items-center justify-center space-x-2 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
            >
              <span>Launch Platform</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-[#E59858]" />
            </button>

            <button
              onClick={scrollToWorkflow}
              className="beige-pill-secondary flex items-center justify-center space-x-2 px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
            >
              <span>Explore How It Works</span>
            </button>
          </div>

          {/* Trust Checkmarks */}
          <div className="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full border-t border-[#E5DDD0] text-xs font-semibold text-[#5C5248]">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-[#FAF0E4] border border-[#DFCDBA] flex items-center justify-center text-[#A65319]">
                <Check className="w-3 h-3" />
              </div>
              <span>AI-assisted analysis</span>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-[#EAEFEA] border border-[#B9D1BE] flex items-center justify-center text-[#2D6A4F]">
                <Check className="w-3 h-3" />
              </div>
              <span>GIS-ready outputs</span>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-[#FAF0E4] border border-[#DFCDBA] flex items-center justify-center text-[#A65319]">
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
          className="group flex flex-col items-center space-y-1 text-xs text-[#8C7E70] hover:text-[#C46824] transition-colors focus:outline-none"
        >
          <span className="font-mono text-[10px] tracking-wider uppercase">Explore the workflow</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </div>

    </section>
  );
};
