import { type MetaTagsProps } from "svelte-meta-tags";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.user;
  const pageMetaTags: MetaTagsProps = {
    title: "Set up your account",
  };

  return {
    pageMetaTags,
    user,
  };
};
