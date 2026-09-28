import React from 'react';
import { ShieldCheck, ArrowRight, CheckCircle2, UserCheck, Edit3, MapPin } from 'lucide-react';

export const HumanVerificationSection: React.FC = () => {
  const lifecycleStages = [
    {
      id: 'AI_GENERATED',
      badge: 'AI_GENERATED',
      title: 'Inferred Candidate',
      description: 'Raw deep learning polygon extraction produced by SegFormer/U-Net models.',
      color: 'text-emerald-300',
      bg: 'bg-emerald-950/80',
      border: 'border-emerald-700/60',
      icon: ShieldCheck,
    },
    {
      id: 'HUMAN_EDITED',
      badge: 'HUMAN_EDITED',
      title: 'Surveyor Adjustment',
      description: 'Licensed surveyor adjusts vertices or aligns boundaries with physical survey markers.',
      color: 'text-green-300',
      bg: 'bg-green-950/80',
      border: 'border-green-700/60',
      icon: Edit3,
    },
    {
      id: 'FIELD_VERIFIED',
      badge: 'FIELD_VERIFIED',
      title: 'Field Ground-Truthing',
      description: 'Mobile dGPS rover verification by field officers on the ground.',
      color: 'text-teal-300',
      bg: 'bg-teal-950/80',
      border: 'border-teal-700/60',
      icon: MapPin,
    },
    {
      id: 'APPROVED',
      badge: 'APPROVED',
      title: 'Certified Land Record',
      description: 'Final sign-off by superintending authority for official GIS export.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-950/80',
      border: 'border-emerald-600/60',
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-emerald-950">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-3">
          <UserCheck className="w-4 h-4 text-emerald-400" />
          <span>Human-in-the-Loop Governance</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          AI Assists. Experts Verify.
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-300">
          AI-generated features are strictly treated as candidate geometries. Authorized surveyors review, edit, and verify each feature before official project approval.
        </p>
      </div>

      {/* Lifecycle Status Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {lifecycleStages.map((stage, idx) => {
          const Icon = stage.icon;
          return (
            <div
              key={stage.id}
              className="p-6 rounded-3xl oled-card flex flex-col justify-between shadow-lg relative group hover:border-emerald-500/50 transition-all hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${stage.bg} ${stage.color} ${stage.border}`}>
                    {stage.badge}
                  </span>
                  <div className={`p-2 rounded-xl bg-emerald-950/90 border border-emerald-800/60 ${stage.color} shadow-[0_0_8px_rgba(52,211,153,0.15)]`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-1.5">{stage.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {stage.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-emerald-950 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>STAGE 0{idx + 1}</span>
                <span className="text-emerald-400 font-semibold">Immutable Audit</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Integrity Standard Callout */}
      <div className="mt-10 p-5 rounded-2xl bg-[#06100a] border border-emerald-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-700/50 shadow-[0_0_8px_rgba(52,211,153,0.2)]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-white">Provenance & Verification Standard</div>
            <div className="text-slate-400 mt-0.5">Every spatial feature maintains an immutable audit record tracking author, timestamp, and verification tier.</div>
          </div>
        </div>

        <div className="text-emerald-400 font-mono text-[11px] whitespace-nowrap">
          STATUS: AI_GEN | HUMAN_EDIT | FIELD_VER | APPROVED
        </div>
      </div>

    </section>
  );
};
