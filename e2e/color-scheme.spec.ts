import { expect, test } from "@playwright/test";

test("declara que el documento soporta ambos esquemas", async ({ page }) => {
  await page.goto("/en");

  await expect(page.locator('meta[name="color-scheme"]')).toHaveAttribute(
    "content",
    "light dark",
  );
});

test("el theme-color sigue al tema elegido, no solo al del sistema", async ({
  page,
}) => {
  await page.goto("/en");

  const meta = page.locator('meta[name="theme-color"]');
  await expect(meta).toHaveCount(1);
  await expect(meta).toHaveAttribute("content", "#ecede7");

  await page.getByRole("button", { name: /switch to dark theme/i }).click();
  await expect(meta).toHaveAttribute("content", "#0e1512");

  await page.getByRole("button", { name: /switch to light theme/i }).click();
  await expect(meta).toHaveAttribute("content", "#ecede7");
});

test.describe("sin JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("el root ya declara ambos esquemas antes de hidratar", async ({ page }) => {
    await page.goto("/en");
    const scheme = await page.evaluate(
      () => getComputedStyle(document.documentElement).colorScheme,
    );
    expect(scheme).toBe("light dark");
  });
});
