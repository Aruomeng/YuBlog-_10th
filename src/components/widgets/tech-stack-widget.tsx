"use client";

import { BentoCard } from "@/components/bento/bento-card";
import { motion } from "framer-motion";

interface TechItem {
  name: string;
  icon: string;
  color: string;
}

const techStack: TechItem[] = [
  { name: "Next.js", icon: "▲", color: "from-zinc-600 to-zinc-800" },
  { name: "React", icon: "⚛️", color: "from-cyan-500 to-blue-500" },
  { name: "TypeScript", icon: "TS", color: "from-blue-500 to-blue-700" },
  { name: "Tailwind", icon: "🎨", color: "from-teal-400 to-cyan-500" },
  { name: "AI/LLM", icon: "🤖", color: "from-purple-500 to-pink-500" },
  { name: "Node.js", icon: "⬢", color: "from-green-500 to-green-700" },
];

export function TechStackWidget() {
  return (
    <BentoCard colSpan={2} rowSpan={1} glowColor="rgba(34, 211, 238, 0.15)">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <span className="text-xl">⚡</span>
        技术栈
      </h3>

      <div className="grid grid-cols-3 gap-2">
        {techStack.map((tech, index) => (
          <motion.div
            key={tech.name}
            className={`relative group rounded-lg p-2 bg-gradient-to-br ${tech.color} cursor-pointer`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.1, y: -2 }}
          >
            <div className="text-center">
              <div className="text-lg mb-1">{tech.icon}</div>
              <div className="text-[10px] text-white/80 font-medium truncate">
                {tech.name}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </BentoCard>
  );
}
