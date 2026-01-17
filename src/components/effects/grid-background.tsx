"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface GridBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export function GridBackground({ className, children }: GridBackgroundProps) {
  return (
    <div
      className={cn(
        "relative w-full min-h-screen bg-background overflow-hidden",
        className
      )}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem]"
        style={{
          maskImage: "radial-gradient(ellipse 80% 50% at 50% 0%, black 70%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 50% at 50% 0%, black 70%, transparent 100%)",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function DotBackground({ className, children }: GridBackgroundProps) {
  return (
    <div
      className={cn(
        "relative w-full min-h-screen bg-background overflow-hidden",
        className
      )}
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 bg-[radial-gradient(#2a2a2a_1px,transparent_1px)] bg-[size:2rem_2rem]"
        style={{
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function SpotlightBackground({ className, children }: GridBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      container.style.setProperty("--mouse-x", `${x}px`);
      container.style.setProperty("--mouse-y", `${y}px`);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full min-h-screen bg-background overflow-hidden",
        className
      )}
    >
      {/* Spotlight effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(139, 92, 246, 0.06), transparent 40%)`,
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem]"
        style={{
          maskImage: "radial-gradient(ellipse 80% 50% at 50% 0%, black 70%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 50% at 50% 0%, black 70%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
