"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Moon, Sun } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/guide", label: "Survival Guide" },
  { href: "/map", label: "Zone Map" },
  { href: "/factions", label: "Factions" },
];

export default function Header() {
  const pathname = usePathname();
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(50);
  const [darkMode, setDarkMode] = useState(false);

  const toggleMute = () => setMuted(!muted);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
    if (Number(e.target.value) === 0) setMuted(true);
    else setMuted(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <header className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 shadow-md bg-[url('/bricks-pattern.webp')] bg-repeat bg-[length:200px_200px]">
      <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
        Zone Survival Guide
      </h1>
      <nav className="flex justify-center gap-3 p-4 border-b border-green-800">
        {navLinks
          .filter((link) => link.href !== pathname)
          .map((link) => (
            <NavItem key={link.href} href={link.href}>
              {link.label.toUpperCase()}
            </NavItem>
          ))}
      </nav>
      <div className="flex items-center space-x-4">
        {/* Mute / Volume */}
        <button
          onClick={toggleMute}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {muted ? (
            <VolumeX className="w-6 h-6" />
          ) : (
            <Volume2 className="w-6 h-6" />
          )}
        </button>

        <input
          type="range"
          min="0"
          max="100"
          value={muted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-24 accent-blue-500"
        />

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {darkMode ? (
            <Sun className="w-6 h-6 text-yellow-400" />
          ) : (
            <Moon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </div>
    </header>
  );
}

// NavItem with glow + sound effects
function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(
    null
  );

  const hoverSound = useRef<HTMLAudioElement | null>(null);
  const clickSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    hoverSound.current = new Audio("/hover.mp3");
    clickSound.current = new Audio("/click.mp3");

    // Optional: lower volume if sounds are too loud
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
      className="relative px-6 py-2 mx-4 border border-green-800 text-green-400 font-mono tracking-wider
                 bg-gray-900 transition-all duration-200 overflow-hidden rounded inline-block"
      onMouseEnter={playHover}
      onClick={playClick}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseLeave={() => setMousePos(null)}
    >
      {/* Glow effect only while hovering */}
      {mousePos && (
        <span
          className="absolute pointer-events-none rounded-full"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            width: 200,
            height: 200,
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(34,197,94,0.3) 0%, rgba(34,197,94,0) 60%)",
            transition: "opacity 0.3s",
            opacity: 1,
          }}
        />
      )}

      {children}
    </Link>
  );
}
