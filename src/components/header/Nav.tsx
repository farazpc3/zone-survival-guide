"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NavItem from "@/components/header/NavItem";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/guide", label: "Survival Guide" },
  { href: "/map", label: "Zone Map" },
  { href: "/factions", label: "Factions" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex item-center justify-center gap-3 p-4">
      {navLinks
        .filter((link) => link.href !== pathname)
        .map((link) => (
          <NavItem key={link.href} href={link.href}>
            {link.label.toUpperCase()}
          </NavItem>
        ))}
    </nav>
  );
}
