"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/lib/gameStore";
import LevelShell from "@/components/LevelShell";

export default function Level2() {
  const router = useRouter();
  const { completeLevel } = useGameStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [angle, setAngle] = useState(35);
  const [scale, setScale] = useState(1.6);
  const [ok, setOk] = useState(false);

  const check = useCallback((s: number) => {
    const r = 90 * s;
    return r < 120 && s > 0.35;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;
    const isOk = check(scale);

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#050d1a";
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = "rgba(100,150,255,0.1)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= W; x += 20) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = 0; y <= H; y += 20) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

    // Bed
    ctx.strokeStyle = isOk ? "#4CAF50" : "#2196F3";
    ctx.lineWidth = 2.5;
    ctx.strokeRect(40, 40, W - 80, H - 80);
    ctx.fillStyle = "rgba(33,150,243,0.05)";
    ctx.fillRect(40, 40, W - 80, H - 80);
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.font = "11px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("プリントベッド (220×220mm)", cx, 30);

    // Model
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.scale(scale, scale);
    const pts: [number, number][] = [[0,-80],[30,-80],[30,-20],[80,-20],[80,30],[-30,30],[-30,-20],[0,-20]];
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    pts.forEach((p) => ctx.lineTo(p[0], p[1]));
    ctx.closePath();
    const grad = ctx.createLinearGradient(-80, -80, 80, 80);
    grad.addColorStop(0, isOk ? "#69F0AE" : "#CE93D8");
    grad.addColorStop(1, isOk ? "#00BCD4" : "#7B2FBE");
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.font = "11px monospace";
    ctx.textAlign = "left";
    ctx.fillText(`回転: ${angle}°　スケール: ${scale.toFixed(2)}x`, 8, H - 8);
  }, [angle, scale, check]);

  useEffect(() => {
    const isOk = check(scale);
    setOk(isOk);
    draw();
  }, [angle, scale, draw, check]);

  function handleNext() {
    completeLevel(2, Math.round(100 - scale * 20 + 80));
    router.push("/level/3");
  }

  return (
    <LevelShell
      level={2} icon="💾" title="データを準備！"
      instruction="3Dモデルをプリントベッドの中に収めよう！回転・サイズ変更ボタンで調整してね。"
      onNext={ok ? handleNext : undefined}
      nextDisabled={!ok}
      nextLabel="スライス設定へ →"
    >
      <canvas
        ref={canvasRef}
        width={320}
        height={320}
        className="block mx-auto mb-4 rounded-xl border border-white/20"
        style={{ background: "#050d1a" }}
      />

      <p className={`text-center text-sm mb-4 font-medium ${ok ? "text-cyan-300" : "text-yellow-300"}`}>
        {ok
          ? "✅ ベッドに収まっています！「スライス設定へ」を押してね"
          : `⚠️ モデルがベッドからはみ出ています (スケール: ${scale.toFixed(2)}x)`}
      </p>

      <div className="flex flex-wrap gap-2 justify-center mb-5">
        {[
          { label: "↺ 左15°", action: () => setAngle((a) => (a - 15 + 360) % 360) },
          { label: "↻ 右15°", action: () => setAngle((a) => (a + 15) % 360) },
          { label: "縮小 −",  action: () => setScale((s) => Math.max(0.3, +(s * 0.85).toFixed(2))) },
          { label: "拡大 ＋", action: () => setScale((s) => Math.min(2.5, +(s * 1.15).toFixed(2))) },
          { label: "中央に配置", action: () => { setAngle(0); setScale(0.8); } },
        ].map(({ label, action }) => (
          <button
            key={label}
            onClick={action}
            className="px-4 py-2 rounded-full text-sm font-bold text-white transition hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#7B2FBE,#2196F3)" }}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="glass p-4 text-sm leading-relaxed">
        💡 <strong>ポイント：</strong>3Dデータはそのままでは印刷できないよ！<br />
        ベッドのサイズに合わせて<strong>向き・大きさ・位置</strong>を調整する「スライサーソフト」を使うよ。
      </div>
    </LevelShell>
  );
}
