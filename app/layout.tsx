import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { StarBackground } from "@/components/common/StarBackground";
import { Footer } from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "Cosmos Atlas",
  description: "一个用于探索航天任务、宇宙历史、宇宙结构、星图和天文图像的沉浸式中文宇宙图谱。"
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="zh-CN">
      <body>
        <StarBackground />
        <div className="cosmic-grid pointer-events-none fixed inset-0 z-0" />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
