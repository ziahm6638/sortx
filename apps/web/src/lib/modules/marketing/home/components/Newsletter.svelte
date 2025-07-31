<script lang="ts">
  import { page } from "$app/state";
  import { apiClient } from "@shared/lib/ApiClient";
  import { Alert, Button, Input, toast } from "@ui/components";
  import { CheckCircleIcon, KeyIcon } from "lucide-svelte";

  let email = $state("");
  let isSubmitSuccessful = $state(false);
  let isSubmitting = $state(false);
  async function onSubmit(
    event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement },
  ) {
    event.preventDefault();
    try {
      isSubmitting = true;
      await apiClient(page).newsletter.signup.mutate({ email });
      isSubmitSuccessful = true;
    } catch (error) {
      toast.error("Could not subscribe. Please try again.");
    } finally {
      isSubmitting = false;
    }
  }
</script>

<section class="py-24">
  <div class="container">
    <div class="mb-12 text-center">
      <KeyIcon class="mx-auto mb-3 size-12 text-primary" />
      <h1 class="text-3xl font-bold lg:text-4xl">Get early access</h1>
      <p class="mt-3 text-lg opacity-70">
        Be among the first to get access to supastarter.SvelteKit.
      </p>
    </div>

    <div class="mx-auto max-w-lg">
      {#if isSubmitSuccessful}
        <Alert variant="success">
          <CheckCircleIcon class="size-4" />
          {#snippet title()}
            Subscribed
          {/snippet}
          {#snippet description()}
            Thank you for subscribing to our newsletter. We will keep you
            posted.
          {/snippet}
        </Alert>
      {:else}
        <form onsubmit={onSubmit}>
          <div class="flex items-start">
            <Input
              type="email"
              required
              placeholder="Email"
              bind:value={email}
            />
            <Button type="submit" loading={isSubmitting} class="ml-4"
              >Subscribe</Button
            >
          </div>
        </form>
      {/if}
    </div>
  </div>
</section>
