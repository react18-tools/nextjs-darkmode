import { cookies } from "next/headers";
import { COOKIE_KEY, LIGHT } from "../../constants";
import { HTMLProps } from "react";

export interface ServerTargetProps extends HTMLProps<HTMLHtmlElement | HTMLDivElement> {
  tag?: "html" | "div";
}

/**
 * Server Side target for avoiding flash of un-themed content.
 *
 * @example
 * ```tsx
 * <html>
 *   ...
 *   <body>
 *     <ServerTarget />
 *     ...
 *   </body>
 * </html>
 * ```
 *
 * If you prefer SSR over SSG, you can replace `html` element with `ServerTarget`. This way you can avoid having to write sybling selectors.
 *
 * @example
 * ```tsx
 * <ServerTarget tag="html">
 *     ...
 * </ServerTarget>
 * ```
 *
 * @param tag - Tag to use for the target. Defaults to `div`.
 * ```
 *
 * @source - Source code
 */
export const ServerTarget = ({ tag: Tag = "div", ...props }: ServerTargetProps) => {
  const rm = cookies().get(COOKIE_KEY)?.value ?? LIGHT;
  // @ts-expect-error -- too complex types
  return <Tag className={rm} data-rm={rm} data-ndm="ndm" data-testid="server-target" {...props} />;
};
