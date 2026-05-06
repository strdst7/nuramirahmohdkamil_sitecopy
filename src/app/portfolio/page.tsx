import type { Metadata } from "next";
import Image from "next/image";
import { fetchProjects } from "@/lib/contentful";
import { Icon, type IconName } from "@/components/Icon";
import { PulseButton } from "@/components/PulseButton";

export const revalidate = 3600; // ISR: revalidate every 1 hour (per D-05)

export const metadata: Metadata = {
  title: "The Archive of Dreams",
  description:
    "Curated fragments of subconscious architecture, suspended in the ether. Portfolio projects by Nur Amirah Mohd Kamil.",
  openGraph: {
    title: "The Archive of Dreams — Nur Amirah",
    description:
      "Curated fragments of subconscious architecture, suspended in the ether. Drift through the artifacts.",
    type: "website",
  },
};

export default async function PortfolioPage() {
  const projects = await fetchProjects();

  return (
    <main className="relative z-10 w-full pt-40 pb-64 px-8 md:px-horizon">
      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed left-1/2 top-1/2 z-0 h-[80vh] w-[80vw] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(circle, rgba(232,168,56,0.03) 0%, rgba(23,19,5,0) 70%)",
        }}
      />

      {/* Decorative SVG connections */}
      <svg
        className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-20"
        preserveAspectRatio="none"
        style={{ mixBlendMode: "overlay" } as React.CSSProperties}
      >
        <path
          className="text-primary"
          d="M 200,300 C 400,200 600,600 800,400 S 1200,800 1000,1200"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle className="text-primary" cx="200" cy="300" fill="currentColor" r="4" />
        <circle className="text-primary" cx="800" cy="400" fill="currentColor" r="4" />
        <circle className="text-primary" cx="1000" cy="1200" fill="currentColor" r="4" />
      </svg>

      {/* Title section */}
      <div className="relative z-10 mb-32 ml-[5%] max-w-2xl md:ml-[15%]">
        <h1 className="font-headline-lg text-headline-lg text-primary opacity-90 drop-shadow-[0_10px_30px_rgba(255,198,107,0.2)]">
          The Archive of Dreams
        </h1>
        <p className="mt-6 ml-8 border-l border-outline/30 pl-6 font-body-lg text-body-lg text-on-surface-variant">
          Curated fragments of subconscious architecture, suspended in the ether.
          Drift through the artifacts.
        </p>
      </div>

      {/* Project cards — data-driven drifting islands */}
      {projects.map((project) =>
        project.layout === "right" ? (
          /* ── Right drift (Project 01) — smaller, image above text ── */
          <article
            key={project.id}
            className="group relative z-10 mb-40 ml-auto mr-[10%] w-[90%] overflow-hidden rounded-[4rem_2rem_5rem_3rem] border border-outline/10 bg-surface-container/40 shadow-[30px_50px_80px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-transform duration-1000 ease-out hover:scale-[1.02] md:w-[450px]"
          >
            <div className="flex flex-col gap-6 p-8 md:p-12">
              {/* Image */}
              <div className="relative h-64 w-full overflow-hidden rounded-[2rem_4rem_2rem_5rem] shadow-inner">
                <div className="pointer-events-none absolute inset-0 z-10 bg-secondary/20 mix-blend-color-burn" />
                <Image
                  src={project.imageSrc}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 768px) 90vw, 450px"
                  className="object-cover opacity-80 filter contrast-125 saturate-50 transition-transform duration-[2s] ease-out group-hover:scale-110"
                  style={{ mixBlendMode: "luminosity" }}
                />
              </div>

              {/* Project number + icon */}
              <div className="flex items-center gap-3">
                <Icon
                  name={project.iconName as IconName}
                  size={20}
                  className="text-tertiary"
                />
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-tertiary">
                  {project.number}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-headline-md text-headline-md text-on-surface">
                {project.title}
              </h2>

              {/* Description */}
              <p className="font-body-md text-body-md text-on-surface-variant">
                {project.description}
              </p>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-3">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className={
                      i === 0
                        ? "rounded-[2rem_1rem_2rem_1rem] border border-secondary-container/20 bg-secondary-container/10 px-4 py-2 font-label-sm text-label-sm text-secondary"
                        : "rounded-[1rem_2rem_1rem_2rem] border border-primary-container/20 bg-primary-container/10 px-4 py-2 font-label-sm text-label-sm text-primary"
                    }
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ) : (
          /* ── Left drift (Project 02) — larger, horizontal on desktop ── */
          <article
            key={project.id}
            className="group relative z-10 mb-56 ml-[5%] w-[85%] overflow-hidden rounded-[3rem_6rem_4rem_5rem] border border-outline/10 bg-surface-container-low/60 shadow-[50px_40px_100px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-transform duration-1000 ease-out hover:scale-[1.02] md:ml-[20%] md:w-[600px]"
          >
            <div className="flex flex-col items-center gap-10 p-8 md:flex-row md:p-14">
              {/* Text content (left side on desktop) */}
              <div className="flex flex-1 flex-col gap-6">
                {/* Project number + icon */}
                <div className="flex items-center gap-3">
                  <Icon
                    name={project.iconName as IconName}
                    size={20}
                    className="text-secondary"
                  />
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                    {project.number}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-headline-md text-headline-md text-on-surface">
                  {project.title}
                </h2>

                {/* Description */}
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {project.description}
                </p>

                {/* CTA button */}
                {project.cta && (
                  <PulseButton
                    href={project.cta.href}
                    className="mt-4 flex items-center gap-2 self-start bg-primary/10 !text-primary border border-primary/20 hover:bg-primary/20 transition-all duration-500"
                  >
                    {project.cta.label}
                    <Icon name="east" size={20} />
                  </PulseButton>
                )}
              </div>

              {/* Image (right side on desktop) */}
              <div className="relative h-64 w-full shrink-0 overflow-hidden rounded-[5rem_3rem_4rem_6rem] shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] md:h-80 md:w-64">
                <Image
                  src={project.imageSrc}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 768px) 85vw, 256px"
                  className="object-cover opacity-70 filter hue-rotate-15 transition-transform duration-[2s] ease-out group-hover:scale-110"
                  style={{ mixBlendMode: "luminosity" }}
                />
              </div>
            </div>
          </article>
        ),
      )}

      {/* Floating decorative element */}
      <div
        className="pointer-events-none absolute right-[15%] top-[60%] z-10 animate-pulse blur-sm opacity-40 mix-blend-screen"
        style={{ animationDuration: "8s" } as React.CSSProperties}
      >
        <div className="flex h-32 w-32 items-center justify-center rounded-[40%_60%_70%_30%/40%_50%_60%_50%] border-2 border-tertiary">
          <Icon
            name="hourglass_empty"
            size={36}
            className="-rotate-12 text-tertiary"
          />
        </div>
      </div>
    </main>
  );
}
