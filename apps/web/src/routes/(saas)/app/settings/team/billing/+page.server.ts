import type { MetaTagsProps } from "svelte-meta-tags";
import { createApiCaller } from "api/trpc/caller";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent, cookies, request }) => {
  const apiCaller = await createApiCaller({ cookies, request });
  const pageMetaTags: MetaTagsProps = {
    title: "Team",
  };
  const parentData = await parent();
  const currentTeamMembership = parentData.teamMembership;
  const currentTeamId = currentTeamMembership.team.id;

  const plans = await apiCaller.billing.plans();
  const teamSubscription = await apiCaller.team.subscription({
    teamId: currentTeamId,
  });

  return {
    plans,
    teamSubscription,
    pageMetaTags,
    teamId: currentTeamId,
  };
};
