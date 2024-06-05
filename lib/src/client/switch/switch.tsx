import { HTMLProps, ReactNode } from "react";
import styles from "./switch.module.scss";

export interface SwitchProps extends HTMLProps<HTMLDivElement> {
	children?: ReactNode;
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
export const Switch = ({ children, ...props }: SwitchProps) => {
  const className = [props.className, styles["switch"]].filter(Boolean).join(" ");
	return (
		<div {...props} className={className} data-testid="switch">
			{children}
		</div>
	);
}
