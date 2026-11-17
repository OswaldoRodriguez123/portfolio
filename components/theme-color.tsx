"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

const THEME_COLORS = { light: "#ecede7", dark: "#0e1512" } as const;

/**
 * El sitio aplica el tema con una clase, así que un `theme-color` con media
 * queries de `prefers-color-scheme` se queda desfasado en cuanto el visitante
 * elige el otro tema. Este efecto reescribe el meta con el color del tema
 * resuelto; sin JavaScript queda el claro, que es el que pinta la página.
 */
export function ThemeColor() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]',
    );
    if (!meta) return;

    meta.content =
      resolvedTheme === "dark" ? THEME_COLORS.dark : THEME_COLORS.light;
  }, [resolvedTheme]);

  return null;
}
