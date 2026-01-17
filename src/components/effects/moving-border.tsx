"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MovingBorderProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  borderRadius?: string;
  duration?: number;
  borderClassName?: string;
}

export function MovingBorder({
  children,
  className,
  containerClassName,
  borderRadius = "1.75rem",
  duration = 4000,
  borderClassName,
}: MovingBorderProps) {
  return (
    <div
      className={cn(
        "relative p-[1px] overflow-hidden",
        containerClassName
      )}
      style={{ borderRadius }}
    >
      {/* Moving border */}
      <div
        className="absolute inset-0"
        style={{ borderRadius }}
      >
        <motion.div
          className={cn(
            "absolute h-20 w-20 opacity-80",
            "bg-[radial-gradient(var(--tw-gradient-stops))]",
            "from-purple-500 via-pink-500 to-transparent",
            borderClassName
          )}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: duration / 1000,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            background: `conic-gradient(from 0deg, transparent, rgba(139, 92, 246, 0.8), rgba(236, 72, 153, 0.8), transparent)`,
          }}
        />
      </div>

      {/* Content */}
      <div
        className={cn(
          "relative bg-zinc-900 backdrop-blur-xl",
          className
        )}
        style={{ borderRadius: `calc(${borderRadius} - 1px)` }}
      >
        {children}
      </div>
    </div>
  );
}

interface MovingBorderButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function MovingBorderButton({
  children,
  className,
  onClick,
}: MovingBorderButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-zinc-900",
        className
      )}
    >
      {/* Animated border */}
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#6366f1_0%,#a855f7_50%,#6366f1_100%)]" />

      {/* Button content */}
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-zinc-900 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl">
        {children}
      </span>
    </button>
  );
}
