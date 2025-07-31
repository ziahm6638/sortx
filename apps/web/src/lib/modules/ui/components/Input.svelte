<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import { twMerge } from "tailwind-merge";

  type $$Props = HTMLInputAttributes;
  interface Props {
    class?: $$Props["class"];
    value?: $$Props["value"];
    [key: string]: any;
  }

  let {
    class: className = undefined,
    value = $bindable(undefined),
    ...rest
  }: Props = $props();
</script>

<input
  class={twMerge(
    "border-input placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:border-primary flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
    className,
  )}
  bind:value
  {...rest}
/>
