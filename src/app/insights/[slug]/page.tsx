import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { fetchArticleBySlug, getArticleSlugs } from "@/lib/contentful";
import { RichTextRenderer } from "@/lib/contentful-renderer";
import { Icon } from "@/components/Icon";
import type { IconName } from "@/components/Icon";

// ISR configuration (per D-05)
export const revalidate = 3600;
export const dynamicParams = true;

// Generate static paths for all known article slugs at build time
export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Dynamic metadata generation (per D-04 and established Next.js pattern)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} — Nur Amirah`,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      images: article.diagramSrc
        ? [{ url: article.diagramSrc, alt: article.diagramAlt }]
        : [],
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="relative overflow-hidden">
      {/* Ambient Background Blur Elements — Surrealist Echoes atmosphere (per D-04) */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-[-10%] w-[50vw] h-[50vw] bg-surface-tint/5 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-[-5%] w-[40vw] h-[60vw] bg-tertiary/5 rounded-[40%_60%_70%_30%] blur-[150px]" />
        <div className="absolute top-[30%] left-1/2 w-[30vw] h-[30vw] bg-primary/3 rounded-full blur-[100px]" />
      </div>

      {/* Main Content Canvas */}
      <main className="relative z-10 pt-32 pb-32 px-fluid-gap md:px-horizon">
        {/* Back Navigation — unobtrusive glass-panel back button (per D-04) */}
        <div className="mb-16 max-w-3xl mx-auto">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 px-5 py-3 
                       bg-surface-container-low/40 backdrop-blur-md 
                       border border-outline/10 rounded-[2rem_1.5rem_2.5rem_1rem]
                       font-label-sm text-label-sm text-on-surface-variant
                       hover:text-on-surface hover:bg-surface-container-low/60 
                       hover:border-outline/20 transition-all duration-500"
          >
            <Icon name="west" size={18} />
            Back to Inquiries
          </Link>
        </div>

        {/* Article Content — max-w-3xl centered reading layout */}
        <article className="max-w-3xl mx-auto">
          {/* Hero Diagram Header — full-width image with overlay (per D-04: "hero diagram as full-width header image") */}
          {article.diagramSrc && (
            <figure className="relative w-full mb-20 rounded-t-[40%] rounded-b-[2rem] overflow-hidden
                               shadow-[20px_40px_80px_rgba(0,0,0,0.8)] border border-outline/10 group">
              <div className="relative w-full h-[400px] md:h-[500px]">
                <Image
                  src={article.diagramSrc}
                  alt={article.diagramAlt}
                  fill
                  priority
                  className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[2000ms] ease-out"
                  style={{ mixBlendMode: "luminosity" } as React.CSSProperties}
                  sizes="(max-width: 768px) 100vw, 48rem"
                />
              </div>
              {/* Title and metadata overlay on the hero image */}
              <figcaption className="absolute bottom-0 w-full bg-surface-container-highest/80 backdrop-blur-xl
                                      p-8 pt-12 rounded-t-[3rem] transform translate-y-2
                                      group-hover:translate-y-0 transition-transform duration-700">
                <div className="flex items-center gap-4 mb-3">
                  <Icon
                    name={article.iconName as IconName}
                    size={24}
                    fill={1}
                    className="text-primary"
                  />
                  <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
                    {article.date}
                  </span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-primary drop-shadow-[0_5px_15px_rgba(255,198,107,0.2)]">
                  {article.title}
                </h1>
              </figcaption>
            </figure>
          )}

          {/* If no diagram, render title section without image */}
          {!article.diagramSrc && (
            <header className="mb-16">
              <div className="flex items-center gap-4 mb-4">
                <Icon
                  name={article.iconName as IconName}
                  size={24}
                  fill={1}
                  className="text-primary"
                />
                <time className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
                  {article.date}
                </time>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-primary drop-shadow-[0_5px_15px_rgba(255,198,107,0.2)]">
                {article.title}
              </h1>
            </header>
          )}

          {/* Tags section */}
          <div className="flex flex-wrap gap-3 mb-12">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-[1rem_2rem_1rem_2rem] border border-primary-container/20 bg-primary-container/10 px-4 py-2 font-label-sm text-label-sm text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Rich Text Body — rendered by RichTextRenderer with Surrealist Echoes typography */}
          <div className="prose-custom">
            <RichTextRenderer content={article.bodyDoc ?? article.body} />
          </div>

          {/* Article Footer — subtle separator + back link */}
          <footer className="mt-20 pt-10 border-t border-outline/10">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant
                         hover:text-primary transition-colors duration-500"
            >
              <Icon name="west" size={16} />
              Return to Ethereal Inquiries
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}
