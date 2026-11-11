import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

export function renderWithIntl(ui: ReactElement, locale: "en" | "es" = "en") {
  return render(
    <NextIntlClientProvider locale={locale} messages={locale === "en" ? en : es}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        {ui}
      </ThemeProvider>
    </NextIntlClientProvider>,
  );
}
