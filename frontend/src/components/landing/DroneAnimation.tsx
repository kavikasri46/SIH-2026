import React from 'react';

interface DroneAnimationProps {
  isScanning?: boolean;
}

export const DroneAnimation: React.FC<DroneAnimationProps> = ({ isScanning = true }) => {
  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-[4/3] flex items-center justify-center select-none pointer-events-none">
      
      {/* Downward Scanning Beam Frustum */}
      {isScanning && (
        <div className="absolute top-[52%] left-1/2 -translate-x-1/2 w-[280px] h-[190px] overflow-hidden pointer-events-none z-0">
          <div 
            className="w-full h-full"
            style={{
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.45) 0%, rgba(5, 150, 105, 0.08) 70%, rgba(16, 185, 129, 0) 100%)',
              boxShadow: '0 0 30px rgba(16, 185, 129, 0.35)',
            }}
          />
          {/* Scanning Beam Sweep Grid Line */}
          <div className="absolute inset-x-0 bottom-4 h-0.5 bg-emerald-400/80 shadow-[0_0_15px_#10b981] animate-pulse" />
        </div>
      )}

      {/* Floating Drone Body Container with CSS Motion */}
      <div className="relative z-10 animate-float flex flex-col items-center">
        
        {/* Quadcopter SVG Vector Model */}
        <svg
          viewBox="0 0 320 220"
          className="w-64 sm:w-80 h-auto filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Landing Skids */}
          <path
            d="M95 145 L85 180 L135 180 M225 145 L235 180 L185 180"
            stroke="#475569"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M75 180 L145 180 M175 180 L245 180"
            stroke="#334155"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Carbon Fiber Diagonal Arms */}
          <line x1="160" y1="90" x2="60" y2="45" stroke="#0a1a12" strokeWidth="8" strokeLinecap="round" />
          <line x1="160" y1="90" x2="260" y2="45" stroke="#0a1a12" strokeWidth="8" strokeLinecap="round" />
          <line x1="160" y1="110" x2="60" y2="155" stroke="#0a1a12" strokeWidth="8" strokeLinecap="round" />
          <line x1="160" y1="110" x2="260" y2="155" stroke="#0a1a12" strokeWidth="8" strokeLinecap="round" />

          {/* Inner Accent Arm Lines */}
          <line x1="160" y1="90" x2="60" y2="45" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" opacity="0.7" />
          <line x1="160" y1="90" x2="260" y2="45" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" opacity="0.7" />
          <line x1="160" y1="110" x2="60" y2="155" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" opacity="0.7" />
          <line x1="160" y1="110" x2="260" y2="155" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" opacity="0.7" />

          {/* 4 Brushless Motor Pods */}
          <circle cx="60" cy="45" r="14" fill="#030805" stroke="#10b981" strokeWidth="2" />
          <circle cx="260" cy="45" r="14" fill="#030805" stroke="#10b981" strokeWidth="2" />
          <circle cx="60" cy="155" r="14" fill="#030805" stroke="#10b981" strokeWidth="2" />
          <circle cx="260" cy="155" r="14" fill="#030805" stroke="#10b981" strokeWidth="2" />

          {/* Motor LED Navigation Lights */}
          <circle cx="60" cy="45" r="4" fill="#34d399" className="animate-pulse" />
          <circle cx="260" cy="45" r="4" fill="#34d399" className="animate-pulse" />
          <circle cx="60" cy="155" r="4" fill="#ef4444" />
          <circle cx="260" cy="155" r="4" fill="#10b981" />

          {/* 4 Spinning Rotor Blur Discs */}
          <ellipse cx="60" cy="45" rx="42" ry="10" fill="url(#rotorGradFront)" opacity="0.75" />
          <ellipse cx="260" cy="45" rx="42" ry="10" fill="url(#rotorGradFront)" opacity="0.75" />
          <ellipse cx="60" cy="155" rx="42" ry="10" fill="url(#rotorGradBack)" opacity="0.75" />
          <ellipse cx="260" cy="155" rx="42" ry="10" fill="url(#rotorGradBack)" opacity="0.75" />

          {/* Central Aerodynamic Fuselage / Chassis */}
          <path
            d="M130 70 C130 55, 190 55, 190 70 L200 120 C200 135, 120 135, 120 120 Z"
            fill="url(#fuselageGrad)"
            stroke="#10b981"
            strokeWidth="1.5"
          />

          {/* Top GNSS Antenna Dome */}
          <circle cx="160" cy="80" r="12" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
          <circle cx="160" cy="80" r="4" fill="#ffffff" />

          {/* Avionics Status Ring on Canopy */}
          <path
            d="M142 95 Q160 102 178 95"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* 3-Axis Camera Gimbal Pod */}
          <rect x="148" y="125" width="24" height="20" rx="6" fill="#060e0a" stroke="#10b981" strokeWidth="1.5" />
          {/* Camera Lens */}
          <circle cx="160" cy="135" r="7" fill="#047857" stroke="#34d399" strokeWidth="2" />
          <circle cx="160" cy="135" r="3" fill="#022c22" />
          <circle cx="158" cy="133" r="1.5" fill="#ffffff" />

          {/* SVG Gradients */}
          <defs>
            <linearGradient id="fuselageGrad" x1="160" y1="55" x2="160" y2="135" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#061c12" />
              <stop offset="50%" stopColor="#040e08" />
              <stop offset="100%" stopColor="#020604" />
            </linearGradient>

            <linearGradient id="rotorGradFront" x1="18" y1="45" x2="102" y2="45" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#34d399" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0.1" />
            </linearGradient>

            <linearGradient id="rotorGradBack" x1="18" y1="155" x2="102" y2="155" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Soft Dynamic Shadow Underneath Drone */}
        <div className="w-48 sm:w-60 h-4 bg-emerald-950/60 rounded-full blur-md mt-2" />
      </div>

    </div>
  );
};
