import React from 'react';
import { ArrowDown, Check, Clock, AlertTriangle, Sparkles, ArrowRight } from 'lucide-react';

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
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-3">
          <Clock className="w-4 h-4 text-emerald-400" />
          <span>Workflow Evolution</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          From Manual Processing to AI-Assisted Mapping
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
          Traditional urban parcel digitization requires exhaustive manual tracing. Our platform introduces deep learning automation to extract candidate features and accelerate expert verification.
        </p>
      </div>

      {/* Comparison Grid: Traditional vs AI-Assisted */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
        
        {/* LEFT: Traditional Workflow */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#080f0b]/80 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-rose-400 uppercase font-bold tracking-wider">
                  Bottlenecked Approach
                </span>
                <h3 className="text-xl font-bold text-white mt-1">Traditional Workflow</h3>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-950/60 text-rose-400 border border-rose-800/40">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>

            {/* Step sequence */}
            <div className="space-y-3">
              {traditionalSteps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className="p-3.5 rounded-xl bg-[#0b140f]/90 border border-slate-800/80 text-xs sm:text-sm font-medium text-slate-300 flex items-center justify-between">
                    <span className="flex items-center space-x-3">
                      <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 font-mono text-xs flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">Manual</span>
                  </div>
                  {idx < traditionalSteps.length - 1 && (
                    <div className="flex justify-center my-1 text-slate-700">
                      <ArrowDown className="w-4 h-4" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
            <span>High latency per hectare</span>
            <span className="text-rose-400 font-mono font-semibold">Repetitive tracing</span>
          </div>
        </div>

        {/* RIGHT: AI-Assisted Workflow */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0e2417] to-[#07130c] border border-emerald-500/40 shadow-2xl flex flex-col justify-between ring-1 ring-emerald-500/20">
          <div>
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-emerald-800/60">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase font-bold tracking-wider">
                  Next-Gen Intelligence
                </span>
                <h3 className="text-xl font-bold text-white mt-1">AI-Assisted Workflow</h3>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-600/60 shadow-[0_0_12px_rgba(52,211,153,0.3)]">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>

            {/* Step sequence */}
            <div className="space-y-3">
              {aiAssistedSteps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className="p-3.5 rounded-xl bg-[#08150f] border border-emerald-900/50 hover:border-emerald-500/40 text-xs sm:text-sm font-medium text-white flex items-center justify-between transition-colors shadow-sm">
                    <span className="flex items-center space-x-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-900/80 text-emerald-300 font-mono text-xs flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <span className="font-semibold">{step}</span>
                    </span>
                    <span className="text-[11px] font-mono font-bold text-emerald-400">
                      {idx === 5 ? 'Expert Gate' : 'Automated'}
                    </span>
                  </div>
                  {idx < aiAssistedSteps.length - 1 && (
                    <div className="flex justify-center my-1 text-emerald-500/60">
                      <ArrowDown className="w-4 h-4" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-emerald-800/80 text-xs text-slate-300 flex items-center justify-between">
            <span>Fast candidate generation</span>
            <span className="text-emerald-400 font-mono font-semibold">Human-governed</span>
          </div>
        </div>

      </div>

    </section>
  );
};
