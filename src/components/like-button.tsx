"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useOptimistic, useTransition, useState, useCallback, useEffect } from "react";
import { incrementLikeCount } from "@/actions/stats";

interface LikeButtonProps {
  slug: string;
  initialLikes: number;
  initialSessionLikes?: number;
  className?: string;
}

export function LikeButton({
  slug,
  initialLikes,
  initialSessionLikes = 0,
  className,
}: LikeButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [sessionLikes, setSessionLikes] = useState(initialSessionLikes);
  const [error, setError] = useState<string | null>(null);

  // 乐观更新状态
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    initialLikes,
    (state) => state + 1
  );

  // 动画数值
  const count = useMotionValue(initialLikes);
  const displayCount = useTransform(count, (latest) => Math.round(latest));

  // 更新动画
  useEffect(() => {
    const controls = animate(count, optimisticLikes, { duration: 0.3 });
    return controls.stop;
  }, [optimisticLikes, count]);

  // 防抖状态
  const [lastClickTime, setLastClickTime] = useState(0);
  const DEBOUNCE_MS = 300;

  const handleLike = useCallback(async () => {
    // 防抖检查
    const now = Date.now();
    if (now - lastClickTime < DEBOUNCE_MS) return;
    setLastClickTime(now);

    // 检查会话限制
    if (sessionLikes >= 50) {
      setError("已达到点赞上限 (50次)");
      return;
    }

    setError(null);

    startTransition(async () => {
      // 乐观更新
      addOptimisticLike(optimisticLikes);
      setSessionLikes((prev) => prev + 1);

      const result = await incrementLikeCount(slug);

      if (!result.success) {
        // 回滚 - 通过页面刷新恢复真实状态
        setError(result.error || "点赞失败");
      }
    });
  }, [slug, lastClickTime, sessionLikes, optimisticLikes, addOptimisticLike]);

  const isMaxed = sessionLikes >= 50;

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <motion.button
        onClick={handleLike}
        disabled={isPending || isMaxed}
        className={cn(
          "relative group flex items-center gap-3 px-6 py-3 rounded-full",
          "bg-gradient-to-r from-pink-500/10 to-purple-500/10",
          "border border-pink-500/20 hover:border-pink-500/40",
          "transition-all duration-300",
          isMaxed && "opacity-50 cursor-not-allowed"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Heart icon */}
        <motion.div
          className="relative"
          animate={isPending ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          <svg
            className={cn(
              "w-6 h-6 transition-colors",
              sessionLikes > 0 ? "text-pink-500 fill-pink-500" : "text-pink-400"
            )}
            fill={sessionLikes > 0 ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>

          {/* Burst effect */}
          {isPending && (
            <motion.div
              className="absolute inset-0 rounded-full bg-pink-500/30"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </motion.div>

        {/* Count */}
        <motion.span className="text-lg font-semibold text-white min-w-[3ch] text-left">
          {displayCount}
        </motion.span>

        {/* Session indicator */}
        {sessionLikes > 0 && (
          <span className="text-xs text-pink-400/70">
            +{sessionLikes}
          </span>
        )}
      </motion.button>

      {/* Error message */}
      {error && (
        <motion.p
          className="text-xs text-red-400"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.p>
      )}

      {/* Progress to max */}
      {sessionLikes > 0 && !isMaxed && (
        <div className="w-full max-w-[120px] h-1 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${(sessionLikes / 50) * 100}%` }}
          />
        </div>
      )}
    </div>
  );
}
