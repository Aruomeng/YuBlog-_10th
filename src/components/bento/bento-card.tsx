"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2;
  glowColor?: string;
}

const colSpanClasses = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
};

const rowSpanClasses = {
  1: "row-span-1",
  2: "row-span-2",
};

export function BentoCard({
  children,
  className,
  colSpan = 1,
  rowSpan = 1,
  glowColor = "rgba(102, 126, 234, 0.15)",
}: BentoCardProps) {
  return (
    <motion.div
      className={cn(
        "relative group rounded-2xl p-6",
        "bg-gradient-to-br from-zinc-900/80 to-zinc-900/40",
        "border border-zinc-800/50",
        "backdrop-blur-xl",
        "overflow-hidden",
        colSpanClasses[colSpan],
        rowSpanClasses[rowSpan],
        className
      )}
      initial={false}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}, transparent 40%)`,
        }}
      />

      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20" />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </motion.div>
  );
}
