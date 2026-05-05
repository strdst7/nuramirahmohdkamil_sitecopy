import Link from "next/link";

const subtitles: Record<string, string> = {
  Home: "The_Void",
  Insights: "Ethereal Enquiries",
  Playground: "The Alchemist's Terminal",
  Portfolio: "The Archive of Dreams",
  Design: "Surrealist Echoes",
};

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
      className="group flex flex-col items-center font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors uppercase tracking-[0.1em]"
    >
      <span>{label}</span>
      <span className="block overflow-hidden max-h-0 group-hover:max-h-4 opacity-0 group-hover:opacity-70 transition-all duration-300 ease-out text-[0.6rem] font-light normal-case tracking-wider text-primary/70 pt-0.5">
        {subtitles[label]}
      </span>
    </Link>
  );
}
