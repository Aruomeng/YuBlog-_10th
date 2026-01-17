"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface FlowingGradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export function FlowingGradientText({ children, className }: FlowingGradientTextProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className={cn(
        "relative inline-block bg-clip-text text-transparent",
        "bg-[length:200%_100%]",
        className
      )}
      style={{
        backgroundImage: "linear-gradient(90deg, #a855f7, #ec4899, #f97316, #a855f7)",
        animation: isHovered 
          ? "flowGradient 6s linear infinite" 
          : "flowGradient 3s linear infinite",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <style jsx>{`
        @keyframes flowGradient {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
      `}</style>
    </span>
  );
}
