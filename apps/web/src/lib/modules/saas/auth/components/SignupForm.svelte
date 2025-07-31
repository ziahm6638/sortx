<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { apiClient } from "@shared/lib/ApiClient";
  import {
    Alert,
    Button,
    FormLabel,
    Input,
    PasswordInput,
  } from "@ui/components";
  import { AlertTriangleIcon } from "lucide-svelte";
  import { onMount } from "svelte";
  import TeamInvitationInfo from "./TeamInvitationInfo.svelte";

  let email = $state("");
  let password = $state("");
  let invitationCode = $state("");
  let redirectTo = "";
  let searchParams: URLSearchParams = new URLSearchParams();
  onMount(() => {
    searchParams = page.url.searchParams;
    email = searchParams.get("email") || "";
    invitationCode = searchParams.get("invitationCode") || "";
    redirectTo = invitationCode
      ? `/team/invitation?code=${invitationCode}`
      : (searchParams.get("redirectTo") ?? "/app");
  });

  let isSubmitting = $state(false);

  let serverError: { title: string; message: string } | undefined =
    $state(undefined);
  async function handleSubmit(
    event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement },
  ) {
    event.preventDefault();
    try {
      serverError = undefined;
      isSubmitting = true;
      await apiClient(page).auth.signup.mutate({
        email,
        password,
        callbackUrl: new URL("/auth/verify", window.location.origin).toString(),
      });

      const redirectSearchParams = new URLSearchParams();
      redirectSearchParams.set("type", "SIGNUP");
      redirectSearchParams.set("redirectTo", redirectTo);
      if (invitationCode)
        redirectSearchParams.set("invitationCode", invitationCode);
      if (email) redirectSearchParams.set("identifier", email);
      goto(`/auth/otp?${redirectSearchParams.toString()}`);
    } catch (error) {
      serverError = {
        title: "Could not create account",
        message:
          "We are sorry, but we were unable to create your account. Please try again later.",
      };
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div>
  <h1 class="text-3xl font-bold">Get started in 2 minutes</h1>
  <p class="text-muted-foreground mb-6 mt-2">
    Join 500+ UK property professionals streamlining their repairs.
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
      <FormLabel
        error={serverError != undefined}
        for="email"
        class="mb-1 block font-semibold"
      >
        Email *
      </FormLabel>
      <Input type="email" required autocomplete="email" bind:value={email} />
    </div>

    <div>
      <FormLabel
        error={serverError !== undefined}
        for="password"
        class="mb-1 block font-semibold"
      >
        Password *
      </FormLabel>
      <PasswordInput name="password" bind:value={password} />
      <small class="italic opacity-50">
        Please enter at least 8 characters.
      </small>
    </div>

    <Button loading={isSubmitting}>Create account &rarr;</Button>

    <div>
      <span class="text-muted-foreground"> Already have an account? </span>
      <a
        href={`/auth/login${
          invitationCode
            ? `?invitationCode=${invitationCode}&email=${email}`
            : ""
        }`}
      >
        Sign in &rarr;
      </a>
    </div>
  </form>
</div>
