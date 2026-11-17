import { expect, test } from "@playwright/test";

test("solo la primera fila de /en/projects precarga la portada", async ({
  page,
}) => {
  await page.goto("/en/projects");

  const images = page.locator("article img");
  const first = images.first();
  await expect(first).toHaveAttribute("fetchpriority", "high");
  await expect(first).not.toHaveAttribute("loading", "lazy");

  const rest = images.nth(1);
  if ((await rest.count()) > 0) {
    await expect(rest).toHaveAttribute("loading", "lazy");
    await expect(rest).not.toHaveAttribute("fetchpriority", "high");
  }
});

test("la home mantiene todas las portadas diferidas", async ({ page }) => {
  await page.goto("/en");

  const images = page.locator("article img");
  expect(await images.count()).toBeGreaterThan(0);
  for (const image of await images.all()) {
    await expect(image).toHaveAttribute("loading", "lazy");
    await expect(image).not.toHaveAttribute("fetchpriority", "high");
  }
});

test("la fila responde al ancho de su contenedor, no al del viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/en/projects");

  const article = page.locator("article").first();

  const wide = await article.evaluate(
    (el) => getComputedStyle(el).gridTemplateColumns,
  );
  expect(wide.split(" ").length).toBe(3);

  await article.evaluate((el) => {
    (el.parentElement as HTMLElement).style.width = "360px";
  });
  const narrow = await article.evaluate(
    (el) => getComputedStyle(el).gridTemplateColumns,
  );
  expect(narrow.split(" ").length).toBe(1);
});
