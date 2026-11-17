import { expect, test } from "@playwright/test";

test("declara los esquemas de color y el theme-color de cada tema", async ({
  page,
}) => {
  await page.goto("/en");

  await expect(page.locator('meta[name="color-scheme"]')).toHaveAttribute(
    "content",
    "light dark",
  );

  const themeColors = page.locator('meta[name="theme-color"]');
  await expect(themeColors).toHaveCount(2);
  await expect(page.locator('meta[name="theme-color"][media*="light"]')).toHaveAttribute(
    "content",
    "#ecede7",
  );
  await expect(page.locator('meta[name="theme-color"][media*="dark"]')).toHaveAttribute(
    "content",
    "#0e1512",
  );
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
