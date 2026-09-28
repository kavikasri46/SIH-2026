import React from 'react';
import { MapPin, Satellite, Smartphone, CheckCircle2 } from 'lucide-react';

export const FieldSurveySection: React.FC = () => {
  const steps = [
    {
      icon: Smartphone,
      title: 'Office GIS Dispatch',
      description: 'Candidate parcel boundaries & discrepancy zones flagged for on-site ground-truthing.',
      color: 'text-[#C46824]',
      bg: 'bg-[#FAF0E4]',
      border: 'border-[#DFCDBA]',
    },
    {
      icon: Satellite,
      title: 'Field Survey Rover',
      description: 'Field officer connects mobile dGPS rover to record sub-centimeter geodetic beacons.',
      color: 'text-[#8C4615]',
      bg: 'bg-[#FAF0E4]',
      border: 'border-[#DFCDBA]',
    },
    {
      icon: MapPin,
      title: 'Ground-Truth Notes',
      description: 'Record physical boundary evidence, boundary stones, and parcel owner consensus.',
      color: 'text-[#1E5B75]',
      bg: 'bg-[#E9F3F7]',
      border: 'border-[#BDDBE6]',
    },
    {
      icon: CheckCircle2,
      title: 'Verified GIS Feature',
      description: 'Real-time synchronization back to central WebGIS database as FIELD_VERIFIED status.',
      color: 'text-[#2D6A4F]',
      bg: 'bg-[#EAEFEA]',
      border: 'border-[#B9D1BE]',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E8DFD3]">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#8C4615] font-bold uppercase tracking-wider mb-3 px-3 py-1 bg-[#F0E6D8] border border-[#DFCDBA] rounded-full">
          <MapPin className="w-3.5 h-3.5 text-[#C46824]" />
          <span>Field Ground-Truthing Operations</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1B18] tracking-tight">
          Seamless Field-to-Office Coordination
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#5C5248]">
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
              className="p-6 rounded-3xl beige-card beige-card-hover flex flex-col justify-between group"
            >
              <div>
                <div className={`p-3 w-fit rounded-2xl ${step.bg} border ${step.border} ${step.color} mb-5 group-hover:scale-105 transition-transform shadow-sm`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#1E1B18] mb-2">{step.title}</h3>
                <p className="text-xs text-[#6B6054] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#EFE8DC] text-[11px] font-mono text-[#C46824] font-semibold">
                STEP 0{idx + 1}
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
