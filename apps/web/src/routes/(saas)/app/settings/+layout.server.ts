import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ parent }) => {
  const parentData = await parent();
  return {
    user: parentData.user,
    isAdmin: parentData.isAdmin,
    teamMembership: parentData.teamMembership,
  };
};
