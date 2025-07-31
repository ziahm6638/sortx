import svg from '@poppanator/sveltekit-svg';
import { sveltekit } from "@sveltejs/kit/vite";
import devtoolsJson from 'vite-plugin-devtools-json';
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [sveltekit(), devtoolsJson(), svg()],
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
  server: {
    fs: {
      allow: ["./content/"],
    },
  },
  build: {
    rollupOptions: {
      external: ["@node-rs/argon2", "@node-rs/bcrypt"],
    },
  },
  envPrefix: "PUBLIC",
});
