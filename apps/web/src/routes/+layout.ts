import type { MetaTagsProps } from "svelte-meta-tags";

export const load = () => {
  const baseMetaTags: MetaTagsProps = {
    titleTemplate: "%s | supastarter.sveltekit - Application",
  };

  return {
    baseMetaTags,
  };
};
