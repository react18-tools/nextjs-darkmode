import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Core } from "nextjs-darkmode";
import { Layout } from "@repo/shared/dist/server";
import { Header } from "@repo/shared";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Core t="all .5s" />
      <Layout>
        <Header />
        <Component {...pageProps} />;
      </Layout>
    </>
  );
}
