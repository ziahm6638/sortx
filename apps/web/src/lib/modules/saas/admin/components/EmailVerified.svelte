<script lang="ts">
  import { Tooltip, TooltipContent, TooltipTrigger } from "@ui/components";
  import { CheckIcon, ClockIcon } from "lucide-svelte";
  import { twMerge } from "tailwind-merge";

  interface Props {
    verified: boolean;
    className?: string;
  }

  let { verified, className = "" }: Props = $props();
</script>

<Tooltip>
  <TooltipContent>
    {#if verified}
      Email verified
    {:else}
      Email waiting for verification
    {/if}
  </TooltipContent>
  <TooltipTrigger>
    <div class={twMerge(className)}>
      {#if verified}
        <CheckIcon class="size-3" />
      {:else}
        <ClockIcon class="size-3" />
      {/if}
    </div>
  </TooltipTrigger>
</Tooltip>
