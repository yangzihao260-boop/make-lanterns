import React, { useState } from 'react';
import { TARGET_SENTENCE, SENTENCE_BREAKDOWN } from '../data/lanternOptions';
import { soundEngine, speakEnglishText } from '../services/audioService';
import { Volume2, Sparkles, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

export const SentenceBanner: React.FC = () => {
  const [activePhraseIndex, setActivePhraseIndex] = useState<number | null>(null);
  const [showPhonics, setShowPhonics] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(0.85);

  const handlePlaySentence = () => {
    soundEngine.playClick();
    speakEnglishText(TARGET_SENTENCE, speechRate);
  };

  const handlePhraseClick = (index: number) => {
    soundEngine.playSelect();
    setActivePhraseIndex(index);
    const item = SENTENCE_BREAKDOWN[index];
    speakEnglishText(item.phrase, speechRate);
  };

  return (
    <header className="relative w-full z-20 px-2 sm:px-6 md:px-12 pt-3 pb-1 select-none">
      <div className="max-w-5xl mx-auto bg-slate-900/85 backdrop-blur-md rounded-2xl border border-amber-500/40 shadow-[0_8px_32px_rgba(0,0,0,0.5)] p-3 sm:p-4 text-slate-100">
        {/* Top Header line */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-500/20 pb-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-rose-600 to-amber-600 text-white text-xs font-bold tracking-wide shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              元宵节核心句型 • Key Sentence
            </span>
            <span className="text-xs text-amber-200/80 hidden sm:inline">
              点击单词发音，熟悉不同形状与颜色的灯笼！
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Speed toggle for kids */}
            <button
              onClick={() => {
                const nextRate = speechRate === 0.85 ? 0.65 : 0.85;
                setSpeechRate(nextRate);
                soundEngine.playClick();
              }}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 transition-all active:scale-95"
              title="Toggle reading speed for elementary students"
            >
              速度 Speed: {speechRate === 0.85 ? '正常' : '慢速 0.65x'}
            </button>

            {/* Phonics toggle */}
            <button
              onClick={() => {
                setShowPhonics(!showPhonics);
                soundEngine.playClick();
              }}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1 transition-all active:scale-95"
            >
              <BookOpen className="w-3 h-3 text-amber-400" />
              <span>{showPhonics ? '收起音标' : '音标与解析'}</span>
              {showPhonics ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            {/* Read full sentence audio button */}
            <button
              id="btn-play-target-sentence"
              onClick={handlePlaySentence}
              className="px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-lg text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>朗读全文 Listen</span>
            </button>
          </div>
        </div>

        {/* Main English Target Sentence Interactive Display */}
        <div className="text-center py-1 sm:py-2">
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 text-base sm:text-xl md:text-2xl font-bold font-['Fredoka',sans-serif] tracking-wide">
            {SENTENCE_BREAKDOWN.map((item, idx) => (
              <button
                key={idx}
                id={`sentence-part-${idx}`}
                onClick={() => handlePhraseClick(idx)}
                className={`group relative px-2 py-1 rounded-xl transition-all duration-200 border cursor-pointer ${
                  activePhraseIndex === idx
                    ? 'bg-amber-500/25 border-amber-400 text-amber-200 scale-105 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                    : 'border-transparent hover:border-amber-400/50 hover:bg-slate-800/80 text-white'
                }`}
              >
                <span className={`transition-colors ${item.highlight}`}>
                  {item.phrase}
                </span>

                {/* Subtext phonics / translation hint below */}
                <span className="block text-[10px] sm:text-xs font-normal text-slate-300 mt-0.5">
                  {item.meaningZh}
                </span>
              </button>
            ))}
          </div>

          <div className="text-xs sm:text-sm text-amber-100/70 mt-1 font-['Noto_Serif_SC',serif]">
            “街道与公园里挂满了各种不同形状的五彩灯笼。”
          </div>
        </div>

        {/* Expandable Phonics & Grammar breakdown */}
        {showPhonics && (
          <div className="mt-3 pt-3 border-t border-slate-700/60 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 text-xs animate-fade-in">
            {SENTENCE_BREAKDOWN.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handlePhraseClick(idx)}
                className="p-2.5 rounded-xl bg-slate-800/90 border border-slate-700 hover:border-amber-400/50 cursor-pointer transition-all"
              >
                <div className="font-bold text-amber-300 flex items-center justify-between">
                  <span>{item.phrase}</span>
                  <Volume2 className="w-3 h-3 text-slate-400" />
                </div>
                <div className="text-[11px] text-sky-300 font-mono mt-0.5">{item.phonics}</div>
                <div className="text-slate-300 text-[11px] mt-1">{item.meaningZh}</div>
                <div className="text-slate-400 text-[10px] mt-1 italic">{item.hint}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
