import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

const REPO = process.cwd();
const FIXTURES = path.join(REPO, "tests", "fixtures", "linkedin");
const MESSAGES = ["messages/en.json", "messages/es.json"].map((file) =>
  path.join(REPO, file),
);

function run(args: string[]) {
  return spawnSync(
    process.execPath,
    [
      "--disable-warning=MODULE_TYPELESS_PACKAGE_JSON",
      "scripts/linkedin-import.mjs",
      ...args,
    ],
    { cwd: REPO, encoding: "utf8" },
  );
}

function hash(file: string) {
  return createHash("sha256").update(readFileSync(file)).digest("hex");
}

describe("linkedin-import", () => {
  it("lee la carpeta del export y escribe la propuesta", () => {
    const out = path.join(mkdtempSync(path.join(tmpdir(), "linkedin-out-")), "proposal.json");

    const result = run([FIXTURES, "--out", out]);

    expect(result.stderr).toBe("");
    expect(result.status).toBe(0);
    expect(result.stdout).toContain("about: different");

    const proposal = JSON.parse(readFileSync(out, "utf8"));
    expect(proposal.about.paragraphs).toHaveLength(4);
    expect(proposal.about.current.en.length).toBeGreaterThan(0);
    expect(proposal.work.linkedin).toHaveLength(2);
    expect(proposal.skills).toContain("Python, pandas");
  });

  it("no toca los textos del sitio", () => {
    const before = MESSAGES.map(hash);
    const out = path.join(mkdtempSync(path.join(tmpdir(), "linkedin-out-")), "proposal.json");

    run([FIXTURES, "--out", out]);

    expect(MESSAGES.map(hash)).toEqual(before);
    expect(existsSync(out)).toBe(true);
  });

  it("lee el zip del export sin descomprimirlo a mano", () => {
    const dir = mkdtempSync(path.join(tmpdir(), "linkedin-zip-"));
    const zip = path.join(dir, "Basic_LinkedInDataExport.zip");
    const files = ["Profile.csv", "Positions.csv", "Skills.csv", "Projects.csv"].map(
      (name) => path.join(FIXTURES, name),
    );
    execFileSync("zip", ["-q", "-j", zip, ...files]);

    const out = path.join(dir, "proposal.json");
    const result = run([zip, "--out", out]);

    expect(result.status).toBe(0);
    const proposal = JSON.parse(readFileSync(out, "utf8"));
    expect(proposal.about.paragraphs).toHaveLength(4);
  });

  it("explica el error si la ruta no existe", () => {
    const result = run(["/ruta/que-no-existe"]);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("/ruta/que-no-existe");
  });

  it("avisa si el export no trae Profile.csv", () => {
    const dir = mkdtempSync(path.join(tmpdir(), "linkedin-empty-"));

    const result = run([dir]);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("Profile.csv");
  });
});
