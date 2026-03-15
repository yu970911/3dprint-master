import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "３DプリンターゲームÂ～３DLab～",
  description: "3Dプリンターのすべてをゲームで学ぼう！",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
