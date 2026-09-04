import React, { useState, useEffect, useRef } from 'react';
import { LANTERN_SHAPES, LANTERN_COLORS, LANTERN_PATTERNS } from '../data/lanternOptions';
import { LanternRenderer } from './LanternRenderer';
import { soundEngine, speakEnglishText } from '../services/audioService';
import {
  Timer,
  CheckCircle2,
  Sparkles,
  Shuffle,
  Volume2,
  Palette,
  Shapes,
  Flower2,
  Move,
} from 'lucide-react';

interface LanternMakerProps {
  onHangLantern: (shapeId: string, colorId: string, patternId: string) => void;
  onDragStartChange: (isDragging: boolean) => void;
  lanternIndex: number;
}

export const LanternMaker: React.FC<LanternMakerProps> = ({
  onHangLantern,
  onDragStartChange,
  lanternIndex,
}) => {
  // Current crafting selections
  const [selectedShapeId, setSelectedShapeId] = useState<string>('palace');
  const [selectedColorId, setSelectedColorId] = useState<string>('crimson');
  const [selectedPatternId, setSelectedPatternId] = useState<string>('clouds');

  // Active customization tab
  const [activeTab, setActiveTab] = useState<'shape' | 'color' | 'pattern'>('shape');

  // 15-second countdown timer
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const timerRef = useRef<number | null>(null);

  // Audio speech option toggle for young learners
  const [autoSpeakWords, setAutoSpeakWords] = useState<boolean>(true);

  // Reset timer whenever a new lantern round begins
  useEffect(() => {
    setTimeLeft(15);
    setIsTimerRunning(true);
  }, [lanternIndex]);

  // Countdown effect
  useEffect(() => {
    if (!isTimerRunning) return;

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time expired! Auto-hang lantern with current/default style
          if (timerRef.current) clearInterval(timerRef.current);
          handleTimeUp();
          return 0;
        }

        // Play warning tick on last 5 seconds
        if (prev <= 6) {
          soundEngine.playTick(true);
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, selectedShapeId, selectedColorId, selectedPatternId]);

  const handleTimeUp = () => {
    soundEngine.playTimeoutChime();
    // Prompt: 时间结束还没有选择好，就按默认的样式把灯笼挂到绳子上
    onHangLantern(selectedShapeId, selectedColorId, selectedPatternId);
  };

  const handleCompleteAndHang = () => {
    soundEngine.playHang();
    if (timerRef.current) clearInterval(timerRef.current);
    onHangLantern(selectedShapeId, selectedColorId, selectedPatternId);
  };

  const handleRandomize = () => {
    soundEngine.playSelect();
    const randomShape = LANTERN_SHAPES[Math.floor(Math.random() * LANTERN_SHAPES.length)].id;
    const randomColor = LANTERN_COLORS[Math.floor(Math.random() * LANTERN_COLORS.length)].id;
    const randomPattern = LANTERN_PATTERNS[Math.floor(Math.random() * LANTERN_PATTERNS.length)].id;

    setSelectedShapeId(randomShape);
    setSelectedColorId(randomColor);
    setSelectedPatternId(randomPattern);
  };

  const handleSelectShape = (id: string, nameEn: string) => {
    soundEngine.playSelect();
    setSelectedShapeId(id);
    if (autoSpeakWords) {
      speakEnglishText(`${nameEn} shape`, 1.0);
    }
  };

  const handleSelectColor = (id: string, nameEn: string) => {
    soundEngine.playSelect();
    setSelectedColorId(id);
    if (autoSpeakWords) {
      speakEnglishText(`${nameEn} color`, 1.0);
    }
  };

  const handleSelectPattern = (id: string, nameEn: string) => {
    soundEngine.playSelect();
    setSelectedPatternId(id);
    if (autoSpeakWords) {
      speakEnglishText(`${nameEn} pattern`, 1.0);
    }
  };

  // Drag handlers for the lantern preview
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({
      shapeId: selectedShapeId,
      colorId: selectedColorId,
      patternId: selectedPatternId,
    }));
    e.dataTransfer.effectAllowed = 'copy';
    onDragStartChange(true);
  };

  const handleDragEnd = () => {
    onDragStartChange(false);
  };

  // Current selections
  const currentShape = LANTERN_SHAPES.find((s) => s.id === selectedShapeId);
  const currentColor = LANTERN_COLORS.find((c) => c.id === selectedColorId);
  const currentPattern = LANTERN_PATTERNS.find((p) => p.id === selectedPatternId);

  // Timer color indicator
  const timerColor =
    timeLeft > 8
      ? 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40'
      : timeLeft > 4
      ? 'text-amber-400 bg-amber-950/60 border-amber-500/40'
      : 'text-rose-400 bg-rose-950/70 border-rose-500/60 animate-pulse';

  return (
    <div className="relative w-full z-20 px-2 sm:px-6 md:px-12 pb-6 select-none">
      <div className="max-w-5xl mx-auto bg-slate-900/90 backdrop-blur-md rounded-2xl border border-amber-500/30 shadow-[0_12px_40px_rgba(0,0,0,0.6)] p-3 sm:p-5">
        
        {/* Top Control Bar: Title, 15-second Timer, Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              #{lanternIndex}
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-100 flex items-center gap-1.5">
                <span>DIY Lantern Workshop</span>
                <span className="text-xs font-normal text-amber-400">制作属于你的专属灯笼</span>
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-400">
                Choose 8 shapes, 8 colours, and 8 patterns!
              </p>
            </div>
          </div>

          {/* The 15-second countdown timer badge */}
          <div className="flex items-center gap-2">
            <div
              id="countdown-timer-badge"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-inner transition-colors font-mono font-bold text-sm sm:text-base ${timerColor}`}
            >
              <Timer className={`w-4 h-4 ${timeLeft <= 4 ? 'animate-bounce' : ''}`} />
              <span>00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
              <span className="text-[10px] font-sans font-normal opacity-75 hidden sm:inline">
                {timeLeft <= 4 ? '即将自动悬挂!' : '倒计时'}
              </span>
            </div>

            {/* Randomize button */}
            <button
              id="btn-random-lantern"
              onClick={handleRandomize}
              title="Randomize style (随机样式)"
              className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 flex items-center gap-1 text-xs active:scale-95 transition-all"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">随机</span>
            </button>

            {/* Voice toggle */}
            <button
              onClick={() => {
                soundEngine.playClick();
                setAutoSpeakWords(!autoSpeakWords);
              }}
              title="Speak vocabulary words when selected"
              className={`px-2.5 py-1.5 rounded-xl border flex items-center gap-1 text-xs transition-all active:scale-95 ${
                autoSpeakWords
                  ? 'bg-amber-500/20 border-amber-400/60 text-amber-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{autoSpeakWords ? '语音开' : '静音'}</span>
            </button>
          </div>
        </div>

        {/* Main Work Area: Left Preview & Drag Zone, Right 3-Way Customizer */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center">
          
          {/* Left Column: Live Lantern Preview, Drag & Drop card, Complete Button */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-b from-slate-950/70 to-slate-900/90 border border-amber-500/20 relative">
            <div className="text-[11px] text-amber-300/80 mb-1 flex items-center gap-1 font-semibold uppercase tracking-wider">
              <Move className="w-3.5 h-3.5" />
              <span>拖动灯笼或点击完成挂上绳子</span>
            </div>

            {/* Draggable Preview Canvas */}
            <div
              id="draggable-lantern-preview"
              draggable={true}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              className="relative p-3 rounded-2xl cursor-grab active:cursor-grabbing hover:scale-105 transition-transform duration-200 group flex flex-col items-center justify-center"
              title="Click and drag this lantern onto the rope above!"
            >
              <LanternRenderer
                shapeId={selectedShapeId}
                colorId={selectedColorId}
                patternId={selectedPatternId}
                size="preview"
                glow={true}
              />

              {/* Drag instruction overlay badge */}
              <div className="mt-2 opacity-80 group-hover:opacity-100 transition-opacity bg-slate-900/90 text-amber-300 text-[11px] px-3 py-1 rounded-full border border-amber-500/40 flex items-center gap-1 shadow-md">
                <Sparkles className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
                <span>可直接拖至上方绳子 (Drag Me)</span>
              </div>
            </div>

            {/* Current Selected Attributes Label */}
            <div className="text-center mt-2 space-y-0.5">
              <div className="text-sm font-bold text-amber-200">
                {currentColor?.nameEn} {currentShape?.nameEn}
              </div>
              <div className="text-xs text-slate-300">
                Pattern: {currentPattern?.nameEn} ({currentPattern?.nameZh})
              </div>
            </div>

            {/* Primary "Complete & Hang" Button */}
            <button
              id="btn-complete-and-hang"
              onClick={handleCompleteAndHang}
              className="mt-3 w-full py-3 px-4 bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 hover:from-amber-400 hover:via-rose-400 hover:to-amber-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-rose-900/30 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
            >
              <CheckCircle2 className="w-5 h-5 text-slate-950" />
              <span>制作完成，挂到绳子上！ (Done & Hang)</span>
            </button>
          </div>

          {/* Right Column: Customization Tabs (8 Shapes, 8 Colors, 8 Patterns) */}
          <div className="md:col-span-7 flex flex-col justify-start">
            
            {/* Tab Navigation: Shape, Color, Pattern */}
            <div className="flex rounded-xl bg-slate-950/80 p-1 border border-slate-800 mb-3.5">
              <button
                id="tab-select-shape"
                onClick={() => {
                  soundEngine.playClick();
                  setActiveTab('shape');
                }}
                className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'shape'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Shapes className="w-4 h-4" />
                <span>1. 形状 Shapes (8)</span>
              </button>

              <button
                id="tab-select-color"
                onClick={() => {
                  soundEngine.playClick();
                  setActiveTab('color');
                }}
                className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'color'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Palette className="w-4 h-4" />
                <span>2. 颜色 Colours (8)</span>
              </button>

              <button
                id="tab-select-pattern"
                onClick={() => {
                  soundEngine.playClick();
                  setActiveTab('pattern');
                }}
                className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'pattern'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Flower2 className="w-4 h-4" />
                <span>3. 花纹 Patterns (8)</span>
              </button>
            </div>

            {/* Tab 1 Content: 8 Shapes */}
            {activeTab === 'shape' && (
              <div className="space-y-2 animate-fade-in">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>点击选择灯笼形状 • Select a lantern shape:</span>
                  <span className="text-amber-400 font-semibold">{currentShape?.nameEn}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {LANTERN_SHAPES.map((shape) => {
                    const isSelected = selectedShapeId === shape.id;
                    return (
                      <button
                        key={shape.id}
                        id={`option-shape-${shape.id}`}
                        onClick={() => handleSelectShape(shape.id, shape.nameEn)}
                        className={`p-2.5 rounded-xl border flex flex-col items-center justify-between transition-all cursor-pointer active:scale-95 ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-400 text-amber-200 ring-2 ring-amber-400/30'
                            : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600 text-slate-300'
                        }`}
                      >
                        {/* Mini shape silhouette preview */}
                        <div className="w-12 h-14 flex items-center justify-center my-0.5">
                          <LanternRenderer
                            shapeId={shape.id}
                            colorId={selectedColorId}
                            patternId={selectedPatternId}
                            size="sm"
                            glow={isSelected}
                            showTassel={false}
                          />
                        </div>

                        <div className="w-full text-center mt-1">
                          <div className="text-xs font-bold truncate">{shape.nameEn}</div>
                          <div className="text-[10px] text-slate-400 truncate">{shape.nameZh}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 2 Content: 8 Colors */}
            {activeTab === 'color' && (
              <div className="space-y-2 animate-fade-in">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>点击选择灯笼颜色 • Select a vibrant colour:</span>
                  <span className="text-amber-400 font-semibold">{currentColor?.nameEn}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {LANTERN_COLORS.map((color) => {
                    const isSelected = selectedColorId === color.id;
                    return (
                      <button
                        key={color.id}
                        id={`option-color-${color.id}`}
                        onClick={() => handleSelectColor(color.id, color.nameEn)}
                        className={`p-2.5 rounded-xl border flex flex-col items-center justify-between transition-all cursor-pointer active:scale-95 ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-400 text-amber-200 ring-2 ring-amber-400/30'
                            : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600 text-slate-300'
                        }`}
                      >
                        {/* Color Swatch Circle with internal glowing lamp effect */}
                        <div
                          className="w-10 h-10 rounded-full my-1 border-2 border-white/30 shadow-md flex items-center justify-center transition-transform hover:scale-110"
                          style={{
                            background: `radial-gradient(circle at 35% 35%, #FFFFFF, ${color.mainColor} 70%, ${color.darkColor})`,
                            boxShadow: `0 0 12px ${color.mainColor}88`,
                          }}
                        >
                          {isSelected && <CheckCircle2 className="w-5 h-5 text-white drop-shadow" />}
                        </div>

                        <div className="w-full text-center mt-1">
                          <div className="text-xs font-bold truncate">{color.nameEn}</div>
                          <div className="text-[10px] text-slate-400 truncate">{color.nameZh}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 3 Content: 8 Patterns */}
            {activeTab === 'pattern' && (
              <div className="space-y-2 animate-fade-in">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>点击选择传统吉祥花纹 • Select a pattern:</span>
                  <span className="text-amber-400 font-semibold">{currentPattern?.nameEn}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {LANTERN_PATTERNS.map((pattern) => {
                    const isSelected = selectedPatternId === pattern.id;
                    return (
                      <button
                        key={pattern.id}
                        id={`option-pattern-${pattern.id}`}
                        onClick={() => handleSelectPattern(pattern.id, pattern.nameEn)}
                        className={`p-2.5 rounded-xl border flex flex-col items-center justify-between transition-all cursor-pointer active:scale-95 ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-400 text-amber-200 ring-2 ring-amber-400/30'
                            : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600 text-slate-300'
                        }`}
                      >
                        {/* Pattern preview badge */}
                        <div className="w-12 h-12 rounded-xl bg-slate-950/80 border border-slate-700 flex items-center justify-center p-1 my-0.5 overflow-hidden">
                          <LanternRenderer
                            shapeId="palace"
                            colorId={selectedColorId}
                            patternId={pattern.id}
                            size="sm"
                            glow={false}
                            showTassel={false}
                          />
                        </div>

                        <div className="w-full text-center mt-1">
                          <div className="text-xs font-bold truncate">{pattern.nameEn}</div>
                          <div className="text-[10px] text-slate-400 truncate">{pattern.nameZh}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Elementary Teaching Tip at bottom of workshop */}
            <div className="mt-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-300 flex items-center justify-between">
              <span className="text-amber-300">
                💡 8 Shapes &bull; 8 Colours &bull; 8 Patterns = 512 Different Lantern Combinations!
              </span>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  // Move to next customization step
                  if (activeTab === 'shape') setActiveTab('color');
                  else if (activeTab === 'color') setActiveTab('pattern');
                  else handleCompleteAndHang();
                }}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 underline underline-offset-2 cursor-pointer"
              >
                {activeTab === 'pattern' ? '全部选好，准备挂绳 →' : '下一步 Next Step →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
