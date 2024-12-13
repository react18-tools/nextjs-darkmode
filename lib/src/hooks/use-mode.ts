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
  const [{ m, s }, setState] = useStore();
  /** Set user preference */
  return {
    mode: m,
    systemMode: s,
    resolvedMode: (m === SYSTEM ? s : m) as ResolvedScheme,
    setMode: (m: ColorSchemePreference) => setState({ s, m }),
  };
};
