import { useStore } from "../../utils";
import { useEffect } from "react";

export interface CoreProps {
  /** force apply CSS transition property to all the elements during theme switching. E.g., `all .3s` */
  t?: string;
}

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
    const updateSystemColorScheme = () => {
      setThemeState(state => ({ ...state, systemMode: media.matches ? "dark" : "light" }));
    };
    updateSystemColorScheme();
    media.addEventListener("change", updateSystemColorScheme);
    return () => {
      media.removeEventListener("change", updateSystemColorScheme);
    };
  }, []);
  return null;
};
