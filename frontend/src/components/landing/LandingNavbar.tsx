import React, { useState } from 'react';
import { Compass, Menu, X, ArrowRight, UserCircle } from 'lucide-react';

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
          ? 'bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#E3D8CA] shadow-sm shadow-[#8C7A6B]/10 py-2.5'
          : 'bg-[#FAF6F0]/85 backdrop-blur-sm border-b border-[#EADECE] py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo Area */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#C46824] via-[#D97D34] to-[#E59858] flex items-center justify-center text-white font-bold shadow-md shadow-[#C46824]/20 group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-base tracking-tight text-[#1E1B18] font-mono">AeroCadastre AI</span>
              <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#F0E6D8] text-[#8C4615] border border-[#DFCDBA] font-semibold">
                AI • GIS • DRONE
              </span>
            </div>
            <div className="text-[10px] text-[#7A6F64] tracking-wider uppercase font-semibold">
              Geospatial Intelligence Platform
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1">
          <button
            onClick={() => scrollToSection('capabilities-section')}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#5A5046] hover:text-[#1E1B18] hover:bg-[#EFE7DC] transition-colors"
          >
            Platform
          </button>
          <button
            onClick={() => scrollToSection('ai-section')}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#5A5046] hover:text-[#1E1B18] hover:bg-[#EFE7DC] transition-colors"
          >
            AI Analysis
          </button>
          <button
            onClick={() => scrollToSection('gis-section')}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#5A5046] hover:text-[#1E1B18] hover:bg-[#EFE7DC] transition-colors"
          >
            GIS Mapping
          </button>
          <button
            onClick={() => scrollToSection('workflow-section')}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#5A5046] hover:text-[#1E1B18] hover:bg-[#EFE7DC] transition-colors"
          >
            Workflow
          </button>
          <button
            onClick={() => scrollToSection('technology-section')}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#5A5046] hover:text-[#1E1B18] hover:bg-[#EFE7DC] transition-colors"
          >
            Technology
          </button>
          <button
            onClick={() => scrollToSection('architecture-section')}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#5A5046] hover:text-[#1E1B18] hover:bg-[#EFE7DC] transition-colors"
          >
            About
          </button>
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center space-x-3">
          <button
            onClick={onOpenAuthModal}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#5A5046] hover:text-[#1E1B18] hover:bg-[#EFE7DC] border border-transparent hover:border-[#DFCDBA] transition-colors"
          >
            <UserCircle className="w-4 h-4 text-[#8C7E70]" />
            <span>Sign In</span>
          </button>

          <button
            onClick={onLaunchApp}
            className="beige-pill-primary group flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Launch Platform</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform text-[#E59858]" />
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="lg:hidden flex items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#EFE7DC] text-[#3E3730] hover:text-[#1E1B18] border border-[#DFCDBA]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 bg-[#FAF6F0] border-b border-[#E3D8CA] space-y-3 animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => scrollToSection('capabilities-section')}
              className="text-left px-3 py-2 text-sm text-[#4E453C] font-medium hover:bg-[#EFE7DC] rounded-lg"
            >
              Platform
            </button>
            <button
              onClick={() => scrollToSection('ai-section')}
              className="text-left px-3 py-2 text-sm text-[#4E453C] font-medium hover:bg-[#EFE7DC] rounded-lg"
            >
              AI Analysis
            </button>
            <button
              onClick={() => scrollToSection('gis-section')}
              className="text-left px-3 py-2 text-sm text-[#4E453C] font-medium hover:bg-[#EFE7DC] rounded-lg"
            >
              GIS Mapping
            </button>
            <button
              onClick={() => scrollToSection('workflow-section')}
              className="text-left px-3 py-2 text-sm text-[#4E453C] font-medium hover:bg-[#EFE7DC] rounded-lg"
            >
              Workflow
            </button>
            <button
              onClick={() => scrollToSection('technology-section')}
              className="text-left px-3 py-2 text-sm text-[#4E453C] font-medium hover:bg-[#EFE7DC] rounded-lg"
            >
              Technology
            </button>
          </div>

          <div className="pt-3 border-t border-[#E3D8CA] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuthModal();
              }}
              className="w-full py-2.5 rounded-xl bg-[#EFE7DC] hover:bg-[#E6DDD0] text-[#1E1B18] text-xs font-semibold border border-[#DFCDBA]"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onLaunchApp();
              }}
              className="beige-pill-primary w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-2"
            >
              <span>Launch Platform</span>
              <ArrowRight className="w-4 h-4 text-[#E59858]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
