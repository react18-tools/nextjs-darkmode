import { DARK, LIGHT } from "../../constants";
import { ColorSchemePreference, ResolvedScheme, useStore } from "../../utils";
import { noFOUCScript } from "./no-fouc";

let media: MediaQueryList,
  updateDOM: (mode: ColorSchemePreference, systemMode: ResolvedScheme) => void;

interface ScriptProps {
  /** nonce */
  n?: string;
  /** storageKey */
  k: string;
}

/** Avoid rerender of script */
const Script = ({ n, k }: ScriptProps) => (
  <script
    suppressHydrationWarning
    // skipcq: JS-0440
    dangerouslySetInnerHTML={{ __html: `(${noFOUCScript.toString()})('${k}')` }}
    nonce={n}
  />
);

export interface CoreProps {
  /** themeTransition: force apply CSS transition property to all the elements during theme switching. E.g., `all .3s`
   * @defaultValue 'none'
   */
  t?: string;
  /** The nonce value for your Content Security Policy. @defaultValue '' */
  nonce?: string;
  /** storageKey @defaultValue 'o' */
  k?: string;
}

/** Modify transition globally to avoid patched transitions */
const modifyTransition = (themeTransition = "none", nonce = "") => {
  const doc = document;
  const css = doc.createElement("style");
  /** split by ';' to prevent CSS injection */
  css.textContent = `*,*:after,*:before{transition:${themeTransition.split(";")[0]} !important;}`;
  css.setAttribute("nonce", nonce);
  doc.head.appendChild(css);

  return () => {
    // Force restyle
    getComputedStyle(doc.body);
    // Wait for next tick before removing
    setTimeout(() => doc.head.removeChild(css), 1);
  };
};

/**
 *  The Core component wich applies classes and transitions.
 * Cookies are set only if corresponding ServerTarget is detected.
 *
 * @example
 * ```tsx
 * <Core [t="background-color .3s"]/>
 * ```
 *
 * @source - Source code
 */
export const Core = ({ t, nonce, k = "o" }: CoreProps) => {
  const isWindowDefined = typeof window != "undefined";
  // handle client side exceptions when script is not run. <- for client side apps like vite or CRA
  if (isWindowDefined && !window.q) noFOUCScript(k);

  const [{ m, s }, setThemeState] = useStore();

  if (!updateDOM && isWindowDefined) {
    // store global functions to local variables to avoid any interference
    [media, updateDOM] = [q, u];
    /** Updating media: prefers-color-scheme*/
    media.addEventListener("change", () =>
      setThemeState(state => ({ ...state, s: media.matches ? DARK : LIGHT })),
    );
    /** Sync the tabs */
    addEventListener("storage", (e: StorageEvent): void => {
      e.key === k && setThemeState(state => ({ ...state, m: e.newValue as ColorSchemePreference }));
    });
  }
  if (updateDOM) {
    const restoreTransitions = modifyTransition(t, nonce);
    updateDOM(m, s);
    restoreTransitions();
  }

  return <Script {...{ n: nonce, k }} />;
};
