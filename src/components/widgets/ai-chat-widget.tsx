"use client";

import { BentoCard } from "@/components/bento/bento-card";
import { motion } from "framer-motion";

export function AIChatWidget() {
  return (
    <BentoCard colSpan={1} rowSpan={1} glowColor="rgba(168, 85, 247, 0.2)">
      <div className="h-full flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <motion.div
            className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(168, 85, 247, 0.4)",
                "0 0 0 10px rgba(168, 85, 247, 0)",
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="text-sm">🤖</span>
          </motion.div>
          <div>
            <h3 className="text-sm font-semibold text-white">AI 助手</h3>
            <p className="text-xs text-zinc-500">问我任何问题</p>
          </div>
        </div>

        {/* Simplified chat preview */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.div
            className="bg-zinc-800/50 rounded-lg p-2.5 text-xs text-zinc-300"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            你好！试着问我关于技术的问题吧！
          </motion.div>
        </div>

        {/* Input hint */}
        <motion.div
          className="flex items-center gap-2 bg-zinc-800/30 rounded-lg p-2 border border-zinc-700/50 cursor-pointer"
          whileHover={{ borderColor: "rgba(168, 85, 247, 0.5)" }}
        >
          <span className="text-xs text-zinc-500 flex-1 truncate">按 ⌘K 开始对话...</span>
          <kbd className="px-1.5 py-0.5 text-[10px] bg-zinc-700 rounded text-zinc-400 shrink-0">
            ⌘K
          </kbd>
        </motion.div>
      </div>
    </BentoCard>
  );
}

