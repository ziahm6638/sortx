<script lang="ts">
  import {
    Select,
    type SelectTriggerEvents,
    type SelectTriggerProps,
  } from "bits-ui";
  import { ChevronsUpDownIcon } from "lucide-svelte";
  import { twMerge } from "tailwind-merge";

  type $$Props = SelectTriggerProps;
  type $$Events = SelectTriggerEvents;

  interface Props {
    class?: $$Props["class"];
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { class: className = undefined, children, ...rest }: Props = $props();
  
</script>

<Select.Trigger
  class={twMerge(
    "border-input ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
    className,
  )}
  {...rest}
  >{@render children?.()}
  <ChevronsUpDownIcon class="h-4 w-4 opacity-50" /></Select.Trigger
>
