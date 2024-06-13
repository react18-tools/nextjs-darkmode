import useRGS from "r18gs";
import { COOKIE_KEY, DARK, LIGHT, MEDIA, SYSTEM } from "./constants";

export type ColorSchemePreference = "system" | "dark" | "light";
export type ResolvedScheme = "dark" | "light";
export interface Store {
  m: ColorSchemePreference;
  s: ResolvedScheme;
}

const DEFAULT_STORE_VAL: Store = {
  m: SYSTEM,
  s: DARK as ResolvedScheme,
};

/** local abstaction of RGS to avoid multiple imports */
export const useStore = () =>
  useRGS<Store>("ndm", () =>
    typeof localStorage === "undefined"
      ? DEFAULT_STORE_VAL
      : {
          m: (localStorage.getItem(COOKIE_KEY) ?? SYSTEM) as ColorSchemePreference,
          s: (matchMedia(MEDIA).matches ? DARK : LIGHT) as ResolvedScheme,
        },
  );
