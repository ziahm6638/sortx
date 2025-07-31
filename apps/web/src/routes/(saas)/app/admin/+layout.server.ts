import type { LayoutServerLoad } from "./$types";
import { UserRoleSchema } from "database";
import type { User } from "$lib/types";
import { error } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ locals }) => {
  const user = locals.user as User;

  if (user?.role !== UserRoleSchema.Values.ADMIN) {
    error(403);
  }
};
