"use client";
import Link from "next/link";
import { useGameStore, LEVELS } from "@/lib/gameStore";
import LevelIcon from "@/components/LevelIcon";

export default function CompletePage() {
  const { scores, completedLevels } = useGameStore();
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  const rank =
    total >= 450 ? "🏆 3Dプリントマスター！" :
    total >= 350 ? "🥇 エキスパート！" :
    total >= 250 ? "🥈 レギュラー！" : "🥉 見習い！";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center gap-6">
      <div className="text-8xl animate-bounce-slow">🏆</div>

      <div>
        <h1
          className="text-4xl font-black mb-2"
          style={{ background: "linear-gradient(90deg,#FFD700,#FF9800)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
        >
          全レベルクリア！
        </h1>
        <p className="text-white/70 text-lg">{rank}</p>
      </div>

      {/* Score grid */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
        {LEVELS.map((lv) => (
          <div key={lv.id} className="glass rounded-xl p-4 text-center">
            <div className="flex justify-center mb-1"><LevelIcon id={lv.id} color={lv.color} size={32} /></div>
            <div className="text-2xl font-bold text-yellow-400">{scores[lv.id] ?? 0}</div>
            <div className="text-xs text-white/50">LV{lv.id} {lv.name}</div>
          </div>
        ))}
        <div className="glass rounded-xl p-4 text-center col-span-2">
          <div className="text-3xl font-black text-yellow-400">{total}</div>
          <div className="text-sm text-white/60">合計スコア</div>
        </div>
      </div>

      {/* Stars */}
      <div className="text-3xl">
        {"⭐".repeat(completedLevels.length)}
      </div>

      <div className="glass rounded-2xl p-5 max-w-sm text-sm leading-relaxed">
        🎉 おめでとう！<br />
        実際の3DLabで本物の3Dプリンターを<br />
        使ってみよう！
      </div>

      <div className="flex gap-3 flex-wrap justify-center">
        <Link
          href="/levels"
          className="px-6 py-3 rounded-full font-bold text-white transition hover:-translate-y-1"
          style={{ background: "linear-gradient(135deg,#7B2FBE,#2196F3)" }}
        >
          📋 レベル選択へ
        </Link>
        <Link
          href="/"
          className="px-6 py-3 rounded-full font-bold text-white transition hover:-translate-y-1"
          style={{ background: "linear-gradient(135deg,#4CAF50,#00BCD4)" }}
        >
          🏠 タイトルへ
        </Link>
      </div>
    </div>
  );
}
