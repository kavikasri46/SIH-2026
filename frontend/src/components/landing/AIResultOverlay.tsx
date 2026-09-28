import React from 'react';
import { Sparkles, CheckCircle2, AlertCircle, Layers } from 'lucide-react';

interface AIResultOverlayProps {
  currentStage?: 'SCAN' | 'BUILDINGS' | 'ROADS' | 'PARCELS' | 'READY';
}

export const AIResultOverlay: React.FC<AIResultOverlayProps> = ({ currentStage = 'READY' }) => {
  return (
    <div className="absolute top-4 right-4 z-20 w-52 sm:w-56 rounded-2xl bg-[#FFFFFF]/95 border border-[#DFCDBA] backdrop-blur-md p-3.5 shadow-xl text-xs font-mono select-none">
      
      {/* Header with Demo Visualization Badge */}
      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#EFE8DC]">
        <div className="flex items-center space-x-1.5 text-[#C46824] font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI ANALYSIS</span>
        </div>
        <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#FAF0E4] text-[#8C4615] border border-[#DFCDBA] font-bold">
          DEMO
        </span>
      </div>

      {/* Structured Status Items */}
      <div className="space-y-2 text-[11px]">
        
        {/* Imagery Status */}
        <div className="flex items-center justify-between">
          <span className="text-[#6B6054] font-sans">Imagery</span>
          <span className="text-[#2D6A4F] font-bold flex items-center space-x-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>READY</span>
          </span>
        </div>

        {/* Features Detected */}
        <div className="pt-1">
          <div className="text-[#6B6054] font-sans mb-1">Features Detected:</div>
          <div className="flex flex-wrap gap-1">
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-sans transition-colors ${
              currentStage === 'BUILDINGS' || currentStage === 'PARCELS' || currentStage === 'READY'
                ? 'bg-[#FAF0E4] text-[#8C4615] border border-[#DFCDBA] font-semibold'
                : 'bg-[#F5EFEB] text-[#A09384] border border-[#E5DDD0]'
            }`}>
              Buildings
            </span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-sans transition-colors ${
              currentStage === 'ROADS' || currentStage === 'PARCELS' || currentStage === 'READY'
                ? 'bg-[#FAF0E4] text-[#8C4615] border border-[#DFCDBA] font-semibold'
                : 'bg-[#F5EFEB] text-[#A09384] border border-[#E5DDD0]'
            }`}>
              Roads
            </span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-sans transition-colors ${
              currentStage === 'PARCELS' || currentStage === 'READY'
                ? 'bg-[#FAF0E4] text-[#8C4615] border border-[#DFCDBA] font-semibold'
                : 'bg-[#F5EFEB] text-[#A09384] border border-[#E5DDD0]'
            }`}>
              Land Cover
            </span>
          </div>
        </div>

        {/* GIS Processing */}
        <div className="flex items-center justify-between pt-1 border-t border-[#EFE8DC]">
          <span className="text-[#6B6054] font-sans">GIS Processing</span>
          <span className="text-[#1E5B75] font-bold flex items-center space-x-1">
            <Layers className="w-3 h-3" />
            <span>READY</span>
          </span>
        </div>

        {/* Human Verification Requirement */}
        <div className="flex items-center justify-between pt-0.5">
          <span className="text-[#6B6054] font-sans">Verification</span>
          <span className="text-[#C46824] font-bold flex items-center space-x-1">
            <AlertCircle className="w-3 h-3" />
            <span>REQUIRED</span>
          </span>
        </div>

      </div>

    </div>
  );
};
