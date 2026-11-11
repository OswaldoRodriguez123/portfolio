import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
import { createElement, type ReactNode } from "react";

vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, children, ...props }: { href: string; children: ReactNode }) =>
    createElement("a", { href, ...props }, children),
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  redirect: vi.fn(),
  getPathname: vi.fn(),
}));
