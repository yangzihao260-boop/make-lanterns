import React from 'react';
import { LANTERN_SHAPES, LANTERN_COLORS, LANTERN_PATTERNS } from '../data/lanternOptions';

interface LanternRendererProps {
  shapeId: string;
  colorId: string;
  patternId: string;
  size?: 'sm' | 'md' | 'lg' | 'preview';
  showTassel?: boolean;
  glow?: boolean;
  animated?: boolean;
  className?: string;
  id?: string;
}

export const LanternRenderer: React.FC<LanternRendererProps> = ({
  shapeId,
  colorId,
  patternId,
  size = 'md',
  showTassel = true,
  glow = true,
  className = '',
  id,
}) => {
  const shape = LANTERN_SHAPES.find((s) => s.id === shapeId) || LANTERN_SHAPES[0];
  const color = LANTERN_COLORS.find((c) => c.id === colorId) || LANTERN_COLORS[0];
  const pattern = LANTERN_PATTERNS.find((p) => p.id === patternId) || LANTERN_PATTERNS[0];

  const sizeDimensions = {
    sm: { width: 44, height: 68 },
    md: { width: 72, height: 110 },
    lg: { width: 110, height: 165 },
    preview: { width: 160, height: 230 },
  }[size];

  const uniqueId = React.useId().replace(/:/g, '');
  const gradId = `lantern-grad-${uniqueId}`;
  const glowGradId = `lantern-glow-${uniqueId}`;
  const clipId = `lantern-clip-${uniqueId}`;

  return (
    <div
      id={id}
      className={`relative flex flex-col items-center select-none ${className}`}
      style={{ width: sizeDimensions.width, height: sizeDimensions.height }}
    >
      <svg
        viewBox="0 0 100 145"
        className="w-full h-full overflow-visible drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]"
        style={{
          filter: glow
            ? `drop-shadow(0 0 16px ${color.glowColor}99) drop-shadow(0 0 32px ${color.mainColor}66)`
            : undefined,
        }}
      >
        <defs>
          {/* Main 3D volumetric gradient */}
          <radialGradient id={gradId} cx="45%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#FFF9E6" stopOpacity="0.95" />
            <stop offset="25%" stopColor={color.glowColor} stopOpacity="0.9" />
            <stop offset="60%" stopColor={color.mainColor} stopOpacity="0.95" />
            <stop offset="100%" stopColor={color.darkColor} stopOpacity="1" />
          </radialGradient>

          {/* Inner candle flame glow */}
          <radialGradient id={glowGradId} cx="50%" cy="45%" r="35%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#FEF08A" stopOpacity="0.5" />
            <stop offset="100%" stopColor={color.mainColor} stopOpacity="0" />
          </radialGradient>

          {/* Clip path of the lantern body to contain patterns */}
          <clipPath id={clipId}>
            <path d={shape.bodyPath} />
          </clipPath>
        </defs>

        {/* Top hanging red cord & ring */}
        <line x1="50" y1="0" x2="50" y2="12" stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="50" cy="11" r="3.2" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
        <circle cx="50" cy="11" r="1.4" fill="#1E293B" />

        {/* Top decorative cap / eaves */}
        <path
          d="M 32 14 C 42 10, 58 10, 68 14 C 70 17, 66 18, 50 18 C 34 18, 30 17, 32 14 Z"
          fill="#D97706"
          stroke="#78350F"
          strokeWidth="1"
        />

        {/* Lantern Body with clipping for internal patterns */}
        <g>
          {/* Base shape fill */}
          <path
            d={shape.bodyPath}
            fill={`url(#${gradId})`}
            stroke="#FDE68A"
            strokeWidth="1.2"
            strokeOpacity="0.8"
          />

          {/* Patterns rendered clipped inside the lantern body */}
          <g clipPath={`url(#${clipId})`}>
            {/* Pattern 1: Clouds (祥云) */}
            {pattern.patternType === 'clouds' && (
              <g stroke="#FDE68A" strokeWidth="1.2" fill="none" opacity="0.65">
                <path d="M 28 42 C 32 36, 42 36, 44 42 C 48 40, 54 44, 52 50 C 44 50, 36 50, 28 42 Z" />
                <path d="M 52 65 C 56 60, 68 60, 70 66 C 74 65, 80 69, 78 75 C 68 75, 58 75, 52 65 Z" />
                <path d="M 30 82 C 34 76, 46 76, 48 82 C 52 80, 60 84, 58 90 C 48 90, 38 90, 30 82 Z" />
              </g>
            )}

            {/* Pattern 2: Dragon Scales (龙纹/回纹) */}
            {pattern.patternType === 'dragon' && (
              <g stroke="#FEF08A" strokeWidth="1" fill="none" opacity="0.6">
                <path d="M 20 35 Q 35 48 50 35 Q 65 48 80 35" />
                <path d="M 20 52 Q 35 65 50 52 Q 65 65 80 52" />
                <path d="M 20 69 Q 35 82 50 69 Q 65 82 80 69" />
                <path d="M 35 35 L 35 75 M 50 25 L 50 85 M 65 35 L 65 75" strokeDasharray="2,3" />
              </g>
            )}

            {/* Pattern 3: Plum Blossom (梅花) */}
            {pattern.patternType === 'blossom' && (
              <g fill="#FFFBEB" stroke="#F59E0B" strokeWidth="0.8" opacity="0.8">
                {/* Center blossom */}
                <circle cx="50" cy="54" r="3.2" fill="#FEF08A" />
                <circle cx="50" cy="46" r="4" fill="#FFE4E6" />
                <circle cx="57" cy="51" r="4" fill="#FFE4E6" />
                <circle cx="55" cy="60" r="4" fill="#FFE4E6" />
                <circle cx="45" cy="60" r="4" fill="#FFE4E6" />
                <circle cx="43" cy="51" r="4" fill="#FFE4E6" />
                {/* Small blossom */}
                <circle cx="34" cy="74" r="2" fill="#FEF08A" />
                <circle cx="34" cy="70" r="2.6" fill="#FFE4E6" />
                <circle cx="38" cy="73" r="2.6" fill="#FFE4E6" />
                <circle cx="37" cy="77" r="2.6" fill="#FFE4E6" />
                <circle cx="31" cy="77" r="2.6" fill="#FFE4E6" />
                <circle cx="30" cy="73" r="2.6" fill="#FFE4E6" />
              </g>
            )}

            {/* Pattern 4: Bamboo (竹叶) */}
            {pattern.patternType === 'bamboo' && (
              <g stroke="#D1FAE5" strokeWidth="1.2" fill="#ECFDF5" opacity="0.75">
                <path d="M 45 92 L 47 30 M 55 92 L 53 30" stroke="#FDE68A" strokeWidth="1" />
                <path d="M 47 48 C 38 45, 30 50, 24 58 C 32 56, 40 54, 47 50 Z" />
                <path d="M 53 58 C 62 55, 70 60, 76 68 C 68 66, 60 64, 53 60 Z" />
                <path d="M 47 68 C 36 65, 32 72, 28 80 C 35 77, 42 75, 47 70 Z" />
                <path d="M 53 38 C 64 35, 72 40, 78 48 C 70 46, 62 44, 53 40 Z" />
              </g>
            )}

            {/* Pattern 5: Window Lattice (窗格) */}
            {pattern.patternType === 'lattice' && (
              <g stroke="#FEF08A" strokeWidth="1" fill="none" opacity="0.6">
                <rect x="30" y="32" width="40" height="48" rx="2" strokeWidth="1.2" />
                <line x1="30" y1="56" x2="70" y2="56" />
                <line x1="50" y1="32" x2="50" y2="80" />
                <circle cx="50" cy="56" r="8" />
                <polygon points="50,42 62,56 50,70 38,56" />
              </g>
            )}

            {/* Pattern 6: Fireworks Sparkle (烟花) */}
            {pattern.patternType === 'fireworks' && (
              <g stroke="#FFFBEB" strokeWidth="1.3" opacity="0.75">
                <line x1="50" y1="42" x2="50" y2="66" />
                <line x1="38" y1="54" x2="62" y2="54" />
                <line x1="41" y1="45" x2="59" y2="63" strokeDasharray="1,2" />
                <line x1="59" y1="45" x2="41" y2="63" strokeDasharray="1,2" />
                <circle cx="50" cy="54" r="2.5" fill="#FDE68A" />
                <circle cx="34" cy="76" r="1.5" fill="#FFF" />
                <circle cx="68" cy="74" r="1.5" fill="#FFF" />
                <circle cx="66" cy="38" r="1.5" fill="#FFF" />
                <circle cx="32" cy="38" r="1.5" fill="#FFF" />
              </g>
            )}

            {/* Pattern 7: Lucky Knot (中国结) */}
            {pattern.patternType === 'knot' && (
              <g stroke="#FEF08A" strokeWidth="1.2" fill="none" opacity="0.75">
                <rect x="42" y="46" width="16" height="16" transform="rotate(45 50 54)" rx="2" />
                <circle cx="50" cy="46" r="4.5" />
                <circle cx="58" cy="54" r="4.5" />
                <circle cx="50" cy="62" r="4.5" />
                <circle cx="42" cy="54" r="4.5" />
                <circle cx="50" cy="54" r="2.5" fill="#FDE68A" />
              </g>
            )}

            {/* Pattern 8: Moon & Stars (星月) */}
            {pattern.patternType === 'moonstar' && (
              <g fill="#FEF08A" opacity="0.8">
                {/* Crescent moon */}
                <path d="M 52 40 A 12 12 0 1 0 64 56 A 10 10 0 1 1 52 40 Z" />
                {/* Twinkling stars */}
                <polygon points="34,42 36,46 40,47 37,50 38,54 34,52 30,54 31,50 28,47 32,46" transform="scale(0.8) translate(10, 5)" />
                <polygon points="66,64 68,68 72,69 69,72 70,76 66,74 62,76 63,72 60,69 64,68" transform="scale(0.7) translate(28, 26)" />
                <circle cx="40" cy="68" r="1.6" fill="#FFF" />
                <circle cx="62" cy="42" r="1.4" fill="#FFF" />
              </g>
            )}

            {/* Inner candlelight glow effect */}
            <circle cx="50" cy="54" r="26" fill={`url(#${glowGradId})`} />
          </g>
        </g>

        {/* Vertical ribs for traditional look */}
        <path
          d={
            shape.id === 'cylinder'
              ? 'M 40 15 L 40 92 M 60 15 L 60 92 M 50 15 L 50 92'
              : 'M 50 15 C 60 40, 60 70, 50 95 M 50 15 C 40 40, 40 70, 50 95'
          }
          stroke="#FFFFFF"
          strokeWidth="0.8"
          strokeOpacity="0.4"
          fill="none"
          clipPath={`url(#${clipId})`}
        />

        {/* Bottom decorative cap */}
        <path
          d="M 36 94 C 44 96, 56 96, 64 94 C 62 98, 58 100, 50 100 C 42 100, 38 98, 36 94 Z"
          fill="#D97706"
          stroke="#78350F"
          strokeWidth="1"
        />

        {/* Bottom golden/red tassels (流苏) */}
        {showTassel && (
          <g>
            {/* Tassel ring/knot */}
            <circle cx="50" cy="102" r="3" fill="#DC2626" stroke="#B45309" strokeWidth="0.8" />
            <circle cx="50" cy="107" r="2.2" fill="#F59E0B" />
            
            {/* Flowing silk tassel strands */}
            <line x1="47" y1="109" x2="45" y2="136" stroke={color.tasselColor} strokeWidth="1.8" strokeLinecap="round" />
            <line x1="50" y1="109" x2="50" y2="140" stroke={color.tasselColor} strokeWidth="2.2" strokeLinecap="round" />
            <line x1="53" y1="109" x2="55" y2="136" stroke={color.tasselColor} strokeWidth="1.8" strokeLinecap="round" />
            <line x1="49" y1="109" x2="48" y2="138" stroke="#FDE68A" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="51" y1="109" x2="52" y2="138" stroke="#FDE68A" strokeWidth="1.2" strokeLinecap="round" />
            
            {/* Little jade/golden bead at bottom */}
            <circle cx="50" cy="141" r="1.8" fill="#F59E0B" />
          </g>
        )}
      </svg>
    </div>
  );
};
