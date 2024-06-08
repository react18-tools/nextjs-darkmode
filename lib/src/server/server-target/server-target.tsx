import { cookies } from "next/headers";
import { COOKIE_KEY } from "../../key.const";

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
  const rm = cookies().get(COOKIE_KEY)?.value ?? "light";
  return <div className={rm} data-rm={rm} data-ndm="ndm" data-testid="server-target" />;
};
