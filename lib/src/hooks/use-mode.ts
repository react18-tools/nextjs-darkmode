import { ColorSchemePreference, ResolvedScheme, useStore } from "../utils";

export interface UseModeYeild {
  mode: ColorSchemePreference;
  systemMode: ResolvedScheme;
  resolvedMode: ResolvedScheme;
  setMode: (mode: ColorSchemePreference) => void;
}

/**
 *
 *
 * @example
 * ```tsx
 * const [] = useMode(options);
 * ```
 *
 * @source - Source code
 */
export const useMode = (): UseModeYeild => {
  const [{ mode, systemMode }, setState] = useStore();
  const setMode = (mode: ColorSchemePreference) => {
    setState(prev => ({ ...prev, mode }));
  };
  return {
    mode,
    systemMode,
    resolvedMode: mode === "system" ? systemMode : mode, // resolvedMode is the actual mode that will be used
    setMode,
  };
};
