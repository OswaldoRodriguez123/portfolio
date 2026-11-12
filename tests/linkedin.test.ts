import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  buildProposal,
  findHeaderRow,
  parseCsv,
  parseLinkedinExport,
  parsePeriod,
  periodFromDates,
  splitParagraphs,
  type LinkedinExport,
} from "@/lib/linkedin";

/** Headers mirror the real export; the people and jobs in them are invented. */
const fixture = (name: string) =>
  readFileSync(
    path.join(process.cwd(), "tests", "fixtures", "linkedin", name),
    "utf8",
  );

const exportFiles = {
  profile: fixture("Profile.csv"),
  positions: fixture("Positions.csv"),
  skills: fixture("Skills.csv"),
  projects: fixture("Projects.csv"),
};

describe("parseCsv", () => {
  it("lee una fila por línea y separa por comas", () => {
    expect(parseCsv("a,b\n1,2\n")).toEqual([
      ["a", "b"],
      ["1", "2"],
    ]);
  });

  it("respeta las comas dentro de comillas", () => {
    expect(parseCsv('Name\n"Python, pandas"\n')).toEqual([
      ["Name"],
      ["Python, pandas"],
    ]);
  });

  it("respeta los saltos de línea dentro de comillas", () => {
    expect(parseCsv('a,b\n"uno\ndos",3\n')).toEqual([
      ["a", "b"],
      ["uno\ndos", "3"],
    ]);
  });

  it("desescapa las comillas dobles", () => {
    expect(parseCsv('a\n"dice ""hola"""\n')).toEqual([["a"], ['dice "hola"']]);
  });

  it("tolera CRLF y el BOM que mete Excel", () => {
    expect(parseCsv("\uFEFFa,b\r\n1,2\r\n")).toEqual([
      ["a", "b"],
      ["1", "2"],
    ]);
  });

  it("no inventa una fila vacía al final", () => {
    expect(parseCsv("a\n1\n\n")).toEqual([["a"], ["1"]]);
  });

  it("devuelve una lista vacía si no hay nada", () => {
    expect(parseCsv("")).toEqual([]);
  });
});

describe("findHeaderRow", () => {
  it("encuentra la cabecera después del preámbulo de notas", () => {
    const rows = parseCsv(
      'Notes:\n"When exporting, keep this file."\n\nName\nTypeScript\n',
    );

    expect(findHeaderRow(rows, [["name"]])).toBe(2);
  });

  it("devuelve -1 si falta una columna obligatoria", () => {
    expect(findHeaderRow(parseCsv("a,b\n1,2\n"), [["company name"]])).toBe(-1);
  });
});

describe("parseLinkedinExport", () => {
  const parsed = parseLinkedinExport(exportFiles);

  it("lee headline y summary del perfil", () => {
    expect(parsed.profile?.headline).toBe("Software Engineer | TypeScript | React");
    expect(parsed.profile?.summary).toContain('I say "ship it" often.');
  });

  it("lee las posiciones y deja la fecha final vacía como null", () => {
    expect(parsed.positions).toHaveLength(2);
    expect(parsed.positions[0]).toEqual({
      company: "Acme Corp",
      title: "Software Engineer",
      description: "Built things, fixed things.  Shipped a thing.",
      location: "Santiago",
      startedOn: "Jan 2023",
      finishedOn: null,
    });
    expect(parsed.positions[1]?.finishedOn).toBe("Dec 2021");
  });

  it("lee las skills en orden y sin duplicados", () => {
    expect(parsed.skills).toEqual(["TypeScript", "Node.js", "Python, pandas"]);
  });

  it("lee los proyectos con su URL", () => {
    expect(parsed.projects).toEqual([
      {
        title: "Portfolio",
        description: "Bilingual site, static",
        url: "https://example.com/portfolio",
        startedOn: "2026",
        finishedOn: null,
      },
    ]);
  });

  it("acepta los nombres de columna de exports antiguos", () => {
    const parsed = parseLinkedinExport({
      skills: "Skill Name\nTypeScript\n",
      positions:
        "Company Name,Description,Location,Start Date,End Date,Title\nAcme,Did things,Remote,2019,2021,Engineer\n",
    });

    expect(parsed.skills).toEqual(["TypeScript"]);
    expect(parsed.positions[0]).toMatchObject({
      company: "Acme",
      title: "Engineer",
      startedOn: "2019",
      finishedOn: "2021",
    });
  });

  it("no falla si falta un archivo", () => {
    const parsed = parseLinkedinExport({ profile: exportFiles.profile });

    expect(parsed.profile?.firstName).toBe("Jane");
    expect(parsed.positions).toEqual([]);
    expect(parsed.skills).toEqual([]);
    expect(parsed.projects).toEqual([]);
  });
});

describe("splitParagraphs", () => {
  it("separa párrafos por dobles espacios, como exporta LinkedIn", () => {
    expect(splitParagraphs("Uno.  Dos.  Tres.")).toEqual(["Uno.", "Dos.", "Tres."]);
  });

  it("junta las viñetas con el párrafo que las introduce", () => {
    expect(splitParagraphs("Mis skills:  •	TypeScript •	Testing  Fin.")).toEqual([
      "Mis skills:\n• TypeScript\n• Testing",
      "Fin.",
    ]);
  });

  it("respeta los párrafos separados por línea en blanco", () => {
    expect(splitParagraphs("Uno.\n\nDos.")).toEqual(["Uno.", "Dos."]);
  });

  it("recorta espacios sobrantes", () => {
    expect(splitParagraphs("  Uno.  ")).toEqual(["Uno."]);
  });
});

describe("periodFromDates / parsePeriod", () => {
  it("una fecha final vacía significa 'actual'", () => {
    expect(periodFromDates("Aug 2023", null)).toEqual({ start: 2023, end: null });
  });

  it("extrae los años de las fechas del export", () => {
    expect(periodFromDates("Sep 2021", "Aug 2023")).toEqual({ start: 2021, end: 2023 });
  });

  it("lee el periodo local con guion largo", () => {
    expect(parsePeriod("2023 — Present")).toEqual({ start: 2023, end: null });
    expect(parsePeriod("2019 — Dec 2021")).toEqual({ start: 2019, end: 2021 });
  });
});

describe("buildProposal", () => {
  const linkedin = parseLinkedinExport(exportFiles);

  const current = {
    about: {
      en: ["Old about paragraph."],
      es: ["Párrafo viejo."],
    },
    work: [
      // Same job as LinkedIn, different start year and lowercase role:
      // matched case-insensitively, flagged as a period mismatch.
      { company: "Acme Corp", role: "Software engineer", period: "2022 — Present" },
      // Not on LinkedIn at all.
      { company: "Zumba", role: "Software engineer", period: "2024 — Present" },
    ],
  };

  const proposal = buildProposal({ linkedin, ...current });

  it("propone el about como párrafos separados", () => {
    expect(proposal.about.paragraphs).toHaveLength(4);
    expect(proposal.about.paragraphs[0]).toBe("Hi! I build web apps end to end.");
    expect(proposal.about.paragraphs[2]).toBe("My top skills are:\n• TypeScript\n• Testing");
  });

  it("marca el about como distinto y conserva el texto actual bilingüe", () => {
    expect(proposal.about.status).toBe("different");
    expect(proposal.about.current.en).toEqual(["Old about paragraph."]);
    expect(proposal.about.current.es).toEqual(["Párrafo viejo."]);
  });

  it("dice 'identical' cuando el texto ya coincide", () => {
    const same: LinkedinExport = {
      profile: { headline: "", summary: "Hola.", firstName: null, lastName: null, geoLocation: null },
      positions: [],
      skills: [],
      projects: [],
    };

    const result = buildProposal({
      linkedin: same,
      about: { en: ["Hola."], es: ["Hola."] },
      work: [],
    });

    expect(result.about.status).toBe("identical");
  });

  it("dice 'no-summary' si el export no trae resumen", () => {
    const empty: LinkedinExport = {
      profile: null,
      positions: [],
      skills: [],
      projects: [],
    };

    const result = buildProposal({ linkedin: empty, about: current.about, work: [] });

    expect(result.about.status).toBe("no-summary");
    expect(result.about.paragraphs).toEqual([]);
  });

  it("encuentra posiciones que solo están en LinkedIn", () => {
    expect(proposal.work.onlyInLinkedin.map((position) => position.company)).toEqual([
      "Globex",
    ]);
  });

  it("encuentra trabajos locales que no están en LinkedIn", () => {
    expect(proposal.work.onlyLocally.map((entry) => entry.company)).toEqual(["Zumba"]);
  });

  it("avisa cuando el periodo no coincide aunque el puesto sí", () => {
    expect(proposal.work.periodMismatch).toEqual([
      {
        company: "Acme Corp",
        role: "Software Engineer",
        linkedin: { start: 2023, end: null },
        local: { start: 2022, end: null },
      },
    ]);
  });

  it("no marca nada cuando puesto y periodo coinciden", () => {
    const result = buildProposal({
      linkedin: parseLinkedinExport({
        positions:
          "Company Name,Title,Started On,Finished On\nAcme Corp,Software Engineer,Jan 2023,\n",
      }),
      about: current.about,
      work: [
        { company: "Acme Corp", role: "Software Engineer", period: "2023 — Present" },
      ],
    });

    expect(result.work.periodMismatch).toEqual([]);
    expect(result.work.onlyInLinkedin).toEqual([]);
    expect(result.work.onlyLocally).toEqual([]);
  });

  it("empareja por empresa cuando el título de LinkedIn incluye el cliente", () => {
    const result = buildProposal({
      linkedin: parseLinkedinExport({
        positions:
          "Company Name,Title,Started On,Finished On\nParetisa,Software Engineer Consultant - Client Zumba,Aug 2023,\n",
      }),
      about: current.about,
      work: [
        {
          company: "Paretisa",
          role: "Software Engineer Consultant",
          period: "2023 — Present",
        },
      ],
    });

    expect(result.work.onlyInLinkedin).toEqual([]);
    expect(result.work.onlyLocally).toEqual([]);
    expect(result.work.periodMismatch).toEqual([]);
    expect(result.work.titleMismatch).toEqual([
      {
        company: "Paretisa",
        linkedin: "Software Engineer Consultant - Client Zumba",
        local: "Software Engineer Consultant",
      },
    ]);
  });

  it("con dos puestos en la misma empresa empareja por título", () => {
    const result = buildProposal({
      linkedin: parseLinkedinExport({
        positions:
          "Company Name,Title,Started On,Finished On\nAcme,Engineer,2015,2019\nAcme,Senior Engineer,2019,2023\n",
      }),
      about: current.about,
      work: [{ company: "Acme", role: "Senior Engineer", period: "2019 — 2023" }],
    });

    expect(result.work.onlyInLinkedin.map((position) => position.title)).toEqual([
      "Engineer",
    ]);
    expect(result.work.onlyLocally).toEqual([]);
    expect(result.work.titleMismatch).toEqual([]);
  });

  it("incluye skills y proyectos tal como vienen del export", () => {
    expect(proposal.skills).toEqual(["TypeScript", "Node.js", "Python, pandas"]);
    expect(proposal.projects[0]?.title).toBe("Portfolio");
  });
});
