<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { apiClient } from "@shared/lib/ApiClient";
  import { Alert, Button, FormLabel, Input } from "@ui/components";
  import { AlertTriangleIcon, SendIcon } from "lucide-svelte";

  let email = $state("");
  let isSubmitting = $state(false);
  let serverError: { title: string; message: string } | undefined =
    $state(undefined);
  async function handleSubmit(
    event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement },
  ) {
    event.preventDefault();
    try {
      isSubmitting = true;
      await apiClient(page).auth.forgotPassword.mutate({
        email,
        callbackUrl: new URL("/auth/verify", window.location.origin).toString(),
      });

      const redirectSearchParams = new URLSearchParams();
      redirectSearchParams.set("type", "PASSWORD_RESET");
      if (email) redirectSearchParams.set("identifier", email);
      redirectSearchParams.set("redirectTo", "/app/settings/account/general");
      goto(`/auth/otp?${redirectSearchParams.toString()}`);
    } catch (error) {
      serverError = {
        title: "Link not sent",
        message:
          "We are sorry, but we were unable to send you a magic link. Please try again later.",
      };
      isSubmitting = false;
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div>
  <h1 class="text-3xl font-extrabold">Forgot your password?</h1>
  <p class="text-muted-foreground mb-6 mt-4">
    Please enter your email address and we will send you a link to reset your
    password.
    <a href="/auth/login"> Back to signin &rarr; </a>
  </p>

  <form class="flex flex-col items-stretch gap-6" onsubmit={handleSubmit}>
    <div>
      <FormLabel
        for="email"
        error={serverError != undefined}
        class="mb-1 block font-semibold">Email</FormLabel
      >
      <Input type="email" bind:value={email} required autocomplete="email" />
    </div>

    {#if serverError !== undefined}
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

    <Button loading={isSubmitting}>
      <SendIcon class="mr-2 h-4 w-4" />{" "}
      Send link
    </Button>
  </form>
</div>
