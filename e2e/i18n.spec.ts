import { expect, test } from "@playwright/test";

test("/ redirige a /en", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);
});

test("/en muestra el rol en el hero", async ({ page }) => {
  await page.goto("/en");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /AI and full-stack engineer/i,
  );
});

test("/es muestra el copy en español", async ({ page }) => {
  await page.goto("/es");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /Ingeniero de IA/i,
  );
  await expect(page.getByText(/construyo productos con IA/i)).toBeVisible();
});
