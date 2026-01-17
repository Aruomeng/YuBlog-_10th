"use client";

import { BentoCard } from "@/components/bento/bento-card";
import { motion } from "framer-motion";
import { useMusic } from "@/components/music-context";

export function SpotifyWidget() {
  const {
    playlist,
    currentTrack,
    isPlaying,
    progress,
    duration,
    currentTime,
    togglePlay,
    nextTrack,
    prevTrack,
    setCurrentTrack,
    seekTo,
  } = useMusic();

  const track = playlist[currentTrack];

  // 点击进度条跳转
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = (clickX / rect.width) * 100;
    seekTo(percentage);
  };

  // 格式化时间
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <BentoCard colSpan={2} rowSpan={1} glowColor="rgba(34, 197, 94, 0.15)">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            <span className="text-sm font-medium text-white">
              {isPlaying ? "正在播放" : "音乐"}
            </span>
          </div>
          
          {/* 曲目指示器 */}
          <div className="flex gap-1">
            {playlist.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors cursor-pointer ${
                  i === currentTrack ? "bg-green-500" : "bg-zinc-600 hover:bg-zinc-500"
                }`}
                onClick={() => setCurrentTrack(i)}
              />
            ))}
          </div>
        </div>

        {/* Track info */}
        <div className="flex-1 flex items-center gap-3">
          {/* Album art */}
          <motion.div
            className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 cursor-pointer"
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 10, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
            onClick={togglePlay}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${track.cover}`} />
            <div className="absolute inset-[6px] rounded-full bg-zinc-900" />
            <div className="absolute inset-[10px] rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-zinc-900" />
            </div>
            {/* 播放/暂停指示 */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
              {isPlaying ? (
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </div>
          </motion.div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-white truncate">
              {track.title}
            </p>
            <p className="text-xs text-zinc-500 truncate">{track.artist}</p>

            {/* Progress bar */}
            <div 
              className="mt-2 h-1 bg-zinc-800 rounded-full overflow-hidden cursor-pointer group"
              onClick={handleProgressClick}
            >
              <motion.div
                className="h-full bg-green-500 rounded-full relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            </div>
            
            {/* 时间显示 */}
            <div className="flex justify-between mt-1 text-[10px] text-zinc-500">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        {/* Controls & Sound wave */}
        <div className="flex items-center justify-between mt-2">
          {/* 控制按钮 */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevTrack}
              className="p-1 text-zinc-400 hover:text-white transition-colors"
              title="上一曲"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6V6zm3.5 6l8.5 6V6l-8.5 6z" />
              </svg>
            </button>
            <button
              onClick={togglePlay}
              className="p-2 bg-green-500 hover:bg-green-400 rounded-full text-black transition-colors"
              title={isPlaying ? "暂停" : "播放"}
            >
              {isPlaying ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <button
              onClick={nextTrack}
              className="p-1 text-zinc-400 hover:text-white transition-colors"
              title="下一曲"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6v12zm10-12v12h2V6h-2z" />
              </svg>
            </button>
          </div>

          {/* Sound wave animation */}
          <div className="flex items-end gap-[2px] h-4">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-green-500 rounded-full"
                animate={{
                  height: isPlaying ? [4, 12, 4] : 4,
                }}
                transition={{
                  duration: 0.8,
                  repeat: isPlaying ? Infinity : 0,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </BentoCard>
  );
}
