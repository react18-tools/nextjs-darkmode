import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Core } from "nextjs-darkmode";
import { Layout } from "@repo/shared/dist/server";
import { Header } from "@repo/shared";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

/** Default app */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Core t="all .5s" />
      <Layout className={inter.className}>
        <Header />
        <Component {...pageProps} />;
      </Layout>
    </>
  );
}
