import React from 'react';
import { ArrowDown, Clock, AlertTriangle, Sparkles } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const traditionalSteps = [
    'Drone Images Ingestion',
    'Manual Visual Inspection',
    'Manual Vertex Digitization',
    'Ad-hoc GIS Editing',
    'Manual Validation',
    'Static Survey Reports',
  ];

  const aiAssistedSteps = [
    'Drone Images Ingestion',
    'AI Deep Learning Analysis',
    'Automated Feature Extraction',
    'GIS Vectorization Engine',
    'Topology Quality Validation',
    'Human Expert Verification',
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#8C4615] font-bold uppercase tracking-wider mb-3 px-3 py-1 bg-[#F0E6D8] border border-[#DFCDBA] rounded-full">
          <Clock className="w-3.5 h-3.5 text-[#C46824]" />
          <span>Workflow Evolution</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1B18] tracking-tight">
          From Manual Processing to AI-Assisted Mapping
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#5C5248] leading-relaxed">
          Traditional urban parcel digitization requires exhaustive manual tracing. Our platform introduces deep learning automation to extract candidate features and accelerate expert verification.
        </p>
      </div>

      {/* Comparison Grid: Traditional vs AI-Assisted */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
        
        {/* LEFT: Traditional Workflow */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#E5DDD0] shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#EFE8DC]">
              <div>
                <span className="text-xs font-mono text-[#B93826] uppercase font-bold tracking-wider">
                  Bottlenecked Approach
                </span>
                <h3 className="text-xl font-bold text-[#1E1B18] mt-1">Traditional Workflow</h3>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FDEAE8] text-[#B93826] border border-[#F5C2BC]">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>

            {/* Step sequence */}
            <div className="space-y-3">
              {traditionalSteps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className="p-3.5 rounded-xl bg-[#FBF8F3] border border-[#EFE8DC] text-xs sm:text-sm font-medium text-[#5C5248] flex items-center justify-between">
                    <span className="flex items-center space-x-3">
                      <span className="w-6 h-6 rounded-full bg-[#EFE8DC] text-[#7A6F64] font-mono text-xs flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </span>
                    <span className="text-[11px] font-mono text-[#A09384]">Manual</span>
                  </div>
                  {idx < traditionalSteps.length - 1 && (
                    <div className="flex justify-center my-1 text-[#C4B7A6]">
                      <ArrowDown className="w-4 h-4" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#EFE8DC] text-xs text-[#7A6F64] flex items-center justify-between">
            <span>High latency per hectare</span>
            <span className="text-[#B93826] font-mono font-semibold">Repetitive tracing</span>
          </div>
        </div>

        {/* RIGHT: AI-Assisted Workflow */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#FFFDF9] to-[#FBF6EE] border-2 border-[#D97D34]/50 shadow-xl flex flex-col justify-between ring-1 ring-[#C46824]/10">
          <div>
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#EFE3D3]">
              <div>
                <span className="text-xs font-mono text-[#8C4615] uppercase font-bold tracking-wider">
                  Next-Gen Intelligence
                </span>
                <h3 className="text-xl font-bold text-[#1E1B18] mt-1">AI-Assisted Workflow</h3>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF0E4] text-[#C46824] border border-[#DFCDBA] shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>

            {/* Step sequence */}
            <div className="space-y-3">
              {aiAssistedSteps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E8DEC $\rightarrow$ #E5DACB] border-[#DFCDBA] hover:border-[#C46824]/60 text-xs sm:text-sm font-medium text-[#1E1B18] flex items-center justify-between transition-colors shadow-sm">
                    <span className="flex items-center space-x-3">
                      <span className="w-6 h-6 rounded-full bg-[#FAF0E4] text-[#8C4615] font-mono text-xs flex items-center justify-center font-bold border border-[#DFCDBA]">
                        {idx + 1}
                      </span>
                      <span className="font-semibold">{step}</span>
                    </span>
                    <span className="text-[11px] font-mono font-bold text-[#C46824]">
                      {idx === 5 ? 'Expert Gate' : 'Automated'}
                    </span>
                  </div>
                  {idx < aiAssistedSteps.length - 1 && (
                    <div className="flex justify-center my-1 text-[#D97D34]">
                      <ArrowDown className="w-4 h-4" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#EFE3D3] text-xs text-[#5C5248] flex items-center justify-between">
            <span>Fast candidate generation</span>
            <span className="text-[#C46824] font-mono font-semibold">Human-governed</span>
          </div>
        </div>

      </div>

    </section>
  );
};
