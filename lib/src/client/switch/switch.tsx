import { HTMLProps, useCallback } from "react";
import styles from "./switch.module.scss";
import { modes, useStore } from "../../utils";

export interface SwitchProps extends HTMLProps<HTMLElement> {
  /** html tag @defaultValue 'button' */
  tag?: "button" | "div";
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
export const Switch = ({ tag: Tag = "button", size = 24, skipSystem, ...props }: SwitchProps) => {
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
  return (
    <Tag
      {...props}
      className={className}
      // @ts-expect-error -> we are setting the CSS variable
      style={{ "--size": `${size}px` }}
      data-testid="switch"
      onClick={handleModeSwitch}
    />
  );
};
