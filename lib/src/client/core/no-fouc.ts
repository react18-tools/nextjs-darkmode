import { ColorSchemePreference, ResolvedScheme } from "../../utils";

declare global {
  // skipcq: JS-0102, JS-C1002, JS-0239
  var u: (mode: ColorSchemePreference, systemMode: ResolvedScheme) => void;
  // skipcq: JS-0102, JS-C1002, JS-0239
  var q: MediaQueryList;
}

/** function to be injected in script tag for avoiding FOUC */
export const noFOUCScript = (storageKey: string, themeTransition: string, nonce: string) => {
  const [SYSTEM, DARK] = ["system", "dark"] as const;
  window.u = (mode: ColorSchemePreference, systemMode: ResolvedScheme) => {
    const resolvedMode = mode === SYSTEM ? systemMode : mode;
    const doc = document;
    const el = document.documentElement;
    const css = doc.createElement("style");
    /** split by ';' to prevent CSS injection */
    css.textContent = `*,*:after,*:before{transition:${themeTransition.split(";")[0]} !important;}`;
    css.setAttribute("nonce", nonce);
    doc.head.appendChild(css);

    if (resolvedMode === DARK) el.classList.add(DARK);
    else el.classList.remove(DARK);
    [
      ["sm", systemMode],
      ["rm", resolvedMode],
      ["m", mode],
    ].forEach(([dataLabel, value]) => el.setAttribute(`data-${dataLabel}`, value));
    // System mode is decided by current system state and need not be stored in localStorage
    localStorage.setItem(storageKey, mode);

    // Force restyle
    getComputedStyle(doc.body);
    // Wait for next tick before removing
    setTimeout(() => doc.head.removeChild(css), 1);
  };
  window.q = matchMedia(`(prefers-color-scheme: ${DARK})`);
  u((localStorage.getItem(storageKey) ?? SYSTEM) as ColorSchemePreference, q.matches ? DARK : "");
};
