<script lang="ts">
  import {
    DropdownMenu,
    type DropdownMenuItemProps,
    type DropdownMenuItemEvents,
  } from "bits-ui";
  import { twMerge } from "tailwind-merge";

  type $$Props = DropdownMenuItemProps & {
    inset: boolean;
  };
  type $$Events = DropdownMenuItemEvents;
  interface Props {
    inset?: $$Props["inset"];
    class?: $$Props["class"];
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { inset = false, class: className = "", children, ...rest }: Props = $props();
  
</script>

<DropdownMenu.Item
  class={twMerge(
    "focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm px-3 py-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    inset ? "pl-8" : "",
    className,
  )}
  on:click
  {...rest}
>
  {@render children?.()}
</DropdownMenu.Item>
