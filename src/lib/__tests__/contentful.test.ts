import { describe, it, expect, vi, beforeEach } from "vitest";

// Use vi.hoisted so mockGetEntries is available in the hoisted vi.mock factory
const { mockGetEntries } = vi.hoisted(() => ({
  mockGetEntries: vi.fn(),
}));

vi.mock("contentful", () => ({
  createClient: vi.fn(() => ({
    getEntries: mockGetEntries,
  })),
}));

// Dynamic import of the module under test (so mocks apply)
import {
  fetchArticles,
  fetchProjects,
  getArticleSlugs,
  fetchArticleBySlug,
} from "../contentful";

// Mock the fallback data modules
vi.mock("@/data/insights", () => ({
  articles: [
    {
      id: "fallback-1",
      title: "Fallback Article",
      date: "2025-01-01",
      excerpt: "Fallback excerpt",
      body: "Fallback body text.",
      tags: ["Fallback"],
      iconName: "article",
      diagramAlt: "Fallback diagram",
      diagramSrc: "/images/fallback.svg",
    },
  ],
}));

vi.mock("@/data/projects", () => ({
  projects: [
    {
      id: "fallback-proj-1",
      number: "Project FB-01",
      title: "Fallback Project",
      description: "Fallback description",
      tags: ["Fallback"],
      iconName: "build",
      imageAlt: "Fallback image",
      imageSrc: "/images/fallback.svg",
      layout: "right" as const,
    },
  ],
}));

const mockArticleEntry = {
  sys: {
    id: "test-article-1",
    contentType: { sys: { id: "article" } },
  },
  fields: {
    title: "Test Article",
    date: "2025-06-01",
    excerpt: "A test article excerpt",
    body: {
      nodeType: "document",
      data: {},
      content: [
        {
          nodeType: "paragraph",
          data: {},
          content: [
            {
              nodeType: "text",
              value: "This is the body text of the test article.",
              marks: [],
              data: {},
            },
          ],
        },
      ],
    },
    tags: ["Testing", "Contentful"],
    iconName: "science",
    diagramAlt: "Test diagram alt text",
    diagramSrc: {
      fields: {
        file: {
          url: "//images.ctfassets.net/test/diagram.svg",
        },
      },
    },
  },
};

const mockProjectEntry = {
  sys: {
    id: "test-project-1",
    contentType: { sys: { id: "project" } },
  },
  fields: {
    number: "Project 01",
    title: "Test Project",
    description: "A test project description",
    tags: ["UX", "Design"],
    iconName: "design_services",
    imageAlt: "Test project image",
    imageSrc: {
      fields: {
        file: {
          url: "//images.ctfassets.net/test/project.svg",
        },
      },
    },
    layout: "right",
  },
};

describe("contentful client", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("fetchArticles", () => {
    it("returns Article[] when Contentful responds with valid entries", async () => {
      mockGetEntries.mockResolvedValueOnce({
        items: [mockArticleEntry],
        total: 1,
        skip: 0,
        limit: 100,
      });

      const articles = await fetchArticles();
      expect(articles).toHaveLength(1);
      expect(articles[0]).toMatchObject({
        id: "test-article-1",
        title: "Test Article",
        date: "2025-06-01",
        excerpt: "A test article excerpt",
        tags: ["Testing", "Contentful"],
        iconName: "science",
        diagramAlt: "Test diagram alt text",
      });
      // body should be plain text extracted from rich text
      expect(articles[0].body).toBe("This is the body text of the test article.");
      // diagramSrc should have https: prefix
      expect(articles[0].diagramSrc).toBe("https://images.ctfassets.net/test/diagram.svg");
    });

    it("returns fallback data when Contentful returns 5xx error", async () => {
      mockGetEntries.mockRejectedValueOnce(new Error("500 Internal Server Error"));

      const articles = await fetchArticles();
      expect(articles).toHaveLength(1);
      expect(articles[0].id).toBe("fallback-1");
      expect(articles[0].title).toBe("Fallback Article");
    });
  });

  describe("fetchProjects", () => {
    it("returns Project[] when Contentful responds with valid entries", async () => {
      mockGetEntries.mockResolvedValueOnce({
        items: [mockProjectEntry],
        total: 1,
        skip: 0,
        limit: 100,
      });

      const projects = await fetchProjects();
      expect(projects).toHaveLength(1);
      expect(projects[0]).toMatchObject({
        id: "test-project-1",
        number: "Project 01",
        title: "Test Project",
        description: "A test project description",
        tags: ["UX", "Design"],
        iconName: "design_services",
        imageAlt: "Test project image",
        layout: "right",
      });
      expect(projects[0].imageSrc).toBe("https://images.ctfassets.net/test/project.svg");
    });

    it("returns fallback data when Contentful returns 5xx error", async () => {
      mockGetEntries.mockRejectedValueOnce(new Error("503 Service Unavailable"));

      const projects = await fetchProjects();
      expect(projects).toHaveLength(1);
      expect(projects[0].id).toBe("fallback-proj-1");
      expect(projects[0].title).toBe("Fallback Project");
    });
  });

  describe("getArticleSlugs", () => {
    it("returns string[] of slugs from Contentful entries", async () => {
      mockGetEntries.mockResolvedValueOnce({
        items: [mockArticleEntry],
        total: 1,
        skip: 0,
        limit: 100,
      });

      const slugs = await getArticleSlugs();
      expect(slugs).toContain("test-article-1");
    });

    it("returns fallback slugs when Contentful fails", async () => {
      mockGetEntries.mockRejectedValueOnce(new Error("Network error"));

      const slugs = await getArticleSlugs();
      expect(slugs).toContain("fallback-1");
    });
  });

  describe("fetchArticleBySlug", () => {
    it("returns Article when entry exists by slug matching id", async () => {
      mockGetEntries.mockResolvedValueOnce({
        items: [mockArticleEntry],
        total: 1,
        skip: 0,
        limit: 100,
      });

      const article = await fetchArticleBySlug("test-article-1");
      expect(article).not.toBeNull();
      expect(article!.id).toBe("test-article-1");
      // Detail page gets rich text Document
      expect(article).toHaveProperty("bodyDoc");
    });

    it("returns null when no entry matches slug", async () => {
      mockGetEntries.mockResolvedValueOnce({
        items: [],
        total: 0,
        skip: 0,
        limit: 100,
      });

      const article = await fetchArticleBySlug("nonexistent");
      expect(article).toBeNull();
    });

    it("returns fallback article when Contentful fails", async () => {
      mockGetEntries.mockRejectedValueOnce(new Error("Timeout"));

      const article = await fetchArticleBySlug("fallback-1");
      expect(article).not.toBeNull();
      expect(article!.id).toBe("fallback-1");
      // Fallback also provides a bodyDoc for detail page rendering
      expect(article).toHaveProperty("bodyDoc");
    });
  });
});
