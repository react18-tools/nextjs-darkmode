import { useState } from "react";

export interface UseModeOptions {
  /** this is a dummy option */
  dummy?: string;
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

export const useMode = (options?: UseModeOptions) => {
  const [value, setValue] = useState(0);
  return {
    value, setValue
  }
}