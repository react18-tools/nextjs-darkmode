import { COOKIE_KEY, DARK, LIGHT, MAX_AGE, SYSTEM, modes } from "../../constants";
import { ColorSchemePreference, Store, useStore } from "../../utils";
import { useEffect } from "react";

const useEffectMinify = useEffect;
export interface CoreProps {
  /** force apply CSS transition property to all the elements during theme switching. E.g., `all .3s` */
  t?: string;
}

const modifyTransition = (documentMinify: Document, themeTransition = "none") => {
  const css = documentMinify.createElement("style");
  /** split by ';' to prevent CSS injection */
  const transition = `transition: ${themeTransition.split(";")[0]} !important;`;
  css.appendChild(
    documentMinify.createTextNode(
      `*{-webkit-${transition}-moz-${transition}-o-${transition}-ms-${transition}${transition}}`,
    ),
  );
  documentMinify.head.appendChild(css);

  return () => {
    // Force restyle
    getComputedStyle(documentMinify.body);
    // Wait for next tick before removing
    setTimeout(() => {
      documentMinify.head.removeChild(css);
    }, 1);
  };
};

/**
 *
 *
 * @example
 * ```tsx
 * <Core />
 * ```
 *
 * @source - Source code
 */
export const Core = ({ t }: CoreProps) => {
  const [{ m: mode, s: systemMode }, setThemeState] = useStore();
  const resolvedMode = mode === SYSTEM ? systemMode : mode; // resolvedMode is the actual mode that will be used

  useEffectMinify(() => {
    const media = matchMedia(`(prefers-color-scheme: ${DARK})`);
    /** Updating media: prefers-color-scheme*/
    const updateSystemColorScheme = () =>
      setThemeState(state => ({ ...state, s: media.matches ? DARK : LIGHT }) as Store);
    updateSystemColorScheme();
    media.addEventListener("change", updateSystemColorScheme);

    setThemeState(state => ({
      ...state,
      m: (localStorage.getItem(COOKIE_KEY) ?? SYSTEM) as ColorSchemePreference,
    }));
    /** Sync the tabs */
    const storageListener = (e: StorageEvent): void => {
      if (e.key === COOKIE_KEY)
        setThemeState(state => ({ ...state, m: e.newValue as ColorSchemePreference }));
    };
    addEventListener("storage", storageListener);
  }, []);

  useEffectMinify(() => {
    const documentMinify = document;
    const restoreTransitions = modifyTransition(documentMinify, t);
    [documentMinify.documentElement, documentMinify.querySelector("[data-ndm]")].forEach(el => {
      if (!el) return;
      const clsList = el.classList;
      modes.forEach(mode => clsList.remove(mode));
      clsList.add(resolvedMode);
      [
        ["sm", systemMode],
        ["rm", resolvedMode],
        ["m", mode],
      ].forEach(([dataLabel, value]) => el.setAttribute(`data-${dataLabel}`, value));
    });
    restoreTransitions();
    // System mode is decided by current system state and need not be stored in localStorage
    localStorage.setItem(COOKIE_KEY, mode);
    documentMinify.cookie = `${COOKIE_KEY}=${resolvedMode};max-age=${MAX_AGE};SameSite=Strict;`;
  }, [resolvedMode, systemMode, mode]);

  return null;
};
