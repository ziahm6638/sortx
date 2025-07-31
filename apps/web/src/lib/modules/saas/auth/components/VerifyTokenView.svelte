<!-- @migration-task Error while migrating Svelte code: Can't migrate code with afterUpdate. Please migrate by hand. -->
<script lang="ts">
  import { page } from "$app/state";
  import { apiClient } from "@shared/lib/ApiClient";
  import { Button } from "@ui/components";
  import { LoaderIcon } from "lucide-svelte";
  import { afterUpdate, onMount } from "svelte";

  let loading = true;
  let tokenVerified = false;
  let title = "Invalid token";
  let message =
    "The link is either invalid or expired. Please try to log in again.";

  onMount(async () => {
    const token = page.url.searchParams.get("token");
    if (!token) {
      loading = false;
      return;
    }

    try {
      await apiClient(page).auth.verifyToken.mutate({ token });
      tokenVerified = true;
    } catch (e) {
    } finally {
      loading = false;
    }
  });

  afterUpdate(() => {
    if (tokenVerified) {
      title = "You have been logged in!";
      message =
        "You can close this window and continue in the window you came from.";
    }
  });
</script>

{#if loading}
  <div class="flex items-center justify-center py-8">
    <LoaderIcon class="h-8 w-8 animate-spin" />
  </div>
{:else}
  <div>
    <h1 class="text-3xl font-bold">
      {title}
    </h1>
    <p class="text-muted-foreground mb-4 mt-2">
      {message}
    </p>
    <Button class="w-full" onclick={() => window.close()}
      >Close this window</Button
    >
  </div>
{/if}
