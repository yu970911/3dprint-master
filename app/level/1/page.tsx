"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/lib/gameStore";
import LevelShell from "@/components/LevelShell";

const PARTS = [
  { id: "nozzle",   name: "ノズル",       emoji: "🔩", desc: "溶けた材料を押し出す先端",       color: "#CE93D8" },
  { id: "filament", name: "フィラメント", emoji: "🧵", desc: "印刷材料（糸状プラスチック）",   color: "#80DEEA" },
  { id: "heatbed",  name: "ヒートベッド", emoji: "🟥", desc: "造形物を載せる加熱ベッド",       color: "#EF9A9A" },
  { id: "zaxis",    name: "Z軸",          emoji: "↕️", desc: "上下方向に動く支柱",             color: "#A5D6A7" },
  { id: "motor",    name: "モーター",     emoji: "⚙️", desc: "各軸を動かす原動力",             color: "#FFD54F" },
];

const SLOTS = [
  { id: "nozzle",   label: "ノズル（出口）",   hint: "プリントヘッド先端", pos: "top-16 left-1/2 -translate-x-1/2" },
  { id: "filament", label: "材料スプール",      hint: "右側の巻きもの",     pos: "top-4 right-2" },
  { id: "heatbed",  label: "ヒートベッド",      hint: "下のプラットフォーム", pos: "bottom-4 left-1/2 -translate-x-1/2" },
  { id: "zaxis",    label: "Z軸（縦柱）",       hint: "左の縦棒",           pos: "top-1/2 -translate-y-1/2 left-2" },
  { id: "motor",    label: "モーター",          hint: "右下の駆動部",       pos: "bottom-16 right-4" },
];

export default function Level1() {
  const router = useRouter();
  const { completeLevel } = useGameStore();
  const [selected, setSelected] = useState<string | null>(null);
  const [placed, setPlaced] = useState<Record<string, boolean>>({});
  const [msg, setMsg] = useState("");

  const allDone = PARTS.every((p) => placed[p.id]);

  function selectPart(id: string) {
    if (placed[id]) return;
    setSelected((s) => (s === id ? null : id));
  }

  function placeInSlot(slotId: string) {
    if (!selected) { setMsg("まずパーツを選んでね！"); return; }
    if (placed[slotId]) { setMsg("すでに配置済みだよ！"); return; }
    if (selected === slotId) {
      setPlaced((p) => ({ ...p, [slotId]: true }));
      const part = PARTS.find((p) => p.id === selected)!;
      setMsg(`✅ ${part.name} をセット！`);
      setSelected(null);
    } else {
      const part = PARTS.find((p) => p.id === selected)!;
      setMsg(`❌ ${part.name} はここじゃないかも？`);
    }
  }

  function handleNext() {
    completeLevel(1, 100);
    router.push("/level/2");
  }

  function reset() {
    setSelected(null);
    setPlaced({});
    setMsg("");
  }

  return (
    <LevelShell
      level={1} icon="🔧" title="組み立てよう！"
      instruction="パーツを選んで（タップ）→ 3Dプリンターの正しい場所に配置しよう！"
      onNext={allDone ? handleNext : undefined}
      nextDisabled={!allDone}
    >
      {/* Printer diagram */}
      <div className="glass p-4 mb-4">
        <p className="text-center text-sm text-white/50 mb-3">🖨️ 3Dプリンター（スロットをタップして配置）</p>
        <div className="relative w-full max-w-xs mx-auto" style={{ height: 260 }}>
          {/* Frame lines */}
          <div className="absolute inset-8 border-2 border-white/10 rounded-xl" />
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-1 h-24 bg-white/10 rounded" />

          {SLOTS.map((slot) => {
            const done = placed[slot.id];
            const part = done ? PARTS.find((p) => p.id === slot.id)! : null;
            return (
              <button
                key={slot.id}
                onClick={() => placeInSlot(slot.id)}
                className={`absolute flex flex-col items-center justify-center gap-0.5 rounded-xl border-2 transition-all text-xs font-medium px-2 py-2 min-w-16 ${
                  done
                    ? "border-solid bg-black/20"
                    : "border-dashed border-white/30 bg-white/5 hover:bg-white/15"
                }`}
                style={{
                  ...(done ? { borderColor: part!.color } : {}),
                  top: undefined, left: undefined,
                }}
                data-pos={slot.pos}
              >
                {done ? (
                  <>
                    <span className="text-lg">{part!.emoji}</span>
                    <span style={{ color: part!.color }}>{part!.name}</span>
                  </>
                ) : (
                  <span className="text-white/40 leading-tight text-center">{slot.label}</span>
                )}
              </button>
            );
          })}

          {/* Re-do with absolute CSS since Tailwind dynamic classes won't work */}
          <style>{`
            [data-pos="top-16 left-1\\/2 -translate-x-1\\/2"] { top:64px; left:50%; transform:translateX(-50%); }
            [data-pos="top-4 right-2"] { top:16px; right:8px; }
            [data-pos="bottom-4 left-1\\/2 -translate-x-1\\/2"] { bottom:16px; left:50%; transform:translateX(-50%); }
            [data-pos="top-1\\/2 -translate-y-1\\/2 left-2"] { top:50%; left:8px; transform:translateY(-50%); }
            [data-pos="bottom-16 right-4"] { bottom:64px; right:16px; }
          `}</style>
        </div>
      </div>

      {/* Parts panel */}
      <div className="glass p-4 mb-4">
        <p className="text-sm text-white/50 mb-3">📦 パーツ一覧（選んでからスロットに配置）</p>
        <div className="flex flex-wrap gap-3 justify-center">
          {PARTS.map((p) => (
            <button
              key={p.id}
              onClick={() => selectPart(p.id)}
              disabled={placed[p.id]}
              className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl border-2 transition-all text-sm font-medium disabled:opacity-30 disabled:cursor-default ${
                selected === p.id
                  ? "scale-105"
                  : "border-white/15 bg-white/5 hover:bg-white/12"
              }`}
              style={selected === p.id ? { borderColor: p.color, background: p.color + "22" } : {}}
            >
              <span className="text-2xl">{p.emoji}</span>
              <span style={{ color: p.color }}>{p.name}</span>
              <span className="text-white/40 text-xs text-center max-w-20">{p.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {msg && (
        <p className={`text-center text-base font-medium mb-2 ${msg.startsWith("✅") ? "text-green-400" : msg.startsWith("❌") ? "text-red-400" : "text-yellow-400"}`}>
          {msg}
        </p>
      )}

      {allDone && (
        <div className="text-center text-green-400 font-bold text-lg mb-2">
          🎉 全パーツ配置完了！3Dプリンターの完成だよ！
        </div>
      )}

      <div className="flex justify-center mt-2">
        <button
          onClick={reset}
          className="px-4 py-2 rounded-full text-sm text-white/60 bg-white/10 hover:bg-white/20 transition"
        >
          🔄 リセット
        </button>
      </div>
    </LevelShell>
  );
}
