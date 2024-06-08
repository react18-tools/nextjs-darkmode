import { COOKIE_KEY } from "../../key.const";
import { modes, useStore } from "../../utils";
import { useEffect } from "react";

export interface CoreProps {
  /** force apply CSS transition property to all the elements during theme switching. E.g., `all .3s` */
  t?: string;
}

const parseState = (state: string | null) =>
  state ? JSON.parse(state) : { mode: "light", systemMode: "light" };

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
  const [{ mode, systemMode }, setThemeState] = useStore();
  const resolvedMode = mode === "system" ? systemMode : mode; // resolvedMode is the actual mode that will be used

  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    /** Updating media: prefers-color-scheme*/
    const updateSystemColorScheme = () => {
      setThemeState(state => ({ ...state, systemMode: media.matches ? "dark" : "light" }));
    };
    updateSystemColorScheme();
    media.addEventListener("change", updateSystemColorScheme);

    setThemeState(state => ({ ...state, ...parseState(localStorage.getItem(COOKIE_KEY)) }));
    /** Sync the tabs */
    const storageListener = (e: StorageEvent): void => {
      if (e.key === COOKIE_KEY) setThemeState(state => ({ ...state, ...parseState(e.newValue) }));
    };
    addEventListener("storage", storageListener);
    return () => {
      media.removeEventListener("change", updateSystemColorScheme);
      removeEventListener("storage", storageListener);
    };
  }, []);

  useEffect(() => {
    const documentEl = document.documentElement;
    [documentEl, document.querySelector("[data-ndm='ndm']")].forEach(el => {
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
    localStorage.setItem(COOKIE_KEY, JSON.stringify({ mode, systemMode }));
    document.cookie = `${COOKIE_KEY}=${resolvedMode}; max-age=31536000; SameSite=Strict;`;
  }, [resolvedMode, systemMode, mode]);

  return null;
};
