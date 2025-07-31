<script lang="ts">
  import { page } from "$app/stores";
  import TeamInvitationInfo from "$lib/modules/saas/auth/components/TeamInvitationInfo.svelte";
  import { apiClient } from "@shared/lib/ApiClient";
  import { Alert, Button, Input } from "@ui/components";
  import { AlertTriangleIcon } from "lucide-svelte";
  import { onMount } from "svelte";

  let searchParams: URLSearchParams = new URLSearchParams();
  let code = $state("");
  let invitationCode: string | null = $state(null);
  let identifier: string;
  let isSubmitting = false;
  let redirectTo = "";
  let serverError: { title: string; message: string } | null = $state(null);
  let type: "SIGNUP" | "LOGIN" | "PASSWORD_RESET";
  onMount(() => {
    searchParams = $page.url.searchParams;
    invitationCode = searchParams.get("invitationCode");
    identifier = searchParams.get("identifier") || "";
    type = searchParams.get("type") as "SIGNUP" | "LOGIN" | "PASSWORD_RESET";
    redirectTo = invitationCode
      ? `/team/invitation?code=${invitationCode}`
      : (searchParams.get("redirectTo") ?? "/app");
  });

  async function handleSubmit(
    event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement },
  ) {
    event.preventDefault();
    try {
      await apiClient($page).auth.verifyOtp.mutate({ code, type, identifier });
      window.location.href = new URL(
        redirectTo,
        window.location.origin,
      ).toString();
    } catch (e) {
      serverError = {
        title: "Invalid one time password",
        message:
          "We are sorry, the password you entered is invalid. Please try again.",
      };
    }
  }
</script>

<div>
  <h1 class="text-3xl font-bold">Verify your email</h1>
  <p class="text-muted-foreground mb-6 mt-2">
    You have mail! Please check your inbox for the one time password we sent
    you. You can also click the link in the email and this page will redirect
    you automatically.
  </p>

  {#if invitationCode}
    <TeamInvitationInfo class="mb-6" />
  {/if}

  <form class="flex flex-col items-stretch gap-6" onsubmit={handleSubmit}>
    {#if serverError}
      <Alert variant="error">
        <AlertTriangleIcon class="h-4 w-4" />
        {#snippet title()}
          {serverError.title}
        {/snippet}
        {#snippet description()}
          {serverError.message}
        {/snippet}
      </Alert>
    {/if}

    <div>
      <label for="name" class="text-sm font-medium leading-none">
        One time password
      </label>
      <Input type="text" required autocomplete="off" bind:value={code} />
    </div>

    <Button loading={isSubmitting}>Continue &rarr;</Button>
  </form>
</div>
