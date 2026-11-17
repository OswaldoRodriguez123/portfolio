import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 360, height: 800 } });

const paths = ["/en", "/en/projects", "/en/projects/psico-yerma"];

test("declara el opt-in a la escala de texto del sistema", async ({ page }) => {
  await page.goto("/en");
  await expect(page.locator('meta[name="text-scale"]')).toHaveAttribute(
    "content",
    "scale",
  );
});

for (const scale of [20, 24, 32]) {
  test(`sin desborde horizontal con raíz de ${scale}px`, async ({ page }) => {
    for (const path of paths) {
      await page.goto(path);
      const result = await page.evaluate((px) => {
        document.documentElement.style.fontSize = `${px}px`;
        const header = document.querySelector("header")!;
        return {
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          headerOverflow: header.scrollWidth > header.clientWidth,
        };
      }, scale);

      expect(
        result.scrollWidth,
        `${path} @ ${scale}px desborda`,
      ).toBeLessThanOrEqual(result.innerWidth);
      expect(
        result.headerOverflow,
        `${path} @ ${scale}px header`,
      ).toBe(false);
    }
  });
}
