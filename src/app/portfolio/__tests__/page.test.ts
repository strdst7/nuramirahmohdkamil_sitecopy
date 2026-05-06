import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const pagePath = resolve(__dirname, "../page.tsx");
const content = readFileSync(pagePath, "utf-8");

describe("Portfolio page (structural)", () => {
  it("exports revalidate = 3600 for ISR", () => {
    expect(content).toMatch(/export const revalidate\s*=\s*3600/);
  });

  it("component is async function PortfolioPage (server component)", () => {
    expect(content).toMatch(/async function PortfolioPage/);
  });

  it("imports fetchProjects from @/lib/contentful", () => {
    expect(content).toMatch(/import\s+\{\s*fetchProjects\s*\}\s*from\s+["']@\/lib\/contentful["']/);
  });

  it("does NOT import projects from @/data/projects", () => {
    expect(content).not.toMatch(/import\s+\{\s*projects\s*\}\s*from\s+["']@\/data\/projects["']/);
  });

  it("does NOT have 'use client' directive", () => {
    expect(content).not.toMatch(/"use client"/);
    expect(content).not.toMatch(/'use client'/);
  });

  it("calls await fetchProjects() inside the component", () => {
    expect(content).toMatch(/await fetchProjects\(\)/);
  });
});
