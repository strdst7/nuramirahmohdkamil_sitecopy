export function Footer() {
  return (
    <footer className="py-horizon px-horizon text-center bg-gradient-to-t from-amber-950/10 to-transparent">
      {/* DREAM_VOID poetic tagline per D-05 */}
      <p className="font-label-sm text-label-sm text-amber-500 tracking-widest drop-shadow-[0_5px_15px_rgba(232,168,56,0.2)] mb-drip">
        DREAM_VOID
      </p>
      <p className="font-body-md text-body-md text-on-surface-variant/60">
        &copy; {new Date().getFullYear()} Nur Amirah Mohd Kamil
      </p>
      <div className="flex justify-center gap-meridian mt-drip">
        <a
          href="https://linkedin.com/in/nuramirahmohdkamil"
          target="_blank"
          rel="noopener noreferrer"
          className="font-label-sm text-label-sm text-on-surface-variant/50 hover:text-primary transition-colors uppercase"
        >
          LinkedIn
        </a>
        <a
          href="mailto:hello@nuramirah.com"
          className="font-label-sm text-label-sm text-on-surface-variant/50 hover:text-primary transition-colors uppercase"
        >
          Email
        </a>
      </div>
    </footer>
  );
}
