import baseConfig from "tailwind-config";
import { Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */
const config: Config = {
  presets: [baseConfig],
  content: ["./src/**/*.{html,js,svelte,ts}"],
};

export default config;
