import { HTMLProps, ReactNode } from "react";
import styles from "./server-target.module.scss";

export interface ServerTargetProps extends HTMLProps<HTMLDivElement> {
	children?: ReactNode;
}

/**
 * 
 *
 * @example
 * ```tsx
 * <ServerTarget />
 * ```
 * 
 * @source - Source code
 */
export const ServerTarget = ({ children, ...props }: ServerTargetProps) => {
  const className = [props.className, styles["server-target"]].filter(Boolean).join(" ");
	return (
		<div {...props} className={className} data-testid="server-target">
			{children}
		</div>
	);
}
