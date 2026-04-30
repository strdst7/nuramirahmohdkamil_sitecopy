import type { Metadata } from "next";
import Image from "next/image";
import { articles } from "@/data/insights";
import { Icon } from "@/components/Icon";
import type { IconName } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Ethereal Inquiries",
  description:
    "Extracting the latent space where logic bends and the machine dreams in vibrant, impossible geometries. Journal entries by Nur Amirah Mohd Kamil.",
  openGraph: {
    title: "Ethereal Inquiries — Nur Amirah",
    description:
      "Extracting the latent space where logic bends and the machine dreams in vibrant, impossible geometries.",
    type: "website",
  },
};

export default function InsightsPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Ambient Background Blur Elements */}
      <div className="absolute top-0 left-[-10%] w-[50vw] h-[50vw] bg-surface-tint/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 right-[-5%] w-[40vw] h-[60vw] bg-tertiary/5 rounded-[40%_60%_70%_30%] blur-[150px] pointer-events-none" />

      {/* Main Canvas */}
      <main className="flex-grow pt-40 px-fluid-gap md:px-horizon pb-32 relative z-10">
        {/* Title Section - Asymmetric, Rotated */}
        <div className="mb-24 ml-4 md:ml-[10vw] max-w-2xl transform -rotate-2 origin-bottom-left">
          <h1 className="font-headline-lg text-headline-lg text-primary mb-6 drop-shadow-[0_5px_15px_rgba(255,198,107,0.2)]">
            Ethereal Inquiries
          </h1>
          <p className="font-body-lg text-body-lg text-tertiary-fixed-dim/80 italic pl-8 border-l border-outline/30 rounded-bl-full">
            Extracting the latent space where logic bends and the machine dreams
            in vibrant, impossible geometries.
          </p>
        </div>

        {/* Fluid Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-fluid-gap items-start">
          {/* Left Column: Journal / Text Heavy */}
          <div className="md:col-span-7 flex flex-col gap-24 relative">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-surface-container-low/40 backdrop-blur-md rounded-[50%_40%_30%_60%/40%_50%_60%_50%]
                           p-10 md:p-16 shadow-[40px_20px_80px_rgba(0,0,0,0.6)]
                           border-t border-l border-surface-tint/10
                           transform transition-transform hover:scale-[1.02] duration-1000 ease-out
                           relative overflow-hidden"
              >
                {/* Decorative blur accent */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-error/5 rounded-full blur-2xl" />

                <h2 className="font-headline-md text-headline-md text-on-surface mb-8">
                  {article.title}
                </h2>

                <time className="font-label-sm text-label-sm text-on-surface-variant/50 block mb-4">
                  {article.date}
                </time>

                <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                  {article.body}
                </p>

                <ul className="flex flex-col gap-4 mt-8">
                  {article.tags.map((tag, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <Icon
                        name={article.iconName as IconName}
                        size={20}
                        fill={1}
                        className="text-tertiary opacity-70 mt-1"
                      />
                      <span className="font-body-md text-body-md text-on-surface-variant/80">
                        {tag}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}

            {/* Isolated Pull-Quote Block */}
            <div className="ml-12 md:ml-32 max-w-md">
              <div className="h-24 w-[1px] bg-gradient-to-b from-outline/40 to-transparent mb-6 ml-4 transform -rotate-12" />
              <p className="font-body-lg text-body-lg text-secondary-fixed-dim italic opacity-80">
                &ldquo;If the parameters could breathe, they would exhale a
                heavy, amber-scented mist.&rdquo;
              </p>
            </div>
          </div>

          {/* Right Column: Surreal Diagram */}
          <div className="md:col-span-5 flex flex-col gap-16 mt-16 md:mt-40">
            {/* Diagram Card */}
            <figure className="relative w-full rounded-t-[40%] rounded-b-[2rem] overflow-hidden
                                 shadow-[20px_40px_80px_rgba(0,0,0,0.8)] border border-outline/10 group">
              <div className="relative w-full h-[500px]">
                <Image
                  src={articles[0].diagramSrc}
                  alt={articles[0].diagramAlt}
                  fill
                  className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[2000ms] ease-out"
                  style={
                    { mixBlendMode: "luminosity" } as React.CSSProperties
                  }
                />
              </div>
              <figcaption className="absolute bottom-0 w-full bg-surface-container-highest/80 backdrop-blur-xl
                                      p-8 pt-12 rounded-t-[3rem] transform translate-y-4
                                      group-hover:translate-y-0 transition-transform duration-700">
                <div className="flex items-center gap-4 mb-2">
                  <Icon
                    name="all_inclusive"
                    size={20}
                    fill={1}
                    className="text-primary"
                  />
                  <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
                    Fig 1. Latent Topography
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Visualization of gradient descent becoming trapped in a local
                  minimum that physically resembles an endless, echoing hallway.
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </main>
    </div>
  );
}
