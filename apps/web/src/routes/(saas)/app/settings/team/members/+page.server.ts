import type { MetaTagsProps } from "svelte-meta-tags";
import { createApiCaller } from "api/trpc/caller";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent, cookies, request }) => {
  const pageMetaTags: MetaTagsProps = {
    title: "Team",
  };
  const parentData = await parent();
  const user = parentData.user;
  const currentTeamMembership = parentData.teamMembership;
  const currentTeamId = currentTeamMembership.team.id;
  const apiCaller = await createApiCaller({ cookies, request });

  const memberships = await apiCaller.team.memberships({
    teamId: currentTeamId,
  });
  const invitations = await apiCaller.team.invitations({
    teamId: currentTeamId,
  });
  return {
    currentTeamMembership,
    pageMetaTags,
    memberships,
    invitations,
    user,
  };
};
