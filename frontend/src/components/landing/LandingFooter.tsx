import React from 'react';
import { Compass } from 'lucide-react';

interface LandingFooterProps {
  onLaunchPlatform: () => void;
  onOpenReportModal: () => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({
  onLaunchPlatform,
  onOpenReportModal,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-emerald-900/40 bg-[#040805] text-slate-400 text-xs py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
        
        {/* Brand Column (2 cols) */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-950">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-base text-white font-mono">AeroCadastre AI</span>
              <div className="text-[10px] text-emerald-400 font-mono">AI • GIS • DRONE INTELLIGENCE</div>
            </div>
          </div>

          <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
            Automated urban parcel mapping, deep learning building extraction, and OGC-compliant spatial topology validation platform.
          </p>

          <div className="text-[11px] font-mono text-slate-500">
            Autonomous Drone Geospatial Platform • Cadastral AI System
          </div>
        </div>

        {/* Column 2: Platform */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">Platform</h4>
          <ul className="space-y-2">
            <li>
              <button onClick={() => scrollTo('ai-section')} className="hover:text-emerald-300 transition-colors">
                AI Analysis
              </button>
            </li>
            <li>
              <button onClick={() => scrollTo('gis-section')} className="hover:text-emerald-300 transition-colors">
                GIS Mapping
              </button>
            </li>
            <li>
              <button onClick={() => scrollTo('workflow-section')} className="hover:text-emerald-300 transition-colors">
                Workflow
              </button>
            </li>
            <li>
              <button onClick={onOpenReportModal} className="hover:text-emerald-300 transition-colors">
                Certified Reports
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Technology */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">Technology</h4>
          <ul className="space-y-2">
            <li>
              <button onClick={() => scrollTo('technology-section')} className="hover:text-emerald-300 transition-colors">
                React 19 & MapLibre
              </button>
            </li>
            <li>
              <button onClick={() => scrollTo('technology-section')} className="hover:text-emerald-300 transition-colors">
                Node.js REST API
              </button>
            </li>
            <li>
              <button onClick={() => scrollTo('technology-section')} className="hover:text-emerald-300 transition-colors">
                PyTorch SegFormer-B0
              </button>
            </li>
            <li>
              <button onClick={() => scrollTo('technology-section')} className="hover:text-emerald-300 transition-colors">
                PostGIS Topology
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Resources */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">Resources</h4>
          <ul className="space-y-2">
            <li>
              <button onClick={() => scrollTo('architecture-section')} className="hover:text-emerald-300 transition-colors">
                Architecture Diagram
              </button>
            </li>
            <li>
              <button onClick={() => scrollTo('technology-section')} className="hover:text-emerald-300 transition-colors">
                Security & RBAC
              </button>
            </li>
            <li>
              <button onClick={onLaunchPlatform} className="hover:text-white transition-colors text-emerald-400 font-semibold">
                Launch Flight Hub →
              </button>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-emerald-950 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
        <div>© 2026 AeroCadastre AI. Geospatial Cadastral Intelligence Platform.</div>
        <div className="flex items-center space-x-4">
          <span className="text-emerald-400">● OGC WGS84 STANDARDS</span>
          <span>PYTORCH 2.2+</span>
          <span>MAPLIBRE GL</span>
        </div>
      </div>
    </footer>
  );
};
