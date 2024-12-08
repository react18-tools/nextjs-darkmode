import { LandingPage } from "@repo/shared/dist/server";
import { Demo } from "@repo/shared";

export const metadata = {
  title: "Nextjs Darkmode",
};

/** next.js landing page */
export default function Page() {
  return (
    <LandingPage title="Next.js Example">
      <Demo />
    </LandingPage>
  );
}
