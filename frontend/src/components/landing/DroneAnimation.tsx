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
              background: 'linear-gradient(180deg, rgba(196, 104, 36, 0.45) 0%, rgba(184, 93, 27, 0.08) 70%, rgba(196, 104, 36, 0) 100%)',
              boxShadow: '0 0 30px rgba(196, 104, 36, 0.35)',
            }}
          />
          {/* Scanning Beam Sweep Grid Line */}
          <div className="absolute inset-x-0 bottom-4 h-0.5 bg-[#C46824] shadow-[0_0_15px_#C46824] animate-pulse" />
        </div>
      )}

      {/* Floating Drone Body Container with CSS Motion */}
      <div className="relative z-10 animate-float flex flex-col items-center">
        
        {/* Quadcopter SVG Vector Model */}
        <svg
          viewBox="0 0 320 220"
          className="w-64 sm:w-80 h-auto filter drop-shadow-[0_15px_25px_rgba(40,30,20,0.35)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Landing Skids */}
          <path
            d="M95 145 L85 180 L135 180 M225 145 L235 180 L185 180"
            stroke="#64574A"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M75 180 L145 180 M175 180 L245 180"
            stroke="#4A3F35"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Carbon Fiber Diagonal Arms */}
          <line x1="160" y1="90" x2="60" y2="45" stroke="#2B2520" strokeWidth="8" strokeLinecap="round" />
          <line x1="160" y1="90" x2="260" y2="45" stroke="#2B2520" strokeWidth="8" strokeLinecap="round" />
          <line x1="160" y1="110" x2="60" y2="155" stroke="#2B2520" strokeWidth="8" strokeLinecap="round" />
          <line x1="160" y1="110" x2="260" y2="155" stroke="#2B2520" strokeWidth="8" strokeLinecap="round" />

          {/* Inner Accent Arm Lines */}
          <line x1="160" y1="90" x2="60" y2="45" stroke="#C46824" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
          <line x1="160" y1="90" x2="260" y2="45" stroke="#C46824" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
          <line x1="160" y1="110" x2="60" y2="155" stroke="#C46824" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
          <line x1="160" y1="110" x2="260" y2="155" stroke="#C46824" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />

          {/* 4 Brushless Motor Pods */}
          <circle cx="60" cy="45" r="14" fill="#1E1B18" stroke="#C46824" strokeWidth="2" />
          <circle cx="260" cy="45" r="14" fill="#1E1B18" stroke="#C46824" strokeWidth="2" />
          <circle cx="60" cy="155" r="14" fill="#1E1B18" stroke="#C46824" strokeWidth="2" />
          <circle cx="260" cy="155" r="14" fill="#1E1B18" stroke="#C46824" strokeWidth="2" />

          {/* Motor LED Navigation Lights */}
          <circle cx="60" cy="45" r="4" fill="#D97D34" className="animate-pulse" />
          <circle cx="260" cy="45" r="4" fill="#D97D34" className="animate-pulse" />
          <circle cx="60" cy="155" r="4" fill="#C43B2A" />
          <circle cx="260" cy="155" r="4" fill="#2D6A4F" />

          {/* 4 Spinning Rotor Blur Discs */}
          <ellipse cx="60" cy="45" rx="42" ry="10" fill="url(#rotorGradFront)" opacity="0.75" />
          <ellipse cx="260" cy="45" rx="42" ry="10" fill="url(#rotorGradFront)" opacity="0.75" />
          <ellipse cx="60" cy="155" rx="42" ry="10" fill="url(#rotorGradBack)" opacity="0.75" />
          <ellipse cx="260" cy="155" rx="42" ry="10" fill="url(#rotorGradBack)" opacity="0.75" />

          {/* Central Aerodynamic Fuselage / Chassis */}
          <path
            d="M130 70 C130 55, 190 55, 190 70 L200 120 C200 135, 120 135, 120 120 Z"
            fill="url(#fuselageGrad)"
            stroke="#C46824"
            strokeWidth="1.5"
          />

          {/* Top GNSS Antenna Dome */}
          <circle cx="160" cy="80" r="12" fill="#5A3515" stroke="#E59858" strokeWidth="2" />
          <circle cx="160" cy="80" r="4" fill="#ffffff" />

          {/* Avionics Status Ring on Canopy */}
          <path
            d="M142 95 Q160 102 178 95"
            stroke="#C46824"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* 3-Axis Camera Gimbal Pod */}
          <rect x="148" y="125" width="24" height="20" rx="6" fill="#1E1B18" stroke="#C46824" strokeWidth="1.5" />
          {/* Camera Lens */}
          <circle cx="160" cy="135" r="7" fill="#7A461A" stroke="#E59858" strokeWidth="2" />
          <circle cx="160" cy="135" r="3" fill="#1E1B18" />
          <circle cx="158" cy="133" r="1.5" fill="#ffffff" />

          {/* SVG Gradients */}
          <defs>
            <linearGradient id="fuselageGrad" x1="160" y1="55" x2="160" y2="135" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3E342B" />
              <stop offset="50%" stopColor="#2A231C" />
              <stop offset="100%" stopColor="#1E1B18" />
            </linearGradient>

            <linearGradient id="rotorGradFront" x1="18" y1="45" x2="102" y2="45" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C46824" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#C46824" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#C46824" stopOpacity="0.1" />
            </linearGradient>

            <linearGradient id="rotorGradBack" x1="18" y1="155" x2="102" y2="155" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#A85215" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#A85215" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#A85215" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Soft Dynamic Shadow Underneath Drone */}
        <div className="w-48 sm:w-60 h-4 bg-[#8C7A6B]/30 rounded-full blur-md mt-2" />
      </div>

    </div>
  );
};
