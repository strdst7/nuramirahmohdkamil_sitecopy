import { createClient, type ContentfulClientApi } from "contentful";
import type { Document } from "@contentful/rich-text-types";
import { BLOCKS } from "@contentful/rich-text-types";
import type { Article } from "@/data/insights";
import type { Project } from "@/data/projects";

// ---------------------------------------------------------------------------
// Rich text type export — used by detail pages that render rich text
// ---------------------------------------------------------------------------
export type RichTextDocument = Document;

// ---------------------------------------------------------------------------
// Client singleton (server-side only — env vars never reach client bundle)
// ---------------------------------------------------------------------------
let client: ContentfulClientApi<undefined> | null = null;

function getClient(): ContentfulClientApi<undefined> {
  if (!client) {
    client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID!,
      accessToken: process.env.CONTENTFUL_DELIVERY_API_KEY!,
      environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
    });
  }
  return client;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Extract plain text from a Contentful rich text Document by concatenating
 * all text node values. Used by listing pages that display body as plain text.
 */
function richTextToPlainText(doc: Document): string {
  const texts: string[] = [];

  function walk(node: Record<string, unknown>): void {
    if (node.nodeType === "text" && typeof node.value === "string") {
      texts.push(node.value);
    }
    if (Array.isArray(node.content)) {
      for (const child of node.content) {
        walk(child as Record<string, unknown>);
      }
    }
  }

  walk(doc as unknown as Record<string, unknown>);
  return texts.join("");
}

/**
 * Resolve a Contentful media field URL to an absolute https URL.
 * Contentful delivery API may return protocol-relative URLs (//images.ctfassets.net/…).
 */
function resolveMediaUrl(field: unknown): string {
  if (
    field &&
    typeof field === "object" &&
    "fields" in field &&
    field.fields &&
    typeof field.fields === "object" &&
    "file" in field.fields &&
    field.fields.file &&
    typeof field.fields.file === "object" &&
    "url" in field.fields.file &&
    typeof field.fields.file.url === "string"
  ) {
    const url: string = field.fields.file.url;
    return url.startsWith("//") ? `https:${url}` : url;
  }
  return "";
}

// ---------------------------------------------------------------------------
// Fallback data imports (at module level, lazy-loaded in catch blocks)
// ---------------------------------------------------------------------------
async function getFallbackArticles(): Promise<Article[]> {
  const { articles } = await import("@/data/insights");
  return articles;
}

async function getFallbackProjects(): Promise<Project[]> {
  const { projects } = await import("@/data/projects");
  return projects;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Fetch all published Article entries from Contentful.
 * Falls back to hardcoded src/data/insights.ts if Contentful is unreachable.
 */
export async function fetchArticles(): Promise<Article[]> {
  try {
    const c = getClient();
    const response = await c.getEntries({
      content_type: "article",
    });

    return response.items.map((entry) => {
      const f = entry.fields as Record<string, unknown>;
      return {
        id: entry.sys.id,
        title: (f.title as string) ?? "",
        date: (f.date as string) ?? "",
        excerpt: (f.excerpt as string) ?? "",
        body: f.body ? richTextToPlainText(f.body as Document) : "",
        tags: Array.isArray(f.tags) ? (f.tags as string[]) : [],
        iconName: (f.iconName as string) ?? "",
        diagramAlt: (f.diagramAlt as string) ?? "",
        diagramSrc: resolveMediaUrl(f.diagramSrc),
      };
    });
  } catch (error) {
    console.error(
      "[contentful] fetchArticles failed, using fallback:",
      error
    );
    return getFallbackArticles();
  }
}

/**
 * Fetch all published Project entries from Contentful.
 * Falls back to hardcoded src/data/projects.ts if Contentful is unreachable.
 */
export async function fetchProjects(): Promise<Project[]> {
  try {
    const c = getClient();
    const response = await c.getEntries({
      content_type: "project",
    });

    return response.items.map((entry) => {
      const f = entry.fields as Record<string, unknown>;
      const ctaField = f.cta as { label?: string; href?: string } | undefined;
      return {
        id: entry.sys.id,
        number: (f.number as string) ?? "",
        title: (f.title as string) ?? "",
        description: (f.description as string) ?? "",
        tags: Array.isArray(f.tags) ? (f.tags as string[]) : [],
        iconName: (f.iconName as string) ?? "",
        imageAlt: (f.imageAlt as string) ?? "",
        imageSrc: resolveMediaUrl(f.imageSrc),
        cta:
          ctaField?.label && ctaField?.href
            ? { label: ctaField.label, href: ctaField.href }
            : undefined,
        layout:
          f.layout === "left" ? "left" : ("right" as "right" | "left"),
      };
    });
  } catch (error) {
    console.error(
      "[contentful] fetchProjects failed, using fallback:",
      error
    );
    return getFallbackProjects();
  }
}

/**
 * Fetch all article slugs from Contentful.
 * Falls back to hardcoded article IDs if Contentful is unreachable.
 */
export async function getArticleSlugs(): Promise<string[]> {
  try {
    const c = getClient();
    const response = await c.getEntries({
      content_type: "article",
      select: ["sys.id"],
    });

    return response.items.map((entry) => entry.sys.id);
  } catch (error) {
    console.error(
      "[contentful] getArticleSlugs failed, using fallback:",
      error
    );
    const articles = await getFallbackArticles();
    return articles.map((a) => a.id);
  }
}

/**
 * Fetch a single Article by its slug (matches entry.sys.id).
 * Returns the full Article with body as a rich text Document (for detail page rendering).
 * Returns null if no matching entry found.
 * Falls back to searching hardcoded articles if Contentful is unreachable.
 */
export async function fetchArticleBySlug(
  slug: string
): Promise<(Article & { bodyDoc: Document }) | null> {
  try {
    const c = getClient();
    const response = await c.getEntries({
      content_type: "article",
      "sys.id": slug,
      limit: 1,
    });

    if (response.items.length === 0) return null;

    const entry = response.items[0];
    const f = entry.fields as Record<string, unknown>;
    const bodyDoc = (f.body as Document) ?? { nodeType: BLOCKS.DOCUMENT, data: {}, content: [] };

    return {
      id: entry.sys.id,
      title: (f.title as string) ?? "",
      date: (f.date as string) ?? "",
      excerpt: (f.excerpt as string) ?? "",
      body: richTextToPlainText(bodyDoc),
      bodyDoc,
      tags: Array.isArray(f.tags) ? (f.tags as string[]) : [],
      iconName: (f.iconName as string) ?? "",
      diagramAlt: (f.diagramAlt as string) ?? "",
      diagramSrc: resolveMediaUrl(f.diagramSrc),
    };
  } catch (error) {
    console.error(
      "[contentful] fetchArticleBySlug failed, using fallback:",
      error
    );
    const articles = await getFallbackArticles();
    const match = articles.find((a) => a.id === slug);
    if (!match) return null;

    // Build a simple Document from plain text for fallback rendering
    const fallbackDoc: Document = {
      nodeType: BLOCKS.DOCUMENT,
      data: {},
      content: [
        {
          nodeType: BLOCKS.PARAGRAPH,
          data: {},
          content: [
            {
              nodeType: "text",
              value: match.body,
              marks: [],
              data: {},
            },
          ],
        },
      ],
    };

    return {
      ...match,
      bodyDoc: fallbackDoc,
    };
  }
}
