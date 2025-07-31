import type { PageServerLoad } from "./$types";
import type { MetaTagsProps } from "svelte-meta-tags";

export const load: PageServerLoad = async () => {
  const pageMetaTags: MetaTagsProps = {
    title: "Verify your email",
  };
  return {
    pageMetaTags,
  };
};
