"use client";

import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function VolumeControl() {
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(50);

  const toggleMute = () => setMuted(!muted);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    setMuted(newVolume === 0);
  };

  return (
    <div className="flex items-center space-x-2">
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
    </div>
  );
}
