import React, { useState, useEffect } from 'react';
import {
  Home,
  Plane,
  Map,
  Trophy,
  BarChart2,
  User,
  Settings,
  Zap,
  Radio,
  Crosshair,
  Shield,
  Star,
  Layers,
  Sparkles,
  MapPin,
  Cpu,
  CheckCircle2,
  Calendar,
  CloudSun,
  Play,
  TrendingUp,
  Wind,
  Compass,
  ChevronRight,
  X,
  FileCheck,
  Smartphone,
  FileText,
  Sliders,
  Maximize2
} from 'lucide-react';
import { NavigationTab } from './Navbar';
import { Project, User as UserType } from '../types';

interface DroneCommandDashboardProps {
  onNavigate: (tab: NavigationTab) => void;
  onLaunchStudio?: () => void;
  onLaunchMap?: () => void;
  onOpenAuthModal?: () => void;
  onOpenReportModal?: () => void;
  onOpenAIModal?: () => void;
  onOpenTopologyModal?: () => void;
  activeProject?: Project | null;
  projects?: Project[];
  onSelectProject?: (p: Project) => void;
  user?: UserType | null;
}

export const DroneCommandDashboard: React.FC<DroneCommandDashboardProps> = ({
  onNavigate,
  onLaunchStudio,
  onLaunchMap,
  onOpenAuthModal = () => {},
  onOpenReportModal = () => {},
  onOpenAIModal = () => {},
  onOpenTopologyModal = () => {},
  activeProject,
  projects = [],
  onSelectProject,
  user,
}) => {
  // Navigation active sub-tab
  const [activeNav, setActiveNav] = useState<'mission' | 'fleet' | 'sectors' | 'ai' | 'map' | 'topology' | 'verifications' | 'dgps' | 'reports' | 'settings'>('mission');

  // Carousel State
  const [activeSlide, setActiveSlide] = useState(0);

  // Selected Environment / Scenario
  const [selectedScenario, setSelectedScenario] = useState<{
    name: string;
    zone: string;
    wind: string;
    windDir: string;
    altitude: string;
    gsd: string;
    gpsStatus: string;
    gpsSats: number;
    temp: string;
    weather: string;
    parcels: number;
  }>({
    name: 'Varanasi Smart Ward 12',
    zone: 'Zone B-4 Urban Core',
    wind: '8 km/h',
    windDir: 'NE',
    altitude: '120 m AGL',
    gsd: '1.2 cm/px',
    gpsStatus: 'RTK Locked (Fix)',
    gpsSats: 24,
    temp: '26°C',
    weather: 'Clear',
    parcels: 142,
  });

  // Modals & Interactive HUD Simulation
  const [isSimOpen, setIsSimOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'fleet' | 'sectors' | 'ai' | 'verifications' | 'dgps' | 'topology' | 'reports' | 'settings' | null>(null);

  // Flight simulation state
  const [simSpeed, setSimSpeed] = useState(36);
  const [simAltitude, setSimAltitude] = useState(120);
  const [simBattery, setSimBattery] = useState(98);
  const [simParcelsDetected, setSimParcelsDetected] = useState(42);

  const slides = [
    {
      tag: 'AUTONOMOUS CADASTRAL AI MISSION',
      title1: 'Detect.',
      title2: 'Vectorize.',
      title3: 'Verify.',
      desc: 'High-resolution drone orthomosaic scanning & sub-centimeter cadastral boundary extraction.',
      weather: '26°C Clear • GSD: 1.2 cm/px',
      zone: 'Varanasi Smart Ward 12 (Zone B-4)',
    },
    {
      tag: 'DEEP LEARNING SEGMENTATION',
      title1: 'Extract.',
      title2: 'Topology.',
      title3: 'Approve.',
      desc: 'Automated building footprint polygons, road networks & overlap-free land parcel boundaries.',
      weather: '28°C Sunny • RTK Fixed',
      zone: 'Prayagraj Rural Abadi Sector 2',
    },
    {
      tag: 'HUMAN-IN-THE-LOOP GIS WORKBENCH',
      title1: 'Survey.',
      title2: 'Audit.',
      title3: 'Deliver.',
      desc: 'Field verification workflow with surveyor digital signature & legal cadastral map generation.',
      weather: '24°C Optimal • 26 Sats',
      zone: 'Ayodhya Urban Corridor Block 7',
    },
  ];

  // Auto carousel rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="h-screen w-screen bg-[#030605] text-slate-100 flex flex-col font-sans select-none overflow-hidden relative">
      
      {/* Ambient Neon Emerald Backlights */}
      <div className="fixed top-8 left-1/4 w-[650px] h-[350px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-8 right-1/4 w-[550px] h-[350px] bg-green-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* 1. TOP UNIFIED INTEGRATED NAVIGATION & STATUS BAR */}
      <header className="h-14 bg-[#060e0a]/90 border-b border-emerald-900/40 px-4 sm:px-6 flex items-center justify-between z-30 backdrop-blur-md flex-shrink-0">
        
        {/* Brand & Project Selector */}
        <div className="flex items-center space-x-4">
          <div 
            onClick={() => onNavigate('OVERVIEW')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 via-green-500 to-emerald-400 p-[1px] shadow-lg shadow-emerald-950/80 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#050907] rounded-xl flex items-center justify-center">
                <span className="font-black text-sm text-emerald-400 font-mono drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]">
                  A
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-sm tracking-tight text-white font-mono">AeroCadastre AI</span>
                <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-700/50">
                  ENTERPRISE
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-medium tracking-wide">
                Drone Cadastral Mission Control
              </div>
            </div>
          </div>

          <div className="h-5 w-px bg-emerald-900/40 hidden sm:block" />

          {/* Quick Hub Navigation Pills */}
          <nav className="hidden md:flex items-center bg-[#07130d] p-0.5 rounded-xl border border-emerald-900/50">
            <button
              onClick={() => onNavigate('OVERVIEW')}
              className="px-3 py-1 rounded-lg text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              Overview
            </button>
            <button
              onClick={() => onNavigate('COMMAND')}
              className="px-3 py-1 rounded-lg text-xs font-bold text-white bg-emerald-600 shadow-[0_0_12px_#10b981]"
            >
              Flight Hub
            </button>
            <button
              onClick={() => onNavigate('STUDIO')}
              className="px-3 py-1 rounded-lg text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              AI Studio
            </button>
            <button
              onClick={() => onNavigate('MAP')}
              className="px-3 py-1 rounded-lg text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              WebGIS Map
            </button>
            <button
              onClick={() => onNavigate('SUPPORT')}
              className="px-3 py-1 rounded-lg text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              Support
            </button>
          </nav>
        </div>

        {/* Right Status Capsules: Battery, RTK GNSS, Link, Profile */}
        <div className="flex items-center space-x-3">
          
          {/* Active Survey Sector Badge */}
          <button 
            onClick={() => setActiveModal('sectors')}
            className="hidden xl:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#08150f] border border-emerald-900/50 text-[11px] font-mono text-emerald-300 hover:border-emerald-500 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>{selectedScenario.zone}</span>
          </button>

          {/* Battery Indicator */}
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#08150f] border border-emerald-900/60 text-xs font-bold text-emerald-400 font-mono shadow-inner">
            <Zap className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
            <span>98%</span>
          </div>

          {/* RTK GNSS Satellites */}
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#08150f] border border-emerald-900/60 text-xs font-mono text-emerald-300 shadow-inner">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">RTK Fix</span>
            <span className="text-slate-400 text-[10px]">({selectedScenario.gpsSats})</span>
          </div>

          {/* User Profile Pill / Auth Button */}
          <button 
            onClick={onOpenAuthModal}
            className="flex items-center space-x-2 px-3 py-1 rounded-full bg-[#08150f] border border-emerald-900/60 text-xs font-semibold text-slate-200 shadow-inner hover:border-emerald-500/70 transition-all hover:scale-105"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-300 text-[10px] font-bold">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="hidden sm:inline">{user?.fullName || 'Senior Surveyor'}</span>
            <span className="text-[9px] uppercase font-mono px-1 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-700/40 hidden lg:inline">
              {user?.role || 'SURVEYOR'}
            </span>
          </button>

        </div>

      </header>

      {/* 2. MAIN FULLSCREEN DASHBOARD VIEWPORT */}
      <div className="flex-1 flex overflow-hidden p-3 sm:p-4 gap-4">
        
        {/* LEFT UNIFIED ALL-IN-ONE COMMAND SIDEBAR */}
        <aside className="w-56 lg:w-60 flex flex-col justify-between py-1 px-1 flex-shrink-0 bg-[#050b07]/80 rounded-3xl border border-emerald-950/80 backdrop-blur-md overflow-y-auto">
          
          <div className="flex flex-col space-y-3">
            
            {/* GROUP 1: COMMAND & FLEET */}
            <div>
              <div className="px-3 py-1 text-[10px] font-mono uppercase text-emerald-500/80 font-bold tracking-wider">
                Command & Fleet
              </div>
              <div className="space-y-1 mt-1">
                {/* Mission Control */}
                <button
                  onClick={() => setActiveNav('mission')}
                  className={`flex items-center justify-between px-3 py-2 rounded-2xl transition-all duration-200 w-full ${
                    activeNav === 'mission'
                      ? 'oled-nav-active text-emerald-300 font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 font-medium'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Home className={`w-4 h-4 ${activeNav === 'mission' ? 'text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.8)]' : 'text-slate-400'}`} />
                    <span className="text-xs">Mission Control</span>
                  </div>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                    LIVE
                  </span>
                </button>

                {/* UAV Fleet */}
                <button
                  onClick={() => {
                    setActiveNav('fleet');
                    setActiveModal('fleet');
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-2xl transition-all duration-200 w-full ${
                    activeNav === 'fleet'
                      ? 'oled-nav-active text-emerald-300 font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 font-medium'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Plane className="w-4 h-4 text-slate-400" />
                    <span className="text-xs">UAV Fleet Ops</span>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-400">4 UAV</span>
                </button>

                {/* Survey Sectors */}
                <button
                  onClick={() => {
                    setActiveNav('sectors');
                    setActiveModal('sectors');
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-2xl transition-all duration-200 w-full ${
                    activeNav === 'sectors'
                      ? 'oled-nav-active text-emerald-300 font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 font-medium'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Map className="w-4 h-4 text-slate-400" />
                    <span className="text-xs">Survey Sectors</span>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-400">8 Wards</span>
                </button>
              </div>
            </div>

            {/* GROUP 2: AI & GEOSPATIAL INTELLIGENCE */}
            <div>
              <div className="px-3 py-1 text-[10px] font-mono uppercase text-emerald-500/80 font-bold tracking-wider">
                AI & Spatial Engine
              </div>
              <div className="space-y-1 mt-1">
                {/* AI Studio */}
                <button
                  onClick={() => onNavigate('STUDIO')}
                  className="flex items-center justify-between px-3 py-2 rounded-2xl text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 font-medium transition-all duration-200 w-full"
                >
                  <div className="flex items-center space-x-2.5">
                    <Cpu className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs">AI Studio & Tiling</span>
                  </div>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                    AI
                  </span>
                </button>

                {/* WebGIS Interactive Map */}
                <button
                  onClick={() => onNavigate('MAP')}
                  className="flex items-center justify-between px-3 py-2 rounded-2xl text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 font-medium transition-all duration-200 w-full"
                >
                  <div className="flex items-center space-x-2.5">
                    <Layers className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs">WebGIS Parcel Map</span>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-400">GIS</span>
                </button>

                {/* Topology Validator */}
                <button
                  onClick={() => setActiveModal('topology')}
                  className="flex items-center justify-between px-3 py-2 rounded-2xl text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 font-medium transition-all duration-200 w-full"
                >
                  <div className="flex items-center space-x-2.5">
                    <Sliders className="w-4 h-4 text-slate-400" />
                    <span className="text-xs">Topology & Cleansing</span>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-400">0 Err</span>
                </button>
              </div>
            </div>

            {/* GROUP 3: CADASTRAL & FIELD */}
            <div>
              <div className="px-3 py-1 text-[10px] font-mono uppercase text-emerald-500/80 font-bold tracking-wider">
                Cadastre & Field
              </div>
              <div className="space-y-1 mt-1">
                {/* Surveyor HITL Verifications */}
                <button
                  onClick={() => setActiveModal('verifications')}
                  className="flex items-center justify-between px-3 py-2 rounded-2xl text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 font-medium transition-all duration-200 w-full"
                >
                  <div className="flex items-center space-x-2.5">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <span className="text-xs">Surveyor Sign-Off</span>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-400">98/142</span>
                </button>

                {/* DGPS Mobile Rover */}
                <button
                  onClick={() => setActiveModal('dgps')}
                  className="flex items-center justify-between px-3 py-2 rounded-2xl text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 font-medium transition-all duration-200 w-full"
                >
                  <div className="flex items-center space-x-2.5">
                    <Smartphone className="w-4 h-4 text-slate-400" />
                    <span className="text-xs">DGPS Rover Sync</span>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-400">RTK</span>
                </button>

                {/* Area Analytics & Reports */}
                <button
                  onClick={() => setActiveModal('reports')}
                  className="flex items-center justify-between px-3 py-2 rounded-2xl text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 font-medium transition-all duration-200 w-full"
                >
                  <div className="flex items-center space-x-2.5">
                    <FileText className="w-4 h-4 text-slate-400" />
                    <span className="text-xs">Cadastral Reports</span>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-400">PDF</span>
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Settings Link */}
          <div className="pt-2 border-t border-emerald-950/80">
            <button
              onClick={() => setActiveModal('settings')}
              className="flex items-center space-x-2.5 px-3 py-2 rounded-2xl text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 font-medium transition-all w-full"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span className="text-xs">System & RBAC</span>
            </button>
          </div>

        </aside>

        {/* CENTRAL & RIGHT WORKSPACE */}
        <main className="flex-1 flex flex-col justify-between gap-3 overflow-hidden">
          
          {/* TOP SECTION: HERO BANNER (68%) + ACTIVE CADASTRAL MISSION CARD (32%) */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 min-h-0">
            
            {/* HERO BANNER CARD */}
            <div className="lg:col-span-8 relative rounded-3xl overflow-hidden border border-emerald-900/40 bg-[#060b08] shadow-2xl flex flex-col justify-between p-5 sm:p-7 group">
              
              {/* High-Resolution Mountain / Drone Flight Background */}
              <div className="absolute inset-0 z-0">
                <img
                  src="/images/drone-mountain-flight.jpg"
                  alt="Autonomous Drone Flight"
                  className="w-full h-full object-cover object-center filter brightness-95 contrast-105 scale-100 group-hover:scale-105 transition-transform duration-1000"
                />
                {/* Deep Dark Gradients for Crisp Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#030605]/95 via-[#030605]/55 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030605]/90 via-transparent to-[#030605]/40" />
              </div>

              {/* Hero Text Content */}
              <div className="relative z-10 flex flex-col items-start max-w-md space-y-3">
                {/* Mission Status Badge */}
                <div className="text-[10px] font-mono font-extrabold text-emerald-400 tracking-widest uppercase drop-shadow-[0_0_8px_rgba(52,211,153,0.8)] flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>{slides[activeSlide].tag}</span>
                </div>

                {/* 3-Line Headline */}
                <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold text-white leading-[1.08] tracking-tight">
                  {slides[activeSlide].title1} <br />
                  {slides[activeSlide].title2} <br />
                  {slides[activeSlide].title3}
                </h1>

                {/* Subtitle */}
                <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
                  {slides[activeSlide].desc}
                </p>
              </div>

              {/* Bottom Action Row: Quick Start Pill + Telemetry Pill + Carousel Dots */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-4">
                
                {/* Left Action Buttons */}
                <div className="flex items-center space-x-2.5">
                  <button
                    onClick={() => setIsSimOpen(true)}
                    className="oled-pill-green flex items-center space-x-2 px-5 py-2.5 rounded-full text-white font-bold text-xs shadow-lg transition-all hover:scale-105 active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Start Survey Mission</span>
                  </button>

                  <div className="oled-pill-dark flex items-center space-x-2 px-3.5 py-2 rounded-full text-slate-200 text-[11px] font-semibold shadow-inner">
                    <CloudSun className="w-3.5 h-3.5 text-amber-400" />
                    <span>{slides[activeSlide].weather}</span>
                  </div>
                </div>

                {/* Carousel Pagination Dots */}
                <div className="flex items-center space-x-1.5">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      className={`transition-all duration-300 rounded-full ${
                        activeSlide === idx
                          ? 'w-5 h-2 bg-emerald-400 shadow-[0_0_8px_#34d399]'
                          : 'w-2 h-2 bg-slate-600 hover:bg-slate-400'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>

              </div>

            </div>

            {/* RIGHT WIDGET: ACTIVE CADASTRAL MISSION CARD */}
            <div className="lg:col-span-4 rounded-3xl oled-card p-5 flex flex-col justify-between space-y-4">
              
              {/* Card Title + Calendar Icon */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white tracking-tight">Active Cadastral Target</span>
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
              </div>

              {/* Subcard with Icon + Task Description */}
              <div className="p-3.5 rounded-2xl bg-[#08120d] border border-emerald-900/40 flex items-center space-x-3 shadow-inner">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/90 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.25)] flex-shrink-0">
                  <Crosshair className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Zone B-4 Boundary Extraction</div>
                  <div className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                    Scan & vectorize 45 urban parcels with RTK accuracy.
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-medium">Vectorization Progress</span>
                  <span className="text-white font-bold font-mono">68%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full w-[68%] shadow-[0_0_10px_#34d399]" />
                </div>
              </div>

              {/* Metrics Row */}
              <div className="space-y-1">
                <div className="text-[10px] text-slate-400 font-medium">Quality Metrics</div>
                <div className="flex items-center space-x-4 text-xs font-bold">
                  <div className="flex items-center space-x-1 text-emerald-400">
                    <Star className="w-3.5 h-3.5 fill-emerald-400" />
                    <span className="font-mono">98.6% IoU Acc</span>
                  </div>
                  <div className="flex items-center space-x-1 text-green-400">
                    <Layers className="w-3.5 h-3.5 text-green-400" />
                    <span className="font-mono">142 Parcels</span>
                  </div>
                </div>
              </div>

              {/* Action Button: Execute AI Vector Pipeline */}
              <button
                onClick={() => onNavigate('STUDIO')}
                className="oled-pill-green w-full py-3 rounded-2xl text-white font-bold text-xs shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Execute AI Vector Pipeline</span>
              </button>

            </div>

          </div>

          {/* LOWER SECTION: 4 QUICK FEATURE CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* Card 1: UAV Fleet */}
            <div 
              onClick={() => setActiveModal('fleet')}
              className="oled-card hover:border-emerald-600/50 p-3.5 rounded-2xl flex flex-col justify-between space-y-2 cursor-pointer group transition-all hover:-translate-y-0.5"
            >
              <div>
                <div className="text-xs font-bold text-white">UAV Fleet</div>
                <div className="text-[10px] text-emerald-400 font-medium">4 Active Enterprise Drones</div>
              </div>

              <div className="relative h-20 rounded-xl overflow-hidden bg-[#0a1410] border border-emerald-950 flex items-center justify-center">
                <img
                  src="/images/drone-hero.jpg"
                  alt="Aircraft Drone"
                  className="w-full h-full object-cover filter brightness-90 group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060b08]/80 to-transparent" />
                
                <div className="absolute bottom-1.5 right-1.5 w-5 h-5 rounded-full bg-emerald-950/80 border border-emerald-700/50 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </div>

            {/* Card 2: Survey Sectors */}
            <div 
              onClick={() => setActiveModal('sectors')}
              className="oled-card hover:border-emerald-600/50 p-3.5 rounded-2xl flex flex-col justify-between space-y-2 cursor-pointer group transition-all hover:-translate-y-0.5"
            >
              <div>
                <div className="text-xs font-bold text-white">Survey Sectors</div>
                <div className="text-[10px] text-emerald-400 font-medium">8 Urban & Rural Wards</div>
              </div>

              <div className="relative h-20 rounded-xl overflow-hidden bg-[#0a1410] border border-emerald-950 flex items-center justify-center">
                <img
                  src="/images/drone-mountain-flight.jpg"
                  alt="Survey Sector Landscape"
                  className="w-full h-full object-cover filter brightness-90 group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060b08]/80 to-transparent" />
                
                <div className="absolute bottom-1.5 right-1.5 w-5 h-5 rounded-full bg-emerald-950/80 border border-emerald-700/50 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </div>

            {/* Card 3: AI Model Engine */}
            <div 
              onClick={() => setActiveModal('ai')}
              className="oled-card hover:border-emerald-600/50 p-3.5 rounded-2xl flex flex-col justify-between space-y-2 cursor-pointer group transition-all hover:-translate-y-0.5"
            >
              <div>
                <div className="text-xs font-bold text-white">AI Model Engine</div>
                <div className="text-[10px] text-emerald-400 font-medium">3 Extraction Models</div>
              </div>

              <div className="relative h-20 rounded-xl overflow-hidden bg-[#07110c] border border-emerald-950 flex items-center justify-center">
                <div className="relative flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_12px_#34d399]">
                    <span className="text-emerald-400 font-extrabold font-mono text-base">AI</span>
                  </div>
                  <div className="absolute -top-1 -left-2 w-1.5 h-2 bg-emerald-400 rounded-t shadow-[0_0_6px_#34d399]" />
                  <div className="absolute -top-1 -right-2 w-1.5 h-2 bg-emerald-400 rounded-t shadow-[0_0_6px_#34d399]" />
                  <div className="absolute -bottom-1 -left-2 w-1.5 h-2 bg-emerald-400 rounded-t shadow-[0_0_6px_#34d399]" />
                  <div className="absolute -bottom-1 -right-2 w-1.5 h-2 bg-emerald-400 rounded-t shadow-[0_0_6px_#34d399]" />
                </div>

                <div className="absolute bottom-1.5 right-1.5 w-5 h-5 rounded-full bg-emerald-950/80 border border-emerald-700/50 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </div>

            {/* Card 4: Survey Verifications */}
            <div 
              onClick={() => setActiveModal('verifications')}
              className="oled-card hover:border-emerald-600/50 p-3.5 rounded-2xl flex flex-col justify-between space-y-2 cursor-pointer group transition-all hover:-translate-y-0.5"
            >
              <div>
                <div className="text-xs font-bold text-white">Verifications</div>
                <div className="text-[10px] text-emerald-400 font-medium">98 / 142 Approved</div>
              </div>

              <div className="relative h-20 rounded-xl overflow-hidden bg-[#07110c] border border-emerald-950 flex items-center justify-center space-x-2 px-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-900/90 border border-emerald-400 flex items-center justify-center shadow-[0_0_8px_#34d399]">
                  <span className="text-[9px] font-mono font-black text-emerald-300">HITL</span>
                </div>
                <div className="w-7 h-7 rounded-lg bg-slate-800/90 border border-slate-400 flex items-center justify-center shadow-md">
                  <Star className="w-3.5 h-3.5 text-slate-300 fill-slate-300" />
                </div>
                <div className="w-7 h-7 rounded-lg bg-amber-950/90 border border-amber-500 flex items-center justify-center shadow-md">
                  <Shield className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                </div>

                <div className="absolute bottom-1.5 right-1.5 w-5 h-5 rounded-full bg-emerald-950/80 border border-emerald-700/50 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </div>

          </div>

          {/* BOTTOM TELEMETRY DOCK / STATUS BAR */}
          <div className="w-full oled-card rounded-2xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 border border-emerald-900/40 shadow-2xl flex-shrink-0">
            
            {/* Live Flight Telemetry Metrics */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-8 text-xs">
              
              {/* Flight Zone */}
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-600/50 flex items-center justify-center text-emerald-400">
                  <Compass className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[9px] text-slate-400 font-medium">Survey Sector</div>
                  <div className="text-xs font-bold text-white">{selectedScenario.name}</div>
                </div>
              </div>

              {/* Wind */}
              <div className="flex items-center space-x-2">
                <Wind className="w-3.5 h-3.5 text-slate-400" />
                <div>
                  <div className="text-[9px] text-slate-400 font-medium">Wind Speed</div>
                  <div className="text-xs font-bold text-white">
                    {selectedScenario.wind} <span className="text-emerald-400 font-normal">↗ {selectedScenario.windDir}</span>
                  </div>
                </div>
              </div>

              {/* Altitude & GSD */}
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
                <div>
                  <div className="text-[9px] text-slate-400 font-medium">Altitude & GSD</div>
                  <div className="text-xs font-bold text-white">
                    {selectedScenario.altitude} <span className="text-slate-400 text-[10px]">({selectedScenario.gsd})</span>
                  </div>
                </div>
              </div>

              {/* RTK GPS */}
              <div className="flex items-center space-x-2">
                <Radio className="w-3.5 h-3.5 text-emerald-400" />
                <div>
                  <div className="text-[9px] text-slate-400 font-medium">RTK GNSS</div>
                  <div className="text-xs font-bold text-white">
                    <span className="text-emerald-400">{selectedScenario.gpsStatus}</span>{' '}
                    <span className="text-slate-400 font-mono font-normal">🛰️ {selectedScenario.gpsSats}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Action: Process in AI Studio & Fly Now */}
            <div className="flex items-center space-x-2.5">
              <button
                onClick={() => onNavigate('STUDIO')}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors flex items-center space-x-1.5"
              >
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>AI Studio</span>
              </button>

              <button
                onClick={() => setIsSimOpen(true)}
                className="oled-pill-green flex items-center space-x-2 px-5 py-2 rounded-xl text-white font-bold text-xs shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                <Plane className="w-3.5 h-3.5 text-white" />
                <span>Fly Mission</span>
              </button>
            </div>

          </div>

        </main>

      </div>

      {/* ---------------- MODALS & LIVE FLIGHT HUD SIMULATION ---------------- */}

      {/* 1. LIVE FLIGHT SIMULATION & AUTOPILOT HUD */}
      {isSimOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl rounded-3xl overflow-hidden border border-emerald-500/40 bg-[#050907] shadow-2xl flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-3.5 bg-[#08120c] border-b border-emerald-900/50">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-sm font-bold text-white font-mono">AUTONOMOUS CADASTRAL SCAN • {selectedScenario.name}</span>
              </div>
              <button
                onClick={() => setIsSimOpen(false)}
                className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Flight HUD Viewport */}
            <div className="relative aspect-video w-full overflow-hidden bg-black flex items-center justify-center">
              <img
                src="/images/drone-mountain-flight.jpg"
                alt="Flight Simulation View"
                className="w-full h-full object-cover filter brightness-95"
              />

              {/* Artificial Horizon & Survey HUD Overlay */}
              <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6">
                {/* Top Telemetry */}
                <div className="flex items-center justify-between text-xs font-mono text-emerald-400 drop-shadow-[0_0_6px_#34d399] bg-black/40 px-3 py-1.5 rounded-xl backdrop-blur-sm">
                  <div>SPEED: {simSpeed} KM/H</div>
                  <div>ALT: {simAltitude} M AGL</div>
                  <div>GSD: 1.2 CM/PX</div>
                  <div>PARCELS DETECTED: {simParcelsDetected}</div>
                  <div>BATTERY: {simBattery}%</div>
                </div>

                {/* Center Crosshair & Waypoint Guide */}
                <div className="self-center flex flex-col items-center">
                  <div className="w-36 h-36 rounded-full border border-emerald-400/40 flex items-center justify-center relative">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                    <div className="absolute w-24 h-0.5 bg-emerald-400/70" />
                    <div className="absolute h-24 w-0.5 bg-emerald-400/70" />
                    {/* Bounding box visual */}
                    <div className="absolute inset-4 border border-dashed border-emerald-400/50 rounded" />
                  </div>
                  <span className="text-xs font-mono text-emerald-300 mt-2 bg-black/60 px-2.5 py-1 rounded border border-emerald-800/60">
                    SCAN LINE 6/18 • AUTONOMOUS RTK ACTIVE
                  </span>
                </div>

                {/* Bottom Controls */}
                <div className="flex items-center justify-between">
                  <div className="text-[11px] font-mono text-slate-300 bg-black/70 px-3 py-1.5 rounded-lg border border-emerald-900/60">
                    COORDS: 25.3176° N • 82.9739° E • WGS84
                  </div>
                  <div className="flex space-x-3 pointer-events-auto">
                    <button
                      onClick={() => {
                        setIsSimOpen(false);
                        onNavigate('STUDIO');
                      }}
                      className="oled-pill-green px-4 py-2 rounded-xl text-white text-xs font-bold"
                    >
                      Process Scan in AI Studio →
                    </button>
                    <button
                      onClick={() => {
                        setIsSimOpen(false);
                        onNavigate('MAP');
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-600"
                    >
                      Open WebGIS Map
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 2. UAV FLEET HANGAR MODAL */}
      {activeModal === 'fleet' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl rounded-3xl oled-card p-6 flex flex-col space-y-5 border border-emerald-500/30">
            <div className="flex items-center justify-between border-b border-emerald-900/50 pb-4">
              <div>
                <h3 className="text-base font-bold text-white">Enterprise UAV Cadastral Fleet</h3>
                <p className="text-xs text-slate-400">High-precision RTK drones calibrated for urban cadastral survey.</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1.5 rounded-full bg-slate-800 text-slate-300">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-1">
              {[
                { name: 'DJI Matrice 300 RTK', spec: '55 min flight • RTK GNSS • Zenmuse P1 (45MP Full-Frame)', status: 'Active (Ready)' },
                { name: 'DJI Mavic 3 Enterprise', spec: '42 min flight • 4/3 CMOS Mechanical Shutter • 0.7s Interval', status: 'Active (Ready)' },
                { name: 'WingtraOne GEN II VTOL', spec: '59 min flight • Sony RX1R II 42MP • 0.7cm GSD Coverage', status: 'Standby' },
                { name: 'Phantom 4 RTK', spec: '30 min flight • 1" CMOS 20MP • Centimeter Positioning', status: 'Active (Ready)' },
              ].map((drone, i) => (
                <div key={i} className="p-4 rounded-2xl bg-[#08120d] border border-emerald-900/40 flex flex-col justify-between space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{drone.name}</span>
                    <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-700/40">
                      {drone.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{drone.spec}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. SURVEY SECTORS MODAL */}
      {activeModal === 'sectors' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl rounded-3xl oled-card p-6 flex flex-col space-y-5 border border-emerald-500/30">
            <div className="flex items-center justify-between border-b border-emerald-900/50 pb-4">
              <div>
                <h3 className="text-base font-bold text-white">Cadastral Survey Sectors</h3>
                <p className="text-xs text-slate-400">Select an operational zone to load drone flight telemetry and boundaries.</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1.5 rounded-full bg-slate-800 text-slate-300">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'Varanasi Smart Ward 12', zone: 'Zone B-4 Urban Core', wind: '8 km/h', windDir: 'NE', altitude: '120 m AGL', gsd: '1.2 cm/px', gpsStatus: 'RTK Locked (Fix)', gpsSats: 24, temp: '26°C', weather: 'Clear', parcels: 142 },
                { name: 'Prayagraj Sector 4', zone: 'Rural Abadi Delineation', wind: '10 km/h', windDir: 'E', altitude: '100 m AGL', gsd: '1.0 cm/px', gpsStatus: 'RTK Locked (Fix)', gpsSats: 26, temp: '28°C', weather: 'Sunny', parcels: 96 },
                { name: 'Ayodhya Urban Corridor', zone: 'High-Density Commercial Block', wind: '6 km/h', windDir: 'N', altitude: '110 m AGL', gsd: '1.1 cm/px', gpsStatus: 'RTK Locked (Fix)', gpsSats: 22, temp: '25°C', weather: 'Optimal', parcels: 180 },
                { name: 'Gorakhpur Industrial Sector', zone: 'Cadastral Boundary Survey', wind: '12 km/h', windDir: 'NW', altitude: '130 m AGL', gsd: '1.4 cm/px', gpsStatus: 'RTK Locked (Fix)', gpsSats: 24, temp: '27°C', weather: 'Clear', parcels: 210 },
              ].map((sc, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setSelectedScenario(sc);
                    setActiveModal(null);
                  }}
                  className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                    selectedScenario.name === sc.name
                      ? 'bg-[#0e2417] border-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.3)]'
                      : 'bg-[#08120d] border-emerald-900/40 hover:border-emerald-700/60'
                  }`}
                >
                  <div className="text-xs font-bold text-white">{sc.name}</div>
                  <div className="text-[10px] text-emerald-400 mt-1">{sc.zone} • {sc.parcels} Parcels</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Alt: {sc.altitude} • GSD: {sc.gsd} • GPS: {sc.gpsStatus}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. AI MODEL ENGINE & VERIFICATIONS MODAL */}
      {(activeModal === 'ai' || activeModal === 'verifications') && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl rounded-3xl oled-card p-6 flex flex-col space-y-4 border border-emerald-500/30">
            <div className="flex items-center justify-between border-b border-emerald-900/50 pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_#34d399]">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Cadastral AI Deep Learning Pipeline</h3>
                  <p className="text-xs text-slate-400">UNet + Mask R-CNN multi-task feature extraction.</p>
                </div>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1.5 rounded-full bg-slate-800 text-slate-300">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {[
                { name: 'SegNet-Cadastre v2.4', task: 'Parcel Boundary & Property Wall Segmentation', acc: '98.6% IoU', status: 'Deployed' },
                { name: 'BuildingFootprint-UNet', task: 'Rooftop & Structural Edge Delineation', acc: '97.2% IoU', status: 'Deployed' },
                { name: 'RoadCorridor-Extractor', task: 'Right-of-Way & Transportation Centerline', acc: '96.8% IoU', status: 'Deployed' },
              ].map((model, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#08120d] border border-emerald-900/40 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">{model.name}</div>
                    <div className="text-[11px] text-slate-400">{model.task}</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-mono font-bold text-emerald-400">{model.acc}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/50">
                      {model.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setActiveModal(null);
                  onNavigate('STUDIO');
                }}
                className="oled-pill-green px-5 py-2.5 rounded-xl text-white text-xs font-bold"
              >
                Launch AI Studio →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. DGPS ROVER SYNC MODAL */}
      {activeModal === 'dgps' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl rounded-3xl oled-card p-6 flex flex-col space-y-4 border border-emerald-500/30">
            <div className="flex items-center justify-between border-b border-emerald-900/50 pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_#34d399]">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Mobile dGPS Rover Calibration</h3>
                  <p className="text-xs text-slate-400">Sub-centimeter field rover ground-truthing sync.</p>
                </div>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1.5 rounded-full bg-slate-800 text-slate-300">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#08120d] border border-emerald-900/40 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">CORS Base Station Connection</span>
                <span className="text-emerald-400 font-bold font-mono">NTRIP: ACTIVE (0.8s lag)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Horizontal Positioning Accuracy</span>
                <span className="text-emerald-400 font-bold font-mono">± 0.8 cm (RTK Fix)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Constellations Tracked</span>
                <span className="text-slate-200 font-mono">GPS (12) + GLONASS (8) + NavIC (4)</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setActiveModal(null);
                  onNavigate('MAP');
                }}
                className="oled-pill-green px-5 py-2.5 rounded-xl text-white text-xs font-bold"
              >
                Open Rover Map View →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. TOPOLOGY & REPORTS MODAL */}
      {(activeModal === 'topology' || activeModal === 'reports' || activeModal === 'settings') && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl rounded-3xl oled-card p-6 flex flex-col space-y-4 border border-emerald-500/30">
            <div className="flex items-center justify-between border-b border-emerald-900/50 pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_#34d399]">
                  {activeModal === 'topology' ? <Sliders className="w-5 h-5" /> : activeModal === 'reports' ? <FileText className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {activeModal === 'topology' ? 'GIS Topology & Quality Control' : activeModal === 'reports' ? 'Cadastral Dossier & Exports' : 'Enterprise RBAC Configuration'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {activeModal === 'topology' ? 'ST_Overlaps & Sliver gap cleansing algorithm.' : activeModal === 'reports' ? 'Official Form-12 cadastral PDF & OGC GeoJSON package.' : 'Security tokens, session roles and API endpoint settings.'}
                  </p>
                </div>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1.5 rounded-full bg-slate-800 text-slate-300">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#08120d] border border-emerald-900/40 space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-emerald-950">
                <span className="text-slate-400">Current Role</span>
                <span className="text-emerald-400 font-bold font-mono">{user?.role || 'SURVEYOR (Rajesh Kumar)'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-950">
                <span className="text-slate-400">Spatial SRS Validation</span>
                <span className="text-emerald-400 font-mono">EPSG:32644 (UTM 44N)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Digital Signature Status</span>
                <span className="text-emerald-400 font-bold">Verified & Cryptographically Signed</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setActiveModal(null);
                  if (activeModal === 'reports') {
                    onOpenReportModal();
                  } else {
                    onNavigate('STUDIO');
                  }
                }}
                className="oled-pill-green px-5 py-2.5 rounded-xl text-white text-xs font-bold"
              >
                Launch Full Workbench →
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
