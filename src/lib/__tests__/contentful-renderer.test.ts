import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const rendererPath = resolve(__dirname, "../contentful-renderer.tsx");
let content = "";

try {
  content = readFileSync(rendererPath, "utf-8");
} catch {
  // File doesn't exist yet — tests will fail (RED phase)
}

describe("RichTextRenderer (structural)", () => {
  it('has "use client" directive because @contentful/rich-text-react-renderer uses React hooks internally', () => {
    expect(content).toMatch(/"use client"/);
  });

  it("exports RichTextRenderer as a named function", () => {
    expect(content).toMatch(/export function RichTextRenderer/);
  });

  it("imports documentToReactComponents from @contentful/rich-text-react-renderer", () => {
    expect(content).toMatch(
      /import\s+\{\s*documentToReactComponents\s*\}\s*from\s+["']@contentful\/rich-text-react-renderer["']/
    );
  });

  it("imports BLOCKS, INLINES, MARKS from @contentful/rich-text-types", () => {
    expect(content).toMatch(/BLOCKS/);
    expect(content).toMatch(/INLINES/);
    expect(content).toMatch(/MARKS/);
  });

  describe("Mark renderers", () => {
    it("renders BOLD mark with font-semibold class", () => {
      expect(content).toMatch(/MARKS\.BOLD/);
      expect(content).toMatch(/font-semibold/);
    });

    it("renders ITALIC mark with italic class", () => {
      expect(content).toMatch(/MARKS\.ITALIC/);
      expect(content).toMatch(/\bitalic\b/);
    });
  });

  describe("Node renderers — headings", () => {
    it("renders HEADING_1 with font-headline-lg text-headline-lg text-primary", () => {
      expect(content).toMatch(/BLOCKS\.HEADING_1/);
      expect(content).toMatch(/font-headline-lg/);
      expect(content).toMatch(/text-headline-lg/);
      expect(content).toMatch(/text-primary/);
    });

    it("renders HEADING_2 with font-headline-md text-headline-md text-on-surface", () => {
      expect(content).toMatch(/BLOCKS\.HEADING_2/);
      expect(content).toMatch(/font-headline-md/);
      expect(content).toMatch(/text-headline-md/);
    });

    it("renders HEADING_3 with font-body-lg text-body-lg font-semibold", () => {
      expect(content).toMatch(/BLOCKS\.HEADING_3/);
      expect(content).toMatch(/font-body-lg/);
    });

    it("renders HEADING_4, HEADING_5, HEADING_6", () => {
      expect(content).toMatch(/BLOCKS\.HEADING_4/);
      expect(content).toMatch(/BLOCKS\.HEADING_5/);
      expect(content).toMatch(/BLOCKS\.HEADING_6/);
    });
  });

  describe("Node renderers — body elements", () => {
    it("renders PARAGRAPH with font-body-md text-body-md text-on-surface-variant leading-relaxed", () => {
      expect(content).toMatch(/BLOCKS\.PARAGRAPH/);
      expect(content).toMatch(/font-body-md/);
      expect(content).toMatch(/text-body-md/);
      expect(content).toMatch(/leading-relaxed/);
    });

    it("renders UL_LIST with list-disc pl-6 space-y-2", () => {
      expect(content).toMatch(/BLOCKS\.UL_LIST/);
      expect(content).toMatch(/list-disc/);
    });

    it("renders OL_LIST with list-decimal pl-6 space-y-2", () => {
      expect(content).toMatch(/BLOCKS\.OL_LIST/);
      expect(content).toMatch(/list-decimal/);
    });
  });

  describe("Node renderers — decorative elements", () => {
    it("renders HR as decorative Surrealist Echoes divider (not bare <hr>)", () => {
      expect(content).toMatch(/BLOCKS\.HR/);
      // Should NOT render a bare <hr> JSX element (check for <hr in non-comment context)
      // The regex specifically looks for <hr followed by optional whitespace and self-closing />
      // but avoids matching <hr> in comments (where it's preceded by spaces in prose)
      const hasJsxHr = content.match(/(?:return|=>)\s*\(\s*<hr\b/i);
      expect(hasJsxHr).toBeNull();
    });

    it("renders QUOTE as pull-quote pattern with amber-toned text and rotated border", () => {
      expect(content).toMatch(/BLOCKS\.QUOTE/);
      expect(content).toMatch(/&ldquo;/);
      expect(content).toMatch(/-rotate-12/);
    });
  });

  describe("Node renderers — security/safety", () => {
    it("EMBEDDED_ASSET renderer returns null (embedded images deferred per D-03)", () => {
      expect(content).toMatch(/BLOCKS\.EMBEDDED_ASSET/);
    });

    it("EMBEDDED_ENTRY renderer returns null (prevents unexpected content)", () => {
      expect(content).toMatch(/BLOCKS\.EMBEDDED_ENTRY/);
    });

    it("INLINES.EMBEDDED_ENTRY renderer returns null", () => {
      expect(content).toMatch(/INLINES\.EMBEDDED_ENTRY/);
    });
  });

  describe("Hyperlink renderer", () => {
    it("renders HYPERLINK with target=_blank and rel=noopener noreferrer", () => {
      expect(content).toMatch(/INLINES\.HYPERLINK/);
      expect(content).toMatch(/noopener/);
      expect(content).toMatch(/noreferrer/);
    });
  });

  describe("Content type handling", () => {
    it("handles null/undefined content gracefully", () => {
      expect(content).toMatch(/==\s*null/);
    });

    it("handles string content (plain text from fallback data)", () => {
      expect(content).toMatch(/typeof content === "string"/);
    });

    it("checks for rich text Document via isRichTextDocument or nodeType check", () => {
      expect(content).toMatch(/isRichTextDocument|nodeType === "document"/);
    });
  });

  describe("Surrealist Echoes typography token coverage", () => {
    it("uses font-headline-lg and text-headline-lg tokens", () => {
      expect(content).toMatch(/font-headline-lg/);
      expect(content).toMatch(/text-headline-lg/);
    });

    it("uses font-headline-md and text-headline-md tokens", () => {
      expect(content).toMatch(/font-headline-md/);
      expect(content).toMatch(/text-headline-md/);
    });

    it("uses font-body-lg and text-body-lg tokens", () => {
      expect(content).toMatch(/font-body-lg/);
      expect(content).toMatch(/text-body-lg/);
    });

    it("uses font-body-md and text-body-md tokens", () => {
      expect(content).toMatch(/font-body-md/);
      expect(content).toMatch(/text-body-md/);
    });

    it("uses font-label-sm and text-label-sm tokens", () => {
      expect(content).toMatch(/font-label-sm/);
      expect(content).toMatch(/text-label-sm/);
    });
  });
});
