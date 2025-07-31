import type { MetaTagsProps } from "svelte-meta-tags";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const pageMetaTags: MetaTagsProps = {
    title: "Changelog",
  };
  return {
    pageMetaTags,
  };
};
