import { modes, useStore } from "../../utils";
import { useEffect } from "react";

export interface CoreProps {
  /** force apply CSS transition property to all the elements during theme switching. E.g., `all .3s` */
  t?: string;
}

const key = "gx";
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

    setThemeState(state => ({ ...state, ...parseState(localStorage.getItem(key)) }));
    /** Sync the tabs */
    const storageListener = (e: StorageEvent): void => {
      if (e.key === key) setThemeState(state => ({ ...state, ...parseState(e.newValue) }));
    };
    addEventListener("storage", storageListener);
    return () => {
      media.removeEventListener("change", updateSystemColorScheme);
      removeEventListener("storage", storageListener);
    };
  }, []);

  useEffect(() => {
    const documentEl = document.documentElement;
    const clsList = documentEl.classList;
    modes.forEach(mode => clsList.remove(mode));
    clsList.add(resolvedMode);
    [
      ["sm", systemMode],
      ["rm", resolvedMode],
      ["m", mode],
    ].forEach(([dataLabel, value]) => documentEl.setAttribute(`data-${dataLabel}`, value));
    localStorage.setItem(key, JSON.stringify({ mode, systemMode }));
  }, [resolvedMode]);

  return null;
};
