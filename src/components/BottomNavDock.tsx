"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/Icon";

type NavTab = {
  href: string;
  icon: "vibration" | "auto_stories" | "psychology" | "palette" | "blur_on";
  label: string;
};

const tabs: NavTab[] = [
  { href: "/", icon: "vibration", label: "Home" },
  { href: "/insights", icon: "auto_stories", label: "Insights" },
  { href: "/playground", icon: "psychology", label: "Playground" },
  { href: "/portfolio", icon: "palette", label: "Portfolio" },
  { href: "/surrealist-echoes", icon: "blur_on", label: "Design" },
];

export function BottomNavDock() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-4 pointer-events-none">
      <nav className="pointer-events-auto bg-surface/40 backdrop-blur-xl border border-outline-variant/30 rounded-full px-fluid-gap py-drip flex gap-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center gap-0.5 transition-colors ${
                isActive
                  ? "text-primary drop-shadow-[0_0_8px_rgba(255,198,107,0.3)]"
                  : "text-on-surface-variant/50 hover:text-on-surface-variant"
              }`}
            >
              <Icon name={tab.icon} size={20} fill={isActive ? 1 : 0} />
              <span className="font-label-sm text-label-sm uppercase">{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
