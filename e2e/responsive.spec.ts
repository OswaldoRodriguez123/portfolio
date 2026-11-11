import { expect, test } from "@playwright/test";

test("no hay scroll horizontal a 360px", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  for (const path of ["/es", "/es/projects", "/es/projects/psico-yerma"]) {
    await page.goto(path);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(overflow, path).toBe(false);
  }
});
