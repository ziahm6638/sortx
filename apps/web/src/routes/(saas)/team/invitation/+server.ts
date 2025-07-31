import { redirect } from "@sveltejs/kit";
import { createApiCaller } from "api/trpc/caller";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({
  url,
  cookies,
  request,
  setHeaders,
}) => {
  setHeaders({
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    Pragma: "no-cache",
    Expires: "0",
    "Surrogate-Control": "no-store",
  });

  const code = url.searchParams.get("code");

  if (!code) {
    return redirect(300, "/");
  }

  const apiCaller = await createApiCaller({ cookies, request });

  const invitation = await apiCaller.team.invitationById({
    id: code,
  });

  if (!invitation) {
    return redirect(300, "/");
  }

  const user = await apiCaller.auth.user();

  if (!user) {
    return redirect(
      301,
      `/auth/login?invitationCode=${invitation.id}&email=${encodeURIComponent(
        invitation.email,
      )}`,
    );
  }

  const team = await apiCaller.team.acceptInvitation({
    id: code,
  });

  if (!team) {
    return redirect(300, "/");
  }

  return redirect(302, `/app/dashboard`);
};
