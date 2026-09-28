import React, { useState, useEffect } from 'react';
import { DroneAnimation } from './DroneAnimation';
import { AIResultOverlay } from './AIResultOverlay';
import { Building2, Route, ShieldCheck } from 'lucide-react';

export const DroneScene: React.FC = () => {
  const [activeCycleStep, setActiveCycleStep] = useState<'SCAN' | 'BUILDINGS' | 'ROADS' | 'PARCELS' | 'READY'>('READY');

  // Loop through the animation cycle: SCAN -> BUILDINGS -> ROADS -> PARCELS -> READY
  useEffect(() => {
    const cycle = ['SCAN', 'BUILDINGS', 'ROADS', 'PARCELS', 'READY'] as const;
    let stepIndex = 0;

    const interval = setInterval(() => {
      stepIndex = (stepIndex + 1) % cycle.length;
      setActiveCycleStep(cycle[stepIndex]);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full aspect-[4/3] max-w-[620px] mx-auto rounded-3xl overflow-hidden border-2 border-[#DFCDBA] bg-[#F5EFEB] shadow-xl flex items-center justify-center select-none">
      
      {/* 1. STYLIZED AERIAL GIS MAP TERRAIN BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/orthomosaic-sample.jpg"
          alt="Aerial Drone Orthomosaic Map"
          className="w-full h-full object-cover filter contrast-110 brightness-95 opacity-85"
        />

        {/* Map Warm Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0]/95 via-[#FAF6F0]/30 to-[#FAF6F0]/60" />

        {/* Topographic GIS Grid Pattern */}
        <div className="absolute inset-0 tech-grid-beige opacity-50 pointer-events-none" />

        {/* Stylized Candidate Parcel Vector Polygons */}
        <svg
          viewBox="0 0 600 450"
          className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700"
          style={{ opacity: activeCycleStep === 'PARCELS' || activeCycleStep === 'READY' ? 0.95 : 0.2 }}
        >
          {/* Candidate Parcel Boundary Grids */}
          <polygon points="40,80 180,80 180,200 40,200" stroke="#C46824" strokeWidth="2" fill="rgba(196, 104, 36, 0.12)" strokeDasharray="6 3" />
          <polygon points="190,80 320,80 320,200 190,200" stroke="#C46824" strokeWidth="2" fill="rgba(196, 104, 36, 0.12)" strokeDasharray="6 3" />
          <polygon points="330,80 460,80 460,200 330,200" stroke="#C46824" strokeWidth="2" fill="rgba(196, 104, 36, 0.12)" strokeDasharray="6 3" />
          <polygon points="470,80 580,80 580,200 470,200" stroke="#C46824" strokeWidth="2" fill="rgba(196, 104, 36, 0.12)" strokeDasharray="6 3" />

          <polygon points="40,230 180,230 180,380 40,380" stroke="#C46824" strokeWidth="2" fill="rgba(196, 104, 36, 0.12)" strokeDasharray="6 3" />
          <polygon points="190,230 320,230 320,380 190,380" stroke="#C46824" strokeWidth="2" fill="rgba(196, 104, 36, 0.12)" strokeDasharray="6 3" />
          <polygon points="330,230 460,230 460,380 330,380" stroke="#C46824" strokeWidth="2" fill="rgba(196, 104, 36, 0.12)" strokeDasharray="6 3" />
          <polygon points="470,230 580,230 580,380 470,380" stroke="#C46824" strokeWidth="2" fill="rgba(196, 104, 36, 0.12)" strokeDasharray="6 3" />

          {/* Building Footprint Candidate Polygons */}
          <polygon
            points="70,110 140,110 140,170 70,170"
            stroke="#2D6A4F"
            strokeWidth="2.5"
            fill="rgba(45, 106, 79, 0.25)"
            className={activeCycleStep === 'BUILDINGS' || activeCycleStep === 'PARCELS' || activeCycleStep === 'READY' ? 'opacity-100' : 'opacity-0'}
          />
          <polygon
            points="220,110 290,110 290,170 220,170"
            stroke="#2D6A4F"
            strokeWidth="2.5"
            fill="rgba(45, 106, 79, 0.25)"
            className={activeCycleStep === 'BUILDINGS' || activeCycleStep === 'PARCELS' || activeCycleStep === 'READY' ? 'opacity-100' : 'opacity-0'}
          />
          <polygon
            points="360,110 430,110 430,170 360,170"
            stroke="#2D6A4F"
            strokeWidth="2.5"
            fill="rgba(45, 106, 79, 0.25)"
            className={activeCycleStep === 'BUILDINGS' || activeCycleStep === 'PARCELS' || activeCycleStep === 'READY' ? 'opacity-100' : 'opacity-0'}
          />

          {/* Road Network Corridors */}
          <line
            x1="0"
            y1="215"
            x2="600"
            y2="215"
            stroke="#8C4615"
            strokeWidth="5"
            strokeDasharray="12 6"
            className={activeCycleStep === 'ROADS' || activeCycleStep === 'PARCELS' || activeCycleStep === 'READY' ? 'opacity-100' : 'opacity-0'}
          />
        </svg>

        {/* GIS Coordinate Callout Points */}
        <div className="absolute bottom-3 left-4 text-[10px] font-mono text-[#8C4615] bg-[#FFFFFF]/90 px-2.5 py-1 rounded-lg border border-[#DFCDBA] backdrop-blur-md shadow-sm">
          LAT: 25.3176° N • LON: 82.9739° E • WGS84
        </div>
      </div>

      {/* 2. CENTRAL ANIMATED DRONE */}
      <div className="relative z-10 w-full flex items-center justify-center">
        <DroneAnimation isScanning={true} />
      </div>

      {/* 3. HERO AI RESULT PANEL */}
      <AIResultOverlay currentStage={activeCycleStep} />

      {/* 4. FLOATING GIS SPEC CARDS */}
      
      {/* Top Left Floating Badge: Buildings */}
      <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-xl bg-[#FFFFFF]/95 border border-[#DFCDBA] backdrop-blur-md flex items-center space-x-2 text-xs font-mono shadow-sm">
        <div className="p-1 rounded bg-[#EAEFEA] text-[#2D6A4F] border border-[#B9D1BE]">
          <Building2 className="w-3.5 h-3.5" />
        </div>
        <div>
          <div className="text-[10px] text-[#7A6F64]">BUILDINGS</div>
          <div className="text-[11px] font-semibold text-[#1E1B18]">AI SEGMENTATION</div>
        </div>
      </div>

      {/* Bottom Left Floating Badge: Road Network */}
      <div className="absolute bottom-12 left-4 z-20 px-3 py-1.5 rounded-xl bg-[#FFFFFF]/95 border border-[#DFCDBA] backdrop-blur-md flex items-center space-x-2 text-xs font-mono shadow-sm hidden sm:flex">
        <div className="p-1 rounded bg-[#FAF0E4] text-[#8C4615] border border-[#DFCDBA]">
          <Route className="w-3.5 h-3.5" />
        </div>
        <div>
          <div className="text-[10px] text-[#7A6F64]">ROAD NETWORK</div>
          <div className="text-[11px] font-semibold text-[#1E1B18]">CORRIDOR VECTORS</div>
        </div>
      </div>

      {/* Bottom Right Floating Badge: Human Review */}
      <div className="absolute bottom-4 right-4 z-20 px-3 py-1.5 rounded-xl bg-[#FFFFFF]/95 border border-[#DFCDBA] backdrop-blur-md flex items-center space-x-2 text-xs font-mono shadow-sm">
        <div className="p-1 rounded bg-[#EAEFEA] text-[#2D6A4F] border border-[#B9D1BE]">
          <ShieldCheck className="w-3.5 h-3.5" />
        </div>
        <div>
          <div className="text-[10px] text-[#7A6F64]">GIS FEATURES</div>
          <div className="text-[11px] font-semibold text-[#2D6A4F]">SURVEYOR VERIFIED</div>
        </div>
      </div>

    </div>
  );
};
