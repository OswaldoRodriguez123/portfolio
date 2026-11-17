import { expect, test } from "@playwright/test";

test("ancla el header y dispara una vista de transición al navegar", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const w = window as unknown as { __vt: number };
    w.__vt = 0;
    const original = document.startViewTransition?.bind(document);
    if (original) {
      document.startViewTransition = ((callback: () => void) => {
        w.__vt += 1;
        return original(callback);
      }) as typeof document.startViewTransition;
    }
  });

  await page.goto("/en");
  await expect(page.locator("header")).toHaveCSS(
    "view-transition-name",
    "site-header",
  );
  // El toggle de tema nace deshabilitado y se habilita al hidratar: sin esto
  // el click puede ser una navegación completa y no una transición de React.
  await expect(
    page.getByRole("button", { name: /switch to (dark|light) theme/i }),
  ).toBeEnabled();

  await page.locator('a[href="/en/projects/psico-yerma"]').first().click();
  await page.waitForURL(/\/projects\/psico-yerma/);

  expect(
    await page.evaluate(() => (window as unknown as { __vt: number }).__vt),
  ).toBeGreaterThan(0);
});
