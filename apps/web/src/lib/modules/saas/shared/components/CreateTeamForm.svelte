<script lang="ts">
  import { page } from "$app/state";
  import { apiClient } from "@shared/lib/ApiClient";
  import { Button, Input, toast } from "@ui/components";
  import type { ApiOutput } from "api/trpc/router";

  interface Props {
    onSuccess: (team: ApiOutput["team"]["create"]) => void;
  }

  let { onSuccess }: Props = $props();

  let isSubmitting = $state(false);
  let name = $state("");

  async function handleSubmit(
    event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement },
  ) {
    event.preventDefault();
    isSubmitting = true;
    try {
      const newTeam = await apiClient(page).team.create.mutate({ name });
      toast.success("Your team has been created. You can now invite members.");
      onSuccess(newTeam);
    } catch (error) {
      toast.error(
        "We are sorry, but we were unable to create your team. Please try again later.",
      );
    }
    isSubmitting = false;
  }
</script>

<form onsubmit={handleSubmit}>
  <div>
    <label class="mb-2 block text-sm font-medium" for="team-name">
      Team name
    </label>
    <Input type="text" id="team-name" required bind:value={name} />
  </div>

  <Button class="mt-4 w-full" type="submit" loading={isSubmitting}
    >Create team</Button
  >
</form>
