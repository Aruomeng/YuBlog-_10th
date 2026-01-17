"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ClickEffect {
  id: number;
  x: number;
  y: number;
}

export function CustomCursor() {
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([]);

  // 点击特效
  const handleClick = useCallback((e: MouseEvent) => {
    const id = Date.now();
    setClickEffects((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
    
    // 自动移除特效
    setTimeout(() => {
      setClickEffects((prev) => prev.filter((effect) => effect.id !== id));
    }, 1000);
  }, []);

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [handleClick]);

  // 在移动设备上不显示
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  return (
    <>
      {/* 点击特效 */}
      <AnimatePresence>
        {clickEffects.map((effect) => (
          <ClickRipple key={effect.id} x={effect.x} y={effect.y} />
        ))}
      </AnimatePresence>
    </>
  );
}

// 点击涟漪特效
function ClickRipple({ x, y }: { x: number; y: number }) {
  return (
    <motion.div
      className="fixed pointer-events-none z-[9997]"
      style={{ left: x, top: y }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* 多个扩散环 */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-purple-500/40"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          initial={{ width: 0, height: 0, opacity: 0.8 }}
          animate={{ 
            width: 100 + i * 40, 
            height: 100 + i * 40, 
            opacity: 0 
          }}
          transition={{
            duration: 0.8,
            delay: i * 0.1,
            ease: "easeOut",
          }}
        />
      ))}

      {/* 中心星星粒子 */}
      {[...Array(6)].map((_, i) => {
        const angle = (i * 60 * Math.PI) / 180;
        return (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            style={{
              left: "50%",
              top: "50%",
            }}
            initial={{ 
              x: 0, 
              y: 0, 
              opacity: 1,
              scale: 1,
            }}
            animate={{ 
              x: Math.cos(angle) * 50, 
              y: Math.sin(angle) * 50,
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          />
        );
      })}

      {/* 中心闪光 */}
      <motion.div
        className="absolute w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-sm"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}
