import React, { useState, useEffect } from 'react';
import { Compass, Menu, X, ArrowRight, UserCircle, Sparkles } from 'lucide-react';

interface LandingNavbarProps {
  onLaunchApp: () => void;
  onOpenAuthModal: () => void;
  onOpenSupport: () => void;
  isScrolled?: boolean;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({
  onLaunchApp,
  onOpenAuthModal,
  onOpenSupport,
  isScrolled = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050b07]/95 backdrop-blur-md border-b border-emerald-900/50 shadow-lg shadow-black/60 py-2.5'
          : 'bg-[#050b07]/80 backdrop-blur-sm border-b border-emerald-900/30 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo Area */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 via-green-500 to-emerald-400 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-950 group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-base tracking-tight text-white font-mono">AeroCadastre AI</span>
              <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                AI • GIS • DRONE
              </span>
            </div>
            <div className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">
              Geospatial Intelligence Platform
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1">
          <button
            onClick={() => scrollToSection('capabilities-section')}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-emerald-300 hover:bg-emerald-950/40 transition-colors"
          >
            Platform
          </button>
          <button
            onClick={() => scrollToSection('ai-section')}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-emerald-300 hover:bg-emerald-950/40 transition-colors"
          >
            AI Analysis
          </button>
          <button
            onClick={() => scrollToSection('gis-section')}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-emerald-300 hover:bg-emerald-950/40 transition-colors"
          >
            GIS Mapping
          </button>
          <button
            onClick={() => scrollToSection('workflow-section')}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-emerald-300 hover:bg-emerald-950/40 transition-colors"
          >
            Workflow
          </button>
          <button
            onClick={() => scrollToSection('technology-section')}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-emerald-300 hover:bg-emerald-950/40 transition-colors"
          >
            Technology
          </button>
          <button
            onClick={() => scrollToSection('architecture-section')}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-emerald-300 hover:bg-emerald-950/40 transition-colors"
          >
            About
          </button>
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center space-x-3">
          <button
            onClick={onOpenAuthModal}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <UserCircle className="w-4 h-4 text-slate-400" />
            <span>Sign In</span>
          </button>

          <button
            onClick={onLaunchApp}
            className="oled-pill-green group flex items-center space-x-2 px-4 py-2 rounded-xl text-white text-xs font-bold shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Launch Platform</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="lg:hidden flex items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-emerald-950 text-slate-300 hover:text-white border border-emerald-900/60"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 bg-[#060e0a] border-b border-emerald-900/60 space-y-3 animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => scrollToSection('capabilities-section')}
              className="text-left px-3 py-2 text-sm text-slate-300 hover:bg-emerald-950/60 rounded-lg"
            >
              Platform
            </button>
            <button
              onClick={() => scrollToSection('ai-section')}
              className="text-left px-3 py-2 text-sm text-slate-300 hover:bg-emerald-950/60 rounded-lg"
            >
              AI Analysis
            </button>
            <button
              onClick={() => scrollToSection('gis-section')}
              className="text-left px-3 py-2 text-sm text-slate-300 hover:bg-emerald-950/60 rounded-lg"
            >
              GIS Mapping
            </button>
            <button
              onClick={() => scrollToSection('workflow-section')}
              className="text-left px-3 py-2 text-sm text-slate-300 hover:bg-emerald-950/60 rounded-lg"
            >
              Workflow
            </button>
            <button
              onClick={() => scrollToSection('technology-section')}
              className="text-left px-3 py-2 text-sm text-slate-300 hover:bg-emerald-950/60 rounded-lg"
            >
              Technology
            </button>
          </div>

          <div className="pt-3 border-t border-emerald-900/60 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuthModal();
              }}
              className="w-full py-2.5 rounded-xl bg-slate-800 text-white text-xs font-semibold"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onLaunchApp();
              }}
              className="oled-pill-green w-full py-2.5 rounded-xl text-white text-xs font-bold flex items-center justify-center space-x-2"
            >
              <span>Launch Platform</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
