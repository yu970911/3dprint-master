"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/lib/gameStore";
import LevelShell from "@/components/LevelShell";

function Bar({ value, gradient }: { value: number; gradient: string }) {
  return (
    <div className="flex-1 h-3 rounded-full bg-white/10 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${Math.max(2, Math.min(100, value))}%`, background: gradient }}
      />
    </div>
  );
}

export default function Level3() {
  const router = useRouter();
  const { completeLevel } = useGameStore();
  const [layerRaw, setLayerRaw] = useState(20);   // ×0.01mm
  const [speed, setSpeed]       = useState(50);
  const [fill, setFill]         = useState(20);
  const [supp, setSupp]         = useState(false);

  const layer  = layerRaw / 100;
  const quality  = Math.max(10, Math.round(100 - layer * 300 - speed * 0.4));
  const strength = Math.round(fill * 0.85 + 10);
  const timeMins = Math.round(60 + (100 - speed) * 1.5 + (1 - layer) * 200 + fill * 0.5 + (supp ? 40 : 0));
  const risk     = Math.max(5, Math.min(100, Math.round(speed * 0.4 + layer * 200 - fill * 0.3 - (supp ? 15 : 0))));

  const advices: string[] = [];
  if (layer > 0.25) advices.push("⚠️ 積層ピッチが大きすぎ → 表面が粗くなるよ");
  if (speed > 80)   advices.push("⚠️ 速度が速すぎ → 品質が下がりやすいよ");
  if (fill < 10)    advices.push("⚠️ 充填率が低すぎ → 壊れやすいかも");
  if (fill > 80)    advices.push("💡 充填率80%以上は材料がとても多くなるよ");
  if (!advices.length) advices.push("✅ バランスの良い設定だよ！「プリント開始！」を押してね");

  function handleNext() {
    completeLevel(3, Math.round((quality + strength) / 2));
    router.push("/level/4");
  }

  return (
    <LevelShell
      level={3} icon="⚙️" title="スライス設定"
      instruction="スライダーを動かして最適な印刷設定を見つけよう！品質・強度・失敗リスクがリアルタイムで変わるよ。"
      onNext={handleNext}
      nextLabel="プリント開始！ →"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        {/* Layer height */}
        <div className="glass p-4 rounded-xl">
          <div className="text-xs text-white/50 mb-1">積層ピッチ（Layer Height）</div>
          <div className="text-2xl font-bold mb-2">{layer.toFixed(2)} mm</div>
          <input type="range" min={5} max={30} value={layerRaw} onChange={(e) => setLayerRaw(+e.target.value)} />
          <div className="text-xs text-white/40 mt-1">小さい ← 高品質 / 速い → 大きい</div>
        </div>

        {/* Speed */}
        <div className="glass p-4 rounded-xl">
          <div className="text-xs text-white/50 mb-1">印刷速度（Print Speed）</div>
          <div className="text-2xl font-bold mb-2">{speed} mm/s</div>
          <input type="range" min={20} max={120} value={speed} onChange={(e) => setSpeed(+e.target.value)} />
          <div className="text-xs text-white/40 mt-1">遅い ← 高品質 / 速い → 早い</div>
        </div>

        {/* Infill */}
        <div className="glass p-4 rounded-xl">
          <div className="text-xs text-white/50 mb-1">充填率（Infill）</div>
          <div className="text-2xl font-bold mb-2">{fill} %</div>
          <input type="range" min={5} max={100} value={fill} onChange={(e) => setFill(+e.target.value)} />
          <div className="text-xs text-white/40 mt-1">スカスカ ← 節約 / 強い → ぎっしり</div>
        </div>

        {/* Support */}
        <div className="glass p-4 rounded-xl">
          <div className="text-xs text-white/50 mb-1">サポート材（Support）</div>
          <div className="text-2xl font-bold mb-3">{supp ? "あり" : "なし"}</div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-5 h-5" checked={supp} onChange={(e) => setSupp(e.target.checked)} />
            <span className="text-sm">オーバーハングを支える</span>
          </label>
          <div className="text-xs text-white/40 mt-2">突き出た部分には必要</div>
        </div>
      </div>

      {/* Preview */}
      <div className="glass p-5 rounded-2xl mb-4">
        <div className="font-bold mb-4">📊 リアルタイムプレビュー</div>
        {[
          { label: "✨ 品質",    val: quality,  display: quality + "%",      grad: "linear-gradient(90deg,#FFD700,#4CAF50)" },
          { label: "💪 強度",    val: strength, display: strength + "%",     grad: "linear-gradient(90deg,#2196F3,#00BCD4)" },
          { label: "⏱️ 印刷時間", val: Math.min(100, timeMins / 3), display: `約${timeMins}分`, grad: "linear-gradient(90deg,#7B2FBE,#CE93D8)" },
          { label: "⚠️ 失敗リスク", val: risk, display: risk < 30 ? "低" : risk < 60 ? "中" : "高", grad: "linear-gradient(90deg,#FF9800,#F44336)" },
        ].map(({ label, val, display, grad }) => (
          <div key={label} className="flex items-center gap-3 mb-3">
            <span className="text-sm w-24 flex-shrink-0">{label}</span>
            <Bar value={val} gradient={grad} />
            <span className="text-sm w-12 text-right">{display}</span>
          </div>
        ))}

        <div className="mt-3 rounded-lg bg-white/5 p-3 text-sm space-y-1">
          {advices.map((a, i) => <div key={i}>{a}</div>)}
        </div>
      </div>

      <div className="glass p-4 rounded-xl text-sm leading-relaxed">
        💡 <strong>おすすめ設定：</strong>積層ピッチ 0.2mm・速度 50mm/s・充填率 20〜30% が多くの場合バランスが良いよ！
      </div>
    </LevelShell>
  );
}
