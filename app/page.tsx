"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import PrinterIllustration from "@/components/PrinterIllustration";

const FACTS = [
  "溶かしたプラスチックを0.2mmずつ\n積み重ねて立体を作る技術だよ",
  "材料のことを「フィラメント」という。\nPLA・ABS・TPUなど種類が豊富",
  "3Dプリンターで建てた家が\n世界中に登場している",
  "1984年、チャック・ハルが\n世界初の3Dプリンターを発明した",
  "NASAは宇宙ステーションで\n部品を3Dプリントしている",
  "義手・義足・手術シミュレーターも\n3Dプリンターで作られている",
];

export default function TitlePage() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timerRef = useRef<any>(null);

  useEffect(() => {
    const iv = setInterval(() => {
      setVisible(false);
      timerRef.current = setTimeout(() => {
        setIdx((i) => (i + 1) % FACTS.length);
        setVisible(true);
      }, 400);
    }, 4000);
    return () => { clearInterval(iv); clearTimeout(timerRef.current); };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5">

      {/* ── Hero ── */}
      <div className="mb-4 mt-2">
        <PrinterIllustration size={180} />
      </div>

      {/* ── Eyebrow ── */}
      <p
        className="text-xs font-mono tracking-[0.25em] mb-2"
        style={{ color: "#64B5F6", letterSpacing: "0.25em" }}
      >
        3D PRINTING WORKSHOP
      </p>

      {/* ── Title ── */}
      <h1
        className="text-4xl font-black text-center leading-tight mb-1"
        style={{
          background: "linear-gradient(160deg, #fff 30%, #90CAF9 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        ３Dプリンターゲーム
      </h1>
      <p
        className="text-lg font-bold text-center mb-1"
        style={{ color: "#64B5F6" }}
      >
        ～３DLab～
      </p>
      <p className="text-white/40 text-sm mb-7">ゲームで学ぶ3Dプリンターの全て</p>

      {/* ── Level steps ── */}
      <div className="flex items-center gap-1 mb-8">
        {["組み立て","データ","スライス","プリント","トラブル"].map((label, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: `rgba(100,181,246,${0.12 + i * 0.04})`, border: "1px solid rgba(100,181,246,0.25)", color: "#90CAF9" }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <span className="text-white/30 text-[9px] font-medium whitespace-nowrap">{label}</span>
            </div>
            {i < 4 && (
              <div className="w-5 h-px mb-4" style={{ background: "rgba(100,181,246,0.2)" }} />
            )}
          </div>
        ))}
      </div>

      {/* ── Fact card ── */}
      <div
        className="w-full max-w-xs rounded-2xl overflow-hidden mb-8"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        {/* Animated progress bar */}
        <div className="h-0.5 w-full" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div
            key={idx}
            className="h-full"
            style={{
              background: "linear-gradient(90deg,#7B2FBE,#2196F3)",
              animation: "progress 4s linear forwards",
            }}
          />
        </div>
        <style>{`@keyframes progress { from { width: 0% } to { width: 100% } }`}</style>

        <div className="px-5 py-4">
          <p className="text-[10px] font-mono tracking-widest text-blue-400/60 mb-2 uppercase">
            Did you know? {idx + 1}/{FACTS.length}
          </p>
          <p
            className="text-sm text-white/85 leading-relaxed font-medium transition-opacity duration-300"
            style={{ opacity: visible ? 1 : 0 }}
          >
            {FACTS[idx].split("\n").map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}
          </p>
        </div>
      </div>

      {/* ── CTA ── */}
      <Link
        href="/levels"
        className="w-full max-w-xs py-4 rounded-2xl text-white text-lg font-bold text-center transition-all hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3"
        style={{ background: "linear-gradient(135deg, #7B2FBE 0%, #2196F3 100%)" }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <polygon points="6,3 17,10 6,17" fill="white" />
        </svg>
        ゲームスタート
      </Link>

      <p className="text-white/20 text-xs mt-4">全5レベル · 約15分</p>
    </div>
  );
}
