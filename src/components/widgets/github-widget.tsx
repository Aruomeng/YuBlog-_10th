"use client";

import { BentoCard } from "@/components/bento/bento-card";
import { motion } from "framer-motion";

interface GitHubStats {
  repos: number;
  stars: number;
  commits: number;
  contributions: number;
}

const stats: GitHubStats = {
  repos: 42,
  stars: 128,
  commits: 1024,
  contributions: 365,
};

// Contribution graph simulation - using seeded deterministic data to avoid hydration mismatch
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const contributionData = Array.from({ length: 52 }, (_, weekIndex) =>
  Array.from({ length: 7 }, (_, dayIndex) =>
    Math.floor(seededRandom(weekIndex * 7 + dayIndex + 1) * 5)
  )
);

const getContributionColor = (level: number) => {
  const colors = [
    "bg-zinc-800",
    "bg-green-900",
    "bg-green-700",
    "bg-green-500",
    "bg-green-400",
  ];
  return colors[level];
};

export function GithubWidget() {
  return (
    <BentoCard colSpan={2} rowSpan={1} glowColor="rgba(74, 222, 128, 0.15)">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          GitHub 活跃度
        </h3>
        <motion.a
          href="https://github.com/Aruomeng"
          target="_blank"
          className="text-xs text-zinc-500 hover:text-white transition-colors"
          whileHover={{ x: 5 }}
        >
          @username →
        </motion.a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[
          { label: "仓库", value: stats.repos },
          { label: "星标", value: stats.stars },
          { label: "提交", value: stats.commits },
          { label: "贡献", value: stats.contributions },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="text-lg font-bold text-white">{stat.value}</div>
            <div className="text-xs text-zinc-500">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Contribution Graph */}
      <div className="overflow-hidden">
        <div className="flex gap-[2px]">
          {contributionData.slice(-26).map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[2px]">
              {week.map((day, dayIndex) => (
                <motion.div
                  key={dayIndex}
                  className={`w-2 h-2 rounded-sm ${getContributionColor(day)}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (weekIndex * 7 + dayIndex) * 0.002 }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
