"use client";
import Link from "next/link";

interface Props {
  level: number;
  icon: string;
  title: string;
  instruction: string;
  children: React.ReactNode;
  onNext?: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
}

export default function LevelShell({
  level, icon, title, instruction, children,
  onNext, nextDisabled, nextLabel = "次のレベルへ →",
}: Props) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 min-h-screen">
      <div className="flex items-center gap-3 mb-4">
        <span className="bg-white/10 rounded-full px-3 py-1 text-sm">LEVEL {level}</span>
        <h1 className="text-xl font-bold">{icon} {title}</h1>
      </div>

      <div
        className="rounded-xl p-4 mb-5 text-sm leading-relaxed"
        style={{ background: "rgba(123,47,190,0.18)", border: "1px solid rgba(123,47,190,0.35)" }}
      >
        📌 {instruction}
      </div>

      {children}

      <div className="flex gap-3 justify-center mt-6 flex-wrap">
        <Link
          href="/levels"
          className="px-5 py-2 rounded-full text-sm font-bold text-white transition hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg,#F44336,#FF9800)" }}
        >
          ← 戻る
        </Link>
        {onNext && (
          <button
            onClick={onNext}
            disabled={nextDisabled}
            className="px-6 py-2 rounded-full text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-default disabled:translate-y-0"
            style={{ background: "linear-gradient(135deg,#4CAF50,#00BCD4)" }}
          >
            {nextLabel}
          </button>
        )}
      </div>
    </div>
  );
}
