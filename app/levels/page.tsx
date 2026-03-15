"use client";
import Link from "next/link";
import { useGameStore, LEVELS } from "@/lib/gameStore";
import LevelIcon from "@/components/LevelIcon";

export default function LevelsPage() {
  const { unlockedLevels, completedLevels, scores, resetGame } = useGameStore();

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">レベル選択</h1>
        <p className="text-white/50 text-sm">レベルをクリアして次のステージへ進もう！</p>
      </div>

      <div className="flex flex-col gap-4">
        {LEVELS.map((lv) => {
          const locked = !unlockedLevels.includes(lv.id);
          const done   = completedLevels.includes(lv.id);
          const score  = scores[lv.id];

          return (
            <Link
              key={lv.id}
              href={locked ? "#" : `/level/${lv.id}`}
              onClick={locked ? (e) => e.preventDefault() : undefined}
              className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${
                locked
                  ? "opacity-40 cursor-not-allowed border-white/10 bg-white/5"
                  : done
                  ? "border-green-500/50 bg-white/5 hover:translate-x-1 hover:bg-white/8"
                  : "border-white/15 bg-white/5 hover:translate-x-1 hover:bg-white/10"
              }`}
            >
              {/* Level icon */}
              <div
                className="flex-shrink-0 rounded-2xl flex items-center justify-center"
                style={{ width: 56, height: 56, background: lv.color + "15" }}
              >
                <LevelIcon id={lv.id} color={lv.color} size={38} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-mono text-white/30">LEVEL {lv.id}</span>
                  {done && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: "#4CAF5022", color: "#4CAF50" }}>
                      CLEAR
                    </span>
                  )}
                </div>
                <div className="font-bold text-lg leading-tight" style={{ color: lv.color }}>{lv.name}</div>
                <div className="text-sm text-white/50 truncate">{lv.desc}</div>
              </div>

              <div className="flex-shrink-0 text-right">
                {locked ? (
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <rect x="5" y="10" width="12" height="10" rx="2" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
                    <path d="M8 10 V7 C8 4.8 14 4.8 14 7 V10" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none"/>
                    <circle cx="11" cy="15" r="1.5" fill="rgba(255,255,255,0.3)"/>
                  </svg>
                ) : done ? (
                  <div>
                    <div className="text-yellow-400 font-bold text-sm">{score}点</div>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="ml-auto mt-0.5">
                      <path d="M9 1L11 6.5H17L12.5 10L14 16L9 12.5L4 16L5.5 10L1 6.5H7Z" fill="#4CAF50" opacity="0.9"/>
                    </svg>
                  </div>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M7 4 L13 9 L7 14" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Progress summary */}
      {completedLevels.length > 0 && (
        <div className="glass rounded-2xl p-4 mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-white/60">進捗</span>
            <span className="text-sm font-bold text-white">{completedLevels.length}/5 クリア</span>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${(completedLevels.length / 5) * 100}%`, background: "linear-gradient(90deg,#7B2FBE,#00BCD4)" }}
            />
          </div>
          <div className="text-right text-xs text-yellow-400 font-bold mt-1">
            合計 {Object.values(scores).reduce((a, b) => a + b, 0)} 点
          </div>
        </div>
      )}

      <div className="flex gap-3 justify-center mt-8 flex-wrap">
        <Link
          href="/"
          className="flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-bold text-white transition hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg,#F44336,#FF9800)" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M10 7 L4 7 M6 4 L3 7 L6 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          タイトルへ
        </Link>
        <button
          onClick={resetGame}
          className="flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-bold text-white bg-white/10 hover:bg-white/20 transition"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7 C2 4.2 4.2 2 7 2 C9 2 10.7 3 11.5 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M9.5 1.5 L11.5 4.5 L8.5 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 7 C12 9.8 9.8 12 7 12 C5 12 3.3 11 2.5 9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          リセット
        </button>
      </div>
    </div>
  );
}
