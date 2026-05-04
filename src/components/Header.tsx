import Link from "next/link";
import { Icon } from "@/components/Icon";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/20">
      <div className="flex flex-col items-center gap-2 px-horizon py-3 max-w-7xl mx-auto">
        <Link
          href="/"
          className="font-headline-md text-headline-md tracking-tight drop-shadow-[0_10px_20px_rgba(232,168,56,0.3)] hover:opacity-80 transition-opacity"
        >
          NUR_AMIRAH_MOHD_KAMIL
        </Link>
        <nav className="hidden md:flex items-center gap-fluid-gap">
          <NavLink href="/" label="Home" />
          <NavLink href="/insights" label="Insights" />
          <NavLink href="/playground" label="Playground" />
          <NavLink href="/portfolio" label="Portfolio" />
          <NavLink href="/surrealist-echoes" label="Design" />
        </nav>
      </div>
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors uppercase tracking-[0.1em]"
    >
      {label}
    </Link>
  );
}
