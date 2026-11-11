import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import "../globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { isLocale, routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/seo";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Oswaldo Rodríguez — AI & Full-stack Engineer",
    template: "%s — Oswaldo Rodríguez",
  },
  description: "Portfolio of AI and full-stack projects.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <JsonLd />
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SiteHeader />
            <main id="main" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
