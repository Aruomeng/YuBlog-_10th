"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";

interface ViewCounterProps {
  views: number;
  className?: string;
}

export function ViewCounter({ views, className }: ViewCounterProps) {
  return (
    <motion.div
      className={cn(
        "flex items-center gap-2 text-zinc-500 text-sm",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Eye className="w-4 h-4" />
      <span>{views.toLocaleString()} 次阅读</span>
    </motion.div>
  );
}
