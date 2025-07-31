<script lang="ts">
  import { DropdownMenu, type DropdownMenuContentProps } from "bits-ui";
  import { twMerge } from "tailwind-merge";

  type $$Props = DropdownMenuContentProps;
  
  interface Props {
    class?: $$Props["class"];
    sideOffset?: number;
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { class: className = "", sideOffset = 4, children, ...rest }: Props = $props();
</script>

<DropdownMenu.Content
  {sideOffset}
  class={twMerge(
    "bg-popover text-popover-foreground z-50 min-w-[8rem] rounded-md border p-1 shadow-lg",
    "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</DropdownMenu.Content>
