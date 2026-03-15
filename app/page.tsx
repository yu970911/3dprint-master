"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import PrinterIllustration from "@/components/PrinterIllustration";
import FactIcon from "@/components/FactIcon";

const facts = [
  { icon: "book",     text: "3Dプリンターは溶かしたプラスチックを\n少しずつ積み重ねて立体を作るよ！" },
  { icon: "spool",    text: "使う材料のことを\n「フィラメント」というよ！" },
  { icon: "house",    text: "3Dプリンターで\n本物の家も建てられるんだって！" },
  { icon: "calendar", text: "最初の3Dプリンターは\n1984年にアメリカで発明されたよ！" },
  { icon: "rocket",   text: "NASAは宇宙船の部品を\n3Dプリンターで作っているよ！" },
  { icon: "heart",    text: "医療現場では義手・義足を\n3Dプリンターで作れるよ！" },
  { icon: "rainbow",  text: "フィラメントには虹色まで！\nたくさんの色と素材があるよ！" },
];

const features = [
  { label: "組み立て",     icon: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="2" y="2" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="8" y="2" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="2" y="8" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="8" y="8" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  )},
  { label: "データ準備", icon: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="2" y="3" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M5 7 L9 7 M7 5 L7 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )},
  { label: "スライス設定", icon: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M7 4 L7 7 L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )},
  { label: "プリント", icon: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="2" y="4" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M5 2 L9 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="10" cy="7.5" r="1" fill="currentColor"/>
    </svg>
  )},
  { label: "トラブル対応", icon: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 2 L8.5 5.5 L12 6 L9.5 8.5 L10 12 L7 10.5 L4 12 L4.5 8.5 L2 6 L5.5 5.5 Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  )},
];

export default function TitlePage() {
  const [factIdx, setFactIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setFactIdx((i) => (i + 1) % facts.length);
        setFade(true);
      }, 300);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  const fact = facts[factIdx];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center gap-5">
      {/* Hero illustration */}
      <div className="animate-bounce-slow">
        <PrinterIllustration size={160} />
      </div>

      <div>
        <h1
          className="text-5xl font-black mb-2 leading-tight"
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

      {/* Feature badges */}
      <div className="flex flex-wrap gap-2 justify-center">
        {features.map((f) => (
          <span
            key={f.label}
            className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-full text-sm text-white/80"
          >
            {f.icon}
            {f.label}
          </span>
        ))}
      </div>

      {/* Fact card */}
      <div
        className="glass rounded-2xl p-5 max-w-sm w-full"
        style={{ transition: "opacity 0.3s", opacity: fade ? 1 : 0 }}
      >
        <div className="flex justify-center mb-3">
          <FactIcon type={fact.icon} />
        </div>
        <div className="space-y-0.5">
          {fact.text.split("\n").map((line, i) => (
            <p key={i} className="text-sm text-blue-200 leading-relaxed">{line}</p>
          ))}
        </div>
        <div className="flex gap-1.5 justify-center mt-3">
          {facts.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === factIdx ? 16 : 6,
                height: 6,
                background: i === factIdx ? "#90CAF9" : "rgba(144,202,249,0.25)",
              }}
            />
          ))}
        </div>
      </div>

      <Link
        href="/levels"
        className="flex items-center gap-2 px-10 py-4 rounded-full text-white text-xl font-bold transition hover:-translate-y-1 hover:shadow-2xl active:translate-y-0"
        style={{ background: "linear-gradient(135deg,#7B2FBE,#2196F3)" }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 2 C11 2 18 6 18 13 L11 20 L4 13 C4 6 11 2 11 2Z" fill="white" opacity="0.9"/>
          <circle cx="11" cy="11" r="3" fill="#7B2FBE"/>
          <path d="M4 13 L1 18 L5 16Z" fill="white" opacity="0.6"/>
          <path d="M18 13 L21 18 L17 16Z" fill="white" opacity="0.6"/>
        </svg>
        ゲームスタート！
      </Link>

      <p className="text-white/30 text-xs">全5レベル　子供から大人まで楽しめる</p>
    </div>
  );
}
