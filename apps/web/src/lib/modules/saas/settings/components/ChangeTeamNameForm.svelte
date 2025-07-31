<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { page } from "$app/state";
  import ActionBlock from "$lib/modules/saas/shared/components/ActionBlock.svelte";
  import type { TeamMembership } from "$lib/types";
  import { apiClient } from "@shared/lib/ApiClient";
  import { Input, toast } from "@ui/components";

  interface Props {
    teamMembership: TeamMembership;
  }

  let { teamMembership }: Props = $props();

  let name = $state(teamMembership?.team.name || "");
  let isSubmitting = $state(false);

  async function onSubmit() {
    try {
      isSubmitting = true;
      await apiClient(page).team.update.mutate({
        id: teamMembership.team.id,
        name,
      });
      await invalidateAll();
      toast.success("Your team name has been updated.");
      isSubmitting = false;
    } catch (error) {
      toast.error(
        "We were unable to update your team name. Please try again later.",
      );
      isSubmitting = false;
    }
  }
</script>

<ActionBlock
  title="Team name"
  {onSubmit}
  {isSubmitting}
  isSubmitDisabled={!name || name === teamMembership?.team.name}
>
  <Input
    class="max-w-sm"
    bind:value={name}
    disabled={teamMembership?.role !== "OWNER"}
  />
</ActionBlock>
