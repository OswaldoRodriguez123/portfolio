import { expect, test, type Page } from "@playwright/test";

test.use({ viewport: { width: 360, height: 800 } });

function menu(page: Page) {
  return page.getByRole("navigation", { name: /^(menu|menú)$/i });
}

// El toggle de tema nace `disabled` y se habilita cuando next-themes monta:
// es la señal de que React ya hidrató y los handlers de click escuchan.
async function gotoHydrated(page: Page) {
  await page.goto("/en");
  await expect(
    page.getByRole("button", { name: /switch to (dark|light) theme/i }),
  ).toBeEnabled();
}

test("abre el menú y lo cierra con Escape devolviendo el foco al botón", async ({
  page,
}) => {
  await gotoHydrated(page);

  const trigger = page.getByRole("button", { name: /^(menu|open menu)$/i });
  await trigger.click();
  await expect(menu(page)).toBeVisible();

  const toggle = page.locator("header button[popovertarget]");
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(toggle).toHaveAccessibleName(/close menu/i);

  await page.keyboard.press("Escape");
  await expect(menu(page)).toBeHidden();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();
});

test("cierra al tocar fuera del panel", async ({ page }) => {
  await gotoHydrated(page);

  await page.getByRole("button", { name: /^(menu|open menu)$/i }).click();
  await expect(menu(page)).toBeVisible();

  await page.locator("main").click({ position: { x: 8, y: 8 } });
  await expect(menu(page)).toBeHidden();
});

test("cierra al activar un enlace", async ({ page }) => {
  await gotoHydrated(page);

  await page.getByRole("button", { name: /^(menu|open menu)$/i }).click();
  await expect(menu(page)).toBeVisible();

  await menu(page).getByRole("link", { name: /^work$/i }).click();
  await expect(menu(page)).toBeHidden();
});
