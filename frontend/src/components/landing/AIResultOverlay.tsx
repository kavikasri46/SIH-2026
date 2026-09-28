import React from 'react';
import { Sparkles, CheckCircle2, AlertCircle, Layers } from 'lucide-react';

interface AIResultOverlayProps {
  currentStage?: 'SCAN' | 'BUILDINGS' | 'ROADS' | 'PARCELS' | 'READY';
}

export const AIResultOverlay: React.FC<AIResultOverlayProps> = ({ currentStage = 'READY' }) => {
  return (
    <div className="absolute top-4 right-4 z-20 w-52 sm:w-56 rounded-2xl bg-[#060e0a]/95 border border-emerald-900/60 backdrop-blur-md p-3.5 shadow-2xl text-xs font-mono select-none">
      
      {/* Header with Demo Visualization Badge */}
      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-emerald-950">
        <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI ANALYSIS</span>
        </div>
        <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/50">
          DEMO
        </span>
      </div>

      {/* Structured Status Items */}
      <div className="space-y-2 text-[11px]">
        
        {/* Imagery Status */}
        <div className="flex items-center justify-between">
          <span className="text-zinc-400 font-sans">Imagery</span>
          <span className="text-emerald-400 font-semibold flex items-center space-x-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>READY</span>
          </span>
        </div>

        {/* Features Detected */}
        <div className="pt-1">
          <div className="text-zinc-400 font-sans mb-1">Features Detected:</div>
          <div className="flex flex-wrap gap-1">
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-sans transition-colors ${
              currentStage === 'BUILDINGS' || currentStage === 'PARCELS' || currentStage === 'READY'
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60'
                : 'bg-zinc-900 text-zinc-600 border border-zinc-800'
            }`}>
              Buildings
            </span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-sans transition-colors ${
              currentStage === 'ROADS' || currentStage === 'PARCELS' || currentStage === 'READY'
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60'
                : 'bg-zinc-900 text-zinc-600 border border-zinc-800'
            }`}>
              Roads
            </span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-sans transition-colors ${
              currentStage === 'PARCELS' || currentStage === 'READY'
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60'
                : 'bg-zinc-900 text-zinc-600 border border-zinc-800'
            }`}>
              Land Cover
            </span>
          </div>
        </div>

        {/* GIS Processing */}
        <div className="flex items-center justify-between pt-1 border-t border-emerald-950">
          <span className="text-zinc-400 font-sans">GIS Processing</span>
          <span className="text-emerald-400 font-semibold flex items-center space-x-1">
            <Layers className="w-3 h-3" />
            <span>READY</span>
          </span>
        </div>

        {/* Human Verification Requirement */}
        <div className="flex items-center justify-between pt-0.5">
          <span className="text-zinc-400 font-sans">Verification</span>
          <span className="text-emerald-300 font-semibold flex items-center space-x-1">
            <AlertCircle className="w-3 h-3" />
            <span>REQUIRED</span>
          </span>
        </div>

      </div>

    </div>
  );
};
