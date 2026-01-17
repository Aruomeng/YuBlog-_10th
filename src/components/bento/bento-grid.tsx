"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}

export interface BentoGridItemProps {
  className?: string;
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2;
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

export function BentoGridItem({
  className,
  colSpan = 1,
  rowSpan = 1,
}: BentoGridItemProps & { children: ReactNode }) {
  return null; // This is just for type export, use BentoCard instead
}
