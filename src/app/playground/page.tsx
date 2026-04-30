import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Alchemist's Terminal",
};

export default function PlaygroundPage() {
  return (
    <div className="px-horizon py-horizon pt-24">
      <h2 className="font-headline-md text-headline-md">The Alchemist&apos;s Terminal</h2>
      <p className="font-body-md text-body-md text-on-surface-variant mt-drip">
        Interactive AI playground — coming soon.
      </p>
    </div>
  );
}
