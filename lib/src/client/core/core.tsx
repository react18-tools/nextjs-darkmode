import { COOKIE_KEY, DARK, LIGHT, MAX_AGE, SYSTEM, modes } from "../../constants";
import { ColorSchemePreference, ResolvedScheme, Store, useStore } from "../../utils";
import { useEffect } from "react";

const useEffectMinify = useEffect;
export interface CoreProps {
  /** force apply CSS transition property to all the elements during theme switching. E.g., `all .3s` */
  t?: string;
}

const parseState = (state: string | null) => {
  if (state) {
    const [m, s] = state.split(",") as [ColorSchemePreference, ResolvedScheme];
    return { m, s };
  }
  return {
    m: SYSTEM,
    s: LIGHT as ResolvedScheme,
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

    setThemeState(state => ({ ...state, ...parseState(localStorage.getItem(COOKIE_KEY)) }));
    /** Sync the tabs */
    const storageListener = (e: StorageEvent): void => {
      if (e.key === COOKIE_KEY) setThemeState(state => ({ ...state, ...parseState(e.newValue) }));
    };
    addEventListener("storage", storageListener);
  }, []);

  useEffectMinify(() => {
    const documentMinify = document;
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
    localStorage.setItem(COOKIE_KEY, `${mode},${systemMode}`);
    documentMinify.cookie = `${COOKIE_KEY}=${resolvedMode};max-age=${MAX_AGE};SameSite=Strict;`;
  }, [resolvedMode, systemMode, mode]);

  return null;
};
