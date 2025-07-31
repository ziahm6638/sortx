import { CURRENT_TEAM_ID_COOKIE_NAME } from "$lib/modules/saas/shared/constants";
import type { User } from "$lib/types";
import { redirect } from "@sveltejs/kit";
import { UserRoleSchema } from "database";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, cookies, request }) => {
  const user = locals.user as User;
  const currentTeamId = cookies.get(CURRENT_TEAM_ID_COOKIE_NAME);

  if (!locals.session || user === null) {
    redirect(307, "/auth/login");
  }

  if (!user.onboardingComplete) {
    redirect(307, "/app/onboarding");
  }

  const teamMemberships = user.teamMemberships ?? [];
  if (!teamMemberships.length) {
    redirect(307, "/app/onboarding");
  }

  const currentTeamMembership =
    teamMemberships.find(
      (membership) => membership.team.id === currentTeamId,
    ) ?? teamMemberships[0];

  if (!currentTeamMembership) {
    redirect(302, "/");
  }

  const teams = teamMemberships?.map((membership) => membership.team);

  return {
    user: locals.user as User,
    isAdmin: user.role === UserRoleSchema.Values.ADMIN,
    teamMembership: currentTeamMembership,
    teams,
  };
};
