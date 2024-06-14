import useRGS from "r18gs";
import { COOKIE_KEY, DARK, LIGHT, MEDIA, SYSTEM } from "./constants";

export type ColorSchemePreference = "system" | "dark" | "light";
export type ResolvedScheme = "dark" | "light";
export interface Store {
  m: ColorSchemePreference;
  s: ResolvedScheme;
}

/** local abstaction of RGS to avoid multiple imports */
export const useStore = (/** Do not persist */ dp?: boolean) =>
  useRGS<Store>("ndm", () =>
    typeof localStorage === "undefined"
      ? /* v8 ignore next */
        { m: SYSTEM, s: DARK as ResolvedScheme }
      : {
          m: (dp ? SYSTEM : localStorage.getItem(COOKIE_KEY) ?? SYSTEM) as ColorSchemePreference,
          s: (matchMedia(MEDIA).matches ? DARK : LIGHT) as ResolvedScheme,
        },
  );
