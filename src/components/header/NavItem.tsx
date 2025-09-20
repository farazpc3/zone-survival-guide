"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  const hoverSound = useRef<HTMLAudioElement | null>(null);
  const clickSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMounted(true);
    hoverSound.current = new Audio("/hover.mp3");
    clickSound.current = new Audio("/click.mp3");

    if (hoverSound.current) hoverSound.current.volume = 0.4;
    if (clickSound.current) clickSound.current.volume = 0.6;
  }, []);

  const playHover = () => {
    if (hoverSound.current) {
      hoverSound.current.currentTime = 0;
      hoverSound.current.play();
    }
  };

  const playClick = () => {
    if (clickSound.current) {
      clickSound.current.currentTime = 0;
      clickSound.current.play();
    }
  };

  return (
    <Link
      href={href}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => {
        setHovered(true);
        playHover();
      }}
      onMouseLeave={() => setHovered(false)}
      onClick={playClick}
      className="relative px-6 py-2 mx-4 border border-green-800 text-green-400 font-mono
                 tracking-wider bg-gray-900 transition-all duration-200 rounded-3xl
                 flex items-center justify-center whitespace-nowrap overflow-hidden"
      style={
        hovered && mounted
          ? {
              backgroundImage: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(34,197,94,0.3), transparent 60%)`,
            }
          : {}
      }
    >
      {children}
    </Link>
  );
}
