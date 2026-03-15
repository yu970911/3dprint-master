"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/lib/gameStore";
import LevelShell from "@/components/LevelShell";

const QUIZ = [
  {
    scene: "🔴", title: "ノズル詰まり！",
    sub: "フィラメントが全く出てこない。どうする？",
    choices: ["電源を切って放置する", "ノズルを加熱してクリーニング・分解洗浄する", "速度を上げて無理やり押し出す"],
    ans: 1,
    explain: "✅ ノズル詰まりは加熱してクリーニングロッドで突くか、コールドプルという方法で解消するよ。無理やり押し出すとモーターが壊れるので厳禁！",
  },
  {
    scene: "🟡", title: "反り（ワーピング）！",
    sub: "底の角が浮き上がってベッドから剥がれかけている",
    choices: ["ヒートベッドの温度を上げてブリムを追加する", "印刷速度をさらに上げる", "サポート材を外す"],
    ans: 0,
    explain: "✅ 反りはベッド温度を上げることで抑えられるよ。ブリム（周囲に薄い縁を追加）も効果的！冷却ファンを弱めるのも手。",
  },
  {
    scene: "🟠", title: "糸引き（ストリング）！",
    sub: "移動中に細い糸が引っかかって造形物にまとわりついている",
    choices: ["フィラメントを別のものに変える", "リトラクション設定を増やし温度を少し下げる", "充填率を上げる"],
    ans: 1,
    explain: "✅ 糸引きはリトラクション（フィラメントを引き戻す動作）の距離・速度を増やすのが効果的。温度が高すぎると垂れやすいので少し下げてみよう。",
  },
  {
    scene: "🔵", title: "ベッド剥がれ！",
    sub: "印刷途中でオブジェクトがベッドからズレてしまった",
    choices: ["ベッドレベリングをやり直してのり・テープで接着力を上げる", "充填率を下げる", "印刷温度を大幅に上げる"],
    ans: 0,
    explain: "✅ まずはベッドの水平を確認！ノズルとベッドの距離が大切。テープ（青マスキングテープ）や接着スプレーで密着力を上げるのも有効だよ。",
  },
];

export default function Level5() {
  const router = useRouter();
  const { completeLevel } = useGameStore();
  const [qi, setQi]           = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [correct, setCorrect]   = useState(0);

  const q = QUIZ[qi];

  function answer(idx: number) {
    if (answered) return;
    setAnswered(true);
    setSelected(idx);
    if (idx === q.ans) setCorrect((c) => c + 1);
  }

  function next() {
    if (qi < QUIZ.length - 1) {
      setQi((i) => i + 1);
      setAnswered(false);
      setSelected(null);
    } else {
      const score = Math.round(((correct + (selected === q.ans ? 1 : 0)) / QUIZ.length) * 100);
      completeLevel(5, score);
      router.push("/complete");
    }
  }

  const isLast = qi === QUIZ.length - 1;

  return (
    <LevelShell
      level={5} icon="🛠️" title="トラブル対応！"
      instruction="3Dプリントで起きたトラブルの正しい対処法を選ぼう！4問全部正解できるかな？"
    >
      {/* Scene */}
      <div className="glass rounded-2xl p-6 mb-4 text-center">
        <div className="text-6xl mb-3">{q.scene}</div>
        <div className="text-lg font-bold mb-1">{q.title}</div>
        <div className="text-sm text-white/60 mb-5">{q.sub}</div>

        <div className="flex flex-col gap-3">
          {q.choices.map((c, i) => {
            let cls = "border-white/20 bg-white/5 hover:bg-white/15";
            if (answered) {
              if (i === q.ans) cls = "border-green-500 bg-green-500/20";
              else if (i === selected) cls = "border-red-500 bg-red-500/15";
              else cls = "border-green-500/30 bg-green-500/08 opacity-60";
            }
            return (
              <button
                key={i}
                onClick={() => answer(i)}
                disabled={answered}
                className={`p-4 rounded-xl border-2 text-left text-sm transition-all ${cls} disabled:cursor-default`}
              >
                <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>{c}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="mt-4 rounded-xl bg-white/8 p-4 text-sm text-left leading-relaxed">
            {q.explain}
          </div>
        )}
      </div>

      {/* Nav */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-white/50">問題 {qi + 1}/{QUIZ.length}　正解: {correct}問</span>
        {answered && (
          <button
            onClick={next}
            className="px-6 py-2 rounded-full text-sm font-bold text-white transition hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#4CAF50,#00BCD4)" }}
          >
            {isLast ? "結果へ！🎉" : "次の問題 →"}
          </button>
        )}
      </div>
    </LevelShell>
  );
}
