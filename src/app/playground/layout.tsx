import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Alchemist's Terminal",
  description:
    "Distill logic into liquid thought. Interact with AI through a surrealist terminal — text generation, multimodal analysis, and parameter alchemy.",
  openGraph: {
    title: "The Alchemist's Terminal — Nur Amirah",
    description:
      "Distill logic into liquid thought. Interact with AI through a surrealist terminal.",
    type: "website",
  },
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
