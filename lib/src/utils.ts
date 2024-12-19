import { useRGS } from "r18gs";
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
    if (typeof document == "undefined") return { m: SYSTEM, s: DARK };
    const [m, s] = ["m", "sm"].map(dt => document.documentElement.getAttribute("data-" + dt));
    return {
      m: (m ?? SYSTEM) as ColorSchemePreference,
      s: s as ResolvedScheme,
    };
  });
