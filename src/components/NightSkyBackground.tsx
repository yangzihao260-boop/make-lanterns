import React from 'react';

export const NightSkyBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Deep night sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#090d1f] via-[#0f172a] to-[#1e1b4b]" />

      {/* Atmospheric misty festival night glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[300px] bg-rose-500/10 rounded-full blur-3xl" />

      {/* Twinkling stars */}
      <div className="absolute inset-0 opacity-80">
        {[
          { top: '8%', left: '12%', size: 'w-1.5 h-1.5', delay: '0s' },
          { top: '15%', left: '28%', size: 'w-1 h-1', delay: '1s' },
          { top: '6%', left: '42%', size: 'w-1 h-1', delay: '2s' },
          { top: '22%', left: '60%', size: 'w-1.5 h-1.5', delay: '1.5s' },
          { top: '12%', left: '78%', size: 'w-1 h-1', delay: '0.5s' },
          { top: '18%', left: '92%', size: 'w-1.5 h-1.5', delay: '2.5s' },
          { top: '28%', left: '15%', size: 'w-1 h-1', delay: '3s' },
          { top: '35%', left: '85%', size: 'w-1.5 h-1.5', delay: '1.8s' },
        ].map((star, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-amber-100 ${star.size} animate-pulse`}
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
              animationDuration: '3s',
            }}
          />
        ))}
      </div>

      {/* The Magnificent Full Moon (满月) */}
      <div className="absolute top-6 right-10 sm:right-24 md:right-32 flex items-center justify-center">
        {/* Soft lunar halo */}
        <div className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-amber-100/15 blur-2xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-amber-200/25 blur-lg" />
        
        {/* The Full Moon disk */}
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-[#FFF3BF] via-[#FFFDF0] to-[#FFFFFF] shadow-[0_0_50px_rgba(254,240,138,0.7)] flex items-center justify-center overflow-hidden border border-amber-100/60">
          {/* Subtle lunar maria textures */}
          <div className="absolute w-10 h-8 rounded-full bg-amber-200/30 blur-sm top-3 left-4" />
          <div className="absolute w-14 h-10 rounded-full bg-amber-200/25 blur-sm top-8 right-3" />
          <div className="absolute w-12 h-12 rounded-full bg-amber-200/20 blur-sm bottom-2 left-6" />
          {/* Mythical Moon Rabbit / Osmanthus tree subtle silhouette */}
          <svg className="w-16 h-16 text-amber-900/20 absolute bottom-1 right-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" opacity="0" />
            <ellipse cx="14" cy="15" rx="4" ry="3" />
            <circle cx="16" cy="11" r="2.2" />
            <path d="M 16 10 C 17 6, 19 6, 18 10 Z" />
            <path d="M 15 10 C 15 7, 13 7, 14.5 10 Z" />
          </svg>
        </div>

        {/* Soft flowing night clouds across the moon */}
        <div className="absolute -left-12 top-10 w-44 h-8 bg-gradient-to-r from-transparent via-slate-800/40 to-transparent blur-md transform -rotate-6" />
        <div className="absolute -right-8 bottom-4 w-36 h-6 bg-gradient-to-r from-transparent via-slate-900/50 to-transparent blur-md" />
      </div>

      {/* Distant Sky Lanterns (孔明灯) floating upward */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { x: '18%', y: '24%', size: 'w-3 h-4', opacity: '0.7', anim: 'animate-bounce' },
          { x: '35%', y: '16%', size: 'w-2.5 h-3.5', opacity: '0.5' },
          { x: '52%', y: '28%', size: 'w-3 h-4.5', opacity: '0.6' },
          { x: '72%', y: '36%', size: 'w-2 h-3', opacity: '0.4' },
          { x: '88%', y: '20%', size: 'w-2.5 h-3.5', opacity: '0.5' },
        ].map((sk, idx) => (
          <div
            key={idx}
            className={`absolute flex flex-col items-center ${sk.size}`}
            style={{ left: sk.x, top: sk.y, opacity: sk.opacity }}
          >
            <div className="w-full h-full bg-gradient-to-b from-amber-200 via-rose-500 to-amber-600 rounded-t-sm shadow-[0_0_8px_#F59E0B]" />
            <div className="w-1 h-1 bg-amber-200 rounded-full blur-[1px]" />
          </div>
        ))}
      </div>

      {/* Traditional Chinese Street Scene Silhouettes (街道建筑与飞檐) */}
      <div className="absolute bottom-0 inset-x-0 h-64 md:h-72 flex items-end justify-between opacity-85">
        {/* Left Pavilion & Eaves */}
        <div className="relative w-1/3 max-w-[340px] h-full">
          <svg viewBox="0 0 300 240" className="w-full h-full preserve-3d" preserveAspectRatio="none">
            {/* Distant roofline */}
            <path
              d="M 0 140 Q 60 120 120 135 L 140 160 L 0 160 Z"
              fill="#0b1120"
              opacity="0.6"
            />
            {/* Main traditional curved roof eave */}
            <path
              d="M -20 170 Q 40 110 140 145 C 150 148, 160 142, 170 135 C 160 150, 140 155, 120 155 L 140 240 L 0 240 Z"
              fill="#060913"
            />
            {/* Roof ridge ornaments (吻兽) */}
            <path d="M 165 135 C 175 125, 175 135, 168 140 Z" fill="#060913" />
            {/* Lit warm paper window */}
            <rect x="25" y="175" width="28" height="35" rx="3" fill="#F59E0B" opacity="0.35" />
            <line x1="39" y1="175" x2="39" y2="210" stroke="#060913" strokeWidth="2" />
            <line x1="25" y1="192" x2="53" y2="192" stroke="#060913" strokeWidth="2" />

            <rect x="65" y="175" width="28" height="35" rx="3" fill="#EF4444" opacity="0.3" />
            <line x1="79" y1="175" x2="79" y2="210" stroke="#060913" strokeWidth="2" />
            <line x1="65" y1="192" x2="93" y2="192" stroke="#060913" strokeWidth="2" />
            
            {/* Wooden street pillar for the hanging rope */}
            <rect x="135" y="90" width="12" height="150" fill="#1C1917" stroke="#292524" strokeWidth="1" />
            <circle cx="141" cy="95" r="4" fill="#B45309" />
          </svg>
        </div>

        {/* Center Street Vista (街道水景与石板路) */}
        <div className="relative flex-1 h-28 flex flex-col justify-end items-center">
          {/* Street silhouette pavement and traditional bridge */}
          <div className="w-full h-12 bg-gradient-to-t from-[#05070d] via-[#090d16] to-transparent" />
          {/* Warm reflection of hanging lanterns on the wet street stone pavers */}
          <div className="absolute bottom-1 inset-x-8 h-4 bg-amber-500/10 blur-md rounded-full" />
        </div>

        {/* Right Pavilion & Eaves */}
        <div className="relative w-1/3 max-w-[340px] h-full flex justify-end">
          <svg viewBox="0 0 300 240" className="w-full h-full" preserveAspectRatio="none">
            {/* Distant building */}
            <path
              d="M 300 130 Q 230 115 170 135 L 160 160 L 300 160 Z"
              fill="#0b1120"
              opacity="0.6"
            />
            {/* Main eave */}
            <path
              d="M 320 165 Q 250 110 150 145 C 140 148, 130 142, 120 135 C 130 150, 150 155, 170 155 L 150 240 L 300 240 Z"
              fill="#060913"
            />
            <path d="M 125 135 C 115 125, 115 135, 122 140 Z" fill="#060913" />

            {/* Lit warm window */}
            <rect x="235" y="175" width="28" height="35" rx="3" fill="#F59E0B" opacity="0.35" />
            <line x1="249" y1="175" x2="249" y2="210" stroke="#060913" strokeWidth="2" />
            <line x1="235" y1="192" x2="263" y2="192" stroke="#060913" strokeWidth="2" />

            <rect x="195" y="175" width="28" height="35" rx="3" fill="#F97316" opacity="0.3" />
            <line x1="209" y1="175" x2="209" y2="210" stroke="#060913" strokeWidth="2" />
            <line x1="195" y1="192" x2="223" y2="192" stroke="#060913" strokeWidth="2" />

            {/* Right wooden street pillar for the hanging rope */}
            <rect x="145" y="90" width="12" height="150" fill="#1C1917" stroke="#292524" strokeWidth="1" />
            <circle cx="151" cy="95" r="4" fill="#B45309" />
          </svg>
        </div>
      </div>

      {/* Willow / Blossom branch silhouette at top-left edge framing the street */}
      <div className="absolute top-0 left-0 w-48 sm:w-72 h-44 opacity-40 pointer-events-none">
        <svg viewBox="0 0 200 120" className="w-full h-full text-slate-900 fill-current">
          <path d="M 0 0 Q 60 20 120 10 Q 80 40 40 50 Q 10 30 0 0 Z" />
          <path d="M 40 25 Q 70 60 65 95" stroke="#0f172a" strokeWidth="1.5" fill="none" />
          <path d="M 70 18 Q 110 50 120 85" stroke="#0f172a" strokeWidth="1.5" fill="none" />
          <circle cx="65" cy="85" r="3" fill="#F43F5E" opacity="0.6" />
          <circle cx="118" cy="78" r="3" fill="#F43F5E" opacity="0.6" />
          <circle cx="95" cy="45" r="2.5" fill="#F43F5E" opacity="0.6" />
        </svg>
      </div>
    </div>
  );
};
