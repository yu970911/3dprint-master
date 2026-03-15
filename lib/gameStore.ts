"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface GameState {
  unlockedLevels: number[];
  completedLevels: number[];
  scores: Record<number, number>;
  completeLevel: (level: number, score: number) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      unlockedLevels: [1],
      completedLevels: [],
      scores: {},
      completeLevel: (level, score) =>
        set((s) => ({
          completedLevels: s.completedLevels.includes(level)
            ? s.completedLevels
            : [...s.completedLevels, level],
          unlockedLevels: s.unlockedLevels.includes(level + 1)
            ? s.unlockedLevels
            : [...s.unlockedLevels, level + 1],
          scores: { ...s.scores, [level]: Math.max(s.scores[level] ?? 0, score) },
        })),
      resetGame: () =>
        set({ unlockedLevels: [1], completedLevels: [], scores: {} }),
    }),
    { name: "3dprint-master" }
  )
);

export const LEVELS = [
  { id: 1, icon: "🔧", name: "組み立てよう！", desc: "3Dプリンターのパーツを正しく配置", color: "#CE93D8" },
  { id: 2, icon: "💾", name: "データを準備！", desc: "3Dモデルをベッドに正しくセット", color: "#64B5F6" },
  { id: 3, icon: "⚙️", name: "スライス設定", desc: "品質・強度・速度のバランスを調整", color: "#80DEEA" },
  { id: 4, icon: "🖨️", name: "プリント開始！", desc: "積層プロセスをアニメーションで体験", color: "#A5D6A7" },
  { id: 5, icon: "🛠️", name: "トラブル対応！", desc: "よくある失敗の対処法をクイズで学ぶ", color: "#FFCC80" },
];
