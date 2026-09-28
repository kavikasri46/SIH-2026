import React from 'react';
import { LandingNavbar } from './landing/LandingNavbar';
import { HeroSection } from './landing/HeroSection';
import { TrustStrip } from './landing/TrustStrip';
import { ProblemSection } from './landing/ProblemSection';
import { CapabilitiesSection } from './landing/CapabilitiesSection';
import { WorkflowSection } from './landing/WorkflowSection';
import { AISection } from './landing/AISection';
import { GISSection } from './landing/GISSection';
import { HumanVerificationSection } from './landing/HumanVerificationSection';
import { FieldSurveySection } from './landing/FieldSurveySection';
import { TechnologySection } from './landing/TechnologySection';
import { ArchitectureSection } from './landing/ArchitectureSection';
import { SecuritySection } from './landing/SecuritySection';
import { CTASection } from './landing/CTASection';
import { LandingFooter } from './landing/LandingFooter';
import { NavigationTab } from './Navbar';
import { Project } from '../types';

interface LandingPageProps {
  onNavigate: (tab: NavigationTab) => void;
  onOpenReportModal: () => void;
  onOpenAIModal: () => void;
  onOpenTopologyModal: () => void;
  onOpenAuthModal?: () => void;
  activeProject: Project | null;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onOpenReportModal,
  onOpenAIModal,
  onOpenTopologyModal,
  onOpenAuthModal = () => {},
  activeProject,
}) => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setIsScrolled(e.currentTarget.scrollTop > 20);
  };

  return (
    <div 
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto bg-[#030605] text-zinc-100 tech-grid-bg scroll-smooth selection:bg-emerald-500 selection:text-black flex flex-col w-full min-h-screen"
    >
      
      {/* 1. STICKY MODERN NAVIGATION BAR */}
      <LandingNavbar
        onLaunchApp={() => onNavigate('COMMAND')}
        onOpenAuthModal={onOpenAuthModal}
        onOpenSupport={() => onNavigate('SUPPORT')}
        isScrolled={isScrolled}
      />

      {/* 2. HERO SECTION WITH VECTOR DRONE ANIMATION & GIS TERRAIN */}
      <HeroSection
        onLaunchPlatform={() => onNavigate('COMMAND')}
      />

      {/* 3. VALUE / TRUST STRIP */}
      <TrustStrip />

      {/* 4. PROBLEM SECTION: TRADITIONAL VS AI-ASSISTED */}
      <ProblemSection />

      {/* 5. 6 CORE CAPABILITY CARDS */}
      <CapabilitiesSection />

      {/* 6. HORIZONTAL 6-STAGE WORKFLOW PIPELINE */}
      <WorkflowSection />

      {/* 7. AI DEEP LEARNING SECTION WITH ILLUSTRATIVE COMPARISON SLIDER */}
      <AISection />

      {/* 8. GIS VECTORIZATION & MAP VISUAL SECTION */}
      <GISSection />

      {/* 9. HUMAN-IN-THE-LOOP VERIFICATION & PROVENANCE TIERS */}
      <HumanVerificationSection />

      {/* 10. FIELD SURVEY & MOBILE DGPS ROVER SECTION */}
      <FieldSurveySection />

      {/* 11. PRODUCTION TECHNOLOGY STACK */}
      <TechnologySection />

      {/* 12. COMPLETE DATAFLOW ARCHITECTURE */}
      <ArchitectureSection />

      {/* 13. SECURITY, RBAC & ENTERPRISE INTEGRITY */}
      <SecuritySection />

      {/* 14. CALL TO ACTION SECTION */}
      <CTASection
        onLaunchPlatform={() => onNavigate('STUDIO')}
      />

      {/* 15. FOOTER */}
      <LandingFooter
        onLaunchPlatform={() => onNavigate('STUDIO')}
        onOpenReportModal={onOpenReportModal}
      />

    </div>
  );
};
