import { SYSTEM } from "../constants";
import { ColorSchemePreference, ResolvedScheme, useStore } from "../utils";

export interface UseModeYeild {
  mode: ColorSchemePreference;
  systemMode: ResolvedScheme;
  resolvedMode: ResolvedScheme;
  setMode: (mode: ColorSchemePreference) => void;
}

/**
 * use this hook to gain access to mode state and setter.
 *
 * @example
 * ```tsx
 * const {resolvedMode, setMode} = useMode(options);
 * ```
 *
 * @source - Source code
 */
export const useMode = (): UseModeYeild => {
  const [{ m: mode, s: systemMode }, setState] = useStore();
  /** Set user preference */
  const setMode = (m: ColorSchemePreference) => {
    setState(prev => ({ ...prev, m }));
  };
  return {
    mode,
    systemMode,
    resolvedMode: (mode === SYSTEM ? systemMode : mode) as ResolvedScheme, // resolvedMode is the actual mode that will be used
    setMode,
  };
};
