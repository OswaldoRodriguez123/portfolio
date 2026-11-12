#!/usr/bin/env node
/**
 * Reads the CSV files of the official LinkedIn export (Settings & Privacy →
 * Data Privacy → Download your data) and writes a *proposal*: the About text
 * split into paragraphs, plus the diff against `messages/*.json` and
 * `content/work.ts`.
 *
 * It never edits the site. Translating the About text into Spanish is a human
 * decision, so the script stops at `content/linkedin-proposal.json`.
 *
 *   npm run import:linkedin -- ~/Downloads/export
 *   npm run import:linkedin -- ~/Downloads/Basic_LinkedInDataExport.zip
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildProposal, parseLinkedinExport } from "../lib/linkedin.ts";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const EXPORT_FILES = ["Profile.csv", "Positions.csv", "Skills.csv", "Projects.csv"];

const args = process.argv.slice(2);
let source;
let out = join(ROOT, "content", "linkedin-proposal.json");

for (let i = 0; i < args.length; i += 1) {
  if (args[i] === "--out") {
    out = args[i + 1];
    i += 1;
  } else if (!source) {
    source = args[i];
  }
}

if (!source) {
  fail("missing export path: npm run import:linkedin -- <folder-or-zip>");
}

if (!existsSync(source)) {
  fail(`export not found: ${source}`);
}

if (!out) {
  fail("--out needs a file path");
}

const raw = Object.fromEntries(
  EXPORT_FILES.map((name) => [name, readEntry(source, name)]),
);

if (!raw["Profile.csv"]) {
  fail(`Profile.csv not found inside ${source}`);
}

const linkedin = parseLinkedinExport({
  profile: raw["Profile.csv"],
  positions: raw["Positions.csv"],
  skills: raw["Skills.csv"],
  projects: raw["Projects.csv"],
});

const about = {
  en: aboutParagraphs("en"),
  es: aboutParagraphs("es"),
};

const { work } = await import(new URL("../content/work.ts", import.meta.url).href);
const proposal = buildProposal({
  linkedin,
  about,
  work: work.map(({ company, role, period }) => ({ company, role, period })),
});

mkdirSync(dirname(out), { recursive: true });
writeFileSync(
  out,
  `${JSON.stringify({ generatedAt: new Date().toISOString(), readFrom: source, ...proposal }, null, 2)}\n`,
);

report(proposal, out);

function readEntry(from, name) {
  if (from.toLowerCase().endsWith(".zip")) {
    const entry = listZip(from).find(
      (candidate) => basename(candidate).toLowerCase() === name.toLowerCase(),
    );
    if (!entry) return null;

    return execFileSync("unzip", ["-p", from, entry], {
      encoding: "utf8",
      maxBuffer: 20 * 1024 * 1024,
    });
  }

  const file = join(from, name);
  return existsSync(file) ? readFileSync(file, "utf8") : null;
}

function listZip(from) {
  try {
    return execFileSync("unzip", ["-Z1", from], {
      encoding: "utf8",
      maxBuffer: 20 * 1024 * 1024,
    }).split("\n");
  } catch (error) {
    fail(`cannot read the zip ${from}: ${error.message}`);
  }
}

function aboutParagraphs(locale) {
  const messages = JSON.parse(
    readFileSync(join(ROOT, "messages", `${locale}.json`), "utf8"),
  );

  return [messages.home?.aboutP1, messages.home?.aboutP2].filter(Boolean);
}

function report(result, file) {
  const lines = [];
  const { about: taken, work: jobs } = result;

  lines.push(`[linkedin] export: ${source}`);
  lines.push(`[linkedin] about: ${taken.status}`);

  if (taken.headline) lines.push(`  headline: ${taken.headline}`);

  for (const [index, paragraph] of taken.paragraphs.entries()) {
    const first = paragraph.split("\n")[0];
    lines.push(`  ${index + 1}. ${first}`);
  }

  if (taken.status === "different") {
    lines.push(`  current en: ${taken.current.en.length} paragraph(s)`);
    lines.push(`  current es: ${taken.current.es.length} paragraph(s)`);
  }

  if (jobs.onlyInLinkedin.length > 0) {
    lines.push(`[linkedin] only on LinkedIn: ${jobs.onlyInLinkedin.map(describe).join("; ")}`);
  }
  if (jobs.onlyLocally.length > 0) {
    lines.push(`[linkedin] only in content/work.ts: ${jobs.onlyLocally.map(describe).join("; ")}`);
  }
  for (const mismatch of jobs.periodMismatch) {
    lines.push(
      `[linkedin] period differs — ${mismatch.company} / ${mismatch.role}: LinkedIn ${formatPeriod(mismatch.linkedin)}, work.ts ${formatPeriod(mismatch.local)}`,
    );
  }

  lines.push(`[linkedin] skills: ${result.skills.length}, projects: ${result.projects.length}`);
  lines.push(`[linkedin] proposal → ${file}`);
  lines.push("[linkedin] nothing on the site was modified");

  console.log(lines.join("\n"));
}

function describe(entry) {
  return `${entry.company} / ${entry.title ?? entry.role}`;
}

function formatPeriod(period) {
  return `${period.start ?? "?"} — ${period.end ?? "Present"}`;
}

function fail(message) {
  console.error(`[linkedin] ${message}`);
  process.exit(1);
}
