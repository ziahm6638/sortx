import { getContext, setContext } from "svelte";

export type Theme = "light" | "dark" | "system" | undefined;

export class ThemeState {
  theme: Theme = $state(undefined);

  constructor(theme: Theme) {
    this.theme = theme;
  }

  setTheme(theme: Theme) {
    this.theme = theme;
  }

  getTheme() {
    return this.theme;
  }
}

const THEME_KEY = Symbol("theme");

export function setThemeState(theme: Theme) {
  setContext(THEME_KEY, new ThemeState(theme));
}

export function getThemeState() {
  return getContext<ThemeState>(THEME_KEY);
}
