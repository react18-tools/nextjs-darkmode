import { HTMLProps } from "react";
import styles from "./switch.module.scss";
import { useStore } from "../../utils";
import { modes } from "../../constants";

export interface SwitchProps extends HTMLProps<HTMLButtonElement> {
  /** html tag @defaultValue 'button' */
  tag?: "button" | "div";
  /** Diameter of the color switch */
  size?: number;
  /** Skip system colorScheme while toggling */
  skipSystem?: boolean;
}

/**
 * Switch button to quickly toggle user preference.
 *
 * @example
 * ```tsx
 * <Switch [size={20} skipSystem]/>
 * ```
 *
 * @source - Source code
 */
export const Switch = ({
  tag: Tag = "button",
  size = 24,
  skipSystem,
  children,
  ...tagProps
}: SwitchProps) => {
  const [{ m, s }, setState] = useStore();
  const n = modes.length - (skipSystem ? 1 : 0);
  /** toggle mode */
  tagProps.onClick = () =>
    setState({
      s,
      m: modes[(modes.indexOf(m) + 1) % n],
    });

  const className = styles.switch;
  const style = { "--size": `${size}px` };

  if (!children) {
    tagProps.className += " " + className;
    tagProps.style = { ...tagProps.style, ...style };
  }

  return (
    // @ts-expect-error -- too complex types
    <Tag suppressHydrationWarning {...tagProps} data-testid="switch">
      {/* @ts-expect-error -> we are setting the CSS variable */}
      {children && <div {...{ className, style }} />}
      {children}
    </Tag>
  );
};
