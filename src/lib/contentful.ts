// Stub - RED phase
import type { Article } from "@/data/insights";
import type { Project } from "@/data/projects";

export async function fetchArticles(): Promise<Article[]> {
  throw new Error("Not implemented");
}

export async function fetchProjects(): Promise<Project[]> {
  throw new Error("Not implemented");
}

export async function getArticleSlugs(): Promise<string[]> {
  throw new Error("Not implemented");
}

export async function fetchArticleBySlug(_slug: string): Promise<Article | null> {
  throw new Error("Not implemented");
}
