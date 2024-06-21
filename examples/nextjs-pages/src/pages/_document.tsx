import { Html, Head, Main, NextScript } from "next/document";
import { Core } from "nextjs-darkmode";
import { Layout } from "@repo/shared/dist/server";
import { Header } from "@repo/shared";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Core t="all .5s" />
        <Layout>
          <Header />
          <Main />
        </Layout>
        <NextScript />
      </body>
    </Html>
  );
}
