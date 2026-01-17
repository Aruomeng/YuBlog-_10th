"use client";

import { BentoCard } from "@/components/bento/bento-card";
import { motion } from "framer-motion";

export function AboutWidget() {
  return (
    <BentoCard colSpan={1} rowSpan={2} glowColor="rgba(139, 92, 246, 0.15)">
      <div className="h-full flex flex-col justify-between">
        <div>
          {/* Avatar with glow */}
          <motion.div
            className="relative w-20 h-20 mb-6"
            whileHover={{ scale: 1.1 }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-lg opacity-50" />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold">
              Y
            </div>
          </motion.div>

          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            你好，我是 Yu 👋
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            全栈开发者 | AI 爱好者 | 开源贡献者
          </p>
        </div>

        <div className="mt-6">
          <p className="text-zinc-500 text-sm leading-relaxed">
            热衷于构建优雅的用户体验和探索前沿技术。这是我的第十代博客，融合了最新的 Web 技术和 AI 能力。
          </p>

          {/* Status indicator */}
          <div className="flex items-center gap-2 mt-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs text-zinc-500">开放合作机会</span>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}
