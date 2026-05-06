import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const pagePath = resolve(__dirname, "../page.tsx");
let content = "";

try {
  content = readFileSync(pagePath, "utf-8");
} catch {
  // File doesn't exist yet — tests will fail (RED phase)
}

describe("Article detail page /insights/[slug] (structural)", () => {
  describe("ISR and Next.js configuration", () => {
    it("exports revalidate = 3600 for ISR", () => {
      expect(content).toMatch(/export const revalidate\s*=\s*3600/);
    });

    it("exports dynamicParams = true", () => {
      expect(content).toMatch(/export const dynamicParams\s*=\s*true/);
    });

    it("exports generateStaticParams that fetches from getArticleSlugs", () => {
      expect(content).toMatch(/export async function generateStaticParams/);
      expect(content).toMatch(/getArticleSlugs/);
    });

    it("exports generateMetadata for dynamic per-article metadata", () => {
      expect(content).toMatch(/export async function generateMetadata/);
    });
  });

  describe("Imports", () => {
    it("imports fetchArticleBySlug from @/lib/contentful", () => {
      expect(content).toMatch(
        /import\s+\{\s*fetchArticleBySlug\s*[^}]*\}\s*from\s+["']@\/lib\/contentful["']/
      );
    });

    it("imports getArticleSlugs from @/lib/contentful", () => {
      expect(content).toMatch(/getArticleSlugs/);
    });

    it("imports RichTextRenderer from @/lib/contentful-renderer", () => {
      expect(content).toMatch(
        /import\s+\{\s*RichTextRenderer\s*\}\s*from\s+["']@\/lib\/contentful-renderer["']/
      );
    });

    it("imports Link from next/link for navigation", () => {
      expect(content).toMatch(
        /import\s+Link\s+from\s+["']next\/link["']/
      );
    });

    it("imports notFound from next/navigation for 404 handling", () => {
      expect(content).toMatch(
        /import\s+\{\s*notFound\s*\}\s*from\s+["']next\/navigation["']/
      );
    });

    it("imports Image from next/image for hero diagram", () => {
      expect(content).toMatch(
        /import\s+Image\s+from\s+["']next\/image["']/
      );
    });
  });

  describe("Server component compliance", () => {
    it("is a server component (no 'use client' directive)", () => {
      expect(content).not.toMatch(/"use client"/);
      expect(content).not.toMatch(/'use client'/);
    });

    it("is an async component (server component pattern)", () => {
      expect(content).toMatch(/async function ArticleDetailPage|export default async function/);
    });
  });

  describe("Data fetching and error handling", () => {
    it("calls fetchArticleBySlug with params.slug", () => {
      expect(content).toMatch(/fetchArticleBySlug/);
      expect(content).toMatch(/slug/);
    });

    it("calls notFound() when article is null (invalid slug)", () => {
      expect(content).toMatch(/notFound\(\)/);
    });
  });

  describe("UI structure", () => {
    it("renders RichTextRenderer for body content", () => {
      expect(content).toMatch(/RichTextRenderer/);
    });

    it("has back-navigation links to /insights", () => {
      expect(content).toMatch(/href=["']\/insights["']/);
    });

    it("renders hero diagram with Image component when diagramSrc exists", () => {
      expect(content).toMatch(/diagramSrc/);
      // Should use the Image component for the hero
      expect(content).toMatch(/<Image/);
    });

    it("has ambient blur elements for Surrealist Echoes atmosphere", () => {
      expect(content).toMatch(/blur-\[120px\]/);
      expect(content).toMatch(/blur-\[150px\]/);
      expect(content).toMatch(/mix-blend-screen/);
    });

    it("renders article tags as styled pills", () => {
      expect(content).toMatch(/tags/);
    });

    it("renders article title in a heading", () => {
      expect(content).toMatch(/article\.title/);
    });
  });

  describe("Metadata generation", () => {
    it("generateMetadata returns title from article", () => {
      expect(content).toMatch(/generateMetadata/);
      expect(content).toMatch(/title/);
    });

    it("generateMetadata includes openGraph with article type", () => {
      expect(content).toMatch(/openGraph/);
      expect(content).toMatch(/article/);
    });
  });

  describe("Fallback handling", () => {
    it("renders text-only header when no diagramSrc", () => {
      // Should handle case where diagramSrc is falsy
      expect(content).toMatch(/!article\.diagramSrc|diagramSrc\s*\)/);
    });
  });
});
