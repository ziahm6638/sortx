import type { Cookies, RequestEvent } from "@sveltejs/kit";
import { type inferAsyncReturnType } from "@trpc/server";
import { lucia } from "auth";
import { db } from "database";
import { getSignedUrl } from "storage";
import { defineAbilitiesFor } from "../modules/auth/abilities";

export async function createContext(
  event?:
    | RequestEvent
    | ({ cookies: Cookies; request: Request } | { isAdmin?: boolean }),
) {
  const sessionId =
    event && "cookies" in event
      ? event.cookies.get(lucia.sessionCookieName)
      : null;
  const { user, session } = sessionId
    ? await lucia.validateSession(sessionId)
    : { user: null, session: null };

  const teamMemberships = user
    ? await Promise.all(
      (
        await db.teamMembership.findMany({
          where: {
            userId: user.id,
          },
          include: {
            team: true,
          },
        })
      ).map(async (membership) => ({
        ...membership,
        team: {
          ...membership.team,
          avatarUrl: membership.team.avatarUrl
            ? await getSignedUrl(membership.team.avatarUrl, {
              bucket: "sortx-maintenance-pro",
              expiresIn: 360,
            })
            : null,
        },
      })),
    )
    : null;

  const abilities = defineAbilitiesFor({
    user,
    teamMemberships,
  });

  return {
    user,
    teamMemberships,
    abilities,
    session,
    event: event && "request" in event ? event : undefined,
    isAdmin: event && "isAdmin" in event ? event.isAdmin : false,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
