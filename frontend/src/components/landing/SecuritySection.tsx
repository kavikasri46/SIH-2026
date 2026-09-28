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
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-emerald-950/60">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-3">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Enterprise Integrity</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Security, Access Control & Auditability
        </h2>
        <p className="mt-3 text-sm sm:text-base text-zinc-400">
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
              className="p-6 rounded-3xl bg-[#060e0a]/90 border border-emerald-900/40 shadow-lg flex flex-col justify-between hover:border-emerald-500/40 transition-colors"
            >
              <div>
                <div className="p-3 w-fit rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-800/50 mb-4 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{feat.desc}</p>
              </div>

              <div className="mt-6 pt-3 border-t border-emerald-950 flex items-center space-x-1.5 text-xs text-emerald-400 font-mono">
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
