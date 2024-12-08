import React from "react";
import "./styles.css";
import { LandingPage, Layout } from "@repo/shared/dist/server";
import { Header } from "@repo/shared";
import { Core } from "nextjs-darkmode";

/** Vite App */
function App() {
  return (
    <Layout>
      <Core />
      <Header />
      <LandingPage title="Vite Example" />
    </Layout>
  );
}

export default App;
