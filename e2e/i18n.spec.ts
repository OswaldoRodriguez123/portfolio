import { expect, test } from "@playwright/test";

test("/ redirige a /en", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);
});

test("/es muestra el copy en español", async ({ page }) => {
  await page.goto("/es");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /oswaldo/i,
  );
  await expect(page.getByText(/construyo productos con ia/i)).toBeVisible();
});
