"use client";

import { useEffect, useState } from "react";

type LoadingStep = {
  message: string;
  action: () => Promise<void>; // real async operation
};

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Initializing...");

  const steps: LoadingStep[] = [
    {
      message: "Loading user settings...",
      action: async () => {
        // Replace with real API call
        await new Promise((res) => setTimeout(res, 400));
      },
    },
    {
      message: "Fetching map data...",
      action: async () => {
        // Replace with real fetch
        await new Promise((res) => setTimeout(res, 600));
      },
    },
    {
      message: "Loading images and assets...",
      action: async () => {
        await Promise.all([
          preload("/zsg-logo.svg"),
          preload("/background.webp"),
        ]);
      },
    },
    {
      message: "Finalizing interface...",
      action: async () => {
        await new Promise((res) => setTimeout(res, 300));
      },
    },
  ];

  useEffect(() => {
    const load = async () => {
      for (let i = 0; i < steps.length; i++) {
        setMessage(steps[i].message);
        await steps[i].action();
        setProgress(Math.round(((i + 1) / steps.length) * 100));
      }
    };
    load();
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black text-green-400 font-mono">
      <div className="w-2/3 max-w-lg">
        {/* Title */}
        <h1 className="text-3xl mb-6 text-center tracking-widest opacity-80">
          ZONE LOADING...
        </h1>

        {/* Progress Bar */}
        <div className="w-full h-4 bg-green-900 rounded overflow-hidden">
          <div
            className="h-full bg-green-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Current Loading Message */}
        <p className="mt-4 text-sm opacity-70">{message}</p>
        <p className="mt-1 text-xs opacity-50">{progress}%</p>
      </div>
    </div>
  );
}

// Helper to preload images
function preload(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
  });
}
