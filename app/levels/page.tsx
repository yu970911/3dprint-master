"use client";
import Link from "next/link";
import { useGameStore, LEVELS } from "@/lib/gameStore";

export default function LevelsPage() {
  const { unlockedLevels, completedLevels, scores, resetGame } = useGameStore();

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">📋 レベル選択</h1>
        <p className="text-white/50 text-sm">レベルをクリアして次のステージへ進もう！</p>
      </div>

      <div className="flex flex-col gap-4">
        {LEVELS.map((lv) => {
          const locked = !unlockedLevels.includes(lv.id);
          const done = completedLevels.includes(lv.id);
          const score = scores[lv.id];

          return (
            <Link
              key={lv.id}
              href={locked ? "#" : `/level/${lv.id}`}
              onClick={locked ? (e) => e.preventDefault() : undefined}
              className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${
                locked
                  ? "opacity-40 cursor-not-allowed border-white/10 bg-white/5"
                  : done
                  ? "border-green-500/60 bg-white/5 hover:translate-x-1"
                  : "border-white/20 bg-white/5 hover:translate-x-1 hover:bg-white/10"
              }`}
            >
              <div className="text-4xl w-14 text-center flex-shrink-0">{lv.icon}</div>
              <div className="flex-1">
                <div className="font-bold text-lg" style={{ color: lv.color }}>
                  LEVEL {lv.id}　{lv.name}
                </div>
                <div className="text-sm text-white/50">{lv.desc}</div>
              </div>
              <div className="ml-auto text-right flex-shrink-0">
                {locked ? (
                  <span className="text-2xl">🔒</span>
                ) : done ? (
                  <div>
                    <div className="text-yellow-400 font-bold text-sm">{score}点</div>
                    <div className="text-green-400 text-xs">✅ クリア</div>
                  </div>
                ) : (
                  <span className="text-white/40 text-sm">→</span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {completedLevels.length > 0 && (
        <div className="glass rounded-2xl p-4 mt-6 text-center">
          <div className="text-sm text-white/60 mb-1">
            完成数: {completedLevels.length}/5　合計: {Object.values(scores).reduce((a, b) => a + b, 0)}点
          </div>
          <div className="text-lg">
            {"⭐".repeat(completedLevels.length)}{"☆".repeat(5 - completedLevels.length)}
          </div>
        </div>
      )}

      <div className="flex gap-3 justify-center mt-8 flex-wrap">
        <Link
          href="/"
          className="px-5 py-2 rounded-full text-sm font-bold text-white transition hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg,#F44336,#FF9800)" }}
        >
          ← タイトルへ
        </Link>
        <button
          onClick={resetGame}
          className="px-5 py-2 rounded-full text-sm font-bold text-white bg-white/10 hover:bg-white/20 transition"
        >
          🔄 リセット
        </button>
      </div>
    </div>
  );
}
