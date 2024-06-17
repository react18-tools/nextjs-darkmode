import useRGS from "r18gs";
import { DARK, SYSTEM } from "./constants";

export type ColorSchemePreference = "system" | "dark" | "";
export type ResolvedScheme = "dark" | "";
export interface Store {
  m: ColorSchemePreference;
  s: ResolvedScheme;
}

/** local abstaction of RGS to avoid multiple imports */
export const useStore = () =>
  useRGS<Store>("ndm", () => {
    if (typeof document === "undefined") return { m: SYSTEM, s: DARK };
    const el = document.documentElement;
    return {
      m: (el.getAttribute("data-m") ?? SYSTEM) as ColorSchemePreference,
      s: (el.getAttribute("data-sm") ?? DARK) as ResolvedScheme,
    };
  });
