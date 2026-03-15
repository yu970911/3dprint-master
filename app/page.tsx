"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const facts = [
  { icon: "📚", text: "3Dプリンターは溶かしたプラスチックを\n少しずつ積み重ねて立体を作るよ！" },
  { icon: "🧵", text: "使う材料のことを\n「フィラメント」というよ！" },
  { icon: "🏠", text: "3Dプリンターで\n本物の家も建てられるんだって！" },
  { icon: "📅", text: "最初の3Dプリンターは\n1984年にアメリカで発明されたよ！" },
  { icon: "🚀", text: "NASAは宇宙船の部品を\n3Dプリンターで作っているよ！" },
];

export default function TitlePage() {
  const [factIdx, setFactIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setFactIdx((i) => (i + 1) % facts.length), 4000);
    return () => clearInterval(t);
  }, []);

  const fact = facts[factIdx];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center gap-6">
      <div className="text-8xl animate-bounce-slow">🖨️</div>

      <div>
        <h1
          className="text-5xl font-black mb-2"
          style={{
            background: "linear-gradient(90deg,#CE93D8,#64B5F6,#80DEEA)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          プリントマスター3D
        </h1>
        <p className="text-white/60 text-lg">3Dプリンターのすべてをゲームで学ぼう！</p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {["🔧 組み立て", "💾 データ準備", "⚙️ スライス", "🖨️ プリント", "🛠️ トラブル対応"].map((f) => (
          <span key={f} className="glass px-3 py-1.5 rounded-full text-sm text-white/80">{f}</span>
        ))}
      </div>

      <div className="glass rounded-2xl p-5 max-w-sm w-full">
        <div className="text-3xl mb-2">{fact.icon}</div>
        {fact.text.split("\n").map((line, i) => (
          <p key={i} className="text-sm text-blue-200">{line}</p>
        ))}
        <div className="flex gap-2 justify-center mt-3">
          {facts.map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-all"
              style={{ background: i === factIdx ? "#90CAF9" : "rgba(144,202,249,0.25)" }}
            />
          ))}
        </div>
      </div>

      <Link
        href="/levels"
        className="px-10 py-4 rounded-full text-white text-xl font-bold transition hover:-translate-y-1 hover:shadow-2xl active:translate-y-0"
        style={{ background: "linear-gradient(135deg,#7B2FBE,#2196F3)" }}
      >
        🚀 ゲームスタート！
      </Link>

      <p className="text-white/30 text-xs">全5レベル　子供から大人まで楽しめる</p>
    </div>
  );
}
