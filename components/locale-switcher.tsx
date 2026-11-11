"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchTo = (nextLocale: "en" | "es") => {
    if (nextLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div role="group" aria-label="Language / Idioma">
      {(["en", "es"] as const).map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={locale === option}
          disabled={isPending}
          onClick={() => switchTo(option)}
          className={cn(
            "rounded px-2 py-1 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2",
            locale === option
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
