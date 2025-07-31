<script lang="ts">
  import {
    DropdownMenu,
    type DropdownMenuRadioItemEvents,
    type DropdownMenuRadioItemProps,
  } from "bits-ui";
  import { CheckIcon } from "lucide-svelte";
  import { twMerge } from "tailwind-merge";

  type $$Props = DropdownMenuRadioItemProps;
  type $$Events = DropdownMenuRadioItemEvents;
  
  interface Props {
    class?: $$Props["class"];
    value?: string;
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { class: className = "", value = "", children, ...rest }: Props = $props();
</script>

<DropdownMenu.RadioItem
  class={twMerge(
    "focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-2 pl-8 pr-3 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[state=checked]:font-semibold data-[disabled]:opacity-50",
    className,
  )}
  {...rest}
  {value}
>
  <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
    <DropdownMenu.RadioIndicator>
      <CheckIcon className="h-4 w-4" />
    </DropdownMenu.RadioIndicator>
  </span>
  {@render children?.()}
</DropdownMenu.RadioItem>
