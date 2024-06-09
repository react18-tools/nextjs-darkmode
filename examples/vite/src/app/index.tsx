import React from "react";
import "./styles.css";
import { LandingPage, Layout } from "@repo/shared/dist/server";
import { Core } from "nextjs-darkmode";

/** Vite App */
function App(): JSX.Element {
  return (
    <Layout>
      <Core />
      <LandingPage title="Vite Example" />
    </Layout>
  );
}

export default App;
