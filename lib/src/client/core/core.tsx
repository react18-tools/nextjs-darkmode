import { DARK, LIGHT } from "../../constants";
import { ColorSchemePreference, ResolvedScheme, useStore } from "../../utils";
import { memo, useEffect } from "react";
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
const Script = memo(
  ({ n, k }: ScriptProps) => (
    <script
      suppressHydrationWarning
      // skipcq: JS-0440
      dangerouslySetInnerHTML={{ __html: `(${noFOUCScript.toString()})('${k}')` }}
      nonce={n}
    />
  ),
  () => true,
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
  const css = document.createElement("style");
  /** split by ';' to prevent CSS injection */
  css.textContent = `*,*:after,*:before{transition:${themeTransition.split(";")[0]} !important;}`;
  nonce && css.setAttribute("nonce", nonce);
  document.head.appendChild(css);

  return () => {
    // Force restyle
    getComputedStyle(document.body);
    // Wait for next tick before removing
    setTimeout(() => document.head.removeChild(css), 1);
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
  // handle client side exceptions when script is not run. <- for client side apps like vite or CRA
  if (typeof window !== "undefined" && !window.m) noFOUCScript(k);

  const [{ m: mode, s: systemMode }, setThemeState] = useStore();

  useEffect(() => {
    // store global functions to local variables to avoid any interference
    [media, updateDOM] = [m, u];
    /** Updating media: prefers-color-scheme*/
    media.addEventListener("change", () =>
      setThemeState(state => ({ ...state, s: media.matches ? DARK : LIGHT })),
    );
    /** Sync the tabs */
    addEventListener("storage", (e: StorageEvent): void => {
      e.key === k && setThemeState(state => ({ ...state, m: e.newValue as ColorSchemePreference }));
    });
  }, []);

  useEffect(() => {
    const restoreTransitions = modifyTransition(t, nonce);
    updateDOM(mode, systemMode);
    restoreTransitions();
  }, [systemMode, mode, t, nonce]);

  return <Script {...{ n: nonce, k }} />;
};
