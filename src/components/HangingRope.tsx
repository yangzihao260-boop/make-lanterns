import React, { useState } from 'react';
import { CreatedLantern } from '../types';
import { LanternRenderer } from './LanternRenderer';
import { LANTERN_SHAPES, LANTERN_COLORS, LANTERN_PATTERNS } from '../data/lanternOptions';
import { soundEngine, speakEnglishText } from '../services/audioService';
import { Volume2, Sparkles, Wind, Trash2 } from 'lucide-react';

interface HangingRopeProps {
  lanterns: CreatedLantern[];
  onDropLantern: () => void;
  onClearRope: () => void;
  isDraggingLantern: boolean;
}

export const HangingRope: React.FC<HangingRopeProps> = ({
  lanterns,
  onDropLantern,
  onClearRope,
  isDraggingLantern,
}) => {
  const [selectedLantern, setSelectedLantern] = useState<CreatedLantern | null>(null);
  const [isBreezeActive, setIsBreezeActive] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    onDropLantern();
  };

  const handleLanternClick = (lantern: CreatedLantern) => {
    soundEngine.playClick();
    setSelectedLantern(lantern);

    const shape = LANTERN_SHAPES.find((s) => s.id === lantern.shapeId);
    const color = LANTERN_COLORS.find((c) => c.id === lantern.colorId);
    const pattern = LANTERN_PATTERNS.find((p) => p.id === lantern.patternId);

    const description = `A ${color?.nameEn.toLowerCase() || 'colourful'} ${shape?.nameEn.toLowerCase() || 'festive'} lantern with ${pattern?.nameEn.toLowerCase() || 'pretty'} patterns!`;
    speakEnglishText(description, 0.9);
  };

  const triggerBreeze = () => {
    soundEngine.playHang();
    setIsBreezeActive(true);
    setTimeout(() => setIsBreezeActive(false), 3000);
  };

  return (
    <div className="relative w-full z-10 select-none px-2 sm:px-6 md:px-12 my-2">
      {/* Top action / status bar for the rope */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-500/30 text-xs sm:text-sm text-amber-200 shadow-lg">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>
            Lanterns on Street: <strong className="text-amber-400 text-sm sm:text-base font-bold">{lanterns.length}</strong>
          </span>
          {lanterns.length > 0 && (
            <span className="hidden sm:inline text-slate-400">
              (Click any lantern to listen to its English name!)
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {lanterns.length > 0 && (
            <>
              <button
                id="btn-trigger-breeze"
                onClick={triggerBreeze}
                title="Make lanterns sway in the night breeze"
                className="flex items-center gap-1 text-xs sm:text-sm bg-slate-900/80 hover:bg-slate-800 text-sky-200 border border-sky-500/40 px-3 py-1.5 rounded-full transition-all active:scale-95 cursor-pointer shadow-md"
              >
                <Wind className={`w-3.5 h-3.5 ${isBreezeActive ? 'animate-spin' : ''}`} />
                <span>Night Breeze</span>
              </button>

              <button
                id="btn-clear-rope"
                onClick={() => {
                  soundEngine.playClick();
                  onClearRope();
                }}
                title="Clear lanterns to start fresh"
                className="flex items-center gap-1 text-xs sm:text-sm bg-slate-900/80 hover:bg-rose-950 text-slate-300 hover:text-rose-200 border border-slate-700 hover:border-rose-500/50 px-2.5 py-1.5 rounded-full transition-all active:scale-95 cursor-pointer shadow-md"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Hanging Rope Container with Drag Target */}
      <div
        id="hanging-rope-dropzone"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative w-full h-44 sm:h-52 rounded-2xl transition-all duration-300 flex flex-col justify-start items-center ${
          isDraggingLantern || isDragOver
            ? 'bg-amber-500/15 border-2 border-dashed border-amber-400/90 shadow-[0_0_30px_rgba(251,191,36,0.3)] ring-4 ring-amber-400/20'
            : 'border border-transparent'
        }`}
      >
        {/* Drop indicator banner when dragging */}
        {(isDraggingLantern || isDragOver) && (
          <div className="absolute top-2 z-30 bg-amber-400 text-slate-950 text-xs sm:text-sm font-semibold px-4 py-1 rounded-full shadow-lg animate-bounce flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Drop your lantern here to hang it on the rope! (松开挂到绳上)</span>
          </div>
        )}

        {/* The Hanging Rope Line (Natural Catenary Sag Curve) */}
        <div className="relative w-full h-12 pt-2">
          {/* Left & Right Iron Rope Mount Hooks */}
          <div className="absolute left-0 top-1 w-4 h-6 bg-gradient-to-r from-amber-700 to-amber-900 rounded-sm shadow-md border-l-2 border-amber-950 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-amber-400" />
          </div>
          <div className="absolute right-0 top-1 w-4 h-6 bg-gradient-to-l from-amber-700 to-amber-900 rounded-sm shadow-md border-r-2 border-amber-950 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-amber-400" />
          </div>

          {/* SVG Hemp Rope with subtle realistic sag */}
          <svg className="w-full h-10 overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 40">
            {/* Shadow under rope */}
            <path
              d="M 0 8 Q 500 24 1000 8"
              fill="none"
              stroke="#000000"
              strokeWidth="5"
              strokeOpacity="0.4"
            />
            {/* Outer braided hemp texture */}
            <path
              d="M 0 6 Q 500 22 1000 6"
              fill="none"
              stroke="#78350F"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            {/* Core rope highlight */}
            <path
              d="M 0 6 Q 500 22 1000 6"
              fill="none"
              stroke="#D97706"
              strokeWidth="2.5"
              strokeDasharray="5,3"
              strokeLinecap="round"
            />
            {/* Glowing fairy light sparkles along the rope */}
            {[80, 190, 310, 420, 540, 660, 780, 890].map((cx, i) => {
              // Approximate sag curve: y = 6 + 16 * (1 - ((cx - 500)/500)^2)
              const ratio = (cx - 500) / 500;
              const cy = 6 + 16 * (1 - ratio * ratio);
              return (
                <g key={i}>
                  <circle cx={cx} cy={cy} r="3" fill="#FEF08A" opacity="0.9" />
                  <circle cx={cx} cy={cy} r="6" fill="#FEF08A" opacity="0.35" />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Empty state hint when no lanterns hung yet */}
        {lanterns.length === 0 && !isDraggingLantern && (
          <div className="mt-8 flex flex-col items-center justify-center text-center p-4 rounded-xl bg-slate-900/60 backdrop-blur-sm border border-slate-700/60 max-w-md">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2 animate-pulse">
              <Sparkles className="w-5 h-5" />
            </div>
            <p className="text-amber-200 text-sm font-medium">
              The rope on the street is waiting for your lanterns!
            </p>
            <p className="text-slate-400 text-xs mt-1">
              街道的绳子空着呢！快在下方选择形状、颜色和花纹，制作美丽的灯笼挂上来吧！
            </p>
          </div>
        )}

        {/* The Row of Hung Lanterns on the Rope */}
        <div className="absolute top-4 inset-x-4 sm:inset-x-8 h-36 flex items-start justify-around overflow-x-auto no-scrollbar pt-1">
          {lanterns.map((lantern, index) => {
            const shape = LANTERN_SHAPES.find((s) => s.id === lantern.shapeId);
            const color = LANTERN_COLORS.find((c) => c.id === lantern.colorId);
            const pattern = LANTERN_PATTERNS.find((p) => p.id === lantern.patternId);

            // Compute natural sway animation
            const swayStyle = {
              animationName: 'gentleSway',
              animationDuration: isBreezeActive ? '1.5s' : `${lantern.swayDuration}s`,
              animationDelay: `${lantern.swayDelay}s`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'ease-in-out',
            };

            return (
              <div
                key={lantern.id}
                id={`hung-lantern-${lantern.id}`}
                onClick={() => handleLanternClick(lantern)}
                className="group relative flex flex-col items-center cursor-pointer transition-transform hover:scale-110 active:scale-95 px-1 sm:px-2 flex-shrink-0"
                style={{ transformOrigin: 'top center' }}
              >
                {/* Hanging string connecting to rope */}
                <div className="w-0.5 h-3 sm:h-4 bg-amber-600 shadow-sm" />

                {/* Animated Lantern Body */}
                <div style={swayStyle} className="relative flex flex-col items-center">
                  <LanternRenderer
                    shapeId={lantern.shapeId}
                    colorId={lantern.colorId}
                    patternId={lantern.patternId}
                    size={lanterns.length > 8 ? 'sm' : 'md'}
                    glow={true}
                  />

                  {/* Number badge (Order of hanging) */}
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-slate-900/90 text-amber-300 text-[10px] font-bold flex items-center justify-center border border-amber-400/50 shadow">
                    {index + 1}
                  </span>
                </div>

                {/* Hover Quick Tooltip / English Name Card */}
                <div className="opacity-0 group-hover:opacity-100 pointer-events-none absolute -bottom-10 z-40 bg-slate-900/95 text-slate-100 text-xs py-1 px-2.5 rounded-lg border border-amber-400/60 shadow-xl whitespace-nowrap transition-opacity flex items-center gap-1">
                  <Volume2 className="w-3 h-3 text-amber-400" />
                  <span className="font-semibold text-amber-300">{color?.nameEn}</span>
                  <span>{shape?.nameEn}</span>
                  <span className="text-slate-400 text-[10px]">({shape?.nameZh})</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Dialog/Modal when clicking a hung lantern */}
      {selectedLantern && (
        <div
          id="lantern-detail-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setSelectedLantern(null)}
        >
          <div
            className="bg-slate-900 border-2 border-amber-400/80 rounded-2xl p-6 max-w-sm w-full shadow-[0_0_40px_rgba(251,191,36,0.3)] text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedLantern(null)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white text-lg w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center"
            >
              ✕
            </button>

            <div className="flex justify-center my-2">
              <LanternRenderer
                shapeId={selectedLantern.shapeId}
                colorId={selectedLantern.colorId}
                patternId={selectedLantern.patternId}
                size="lg"
                glow={true}
              />
            </div>

            <div className="mt-4 space-y-2">
              <div className="text-amber-400 text-xs font-semibold uppercase tracking-wider">
                Lantern English Vocabulary
              </div>
              
              <div className="text-xl font-bold text-white flex items-center justify-center gap-2">
                <span>
                  {LANTERN_COLORS.find((c) => c.id === selectedLantern.colorId)?.nameEn}{' '}
                  {LANTERN_SHAPES.find((s) => s.id === selectedLantern.shapeId)?.nameEn}
                </span>
                <button
                  onClick={() => {
                    const desc = `${LANTERN_COLORS.find((c) => c.id === selectedLantern.colorId)?.nameEn} ${LANTERN_SHAPES.find((s) => s.id === selectedLantern.shapeId)?.nameEn}`;
                    speakEnglishText(desc);
                  }}
                  className="text-amber-400 hover:text-amber-300 p-1.5 rounded-full bg-slate-800"
                  title="Listen pronunciation"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-slate-300 text-sm">
                Pattern: <strong className="text-amber-200">{LANTERN_PATTERNS.find((p) => p.id === selectedLantern.patternId)?.nameEn}</strong>{' '}
                ({LANTERN_PATTERNS.find((p) => p.id === selectedLantern.patternId)?.nameZh})
              </p>

              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-amber-100 mt-3">
                📖 Sentence Practice:
                <p className="text-amber-300 font-semibold mt-1">
                  &ldquo;Streets and parks are filled with colourful lanterns in different shapes.&rdquo;
                </p>
              </div>

              <button
                onClick={() => {
                  speakEnglishText('Streets and parks are filled with colourful lanterns in different shapes.', 0.85);
                }}
                className="mt-3 w-full py-2 bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-95"
              >
                <Volume2 className="w-4 h-4" />
                <span>Read Target Sentence (朗读句子)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
