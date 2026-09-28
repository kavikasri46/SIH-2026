import React, { useState } from 'react';
import { Cpu, Sliders, Sparkles } from 'lucide-react';

export const AISection: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <section id="ai-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E8DFD3]">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#8C4615] font-bold uppercase tracking-wider mb-3 px-3 py-1 bg-[#F0E6D8] border border-[#DFCDBA] rounded-full">
          <Cpu className="w-3.5 h-3.5 text-[#C46824]" />
          <span>Deep Learning Segmentation</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1B18] tracking-tight">
          AI That Understands Aerial Imagery
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#5C5248]">
          Deep learning models analyze aerial imagery to identify visible geographic features and produce candidate spatial features for GIS workflows.
        </p>
      </div>

      {/* Two-Column AI Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: AI Pipeline Flow & Models */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl beige-card space-y-4">
            <h3 className="text-base font-bold text-[#1E1B18] flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#C46824]" />
              <span>Implemented Model Architectures</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#DFCDBA]">
                <div className="font-bold text-[#8C4615] font-mono">SegFormer-B0 Transformer</div>
                <div className="text-[#6B6054] mt-1 leading-relaxed">
                  Hierarchical transformer encoder with lightweight all-MLP decoder for efficient urban parcel semantic segmentation.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#DFCDBA]">
                <div className="font-bold text-[#2D6A4F] font-mono">ResNet34-UNet Backbone</div>
                <div className="text-[#6B6054] mt-1 leading-relaxed">
                  Encoder-decoder CNN architecture tailored for sharp building footprint boundary extraction and road centerline tracking.
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#EFE8DC] text-[11px] text-[#8C7E70] font-mono">
              Input: 512x512 Window Tiling • Output: Multi-class Vector Masks
            </div>
          </div>
        </div>

        {/* Right Column: Draggable Comparison Slider */}
        <div className="lg:col-span-7 space-y-3">
          
          <div className="flex items-center justify-between px-2 text-xs font-mono text-[#7A6F64]">
            <span className="text-[#1E1B18] font-semibold">Visual Comparison</span>
            <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-[#F0E6D8] text-[#8C4615] border border-[#DFCDBA] font-bold">
              Illustrative AI visualization
            </span>
          </div>

          <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden border border-[#DFCDBA] bg-[#2A241F] shadow-xl select-none">
            
            {/* Background Layer: Extracted Cadastral Map */}
            <img
              src="/images/orthomosaic-sample.jpg"
              alt="AI Extracted Cadastral Features"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Foreground Layer: Clipped Raw Drone Orthomosaic */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-[#C46824] shadow-2xl"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src="/images/orthomosaic-sample.jpg"
                alt="Raw Aerial Drone Imagery"
                className="absolute inset-0 w-full h-full object-cover filter contrast-125 saturate-50 brightness-90"
                style={{ width: '100%', minWidth: '100%', maxWidth: 'none' }}
              />
              
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-[#1E1B18]/90 border border-[#4E453C] text-xs font-mono text-[#FAF6F0] font-bold backdrop-blur-md shadow-md">
                ORIGINAL IMAGERY
              </div>
            </div>

            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-[#FAF0E4]/95 border border-[#DFCDBA] text-xs font-mono text-[#8C4615] font-bold backdrop-blur-md shadow-md">
              AI SEGMENTATION
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-9 h-9 rounded-full bg-[#C46824] border-2 border-white shadow-xl flex items-center justify-center text-white font-bold">
                <Sliders className="w-4 h-4 text-white" />
              </div>
            </div>

          </div>

          {/* Slider Controls */}
          <div className="flex items-center justify-center space-x-4 pt-2">
            <span className="text-xs font-mono text-[#7A6F64]">Slide to compare layers:</span>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="w-48 accent-[#C46824] cursor-pointer"
            />
          </div>

        </div>

      </div>

    </section>
  );
};
