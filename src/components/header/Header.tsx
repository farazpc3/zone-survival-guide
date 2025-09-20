"use client";

import Nav from "@/components/header/Nav";
import Logo from "@/components/header/Logo";
import VolumeControl from "@/components/header/VolumeControl";
import DarkModeToggle from "@/components/header/DarkModeToggle";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 60, damping: 15 }}
      className="flex items-center justify-between p-1 bg-gray-100 dark:bg-gray-800
             shadow-md bg-[url('/bricks-pattern.webp')] bg-repeat bg-[length:200px_200px]"
    >
      <Logo />
      <h1 className="text-4 font-bold text-gray-800 dark:text-gray-100">
        Zone Survival Guide
      </h1>
      <Nav /> {/* Nav will determine height */}
      <div className="flex items-center space-x-4">
        <VolumeControl />
        <DarkModeToggle />
      </div>
    </motion.header>
  );
}
