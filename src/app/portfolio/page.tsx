import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Archive of Dreams",
};

export default function PortfolioPage() {
  return (
    <div className="px-horizon py-horizon pt-24">
      <h2 className="font-headline-md text-headline-md">The Archive of Dreams</h2>
      <p className="font-body-md text-body-md text-on-surface-variant mt-drip">
        Project showcase — coming soon.
      </p>
    </div>
  );
}
