<script lang="ts">
  import { page } from "$app/state";
  import { apiClient } from "@shared/lib/ApiClient";
  import { Button, Input, toast } from "@ui/components";
  import { logger } from "logs";
  import { Wand2Icon } from "lucide-svelte";
  let topic = $state("");
  let isFetching = $state(false);

  let data: string[] = $state([]);
  async function handleSubmit(
    event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement },
  ) {
    event.preventDefault();
    try {
      isFetching = true;
      data = await apiClient(page).ai.generateProductNames.query({ topic });
    } catch (error) {
      logger.log("error: ", error);
      toast.error("Could not fetch product names. Please try again later.");
    } finally {
      isFetching = false;
    }
  }
</script>

<div>
  <form onsubmit={handleSubmit}>
    <label for="topic" class="mb-2 block font-bold"> Topic </label>
    <Input id="topic" bind:value={topic} />
    <Button class="mt-4 w-full" loading={isFetching}>
      <Wand2Icon className="mr-2 size-4" />
      Generate product names
    </Button>
  </form>

  {#if data.length}
    <div class="mt-8 grid grid-cols-1 gap-2">
      {#each data as name}
        <div class="rounded-md border bg-muted p-4">
          {name}
        </div>
      {/each}
    </div>
  {/if}
</div>
