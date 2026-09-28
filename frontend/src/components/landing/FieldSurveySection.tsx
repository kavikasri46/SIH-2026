import React from 'react';
import { MapPin, Satellite, Smartphone, CheckCircle2, ArrowLeftRight } from 'lucide-react';

export const FieldSurveySection: React.FC = () => {
  const steps = [
    {
      icon: Smartphone,
      title: 'Office GIS Dispatch',
      description: 'Candidate parcel boundaries & discrepancy zones flagged for on-site ground-truthing.',
      color: 'text-emerald-400',
    },
    {
      icon: Satellite,
      title: 'Field Survey Rover',
      description: 'Field officer connects mobile dGPS rover to record sub-centimeter geodetic beacons.',
      color: 'text-green-400',
    },
    {
      icon: MapPin,
      title: 'Ground-Truth Notes',
      description: 'Record physical boundary evidence, boundary stones, and parcel owner consensus.',
      color: 'text-emerald-300',
    },
    {
      icon: CheckCircle2,
      title: 'Verified GIS Feature',
      description: 'Real-time synchronization back to central WebGIS database as FIELD_VERIFIED status.',
      color: 'text-teal-400',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-emerald-950">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-3">
          <MapPin className="w-4 h-4 text-emerald-400" />
          <span>Field Ground-Truthing Operations</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Seamless Field-to-Office Coordination
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-300">
          Field verification bridges remote sensing inferences with ground realities through real-time mobile dGPS synchronization.
        </p>
      </div>

      {/* 4 Connected Cards for Field Workflow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-3xl oled-card hover:border-emerald-500/50 transition-all flex flex-col justify-between shadow-lg relative group"
            >
              <div>
                <div className={`p-3 w-fit rounded-2xl bg-emerald-950/80 border border-emerald-800/60 ${step.color} mb-5 group-hover:scale-105 transition-transform shadow-[0_0_10px_rgba(52,211,153,0.15)]`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-emerald-950 text-[11px] font-mono text-emerald-400 font-semibold">
                STEP 0{idx + 1}
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
