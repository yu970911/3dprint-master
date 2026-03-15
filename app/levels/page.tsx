"use client";
import Link from "next/link";
import { useGameStore, LEVELS } from "@/lib/gameStore";

export default function LevelsPage() {
  const { unlockedLevels, completedLevels, scores, resetGame } = useGameStore();
  const total = Object.values(scores).reduce((a, b) => a + b, 0);

  return (
    <div className="max-w-xl mx-auto px-4 py-8 min-h-screen">

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-mono tracking-widest text-blue-400/60 uppercase mb-1">Select Level</p>
        <h1 className="text-3xl font-black text-white">レベル選択</h1>
        {completedLevels.length > 0 && (
          <div className="flex items-center gap-3 mt-3">
            <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${(completedLevels.length / 5) * 100}%`,
                  background: "linear-gradient(90deg,#7B2FBE,#00BCD4)",
                }}
              />
            </div>
            <span className="text-xs text-white/40 font-mono whitespace-nowrap">{completedLevels.length}/5</span>
            <span className="text-xs font-bold text-yellow-400">{total}pt</span>
          </div>
        )}
      </div>

      {/* Level cards */}
      <div className="flex flex-col gap-3">
        {LEVELS.map((lv, i) => {
          const locked  = !unlockedLevels.includes(lv.id);
          const done    = completedLevels.includes(lv.id);
          const score   = scores[lv.id];
          const isNext  = !done && !locked;

          return (
            <Link
              key={lv.id}
              href={locked ? "#" : `/level/${lv.id}`}
              onClick={locked ? (e) => e.preventDefault() : undefined}
              className={`group relative flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all duration-200 ${
                locked
                  ? "border-white/5 bg-white/3 cursor-not-allowed opacity-40"
                  : done
                  ? "border-white/10 bg-white/5 hover:bg-white/8"
                  : "border-white/10 bg-white/5 hover:bg-white/10 hover:translate-x-1"
              }`}
            >
              {/* Level number */}
              <div
                className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg font-mono transition-all"
                style={{
                  background: done
                    ? lv.color + "22"
                    : locked
                    ? "rgba(255,255,255,0.05)"
                    : isNext
                    ? lv.color + "18"
                    : "rgba(255,255,255,0.08)",
                  color: done || isNext ? lv.color : "rgba(255,255,255,0.2)",
                  border: `1px solid ${done || isNext ? lv.color + "44" : "rgba(255,255,255,0.06)"}`,
                }}
              >
                {done ? (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10 L8 14 L16 6" stroke={lv.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  String(i + 1).padStart(2, "0")
                )}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-white/25 tracking-wider">LEVEL {lv.id}</span>
                  {isNext && (
                    <span
                      className="text-[9px] px-1.5 py-0.5 rounded-full font-bold tracking-wide"
                      style={{ background: lv.color + "22", color: lv.color }}
                    >
                      NEXT
                    </span>
                  )}
                </div>
                <div className="font-bold text-base leading-snug mt-0.5" style={{ color: locked ? "rgba(255,255,255,0.3)" : "#fff" }}>
                  {lv.name}
                </div>
                <div className="text-xs text-white/35 mt-0.5 truncate">{lv.desc}</div>
              </div>

              {/* Right status */}
              <div className="flex-shrink-0">
                {locked ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="3" y="7" width="10" height="8" rx="2" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2"/>
                    <path d="M5.5 7 V5 C5.5 3.3 10.5 3.3 10.5 5 V7" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" fill="none"/>
                  </svg>
                ) : done ? (
                  <div className="text-right">
                    <div className="text-sm font-bold" style={{ color: lv.color }}>{score}</div>
                    <div className="text-[9px] text-white/30 font-mono">pt</div>
                  </div>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-30 group-hover:opacity-70 transition-opacity">
                    <path d="M6 4 L11 8 L6 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer actions */}
      <div className="flex gap-3 justify-between items-center mt-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 3 L5 7 L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          タイトルへ戻る
        </Link>
        <button
          onClick={resetGame}
          className="text-xs text-white/25 hover:text-white/50 transition font-mono"
        >
          RESET
        </button>
      </div>
    </div>
  );
}
