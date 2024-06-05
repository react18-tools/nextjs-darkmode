"use client";

import { useMode } from "nextjs-darkmode/dist/hooks";
import styles from "./header.module.scss";
import { KeyboardEvent, useCallback } from "react";
import { ColorSchemePreference } from "nextjs-darkmode/dist/utils";
import { Switch } from "nextjs-darkmode";

const modes: ColorSchemePreference[] = ["dark", "light", "system"];

/** This is a wrapper around `nextjs-themes's ColorSwitch component to improve mobile view. */
export default function ThemeSwitch() {
  const { mode, setMode } = useMode();
  const toggle = useCallback(() => {
    const index = modes.indexOf(mode);
    setMode(modes[(index + 1) % modes.length]);
  }, [mode]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter") toggle();
    },
    [toggle],
  );
  return (
    <div
      tabIndex={0}
      role="button"
      className={styles.themeswitch}
      onClick={toggle}
      onKeyDown={onKeyDown}>
      <Switch />
      <span className="mb">{mode}</span>
    </div>
  );
}
