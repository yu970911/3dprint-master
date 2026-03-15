"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/lib/gameStore";
import LevelShell from "@/components/LevelShell";

const TOTAL = 30;
const EVENTS = [
  { at: 5,  msg: "🌡️ ノズル温度安定中... 200°C",           type: "info" },
  { at: 8,  msg: "⚠️ 糸引きを検知！リトラクション動作中...", type: "warn" },
  { at: 12, msg: "✅ 第1層クリア！接着良好",                 type: "ok" },
  { at: 15, msg: "⚠️ ベッド温度低下を検知。加熱中...",       type: "warn" },
  { at: 18, msg: "💡 充填パターン開始（ハニカム）",           type: "info" },
  { at: 22, msg: "✅ 内部構造完成！外壁レイヤーへ",           type: "ok" },
  { at: 25, msg: "⚠️ わずかな反りを検知。印刷続行中...",     type: "warn" },
  { at: 28, msg: "🎉 最終レイヤー！仕上げ中...",             type: "ok" },
  { at: 30, msg: "✅ プリント完了！冷却中...",               type: "ok" },
];

const LOG_COLORS: Record<string, string> = { info: "#80DEEA", warn: "#FFCC80", ok: "#A5D6A7" };

export default function Level4() {
  const router = useRouter();
  const { completeLevel } = useGameStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef  = useRef({ layer: 0, headX: 30, headDir: 1, sub: 0 });
  const rafRef    = useRef<number>(0);
  const [playing, setPlaying]   = useState(false);
  const [speed, setSpeed]       = useState(1);
  const [layer, setLayer]       = useState(0);
  const [logs, setLogs]         = useState<{ msg: string; type: string }[]>([]);
  const [done, setDone]         = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  const addLog = useCallback((msg: string, type: string) => {
    setLogs((l) => [...l, { msg, type }]);
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W = canvas.width, H = canvas.height;
    const BED_Y = H - 36;
    const layerH = (H - 90) / TOTAL;
    const s = stateRef.current;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#050d1a";
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = "rgba(100,150,255,0.08)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= W; x += 30) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }

    // Bed
    ctx.fillStyle = "#1a2a4a";
    ctx.fillRect(24, BED_Y, W - 48, 18);
    ctx.strokeStyle = "#2196F3";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(24, BED_Y, W - 48, 18);
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("ヒートベッド", W / 2, BED_Y + 13);

    // Layers
    for (let i = 0; i < s.layer; i++) {
      const y = BED_Y - (i + 1) * layerH;
      const t2 = i / TOTAL;
      const fade = 0.4 + 0.6 * (i / Math.max(1, s.layer));
      ctx.fillStyle = `rgba(${Math.round(100 + 55 * t2)},${Math.round(100 + 100 * (1-t2))},255,${fade})`;
      ctx.fillRect(44, y, W - 88, layerH - 1);
      if (i > 3 && i < s.layer - 2 && i % 3 === 0) {
        ctx.strokeStyle = `rgba(150,200,255,0.15)`;
        ctx.lineWidth = 0.5;
        for (let xi = 50; xi < W - 50; xi += 8) {
          ctx.beginPath(); ctx.moveTo(xi, y); ctx.lineTo(xi, y + layerH - 1); ctx.stroke();
        }
      }
    }

    // Rail
    const headY = BED_Y - s.layer * layerH - 24;
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(16, headY); ctx.lineTo(W - 16, headY); ctx.stroke();

    // Print head
    if (s.layer < TOTAL) {
      ctx.fillStyle = "#37474F";
      ctx.fillRect(s.headX - 14, headY - 12, 28, 16);
      ctx.fillStyle = "#78909C";
      ctx.fillRect(s.headX - 5, headY + 2, 10, 8);
      if (playing) {
        ctx.fillStyle = `rgba(100,200,255,${0.5 + 0.5 * Math.sin(Date.now() * 0.01)})`;
        ctx.beginPath();
        ctx.arc(s.headX, headY + 12, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.font = "10px monospace";
    ctx.textAlign = "right";
    ctx.fillText(`Layer ${s.layer}/${TOTAL}`, W - 8, 16);
  }, [playing]);

  const loop = useCallback(() => {
    const s = stateRef.current;
    if (s.layer >= TOTAL) return;

    const framesPerLayer = Math.max(1, Math.round(60 / speed));
    s.headX += s.headDir * (3 * speed);
    if (s.headX > 300) { s.headX = 300; s.headDir = -1; }
    if (s.headX < 40)  { s.headX = 40;  s.headDir = 1; }

    s.sub++;
    if (s.sub >= framesPerLayer) {
      s.sub = 0;
      s.layer++;
      setLayer(s.layer);
      const ev = EVENTS.find((e) => e.at === s.layer);
      if (ev) addLog(ev.msg, ev.type);
      if (s.layer >= TOTAL) {
        setDone(true);
        setPlaying(false);
        completeLevel(4, 100);
        draw();
        return;
      }
    }
    draw();
    rafRef.current = requestAnimationFrame(loop);
  }, [speed, draw, addLog, completeLevel]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logs]);

  useEffect(() => { draw(); }, [draw]);

  function togglePlay() {
    if (done) return;
    if (!playing) {
      if (stateRef.current.layer === 0) addLog("🖨️ プリント開始！", "info");
      setPlaying(true);
    } else {
      cancelAnimationFrame(rafRef.current);
      setPlaying(false);
    }
  }

  useEffect(() => {
    if (playing) {
      rafRef.current = requestAnimationFrame(loop);
    } else {
      cancelAnimationFrame(rafRef.current);
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, loop]);

  function reset() {
    cancelAnimationFrame(rafRef.current);
    stateRef.current = { layer: 0, headX: 30, headDir: 1, sub: 0 };
    setLayer(0);
    setLogs([]);
    setDone(false);
    setPlaying(false);
    draw();
  }

  const pct = Math.round((layer / TOTAL) * 100);

  return (
    <LevelShell
      level={4} icon="🖨️" title="プリント開始！"
      instruction="3Dプリンターが層を積み重ねていく様子を観察しよう！途中でトラブルが起きることも…？ ログをよく見てね。"
      onNext={done ? () => { completeLevel(4, 100); router.push("/level/5"); } : undefined}
      nextDisabled={!done}
      nextLabel="トラブル対応へ →"
    >
      <canvas
        ref={canvasRef}
        width={360}
        height={280}
        className="block mx-auto mb-4 rounded-xl"
        style={{ background: "#050d1a" }}
      />

      {/* Progress */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm text-white/60 w-10">{pct}%</span>
        <div className="flex-1 h-3 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: pct + "%", background: "linear-gradient(90deg,#7B2FBE,#00BCD4)" }}
          />
        </div>
        <span className="text-sm text-white/60 w-14 text-right">{layer}/{TOTAL}層</span>
      </div>

      {/* Controls */}
      <div className="flex gap-2 justify-center flex-wrap mb-4">
        <button
          onClick={togglePlay}
          disabled={done}
          className="px-5 py-2 rounded-full text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:opacity-40"
          style={{ background: "linear-gradient(135deg,#7B2FBE,#2196F3)" }}
        >
          {playing ? "⏸ 一時停止" : "▶ 再生"}
        </button>
        {[1, 3, 8].map((s) => (
          <button
            key={s}
            onClick={() => setSpeed(s)}
            className="px-4 py-2 rounded-full text-sm font-bold transition hover:-translate-y-0.5"
            style={{
              background: speed === s ? "linear-gradient(135deg,#7B2FBE,#2196F3)" : "rgba(255,255,255,0.1)",
              color: "#fff",
            }}
          >
            {s}x
          </button>
        ))}
        <button
          onClick={reset}
          className="px-4 py-2 rounded-full text-sm font-bold text-white bg-white/10 hover:bg-white/20 transition"
        >
          🔄
        </button>
      </div>

      {/* Log */}
      <div className="glass p-4 rounded-xl">
        <div className="text-sm text-white/50 mb-2">📋 プリントログ</div>
        <div ref={logRef} className="h-28 overflow-y-auto text-xs font-mono space-y-1">
          {logs.length === 0
            ? <p className="text-white/30">プリント開始を待っています...</p>
            : logs.map((l, i) => (
              <p key={i} style={{ color: LOG_COLORS[l.type] || "#fff" }}>{l.msg}</p>
            ))}
        </div>
      </div>
    </LevelShell>
  );
}
