import React from 'react';
import { TARGET_SENTENCE, SENTENCE_BREAKDOWN, LANTERN_SHAPES, LANTERN_COLORS, LANTERN_PATTERNS } from '../data/lanternOptions';
import { soundEngine, speakEnglishText } from '../services/audioService';
import { BookOpen, Sparkles, Volume2, Award, Clock, Lightbulb, X } from 'lucide-react';

interface TeacherGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherGuideModal: React.FC<TeacherGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="teacher-guide-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto select-none"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border-2 border-amber-500/60 rounded-3xl p-5 sm:p-7 max-w-3xl w-full shadow-[0_0_50px_rgba(251,191,36,0.3)] text-slate-100 relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 text-slate-400 hover:text-white w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-slate-950 font-bold shadow-md">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span>小学英语备课指南 • Teacher's Lesson Guide</span>
              <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                元宵节主题课
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Interactive Lantern Festival English Teaching & Classroom Activity Guide
            </p>
          </div>
        </div>

        {/* Modal Content */}
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 text-xs sm:text-sm">
          
          {/* Section 1: Core Target Sentence */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-amber-300 flex items-center gap-1.5 text-sm">
                <Award className="w-4 h-4 text-amber-400" />
                本课核心教学目标句 (Core Target Sentence)
              </span>
              <button
                onClick={() => speakEnglishText(TARGET_SENTENCE, 0.85)}
                className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer transition-all"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>示范朗读</span>
              </button>
            </div>
            
            <p className="text-base sm:text-lg font-bold text-amber-100 font-['Fredoka',sans-serif]">
              &ldquo;{TARGET_SENTENCE}&rdquo;
            </p>
            <p className="text-xs text-amber-200/80 mt-1">
              汉语释义：街道和公园里挂满了不同形状的五彩灯笼。
            </p>

            {/* Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-3 pt-3 border-t border-amber-500/20">
              {SENTENCE_BREAKDOWN.map((b, i) => (
                <div key={i} className="p-2 rounded-lg bg-slate-900/80 border border-amber-500/20">
                  <div className="font-bold text-amber-300 text-xs">{b.phrase}</div>
                  <div className="text-[11px] text-slate-300">{b.meaningZh}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Classroom Activity Game Rules */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700">
            <h4 className="font-bold text-white mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-400" />
              <span>课堂互动游戏玩法建议 (Classroom Game Steps)</span>
            </h4>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-300 text-xs sm:text-sm">
              <li>
                <strong className="text-amber-300">15秒倒计时快答：</strong>
                每位学生上台或小组代表有15秒时间，快速选出自己喜欢的灯笼形状、颜色与花纹，并用英文读出所选项（如：“A red rabbit lantern!”）。
              </li>
              <li>
                <strong className="text-amber-300">防犹豫机制：</strong>
                若15秒倒计时结束前未完成，系统将以当前默认样式自动把灯笼挂上绳子，保证课堂节奏紧凑、学生注意力高度集中。
              </li>
              <li>
                <strong className="text-amber-300">排成一列挂绳：</strong>
                每完成一个灯笼，灯笼会在街道绳子上排成整齐一列，并随晚风轻轻摆动。全班一起朗读核心句型：
                <em className="text-amber-300">“Streets and parks are filled with colourful lanterns in different shapes.”</em>
              </li>
              <li>
                <strong className="text-amber-300">点击绳上灯笼复习：</strong>
                课末点击绳上的任一灯笼，即可听到其英文描述，巩固记忆。
              </li>
            </ol>
          </div>

          {/* Section 3: 8 Shapes, 8 Colors, 8 Patterns Vocabulary List */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-3">
            <h4 className="font-bold text-white flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>8种形状、颜色、花纹中英对照词汇表 (Vocabulary List)</span>
            </h4>

            {/* Shapes */}
            <div>
              <span className="text-xs font-semibold text-sky-300 block mb-1">
                8 Shapes (形状):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {LANTERN_SHAPES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => speakEnglishText(s.nameEn)}
                    className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 hover:border-sky-400 text-slate-200 text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Volume2 className="w-3 h-3 text-sky-400" />
                    <span>{s.nameEn}</span>
                    <span className="text-slate-400 text-[10px]">({s.nameZh})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <span className="text-xs font-semibold text-rose-300 block mb-1">
                8 Colours (颜色):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {LANTERN_COLORS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => speakEnglishText(c.nameEn)}
                    className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 hover:border-rose-400 text-slate-200 text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Volume2 className="w-3 h-3 text-rose-400" />
                    <span>{c.nameEn}</span>
                    <span className="text-slate-400 text-[10px]">({c.nameZh})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Patterns */}
            <div>
              <span className="text-xs font-semibold text-emerald-300 block mb-1">
                8 Patterns (花纹):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {LANTERN_PATTERNS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => speakEnglishText(p.nameEn)}
                    className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 hover:border-emerald-400 text-slate-200 text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Volume2 className="w-3 h-3 text-emerald-400" />
                    <span>{p.nameEn}</span>
                    <span className="text-slate-400 text-[10px]">({p.nameZh})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm cursor-pointer active:scale-95 transition-all shadow-md"
          >
            明白了，开始上课！(Got it, let's start!)
          </button>
        </div>
      </div>
    </div>
  );
};
