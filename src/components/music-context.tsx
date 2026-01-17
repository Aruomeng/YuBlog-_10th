"use client";

import { createContext, useContext, useState, useRef, useCallback, useEffect, ReactNode } from "react";

// 音乐列表配置
const playlist = [
  {
    id: 1,
    title: "Éclosion",
    artist: "Tony Anderson",
    src: "/music/eclosion.mp3",
    cover: "from-purple-500 via-pink-500 to-orange-500",
  },
  {
    id: 2,
    title: "Blinding Lights",
    artist: "The Weeknd",
    src: "/music/blinding-lights.mp3",
    cover: "from-red-500 via-orange-500 to-yellow-500",
  },
  {
    id: 3,
    title: "Starboy",
    artist: "The Weeknd",
    src: "/music/starboy.mp3",
    cover: "from-blue-500 via-purple-500 to-pink-500",
  },
];

interface Track {
  id: number;
  title: string;
  artist: string;
  src: string;
  cover: string;
}

interface MusicContextType {
  playlist: Track[];
  currentTrack: number;
  isPlaying: boolean;
  progress: number;
  duration: number;
  currentTime: number;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setCurrentTrack: (index: number) => void;
  seekTo: (percentage: number) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrackState] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const track = playlist[currentTrack];

  // 初始化 audio 元素
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(track.src);
      audioRef.current.preload = "metadata";
    }
  }, []);

  // 切换曲目时更新 src
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const wasPlaying = isPlaying;
    audio.src = track.src;
    
    if (wasPlaying) {
      audio.play().catch(() => {});
    }
  }, [currentTrack]);

  // 更新进度
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      // 自动播放下一曲
      setCurrentTrackState((prev) => 
        prev < playlist.length - 1 ? prev + 1 : 0
      );
    };

    const handleCanPlay = () => {
      if (isPlaying) {
        audio.play().catch(() => {});
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("loadedmetadata", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("loadedmetadata", updateProgress);
    };
  }, [isPlaying]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const prevTrack = useCallback(() => {
    setCurrentTrackState((prev) => (prev === 0 ? playlist.length - 1 : prev - 1));
  }, []);

  const nextTrack = useCallback(() => {
    setCurrentTrackState((prev) => (prev === playlist.length - 1 ? 0 : prev + 1));
  }, []);

  const setCurrentTrack = useCallback((index: number) => {
    setCurrentTrackState(index);
  }, []);

  const seekTo = useCallback((percentage: number) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    audio.currentTime = (percentage / 100) * duration;
  }, [duration]);

  return (
    <MusicContext.Provider
      value={{
        playlist,
        currentTrack,
        isPlaying,
        progress,
        duration,
        currentTime,
        audioRef,
        togglePlay,
        nextTrack,
        prevTrack,
        setCurrentTrack,
        seekTo,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
}
