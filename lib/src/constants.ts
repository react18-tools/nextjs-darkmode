import { ColorSchemePreference } from "./utils";

export const SYSTEM: ColorSchemePreference = "system";
export const DARK: ColorSchemePreference = "dark";
export const LIGHT: ColorSchemePreference = "";

export const COOKIE_KEY = "gx";
export const modes: ColorSchemePreference[] = [SYSTEM, DARK, LIGHT];

export const MEDIA = `(prefers-color-scheme: ${DARK})`;
