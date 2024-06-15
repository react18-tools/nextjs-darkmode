import { ColorSchemePreference, ResolvedScheme } from "../../utils";

declare global {
  var u: (mode: ColorSchemePreference, systemMode: ResolvedScheme) => void;
  var m: MediaQueryList;
}
export const s = (storageKey: string) => {
  const [SYSTEM, DARK] = ["system", "dark"] as const;
  u = (mode: ColorSchemePreference, systemMode: ResolvedScheme) => {
    const resolvedMode = mode === SYSTEM ? systemMode : mode;
    const el = document.documentElement;
    if (resolvedMode === DARK) el.classList.add(DARK);
    else el.classList.remove(DARK);
    [
      ["sm", systemMode],
      ["rm", resolvedMode],
      ["m", mode],
    ].forEach(([dataLabel, value]) => el.setAttribute(`data-${dataLabel}`, value));
    // System mode is decided by current system state and need not be stored in localStorage
    localStorage.setItem(storageKey, mode);
  };
  m = matchMedia(`(prefers-color-scheme: ${DARK})`);
  u((localStorage.getItem(storageKey) ?? SYSTEM) as ColorSchemePreference, m.matches ? DARK : "");
};
