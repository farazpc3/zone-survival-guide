"use client";

import { useEffect, useRef } from "react";

interface BackgroundMusicProps {
  src: string;
  loop?: boolean;
  volume?: number; // 0 to 1
}

export default function BackgroundMusic({
  src,
  loop = true,
  volume = 0.5,
}: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    // Try to play on mount
    audio.play().catch((err) => {
      console.log("Autoplay blocked:", err);
    });

    // Pause/resume on tab visibility change
    const handleVisibility = () => {
      if (document.hidden) {
        audio.pause();
      } else {
        audio.play().catch((err) => {
          console.log("Resume blocked:", err);
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [volume]);

  return <audio ref={audioRef} src={src} loop={loop} />;
}
