"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    isUp: boolean;
  };
  className?: string;
}

export function StatsCard({ title, value, icon, trend, className }: StatsCardProps) {
  return (
    <motion.div
      className={cn(
        "relative p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 overflow-hidden",
        className
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-3xl">{icon}</span>
          {trend && (
            <span
              className={cn(
                "text-xs font-medium px-2 py-1 rounded-full",
                trend.isUp
                  ? "bg-green-500/10 text-green-400"
                  : "bg-red-500/10 text-red-400"
              )}
            >
              {trend.isUp ? "↑" : "↓"} {Math.abs(trend.value)}%
            </span>
          )}
        </div>
        
        <p className="text-3xl font-bold text-white mb-1">{value}</p>
        <p className="text-sm text-zinc-500">{title}</p>
      </div>
    </motion.div>
  );
}

interface DataCardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  action?: ReactNode;
}

export function DataCard({ children, className, title, action }: DataCardProps) {
  return (
    <div
      className={cn(
        "p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800",
        className
      )}
    >
      {(title || action) && (
        <div className="flex items-center justify-between mb-6">
          {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
