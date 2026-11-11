import { expect, test } from "@playwright/test";

test("slug inexistente devuelve 404", async ({ page }) => {
  const res = await page.goto("/en/projects/no-existe");
  expect(res?.status()).toBe(404);
});
