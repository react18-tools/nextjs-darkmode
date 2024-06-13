import { vi } from "vitest";

const mediaListeners: (() => void)[] = [];
// mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: query.includes(window.media),
    media: query,
    onchange: () => mediaListeners.forEach(listener => listener()),
    addEventListener: (listener: () => void) => mediaListeners.push(listener),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

declare global {
  interface Window {
    media: "dark" | "light";
  }
  // skipcq: JS-0102
  var cookies: Record<string, { value: string }>; // eslint-disable-line no-var -- let is not supported in defining global due to block scope
}
Object.defineProperty(window, "media", {
  writable: true,
  value: "dark",
});

globalThis.cookies = {};

vi.mock("next/headers", () => ({
  cookies: () => ({ get: (cookieName: string) => globalThis.cookies[cookieName] }),
}));
