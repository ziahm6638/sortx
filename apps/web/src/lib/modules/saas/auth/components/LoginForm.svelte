<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { appConfig } from "$lib/config";
  import SigninModeSwitch from "$lib/modules/saas/auth/components/SigninModeSwitch.svelte";
  import { apiClient } from "@shared/lib/ApiClient";
  import { Alert, Button, Input } from "@ui/components";
  import FormLabel from "@ui/components/Form/FormLabel.svelte";
  import { AlertTriangleIcon } from "lucide-svelte";
  import { onMount } from "svelte";
  import SocialSigninButton from "./SocialSigninButton.svelte";
  import TeamInvitationInfo from "./TeamInvitationInfo.svelte";

  let searchParams: URLSearchParams = new URLSearchParams();
  let email = $state("");
  let invitationCode = $state("");
  let redirectTo = "";

  onMount(() => {
    searchParams = new URLSearchParams(page.url.searchParams);
    email = searchParams.get("email") || "";
    invitationCode = searchParams.get("invitationCode") || "";
    redirectTo = invitationCode
      ? `/team/invitation?code=${encodeURIComponent(invitationCode)}`
      : (searchParams.get("redirectTo") ?? "/app");
  });

  let signinMode = $state("magic-link");
  let password = $state("");
  let serverError: { title: string; message: string } | undefined =
    $state(undefined);

  let isSubmitting = $state(false);

  function changeSigninMode(value: string | undefined) {
    signinMode = value ?? "magic-link";
    serverError = undefined;
  }

  async function handleSubmit(
    event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement },
  ) {
    event.preventDefault();
    try {
      isSubmitting = true;
      if (signinMode === "password") {
        await apiClient(page).auth.loginWithPassword.mutate({
          email,
          password,
        });
        window.location.href = new URL(
          redirectTo,
          window.location.origin,
        ).toString();
      } else {
        await apiClient(page).auth.loginWithEmail.mutate({
          email,
          callbackUrl: new URL(
            "/auth/verify",
            window.location.origin,
          ).toString(),
        });

        const redirectSearchParams = new URLSearchParams();
        redirectSearchParams.set("type", "LOGIN");
        redirectSearchParams.set("redirectTo", redirectTo);
        if (invitationCode)
          redirectSearchParams.set("invitationCode", invitationCode);
        if (email) redirectSearchParams.set("identifier", email);
        goto(`/auth/otp?${redirectSearchParams.toString()}`);
      }
    } catch (e) {
      serverError = {
        title: "Invalid credentials",
        message:
          "The email or password you entered are invalid. Please try again.",
      };
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div>
  <h1 class="text-3xl font-extrabold">Welcome back</h1>
  <p class="text-muted-foreground mb-6 mt-4">
    Please enter your credentials to sign in.
  </p>

  {#if invitationCode}
    <TeamInvitationInfo class="mb-6" />
  {/if}

  <div class="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
    {#each appConfig.auth.oAuthProviders as provider}
      <SocialSigninButton {provider} />
    {/each}
  </div>

  <hr class="my-8" />

  <form class="space-y-6" onsubmit={handleSubmit}>
    <SigninModeSwitch
      class="w-full"
      activeMode={signinMode}
      onChange={changeSigninMode}
    />

    {#if serverError !== undefined}
      <Alert variant="error">
        <AlertTriangleIcon className="size-6" />
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
        error={serverError !== undefined}
        for="email"
        class="mb-1 block font-semibold">Email</FormLabel
      >
      <Input type="email" bind:value={email} required autocomplete="email" />
    </div>

    {#if signinMode === "password"}
      <div>
        <FormLabel
          error={serverError !== undefined}
          for="password"
          class="mb-1 block font-semibold">Password</FormLabel
        >
        <Input
          type="password"
          bind:value={password}
          required
          autocomplete="current-password"
        />
        <div class="mt-1 text-right text-sm">
          <a href="/auth/forgot-password"> Forgot password? </a>
        </div>
      </div>
    {/if}

    <Button class="w-full" type="submit" loading={isSubmitting}>
      {#if signinMode === "password"}
        Sign in
      {:else}
        Send magic link
      {/if}
    </Button>

    <div>
      <span class="text-muted-foreground"> Don't have an account yet? </span>
      <a
        href={`/auth/signup${
          invitationCode
            ? `?invitationCode=${encodeURIComponent(invitationCode)}&email=${encodeURIComponent(email)}`
            : ""
        }`}
      >
        Create an account &rarr;
      </a>
    </div>
  </form>
</div>
