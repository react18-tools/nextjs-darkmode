import { cookies } from "next/headers";
import { COOKIE_KEY, LIGHT } from "../../constants";

/**
 * Server Side target for avoiding flash of un-themed content.
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
 */
export const ServerTarget = () => {
  const rm = cookies().get(COOKIE_KEY)?.value ?? LIGHT;
  return <div className={rm} data-rm={rm} data-ndm="ndm" data-testid="server-target" />;
};
