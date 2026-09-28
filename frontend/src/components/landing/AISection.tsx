import React, { useState } from 'react';
import { Cpu, Sliders, CheckCircle2, Sparkles, Layers } from 'lucide-react';

export const AISection: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <section id="ai-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-emerald-950">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-3">
          <Cpu className="w-4 h-4 text-emerald-400" />
          <span>Deep Learning Segmentation</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          AI That Understands Aerial Imagery
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-300">
          Deep learning models analyze aerial imagery to identify visible geographic features and produce candidate spatial features for GIS workflows.
        </p>
      </div>

      {/* Two-Column AI Showcase: Architecture Breakdown & Interactive Split Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: AI Pipeline Flow & Models */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl oled-card space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Implemented Model Architectures</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#08150f] border border-emerald-900/50">
                <div className="font-bold text-emerald-300 font-mono">SegFormer-B0 Transformer</div>
                <div className="text-slate-400 mt-1 leading-relaxed">
                  Hierarchical transformer encoder with lightweight all-MLP decoder for efficient urban parcel semantic segmentation.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#08150f] border border-emerald-900/50">
                <div className="font-bold text-green-300 font-mono">ResNet34-UNet Backbone</div>
                <div className="text-slate-400 mt-1 leading-relaxed">
                  Encoder-decoder CNN architecture tailored for sharp building footprint boundary extraction and road centerline tracking.
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-emerald-950 text-[11px] text-slate-400 font-mono">
              Input: 512x512 Window Tiling • Output: Multi-class Vector Masks
            </div>
          </div>
        </div>

        {/* Right Column: Draggable Comparison Slider */}
        <div className="lg:col-span-7 space-y-3">
          
          <div className="flex items-center justify-between px-2 text-xs font-mono text-slate-400">
            <span className="text-slate-300 font-semibold">Visual Comparison</span>
            <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/50">
              Illustrative AI visualization
            </span>
          </div>

          <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden border border-emerald-900/50 bg-black shadow-2xl select-none">
            
            {/* Background Layer: Extracted Cadastral Map */}
            <img
              src="/images/orthomosaic-sample.jpg"
              alt="AI Extracted Cadastral Features"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Foreground Layer: Clipped Raw Drone Orthomosaic */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-emerald-400 shadow-2xl"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src="/images/orthomosaic-sample.jpg"
                alt="Raw Aerial Drone Imagery"
                className="absolute inset-0 w-full h-full object-cover filter contrast-125 saturate-50 brightness-90"
                style={{ width: '100%', minWidth: '100%', maxWidth: 'none' }}
              />
              
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/80 border border-slate-700 text-xs font-mono text-white font-bold backdrop-blur-md">
                ORIGINAL IMAGERY
              </div>
            </div>

            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-emerald-950/90 border border-emerald-500 text-xs font-mono text-emerald-300 font-bold backdrop-blur-md">
              AI SEGMENTATION
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-9 h-9 rounded-full bg-emerald-500 border-2 border-white shadow-xl flex items-center justify-center text-slate-950 font-bold">
                <Sliders className="w-4 h-4 text-slate-950" />
              </div>
            </div>

          </div>

          {/* Slider Controls */}
          <div className="flex items-center justify-center space-x-4 pt-2">
            <span className="text-xs font-mono text-slate-400">Slide to compare layers:</span>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="w-48 accent-emerald-500 cursor-pointer"
            />
          </div>

        </div>

      </div>

    </section>
  );
};
