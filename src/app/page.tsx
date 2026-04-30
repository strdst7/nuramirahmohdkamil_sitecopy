import type { Metadata } from "next";
import { PulseButton } from "@/components/PulseButton";

export const metadata: Metadata = {
  title: "The Persistence of Intelligence",
};

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-horizon pt-20">
      <h1 className="font-headline-lg text-headline-lg drop-shadow-[0_10px_20px_rgba(232,168,56,0.3)] text-center">
        The Persistence
        <br />
        of Intelligence
      </h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant mt-meridian max-w-2xl text-center">
        Bridging creative direction with technical experimentation. A dreamlike
        portfolio where curiosity sparks and AI tools convert.
      </p>
      <div className="flex gap-fluid-gap mt-horizon">
        <PulseButton href="/playground">Explore the Playground</PulseButton>
      </div>
    </div>
  );
}
