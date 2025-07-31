<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { page } from "$app/state";
  import ActionBlock from "$lib/modules/saas/shared/components/ActionBlock.svelte";
  import { apiClient } from "@shared/lib/ApiClient";
  import { Input, toast } from "@ui/components";

  interface Props {
    initialValue?: string;
  }

  let { initialValue }: Props = $props();

  let name = $state(initialValue);
  let isSubmitting = $state(false);

  async function onSubmit() {
    try {
      isSubmitting = true;
      await apiClient(page).auth.update.mutate({ name });
      await invalidateAll();
      toast.success("Your name has been updated.");
      isSubmitting = false;
    } catch (error) {
      toast.error("Could not update your name. Please try again later.");
      isSubmitting = false;
    }
  }
</script>

<ActionBlock
  title="Your name"
  {onSubmit}
  {isSubmitting}
  isSubmitDisabled={!name || name.length < 3 || name === initialValue}
>
  <Input type="text" class="max-w-sm" bind:value={name} />
</ActionBlock>
