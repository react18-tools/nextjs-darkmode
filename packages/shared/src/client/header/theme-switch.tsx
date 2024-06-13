"use client";

import { useMode } from "nextjs-darkmode/hooks";
import styles from "./header.module.scss";

import { Switch } from "nextjs-darkmode/switch";

/** This is a wrapper around `nextjs-darkmode's ColorSwitch component to improve mobile view. */
export default function ThemeSwitch() {
  const { mode } = useMode();

  return (
    <Switch className={styles.themeswitch}>
      <span className="mb" suppressHydrationWarning>
        {mode}
      </span>
    </Switch>
  );
}
