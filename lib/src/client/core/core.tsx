import { HTMLProps, ReactNode } from "react";
import styles from "./core.module.scss";

export interface CoreProps extends HTMLProps<HTMLDivElement> {
	children?: ReactNode;
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
export const Core = ({ children, ...props }: CoreProps) => {
  const className = [props.className, styles["core"]].filter(Boolean).join(" ");
	return (
		<div {...props} className={className} data-testid="core">
			{children}
		</div>
	);
}
