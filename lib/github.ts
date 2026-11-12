import { readFileSync } from "node:fs";
import type { Project } from "@/content/types";

/**
 * Facts pulled from the GitHub API at build time (`npm run sync:github`).
 * They only fill what the repo actually knows — topics, homepage and the Open
 * Graph image. The bilingual narrative, the year and `featured` stay local,
 * and anything set in `content/projects/*` wins over GitHub.
 */
export type GithubRepo = {
  name: string;
  full_name: string;
  fork: boolean;
  archived: boolean;
  private?: boolean;
  topics?: string[];
  homepage?: string | null;
  html_url: string;
};

export type RepoFacts = {
  name: string;
  stack: string[];
  liveUrl?: string;
  repoUrl: string;
  cover: string;
};

/** Cards show 4 chips; the index and the case study can carry a few more. */
export const MAX_STACK = 8;

const TOPIC_LABELS: Record<string, string> = {
  api: "API",
  aws: "AWS",
  cli: "CLI",
  css: "CSS",
  fastapi: "FastAPI",
  "github-actions": "GitHub Actions",
  "google-maps": "Google Maps",
  html: "HTML",
  javascript: "JavaScript",
  jwt: "JWT",
  llm: "LLM",
  mcp: "MCP",
  "microsoft-graph": "Microsoft Graph",
  nextjs: "Next.js",
  nodejs: "Node.js",
  openapi: "OpenAPI",
  postgresql: "PostgreSQL",
  rag: "RAG",
  "rest-api": "REST API",
  spa: "SPA",
  sqlite: "SQLite",
  tailwindcss: "Tailwind CSS",
  typescript: "TypeScript",
  "web-scraping": "Web scraping",
};

export function labelTopic(topic: string): string {
  const known = TOPIC_LABELS[topic];
  if (known) return known;

  return topic
    .split("-")
    .filter(Boolean)
    .map((word) => word[0]!.toUpperCase() + word.slice(1))
    .join(" ");
}

export function factsFromRepos(repos: readonly GithubRepo[]): Map<string, RepoFacts> {
  const facts = new Map<string, RepoFacts>();

  for (const repo of repos) {
    // Private repos never reach the snapshot (the endpoint only lists public
    // ones) but a leak would publish a name or an OG image that is not public.
    if (!repo || repo.fork || repo.archived || repo.private) continue;
    if (!repo.name || !repo.full_name) continue;

    const homepage = repo.homepage?.trim();

    facts.set(repo.name, {
      name: repo.name,
      stack: dedupe((repo.topics ?? []).map(labelTopic)),
      ...(homepage ? { liveUrl: homepage } : {}),
      repoUrl: repo.html_url,
      cover: `https://opengraph.githubassets.com/1/${repo.full_name}`,
    });
  }

  return facts;
}

export function parseSnapshot(raw: string): Map<string, RepoFacts> {
  try {
    const data = JSON.parse(raw) as { repos?: unknown };
    return factsFromRepos(Array.isArray(data.repos) ? (data.repos as GithubRepo[]) : []);
  } catch {
    return new Map();
  }
}

/** Reads the snapshot written by `npm run sync:github`; missing file means no facts. */
export function loadFacts(filePath: string): Map<string, RepoFacts> {
  try {
    return parseSnapshot(readFileSync(filePath, "utf8"));
  } catch {
    return new Map();
  }
}

/** `https://github.com/owner/repo` → `repo`. */
export function repoNameFromUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;

  try {
    const [, owner, name] = new URL(url).pathname.split("/");
    if (!owner || !name) return undefined;
    return name;
  } catch {
    return undefined;
  }
}

export function applyFacts(project: Project, facts: RepoFacts | undefined): Project {
  if (!facts) return project;

  const stack = [...project.stack];
  for (const item of facts.stack) {
    if (stack.length >= MAX_STACK) break;
    if (stack.some((existing) => existing.toLowerCase() === item.toLowerCase())) continue;
    stack.push(item);
  }

  return {
    ...project,
    stack,
    links: {
      ...project.links,
      live: project.links.live ?? facts.liveUrl,
      repo: project.links.repo ?? facts.repoUrl,
    },
    cover: project.cover ?? facts.cover,
  };
}

function dedupe(items: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const item of items) {
    const key = item.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }

  return result;
}
