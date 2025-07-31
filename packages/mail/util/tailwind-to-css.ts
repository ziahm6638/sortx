import { tailwindToCSS } from "tw-to-css";
import { lightVariables } from "tailwind-config";

const { twi } = tailwindToCSS({
  config: {
    theme: {
      extend: {
        colors: {
          border: lightVariables.colors.border,
          input: lightVariables.colors.input,
          ring: lightVariables.colors.ring,
          background: lightVariables.colors.background,
          foreground: lightVariables.colors.foreground,
          primary: {
            DEFAULT: lightVariables.colors.primary,
            foreground: lightVariables.colors["primary-foreground"],
          },
          secondary: {
            DEFAULT: lightVariables.colors.secondary,
            foreground: lightVariables.colors["secondary-foreground"],
          },
          destructive: {
            DEFAULT: lightVariables.colors.destructive,
            foreground: lightVariables.colors["destructive-foreground"],
          },
          success: {
            DEFAULT: lightVariables.colors.success,
            foreground: lightVariables.colors["success-foreground"],
          },
          muted: {
            DEFAULT: lightVariables.colors.muted,
            foreground: lightVariables.colors["muted-foreground"],
          },
          accent: {
            DEFAULT: lightVariables.colors.accent,
            foreground: lightVariables.colors["accent-foreground"],
          },
          popover: {
            DEFAULT: lightVariables.colors.popover,
            foreground: lightVariables.colors["popover-foreground"],
          },
          card: {
            DEFAULT: lightVariables.colors.card,
            foreground: lightVariables.colors["card-foreground"],
          },
        },
      },
    },
  },
});

export { twi };
