import { expect, test } from "@playwright/test";

test("balancea los titulares y aplica pretty a la prosa", async ({ page }) => {
  await page.goto("/en");

  const heading = page.getByRole("heading", { level: 1 });
  await expect(heading).toHaveCSS("text-wrap", "balance");

  const paragraph = page.locator("main p").first();
  await expect(paragraph).toHaveCSS("text-wrap", "pretty");
});
