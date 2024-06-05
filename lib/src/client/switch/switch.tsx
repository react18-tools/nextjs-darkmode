import { HTMLProps, ReactNode, useCallback } from "react";
import styles from "./switch.module.scss";
import { modes, useStore } from "../../utils";

export interface SwitchProps extends HTMLProps<HTMLDivElement> {
  /** Diameter of the color switch */
  size?: number;
  /** Skip system colorScheme while toggling */
  skipSystem?: boolean;
}

/**
 *
 *
 * @example
 * ```tsx
 * <Switch />
 * ```
 *
 * @source - Source code
 */
export const Switch = ({ size, skipSystem, ...props }: SwitchProps) => {
  const [state, setState] = useStore();
  const handleModeSwitch = useCallback(() => {
    let index = modes.indexOf(state.mode);
    if (skipSystem && index === modes.length - 1) index = 0;
    setState({
      ...state,
      mode: modes[(index + 1) % modes.length],
    });
  }, []);
  const className = [props.className, styles["switch"]].filter(Boolean).join(" ");
  return <div {...props} className={className} data-testid="switch" onClick={handleModeSwitch} />;
};
