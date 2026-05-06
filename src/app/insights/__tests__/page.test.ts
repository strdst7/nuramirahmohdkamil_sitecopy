import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const pagePath = resolve(__dirname, "../page.tsx");
const content = readFileSync(pagePath, "utf-8");

describe("Insights page (structural)", () => {
  it("exports revalidate = 3600 for ISR", () => {
    expect(content).toMatch(/export const revalidate\s*=\s*3600/);
  });

  it("component is async function InsightsPage (server component)", () => {
    expect(content).toMatch(/async function InsightsPage/);
  });

  it("imports fetchArticles from @/lib/contentful", () => {
    expect(content).toMatch(/import\s+\{\s*fetchArticles\s*\}\s*from\s+["']@\/lib\/contentful["']/);
  });

  it("does NOT import articles from @/data/insights", () => {
    expect(content).not.toMatch(/import\s+\{\s*articles\s*\}\s*from\s+["']@\/data\/insights["']/);
  });

  it("does NOT have 'use client' directive", () => {
    expect(content).not.toMatch(/"use client"/);
    expect(content).not.toMatch(/'use client'/);
  });

  it("calls await fetchArticles() inside the component", () => {
    expect(content).toMatch(/await fetchArticles\(\)/);
  });
});
