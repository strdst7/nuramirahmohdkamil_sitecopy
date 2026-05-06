"use client";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document, Block, Inline } from "@contentful/rich-text-types";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import type { ReactNode } from "react";

// Options for documentToReactComponents — the complete renderer configuration
const options = {
  // MARK RENDERERS (bold, italic — inline text formatting)
  renderMark: {
    [MARKS.BOLD]: (text: ReactNode) => (
      <strong className="font-semibold">{text}</strong>
    ),
    [MARKS.ITALIC]: (text: ReactNode) => (
      <em className="italic">{text}</em>
    ),
  },

  // NODE RENDERERS (block-level elements)
  renderNode: {
    // Headings — mapped to Surrealist Echoes typography tokens (per D-03)
    [BLOCKS.HEADING_1]: (_node: Block | Inline, children: ReactNode) => (
      <h1 className="font-headline-lg text-headline-lg text-primary mb-8 mt-12">
        {children}
      </h1>
    ),
    [BLOCKS.HEADING_2]: (_node: Block | Inline, children: ReactNode) => (
      <h2 className="font-headline-md text-headline-md text-on-surface mb-6 mt-10">
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (_node: Block | Inline, children: ReactNode) => (
      <h3 className="font-body-lg text-body-lg text-on-surface font-semibold mb-4 mt-8">
        {children}
      </h3>
    ),
    [BLOCKS.HEADING_4]: (_node: Block | Inline, children: ReactNode) => (
      <h4 className="font-body-md text-body-md text-on-surface font-semibold mb-3 mt-6">
        {children}
      </h4>
    ),
    [BLOCKS.HEADING_5]: (_node: Block | Inline, children: ReactNode) => (
      <h5 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2 mt-4">
        {children}
      </h5>
    ),
    [BLOCKS.HEADING_6]: (_node: Block | Inline, children: ReactNode) => (
      <h6 className="font-label-sm text-label-sm text-on-surface-variant mb-2 mt-4">
        {children}
      </h6>
    ),

    // Body paragraph
    [BLOCKS.PARAGRAPH]: (_node: Block | Inline, children: ReactNode) => (
      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-5">
        {children}
      </p>
    ),

    // Unordered list
    [BLOCKS.UL_LIST]: (_node: Block | Inline, children: ReactNode) => (
      <ul className="list-disc pl-6 space-y-2 mb-6 font-body-md text-body-md text-on-surface-variant">
        {children}
      </ul>
    ),

    // Ordered list
    [BLOCKS.OL_LIST]: (_node: Block | Inline, children: ReactNode) => (
      <ol className="list-decimal pl-6 space-y-2 mb-6 font-body-md text-body-md text-on-surface-variant">
        {children}
      </ol>
    ),

    // List item
    [BLOCKS.LIST_ITEM]: (_node: Block | Inline, children: ReactNode) => (
      <li className="mb-1">{children}</li>
    ),

    // Horizontal rule — Surrealist Echoes decorative divider, not a bare <hr>
    [BLOCKS.HR]: () => (
      <div className="my-16 flex items-center gap-4" role="separator">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-outline/30 to-transparent" />
        <div className="h-2 w-2 rounded-full bg-tertiary/40" />
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-outline/30 to-transparent" />
      </div>
    ),

    // Blockquote — pull-quote style matching the existing Insights listing pattern
    // (amber-toned, rotated decorative border, &ldquo; quotes, Newsreader italic)
    [BLOCKS.QUOTE]: (_node: Block | Inline, children: ReactNode) => (
      <blockquote className="my-12 ml-8 md:ml-16 max-w-lg">
        <div className="h-24 w-[1px] bg-gradient-to-b from-outline/40 to-transparent mb-6 ml-4 transform -rotate-12" />
        <p className="font-body-lg text-body-lg text-secondary-fixed-dim italic opacity-80">
          &ldquo;{children}&rdquo;
        </p>
      </blockquote>
    ),

    // Embedded asset — explicitly NOT rendered (per D-03: embedded images deferred)
    [BLOCKS.EMBEDDED_ASSET]: () => null,

    // Embedded entry — explicitly NOT rendered (prevents unexpected content)
    [BLOCKS.EMBEDDED_ENTRY]: () => null,

    // Inline embedded entry
    [INLINES.EMBEDDED_ENTRY]: () => null,

    // Hyperlink
    [INLINES.HYPERLINK]: (_node: Block | Inline, children: ReactNode) => {
      const data = (_node as { data?: Record<string, unknown> })?.data;
      const uri = data?.uri as string | undefined;
      return (
        <a
          href={uri || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary transition-colors"
        >
          {children}
        </a>
      );
    },
  },
};

// Type guard: check if value is a Contentful rich text Document
function isRichTextDocument(value: unknown): value is Document {
  if (typeof value !== "object" || value === null) return false;
  const doc = value as Record<string, unknown>;
  return doc.nodeType === "document" && Array.isArray(doc.content);
}

interface RichTextRendererProps {
  /** Contentful rich text Document, or a plain string (from fallback data) */
  content: Document | string | null | undefined;
}

/**
 * Renders Contentful rich text Documents with Surrealist Echoes typography.
 * Accepts both rich text Documents and plain strings (for fallback/hardcoded data).
 * Per D-03: headings, bold, italic, lists, dividers, blockquotes supported.
 * Embedded images are NOT rendered (deferred per D-03).
 */
export function RichTextRenderer({ content }: RichTextRendererProps) {
  // Null/undefined guard
  if (content == null) return null;

  // Plain string from fallback data — render as simple paragraphs
  if (typeof content === "string") {
    // Split on double newlines for paragraph breaks
    const paragraphs = content.split(/\n\n+/).filter(Boolean);
    if (paragraphs.length === 0) return null;
    return (
      <>
        {paragraphs.map((para, i) => (
          <p
            key={i}
            className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-5"
          >
            {para}
          </p>
        ))}
      </>
    );
  }

  // Rich text Document
  if (isRichTextDocument(content)) {
    return <>{documentToReactComponents(content, options)}</>;
  }

  // Fallback for unexpected content type
  return null;
}
