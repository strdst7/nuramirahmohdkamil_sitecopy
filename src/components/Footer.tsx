export function Footer() {
  return (
    <footer className="py-horizon px-horizon text-center">
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
