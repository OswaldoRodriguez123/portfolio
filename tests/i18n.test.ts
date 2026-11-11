import { describe, expect, it } from "vitest";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

type Entry = [key: string, value: unknown];

function entries(obj: Record<string, unknown>, prefix = ""): Entry[] {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === "object" && !Array.isArray(v)
      ? entries(v as Record<string, unknown>, `${prefix}${k}.`)
      : [[`${prefix}${k}`, v] as Entry],
  );
}

describe("messages", () => {
  it("en y es tienen exactamente las mismas claves", () => {
    expect(entries(es).map(([k]) => k).sort()).toEqual(
      entries(en).map(([k]) => k).sort(),
    );
  });

  it("ningún valor de texto está vacío", () => {
    for (const locale of [en, es]) {
      for (const [key, value] of entries(locale)) {
        if (typeof value === "string") {
          expect(value.trim(), key).not.toBe("");
        }
      }
    }
  });
});
