import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Core } from "nextjs-darkmode";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tailwind CSS Example",
  description: "Generated by Mayank <https://github.com/mayank1513>",
};

/** Root layout */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={[inter.className, "bg-white dark:bg-black dark:text-white"].join(" ")}>
        <Core t="background .3s" />
        {children}
      </body>
    </html>
  );
}
