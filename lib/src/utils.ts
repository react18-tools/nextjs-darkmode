import useRGS from "r18gs";

export type ColorSchemePreference = "system" | "dark" | "light";
export type ResolvedScheme = "dark" | "light";
export const modes: ColorSchemePreference[] = ["system", "dark", "light"];
export interface Store {
  mode: ColorSchemePreference;
  systemMode: ResolvedScheme;
}

const DEFAULT_STORE_VAL: Store = {
  mode: "system",
  systemMode: "dark",
};

export const useStore = () => useRGS<Store>("ndm", DEFAULT_STORE_VAL);
