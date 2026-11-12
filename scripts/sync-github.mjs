/**
 * Writes content/github-snapshot.json with the public facts of the owner's
 * repos: topics (the stack chips), homepage (the live link) and html_url.
 * `npm run build` runs this first, so the API is called once per build and
 * never from the browser.
 *
 * It never fails the build: without network or without quota the snapshot is
 * left untouched and the site falls back to what is in content/projects/*.
 */
import { writeFileSync } from "node:fs";

const owner = process.env.GITHUB_USER ?? "OswaldoRodriguez123";
const target = new URL("../content/github-snapshot.json", import.meta.url);
const FIELDS = ["name", "full_name", "fork", "archived", "topics", "homepage", "html_url", "private"];

const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "portfolio-sync",
};
if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

try {
  const response = await fetch(
    `https://api.github.com/users/${owner}/repos?type=owner&per_page=100&sort=pushed`,
    { headers },
  );
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const repos = (await response.json()).map((repo) =>
    Object.fromEntries(FIELDS.map((field) => [field, repo[field]])),
  );

  writeFileSync(
    target,
    `${JSON.stringify({ fetchedAt: new Date().toISOString(), owner, repos }, null, 2)}\n`,
  );
  console.log(`[github] ${repos.length} repos → content/github-snapshot.json`);
} catch (error) {
  console.warn(
    `[github] snapshot skipped (${error.message}); the site falls back to content/projects/*`,
  );
}
