import useRGS from "r18gs";
import { DARK, SYSTEM } from "./constants";

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

export const useStore = () => useRGS<Store>("ndm", DEFAULT_STORE_VAL);
