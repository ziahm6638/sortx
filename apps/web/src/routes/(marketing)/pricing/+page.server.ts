import { createApiCaller } from "api/trpc/caller";
import type { MetaTagsProps } from "svelte-meta-tags";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies, request }) => {
  const apiCaller = await createApiCaller({ cookies, request });
  const plans = await apiCaller.billing.plans();
  const pageMetaTags: MetaTagsProps = {
    title: "Pricing",
  };

  return {
    pageMetaTags,
    plans,
  };
};
