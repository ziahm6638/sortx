<script lang="ts">
  import {
    DropdownMenu,
    type DropdownMenuCheckboxItemEvents,
    type DropdownMenuCheckboxItemProps,
  } from "bits-ui";
  import { CheckIcon } from "lucide-svelte";
  import { twMerge } from "tailwind-merge";

  type $$Props = DropdownMenuCheckboxItemProps;
  type $$Events = DropdownMenuCheckboxItemEvents;
  interface Props {
    checked?: $$Props["checked"];
    class?: $$Props["class"];
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { checked = false, class: className = undefined, children, ...rest }: Props = $props();
  
</script>

<DropdownMenu.CheckboxItem
  {checked}
  class={twMerge(
    "focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-3 pl-8 pr-3 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    className,
  )}
  {...rest}
>
  <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
    <DropdownMenu.CheckboxIndicator>
      <CheckIcon class="h-4 w-4" />
    </DropdownMenu.CheckboxIndicator>
  </span>
  {@render children?.()}
</DropdownMenu.CheckboxItem>
