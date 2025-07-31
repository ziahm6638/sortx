import { preprocessMeltUI, sequence } from "@melt-ui/pp";
import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
  extensions: [".md", ".mdx"],
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".md"],
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: sequence([
    vitePreprocess(),
    preprocessMeltUI(),
    mdsvex(mdsvexOptions),
  ]),

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter({
      runtime: "nodejs20.x",
    }),
    alias: {
      "@analytics": "./src/lib/modules/analytics",
      "@marketing/*": "./src/lib/modules/marketing/*",
      "@saas/*": "./src/lib/modules/saas/*",
      "@ui/*": "./src/lib/modules/ui/*",
      "@i18n": "./src/lib/modules/i18n",
      "@shared/*": "./src/lib/modules/shared/*",
    },
  },
};

export default config;
