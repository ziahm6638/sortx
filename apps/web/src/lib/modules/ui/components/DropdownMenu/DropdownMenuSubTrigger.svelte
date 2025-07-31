<script lang="ts">
  import {
    DropdownMenu,
    type DropdownMenuSubTriggerEvents,
    type DropdownMenuSubTriggerProps,
  } from "bits-ui";
  import { ChevronRightIcon } from "lucide-svelte";
  import { twMerge } from "tailwind-merge";

  
  type $$Events = DropdownMenuSubTriggerEvents;
  
  interface Props {
    inset: boolean;
    class?: $$Props["class"];
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { inset, class: className = "", children, ...rest }: Props = $props();
</script>

<DropdownMenu.SubTrigger
  class={twMerge(
    "focus:bg-accent data-[state=open]:bg-accent flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm outline-none",
    inset ? "pl-8" : "",
    className,
  )}
  {...rest}
>
  {@render children?.()}
  <ChevronRightIcon class="ml-auto h-4 w-4" />
</DropdownMenu.SubTrigger>
