import React from 'react';
import { ShieldCheck, Lock, UserCheck, FileCheck, CheckCircle2 } from 'lucide-react';

export const SecuritySection: React.FC = () => {
  const securityFeatures = [
    {
      icon: UserCheck,
      title: 'Role-Based Access Control (RBAC)',
      desc: 'Granular role segmentation for System Administrators, Senior Surveyors, GIS Analysts, and Field Officers.',
    },
    {
      icon: Lock,
      title: 'Secure Token Authentication',
      desc: 'JWT-based session authentication guarding all imagery upload, AI pipeline, and polygon editing endpoints.',
    },
    {
      icon: FileCheck,
      title: 'Immutable Feature Provenance',
      desc: 'Permanent audit logs attached to every vertex update, noting surveyor identity and cryptographic timestamp.',
    },
    {
      icon: ShieldCheck,
      title: 'OGC Spatial Geometry Standards',
      desc: 'Strict validation against invalid geometries, self-intersections, sliver gaps, and multi-polygon distortions.',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E8DFD3]">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#8C4615] font-bold uppercase tracking-wider mb-3 px-3 py-1 bg-[#F0E6D8] border border-[#DFCDBA] rounded-full">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C46824]" />
          <span>Enterprise Integrity</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1B18] tracking-tight">
          Security, Access Control & Auditability
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#5C5248]">
          Engineered for government cadastral records management with strict role demarcation and immutable provenance.
        </p>
      </div>

      {/* Security Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {securityFeatures.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-3xl beige-card beige-card-hover flex flex-col justify-between group"
            >
              <div>
                <div className="p-3 w-fit rounded-2xl bg-[#FAF0E4] text-[#C46824] border border-[#DFCDBA] mb-4 shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#1E1B18] mb-2">{feat.title}</h3>
                <p className="text-xs text-[#6B6054] leading-relaxed">{feat.desc}</p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#EFE8DC] flex items-center space-x-1.5 text-xs text-[#2D6A4F] font-mono font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Enforced</span>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
