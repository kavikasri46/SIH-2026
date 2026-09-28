import React from 'react';
import { ShieldCheck, CheckCircle2, UserCheck, Edit3, MapPin } from 'lucide-react';

export const HumanVerificationSection: React.FC = () => {
  const lifecycleStages = [
    {
      id: 'AI_GENERATED',
      badge: 'AI_GENERATED',
      title: 'Inferred Candidate',
      description: 'Raw deep learning polygon extraction produced by SegFormer/U-Net models.',
      color: 'text-[#8C4615]',
      bg: 'bg-[#FAF0E4]',
      border: 'border-[#DFCDBA]',
      icon: ShieldCheck,
    },
    {
      id: 'HUMAN_EDITED',
      badge: 'HUMAN_EDITED',
      title: 'Surveyor Adjustment',
      description: 'Licensed surveyor adjusts vertices or aligns boundaries with physical survey markers.',
      color: 'text-[#C46824]',
      bg: 'bg-[#FAF0E4]',
      border: 'border-[#DFCDBA]',
      icon: Edit3,
    },
    {
      id: 'FIELD_VERIFIED',
      badge: 'FIELD_VERIFIED',
      title: 'Field Ground-Truthing',
      description: 'Mobile dGPS rover verification by field officers on the ground.',
      color: 'text-[#1E5B75]',
      bg: 'bg-[#E9F3F7]',
      border: 'border-[#BDDBE6]',
      icon: MapPin,
    },
    {
      id: 'APPROVED',
      badge: 'APPROVED',
      title: 'Certified Land Record',
      description: 'Final sign-off by superintending authority for official GIS export.',
      color: 'text-[#2D6A4F]',
      bg: 'bg-[#EAEFEA]',
      border: 'border-[#B9D1BE]',
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E8DFD3]">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#8C4615] font-bold uppercase tracking-wider mb-3 px-3 py-1 bg-[#F0E6D8] border border-[#DFCDBA] rounded-full">
          <UserCheck className="w-3.5 h-3.5 text-[#C46824]" />
          <span>Human-in-the-Loop Governance</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1B18] tracking-tight">
          AI Assists. Experts Verify.
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#5C5248]">
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
              className="p-6 rounded-3xl beige-card beige-card-hover flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${stage.bg} ${stage.color} ${stage.border}`}>
                    {stage.badge}
                  </span>
                  <div className={`p-2 rounded-xl ${stage.bg} border ${stage.border} ${stage.color} shadow-sm`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#1E1B18] mb-1.5">{stage.title}</h3>
                <p className="text-xs text-[#6B6054] leading-relaxed">
                  {stage.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#EFE8DC] text-[11px] font-mono text-[#8C7E70] flex items-center justify-between">
                <span>STAGE 0{idx + 1}</span>
                <span className="text-[#2D6A4F] font-semibold">Immutable Audit</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Integrity Standard Callout */}
      <div className="mt-10 p-5 rounded-2xl bg-[#FFFFFF] border border-[#DFCDBA] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-[#FAF0E4] text-[#C46824] border border-[#DFCDBA] shadow-sm">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-[#1E1B18]">Provenance & Verification Standard</div>
            <div className="text-[#6B6054] mt-0.5">Every spatial feature maintains an immutable audit record tracking author, timestamp, and verification tier.</div>
          </div>
        </div>

        <div className="text-[#8C4615] font-mono text-[11px] font-bold whitespace-nowrap bg-[#F0E6D8] px-3 py-1 rounded-lg border border-[#DFCDBA]">
          STATUS: AI_GEN | HUMAN_EDIT | FIELD_VER | APPROVED
        </div>
      </div>

    </section>
  );
};
