import type { Locale } from "@/content/types";

/**
 * Reader for the CSV files of the official LinkedIn export (Settings & Privacy
 * → Data Privacy → Download your data). No scraping and no API: the export is
 * the member's own data, so it is the only supported way in.
 *
 * This module is pure on purpose — it has no runtime imports — because
 * `scripts/linkedin-import.mjs` runs it directly with Node's type stripping.
 *
 * Column names differ between export versions (`Name` vs `Skill Name`,
 * `Started On` vs `Start Date`), so every field is looked up through aliases
 * instead of a fixed position.
 */

export type LinkedinProfile = {
  firstName: string | null;
  lastName: string | null;
  headline: string | null;
  summary: string | null;
  geoLocation: string | null;
};

export type LinkedinPosition = {
  company: string;
  title: string;
  description: string | null;
  location: string | null;
  startedOn: string | null;
  finishedOn: string | null;
};

export type LinkedinProject = {
  title: string;
  description: string | null;
  url: string | null;
  startedOn: string | null;
  finishedOn: string | null;
};

export type LinkedinExport = {
  profile: LinkedinProfile | null;
  positions: LinkedinPosition[];
  skills: string[];
  projects: LinkedinProject[];
};

export type ExportFiles = Partial<
  Record<"profile" | "positions" | "skills" | "projects", string>
>;

export type Period = { start: number | null; end: number | null };

export type WorkLike = { company: string; role: string; period: string };

export type Proposal = {
  about: {
    status: "identical" | "different" | "no-summary";
    headline: string | null;
    paragraphs: string[];
    current: Record<Locale, string[]>;
  };
  work: {
    linkedin: LinkedinPosition[];
    onlyInLinkedin: LinkedinPosition[];
    onlyLocally: WorkLike[];
    periodMismatch: {
      company: string;
      role: string;
      linkedin: Period;
      local: Period;
    }[];
    titleMismatch: {
      company: string;
      linkedin: string;
      local: string;
    }[];
  };
  skills: string[];
  projects: LinkedinProject[];
};

const POSITION_COLUMNS = {
  company: ["company name", "company"],
  title: ["title", "position"],
  description: ["description"],
  location: ["location"],
  startedOn: ["started on", "start date"],
  finishedOn: ["finished on", "end date"],
};

const PROJECT_COLUMNS = {
  title: ["title", "name"],
  description: ["description"],
  url: ["url", "link"],
  startedOn: ["started on", "start date"],
  finishedOn: ["finished on", "end date"],
};

/** RFC 4180 enough for the export: quotes, escaped quotes and embedded newlines. */
export function parseCsv(raw: string): string[][] {
  const text = raw.replace(/^\uFEFF/, "");
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i]!;

    if (quoted) {
      if (char !== '"') {
        field += char;
      } else if (text[i + 1] === '"') {
        field += '"';
        i += 1;
      } else {
        quoted = false;
      }
      continue;
    }

    if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && text[i + 1] === "\n") i += 1;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  row.push(field);
  rows.push(row);

  return rows.filter((cells) => cells.some((cell) => cell.trim() !== ""));
}

/** Index of the first row that has a match for every required alias group. */
export function findHeaderRow(rows: string[][], required: string[][]): number {
  return rows.findIndex((row) => {
    const normalized = row.map(normalizeLabel);
    return required.every((aliases) =>
      aliases.some((alias) => normalized.includes(alias)),
    );
  });
}

export function parseLinkedinExport(files: ExportFiles): LinkedinExport {
  const profileTable = files.profile
    ? readTable(files.profile, [["headline"], ["summary"]])
    : null;
  const positionsTable = files.positions
    ? readTable(files.positions, [
        ["company name", "company"],
        ["title", "position"],
      ])
    : null;
  const skillsTable = files.skills
    ? readTable(files.skills, [["name", "skill name"]])
    : null;
  const projectsTable = files.projects
    ? readTable(files.projects, [["title", "name"]])
    : null;

  const profileRow = profileTable?.rows[0];
  const profile: LinkedinProfile | null = profileRow
    ? {
        firstName: cell(profileTable!, profileRow, ["first name"]),
        lastName: cell(profileTable!, profileRow, ["last name"]),
        headline: cell(profileTable!, profileRow, ["headline"]),
        summary: cell(profileTable!, profileRow, ["summary", "about"]),
        geoLocation: cell(profileTable!, profileRow, ["geo location", "location"]),
      }
    : null;

  const positions = (positionsTable?.rows ?? [])
    .map((row) => ({
      company: cell(positionsTable!, row, POSITION_COLUMNS.company) ?? "",
      title: cell(positionsTable!, row, POSITION_COLUMNS.title) ?? "",
      description: cell(positionsTable!, row, POSITION_COLUMNS.description),
      location: cell(positionsTable!, row, POSITION_COLUMNS.location),
      startedOn: cell(positionsTable!, row, POSITION_COLUMNS.startedOn),
      finishedOn: cell(positionsTable!, row, POSITION_COLUMNS.finishedOn),
    }))
    .filter((position) => position.company !== "" || position.title !== "");

  const skills = dedupe(
    (skillsTable?.rows ?? [])
      .map((row) => cell(skillsTable!, row, ["name", "skill name"]))
      .filter((name): name is string => name !== null),
  );

  const projects = (projectsTable?.rows ?? [])
    .map((row) => ({
      title: cell(projectsTable!, row, PROJECT_COLUMNS.title) ?? "",
      description: cell(projectsTable!, row, PROJECT_COLUMNS.description),
      url: cell(projectsTable!, row, PROJECT_COLUMNS.url),
      startedOn: cell(projectsTable!, row, PROJECT_COLUMNS.startedOn),
      finishedOn: cell(projectsTable!, row, PROJECT_COLUMNS.finishedOn),
    }))
    .filter((project) => project.title !== "");

  return { profile, positions, skills, projects };
}

/**
 * LinkedIn flattens paragraph breaks into runs of two or more spaces and keeps
 * bullets inline as `•\t`, so both are normalised here.
 */
export function splitParagraphs(text: string): string[] {
  const normalized = text.replace(/\r\n/g, "\n").trim();
  if (!normalized) return [];

  const chunks = (/\n\s*\n/.test(normalized)
    ? normalized.split(/\n\s*\n/)
    : normalized.split(/[ \t]{2,}|\n/)
  )
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  const paragraphs: string[] = [];
  for (const chunk of chunks) {
    const block = chunk.replace(/\s*•\s*/g, "\n• ").trim();
    if (block.startsWith("•") && paragraphs.length > 0) {
      paragraphs[paragraphs.length - 1] += `\n${block}`;
    } else {
      paragraphs.push(block);
    }
  }

  return paragraphs;
}

/** `Jan 2023` / `2023`. An empty end date is "present". */
export function periodFromDates(
  startedOn: string | null,
  finishedOn: string | null,
): Period {
  return { start: yearFrom(startedOn ?? ""), end: yearFrom(finishedOn ?? "") };
}

/** `2023 — Present` as written in `content/work.ts`. */
export function parsePeriod(period: string): Period {
  const [start = "", end = ""] = period.split(/[—–]/);

  return {
    start: yearFrom(start),
    end: /present|actual|hoy/i.test(end) ? null : yearFrom(end),
  };
}

export function buildProposal({
  linkedin,
  about,
  work,
}: {
  linkedin: LinkedinExport;
  about: Record<Locale, string[]>;
  work: WorkLike[];
}): Proposal {
  const paragraphs = splitParagraphs(linkedin.profile?.summary ?? "");
  const status: Proposal["about"]["status"] =
    paragraphs.length === 0
      ? "no-summary"
      : sameText(paragraphs, about.en)
        ? "identical"
        : "different";

  const matched = new Set<string>();
  const onlyInLinkedin: LinkedinPosition[] = [];
  const periodMismatch: Proposal["work"]["periodMismatch"] = [];
  const titleMismatch: Proposal["work"]["titleMismatch"] = [];

  for (const position of linkedin.positions) {
    const entry = findEntry(position, work, linkedin.positions);

    if (!entry) {
      onlyInLinkedin.push(position);
      continue;
    }

    matched.add(jobKey(entry.company, entry.role));

    if (!sameRole(entry.role, position.title)) {
      titleMismatch.push({
        company: entry.company,
        linkedin: position.title,
        local: entry.role,
      });
    }

    const linkedinPeriod = periodFromDates(position.startedOn, position.finishedOn);
    const localPeriod = parsePeriod(entry.period);

    if (
      linkedinPeriod.start !== localPeriod.start ||
      linkedinPeriod.end !== localPeriod.end
    ) {
      periodMismatch.push({
        company: entry.company,
        role: position.title,
        linkedin: linkedinPeriod,
        local: localPeriod,
      });
    }
  }

  const onlyLocally = work.filter(
    (entry) => !matched.has(jobKey(entry.company, entry.role)),
  );

  return {
    about: {
      status,
      headline: linkedin.profile?.headline ?? null,
      paragraphs,
      current: about,
    },
    work: {
      linkedin: linkedin.positions,
      onlyInLinkedin,
      onlyLocally,
      periodMismatch,
      titleMismatch,
    },
    skills: linkedin.skills,
    projects: linkedin.projects,
  };
}

type Table = { header: string[]; rows: string[][] };

function readTable(raw: string, required: string[][]): Table | null {
  const rows = parseCsv(raw);
  const index = findHeaderRow(rows, required);
  if (index === -1) return null;

  return {
    header: rows[index]!.map(normalizeLabel),
    rows: rows.slice(index + 1),
  };
}

function cell(table: Table, row: string[], aliases: string[]): string | null {
  const column = table.header.findIndex((name) => aliases.includes(name));
  if (column === -1) return null;

  const value = (row[column] ?? "").trim();
  return value === "" ? null : value;
}

function normalizeLabel(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function yearFrom(value: string): number | null {
  const match = value.match(/(?:19|20)\d{2}/);
  return match ? Number(match[0]) : null;
}

function jobKey(company: string, role: string): string {
  return `${company.trim().toLowerCase()}|${role.trim().toLowerCase()}`;
}

/**
 * A single entry per company is matched by company alone: LinkedIn often folds
 * the end client into the title (`… - Client Zumba`) and reports a slightly
 * different wording for the same job. Several entries at one company (a
 * promotion) are matched by title instead.
 */
function findEntry(
  position: LinkedinPosition,
  work: WorkLike[],
  positions: LinkedinPosition[],
): WorkLike | undefined {
  const company = position.company.trim().toLowerCase();
  const sameCompany = work.filter(
    (entry) => entry.company.trim().toLowerCase() === company,
  );
  const sameCompanyPositions = positions.filter(
    (candidate) => candidate.company.trim().toLowerCase() === company,
  );

  if (sameCompany.length === 1 && sameCompanyPositions.length === 1) {
    return sameCompany[0];
  }

  return sameCompany.find((entry) => sameRole(entry.role, position.title));
}

function sameRole(left: string, right: string): boolean {
  return left.trim().toLowerCase() === right.trim().toLowerCase();
}

function sameText(left: string[], right: string[]): boolean {
  return normalizeText(left.join(" ")) === normalizeText(right.join(" "));
}

function normalizeText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function dedupe(values: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const value of values) {
    const key = value.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(value);
  }

  return result;
}
