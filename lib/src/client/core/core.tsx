import { COOKIE_KEY, DARK, LIGHT, MEDIA, SYSTEM, modes } from "../../constants";
import { ColorSchemePreference, Store, useStore } from "../../utils";
import { useEffect } from "react";
import { s } from "./script";

export interface CoreProps {
  /** force apply CSS transition property to all the elements during theme switching. E.g., `all .3s` */
  t?: string;
  /** The nonce value for your Content Security Policy. */
  nonce?: string;
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
export const Core = ({ t, nonce }: CoreProps) => {
  const [{ m: mode, s: systemMode }, setThemeState] = useStore();

  useEffect(() => {
    const media = matchMedia(MEDIA);
    /** Updating media: prefers-color-scheme*/
    const updateSystemColorScheme = () =>
      setThemeState(state => ({ ...state, s: media.matches ? DARK : LIGHT }) as Store);
    media.addEventListener("change", updateSystemColorScheme);
    /** Sync the tabs */
    const storageListener = (e: StorageEvent): void => {
      if (e.key === COOKIE_KEY)
        setThemeState(state => ({ ...state, m: e.newValue as ColorSchemePreference }));
    };
    addEventListener("storage", storageListener);
  }, []);

  useEffect(() => {
    const restoreTransitions = modifyTransition(t, nonce);
    u(mode, systemMode);
    restoreTransitions();
  }, [systemMode, mode, t, nonce]);

  return <script dangerouslySetInnerHTML={{ __html: `(${s.toString()})('${COOKIE_KEY}')` }} />;
};
