<script lang="ts">
  import ActionBlock from "$lib/modules/saas/shared/components/ActionBlock.svelte";
  import { PasswordInput, toast } from "@ui/components";
  import { apiClient } from "@shared/lib/ApiClient";
  import { page } from "$app/state";

  let password = $state("");
  let isSubmitting = $state(false);

  async function onSubmit() {
    try {
      isSubmitting = true;
      await apiClient(page).auth.changePassword.mutate({ password });
      toast.success("Your password has been updated.");
      isSubmitting = false;
    } catch (error) {
      toast.error("We were unable to update your password. Please try again.");
      isSubmitting = false;
    }
  }
</script>

<ActionBlock
  title="Your password"
  {onSubmit}
  {isSubmitting}
  isSubmitDisabled={!password || password.length < 8}
>
  <PasswordInput class="max-w-sm" bind:value={password} />
</ActionBlock>
