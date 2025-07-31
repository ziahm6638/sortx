<script lang="ts">
  import { page } from "$app/state";
  import type { User } from "$lib/types";
  import { apiClient } from "@shared/lib/ApiClient";
  import { Button, FormItem, FormLabel, Input, toast } from "@ui/components";
  import { ArrowLeftIcon, CheckIcon } from "lucide-svelte";

  interface Props {
    onCompleted: () => void;
    onBack: () => void;
    user: User;
  }

  let { onCompleted, onBack, user }: Props = $props();

  let teamName = $state("");
  let isSubmitting = $state(false);

  async function handleSubmit(
    event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement },
  ) {
    event.preventDefault();
    try {
      isSubmitting = true;
      await apiClient(page).team.create.mutate({
        name: teamName,
      });
      onCompleted();
    } catch (error) {
      toast.error(
        "We are sorry, but we were unable to set up your account. Please try again later.",
      );
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div>
  {#if user?.teamMemberships?.length}
    <div class="flex flex-col items-stretch gap-4">
      <h3 class="font-bold text-xl">Join the team</h3>
      <p class="text-muted-foreground">
        You are joining the team <strong
          >{user.teamMemberships[0].team.name}</strong
        >.
      </p>
      <Button type="submit" loading={isSubmitting} onclick={onCompleted}>
        <CheckIcon className="mr-2 size-4" />
        Complete
      </Button>
    </div>
  {:else}
    <h3 class="mb-4 text-xl font-bold">Create a team</h3>
    <form class="flex flex-col items-stretch gap-8" onsubmit={handleSubmit}>
      <FormItem>
        <FormLabel>Team name</FormLabel>
        <Input name="teamName" bind:value={teamName} />
      </FormItem>

      <div class="flex gap-2">
        <Button class="flex-1" type="button" variant="outline" onclick={onBack}>
          <ArrowLeftIcon class="mr-2 size-4" />
          Back
        </Button>
        <Button class="flex-1" type="submit" loading={isSubmitting}>
          <CheckIcon class="mr-2 size-4" />
          Complete
        </Button>
      </div>
    </form>
  {/if}
</div>
