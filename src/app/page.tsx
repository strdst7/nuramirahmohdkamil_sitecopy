import type { Metadata } from "next";
import Image from "next/image";
import { PulseButton } from "@/components/PulseButton";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "The Persistence of Intelligence",
  description:
    "Exploring the malleable boundary between artificial cognition and human dreaming. Portfolio & AI Playground by Nur Amirah Mohd Kamil.",
  openGraph: {
    title: "The Persistence of Intelligence — Nur Amirah",
    description:
      "Exploring the malleable boundary between artificial cognition and human dreaming.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      {/* Ambient Background */}
      <div
        className="fixed inset-0 z-[-1] pointer-events-none opacity-40 blur-3xl mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, #e8a838 0%, transparent 60%), radial-gradient(circle at 30% 80%, #0164b4 0%, transparent 50%)",
        }}
      />

      {/* Main content wrapper — mirrors prototype's <main> padding */}
      <div className="pt-horizon pb-32 px-meridian md:px-horizon flex flex-col gap-horizon">
        {/* Hero Section */}
        <section className="min-h-[80vh] md:min-h-[819px] flex flex-col justify-center relative pt-24">
          {/* Hero background image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/home-hero-bg.svg"
              alt="Abstract desert landscape with warm golden hour light — surrealist dune forms in amber and umber tones"
              fill
              className="object-cover opacity-20 blur-xl rounded-[40%_60%_70%_30%/40%_50%_60%_50%]"
            />
          </div>

          {/* Hero text content */}
          <div className="z-10 max-w-4xl self-center text-center">
            <h1 className="font-headline-lg text-headline-lg text-primary mb-fluid-gap tracking-tighter drop-shadow-[0_20px_40px_rgba(255,198,107,0.2)]">
              The Persistence of Intelligence
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto italic">
              Exploring the malleable boundary between artificial cognition and
              human dreaming.
            </p>
            <div className="flex gap-fluid-gap mt-horizon justify-center flex-wrap">
              <PulseButton href="/playground">Explore the Playground</PulseButton>
              <PulseButton href="mailto:hello@nuramirah.com">Contact</PulseButton>
            </div>
          </div>

          {/* Floating decorative blob */}
          <div className="hidden md:flex absolute bottom-10 right-20 w-48 h-48 bg-tertiary-container/20 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] backdrop-blur-md shadow-[40px_10px_60px_rgba(0,0,0,0.5)] border border-outline/20 hover:scale-105 transition-transform duration-700 items-center justify-center">
            <Icon
              name="memory"
              size={48}
              className="text-primary opacity-50"
            />
          </div>
        </section>
      </div>
    </>
  );
}
