import { HTMLProps } from "react";
import styles from "./layout.module.scss";
import { ForkMe } from "@mayank1513/fork-me/server";
import config from "@repo/scripts/rebrand.config.json";

const { owner, repo } = config;

/**
 * # Layout
 * The default layout shared by all examples.
 */
export function Layout({ children, className, ...props }: HTMLProps<HTMLDivElement>) {
  return (
    <div className={[styles.container, className ?? ""].join(" ")} {...props}>
      {children}
      <ForkMe
        gitHubUrl={`https://github.com/${owner}/${repo}`}
        bgColor="var(--text-color)"
        textColor="var(--bg-color)"
      />
      <footer>
        With 💖 by{" "}
        <a href="https://mayank-chaudhari.vercel.app/" target="_blank" rel="noopener noreferrer">
          Mayank Chaudhari
        </a>
      </footer>
    </div>
  );
}
