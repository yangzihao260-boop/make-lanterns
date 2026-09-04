/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CreatedLantern } from './types';
import { NightSkyBackground } from './components/NightSkyBackground';
import { SentenceBanner } from './components/SentenceBanner';
import { HangingRope } from './components/HangingRope';
import { LanternMaker } from './components/LanternMaker';
import { TeacherGuideModal } from './components/TeacherGuideModal';
import { soundEngine, speakEnglishText } from './services/audioService';
import {
  Music,
  Volume2,
  VolumeX,
  BookOpen,
  Sparkles,
  Info,
} from 'lucide-react';

export default function App() {
  // Collection of lanterns already hung on the rope in a row
  const [lanterns, setLanterns] = useState<CreatedLantern[]>(() => [
    // Pre-populate with 2 lovely lanterns as welcoming examples for the classroom
    {
      id: 'lantern-demo-1',
      shapeId: 'round',
      colorId: 'crimson',
      patternId: 'clouds',
      createdAt: Date.now() - 20000,
      hangPosition: 0.2,
      swayDelay: 0.2,
      swayDuration: 3.2,
      isCustomized: true,
    },
    {
      id: 'lantern-demo-2',
      shapeId: 'fish',
      colorId: 'gold',
      patternId: 'dragon',
      createdAt: Date.now() - 10000,
      hangPosition: 0.5,
      swayDelay: 0.8,
      swayDuration: 2.8,
      isCustomized: true,
    },
    {
      id: 'lantern-demo-3',
      shapeId: 'lotus',
      colorId: 'pink',
      patternId: 'blossom',
      createdAt: Date.now() - 5000,
      hangPosition: 0.8,
      swayDelay: 0.5,
      swayDuration: 3.5,
      isCustomized: true,
    },
  ]);

  const [lanternCounter, setLanternCounter] = useState<number>(4);
  const [isDraggingLantern, setIsDraggingLantern] = useState<boolean>(false);
  const [isTeacherGuideOpen, setIsTeacherGuideOpen] = useState<boolean>(false);
  const [isBgmActive, setIsBgmActive] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [celebrationBanner, setCelebrationBanner] = useState<string | null>(null);

  // Initialize and clean up audio
  useEffect(() => {
    return () => {
      soundEngine.stopBGM();
    };
  }, []);

  // Toggle Background Music
  const handleToggleBgm = () => {
    soundEngine.playClick();
    const isPlaying = soundEngine.toggleBGM();
    setIsBgmActive(isPlaying);
  };

  // Toggle Master Mute
  const handleToggleMute = () => {
    soundEngine.playClick();
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    soundEngine.setMuted(nextMute);
  };

  // Called when a lantern is crafted (either by clicking Done, dragging to rope, or timer expiration)
  const handleHangLantern = (shapeId: string, colorId: string, patternId: string) => {
    const newLantern: CreatedLantern = {
      id: `lantern-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      shapeId,
      colorId,
      patternId,
      createdAt: Date.now(),
      hangPosition: Math.random(),
      swayDelay: +(Math.random() * 1.5).toFixed(2),
      swayDuration: +(2.5 + Math.random() * 1.5).toFixed(2),
      isCustomized: true,
    };

    setLanterns((prev) => [...prev, newLantern]);
    setLanternCounter((prev) => prev + 1);

    // Play hanging sound effect
    soundEngine.playHang();

    // Check for milestone celebration
    const currentCount = lanterns.length + 1;
    if (currentCount % 4 === 0 || currentCount === 5 || currentCount === 8) {
      triggerMilestoneCelebration(currentCount);
    }
  };

  const triggerMilestoneCelebration = (count: number) => {
    soundEngine.playCelebration();
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.3 },
      colors: ['#F59E0B', '#EF4444', '#EC4899', '#10B981', '#38BDF8', '#FDE047'],
    });

    const celebrationText = `Wonderful! ${count} lanterns are now lighting up the night!`;
    setCelebrationBanner(celebrationText);

    // Read key sentence aloud to celebrate
    setTimeout(() => {
      speakEnglishText('Streets and parks are filled with colourful lanterns in different shapes.', 0.85);
    }, 600);

    setTimeout(() => {
      setCelebrationBanner(null);
    }, 4500);
  };

  const handleClearRope = () => {
    setLanterns([]);
    soundEngine.playClick();
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col justify-between overflow-x-hidden">
      {/* Dynamic Night Sky with Full Moon, Street Silhouettes & Floating Lanterns */}
      <NightSkyBackground />

      {/* Top Application Navigation Bar */}
      <header className="relative z-30 w-full px-3 sm:px-6 py-2.5 bg-slate-950/70 backdrop-blur-md border-b border-amber-500/20 flex flex-wrap items-center justify-between gap-2 select-none">
        {/* Logo & Title */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center shadow-lg shadow-amber-500/30 text-lg">
            🏮
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5 font-['Noto_Serif_SC',serif]">
              <span>元宵花灯夜</span>
              <span className="text-xs text-amber-400 font-sans font-medium hidden xs:inline">
                • Lantern Festival English Learning
              </span>
            </h1>
            <p className="text-[10px] sm:text-[11px] text-slate-400 font-sans">
              满月之夜 &bull; 亲手制作挂灯笼 &bull; 熟练掌握核心句型
            </p>
          </div>
        </div>

        {/* Action Controls: Music, Sound FX, Teacher Guide */}
        <div className="flex items-center gap-2">
          {/* Background Music Toggle */}
          <button
            id="btn-toggle-bgm"
            onClick={handleToggleBgm}
            title={isBgmActive ? 'Turn off festival background music' : 'Play warm festival music'}
            className={`px-3 py-1.5 rounded-xl border text-xs sm:text-sm flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-sm ${
              isBgmActive
                ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-1 ring-amber-400/40'
                : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Music className={`w-3.5 h-3.5 ${isBgmActive ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            <span>{isBgmActive ? '音乐播放中' : '播放背景音'}</span>
          </button>

          {/* Master Audio Mute Toggle */}
          <button
            id="btn-toggle-mute"
            onClick={handleToggleMute}
            title={isMuted ? 'Unmute audio' : 'Mute all sounds'}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-900/80 border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs sm:text-sm flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            <span className="hidden sm:inline">{isMuted ? '已静音' : '音效开'}</span>
          </button>

          {/* Teacher Lesson Guide Modal Toggle */}
          <button
            id="btn-open-teacher-guide"
            onClick={() => {
              soundEngine.playClick();
              setIsTeacherGuideOpen(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>备课指南 (Guide)</span>
          </button>
        </div>
      </header>

      {/* Floating Milestone Celebration Toast Banner */}
      {celebrationBanner && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 text-slate-950 font-bold px-5 py-2.5 rounded-full shadow-[0_0_30px_rgba(251,191,36,0.6)] flex items-center gap-2 text-sm sm:text-base border-2 border-white">
            <Sparkles className="w-5 h-5 text-slate-950" />
            <span>{celebrationBanner}</span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="relative flex-1 flex flex-col justify-start z-10 w-full max-w-7xl mx-auto">
        
        {/* 1. Target Sentence Learning Banner */}
        <SentenceBanner />

        {/* 2. The Hanging Rope Across the Moonlit Street */}
        <HangingRope
          lanterns={lanterns}
          onDropLantern={() => {
            // Drop lantern using current index
            // The LanternMaker will supply data or auto complete
            const randomShape = ['palace', 'round', 'fish', 'lotus', 'rabbit', 'star', 'hexagon', 'cylinder'][Math.floor(Math.random() * 8)];
            const randomColor = ['crimson', 'gold', 'orange', 'green', 'cyan', 'purple', 'pink', 'white'][Math.floor(Math.random() * 8)];
            const randomPattern = ['clouds', 'dragon', 'blossom', 'bamboo', 'lattice', 'fireworks', 'knot', 'moonstar'][Math.floor(Math.random() * 8)];
            handleHangLantern(randomShape, randomColor, randomPattern);
          }}
          onClearRope={handleClearRope}
          isDraggingLantern={isDraggingLantern}
        />

        {/* 3. The 15-Second Lantern DIY Workshop */}
        <LanternMaker
          onHangLantern={handleHangLantern}
          onDragStartChange={setIsDraggingLantern}
          lanternIndex={lanternCounter}
        />
      </main>

      {/* Footer bar with pedagogical notes and quick tips */}
      <footer className="relative z-20 w-full py-2 px-4 bg-slate-950/80 backdrop-blur-md border-t border-slate-800 text-center text-xs text-slate-400 select-none">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 text-amber-200/90">
            <Info className="w-3.5 h-3.5 text-amber-400" />
            <span>
              教学目标：熟悉元宵节传统，练习核心句子 “Streets and parks are filled with colourful lanterns in different shapes.”
            </span>
          </span>
          <span className="text-[11px] text-slate-500">
            15s Timer &bull; 8 Shapes &bull; 8 Colours &bull; 8 Patterns &bull; Interactive Web Audio
          </span>
        </div>
      </footer>

      {/* Teacher's Lesson Plan & Vocabulary Modal */}
      <TeacherGuideModal
        isOpen={isTeacherGuideOpen}
        onClose={() => setIsTeacherGuideOpen(false)}
      />
    </div>
  );
}
