import type { RoleOption } from "$lib/types";

export const CURRENT_TEAM_ID_COOKIE_NAME = "current-team-id";

export const roleOptions: RoleOption[] = [
  {
    label: "Member",
    value: "MEMBER",
  },
  {
    label: "Owner",
    value: "OWNER",
  },
];
