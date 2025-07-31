<script lang="ts">
  import { DropdownMenu, type DropdownMenuSubContentProps } from "bits-ui";
  import { twMerge } from "tailwind-merge";

  type $$Props = DropdownMenuSubContentProps;
  interface Props {
    class?: $$Props["class"];
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { class: className = "", children, ...rest }: Props = $props();
  
</script>

<DropdownMenu.SubContent
  class={twMerge(
    "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</DropdownMenu.SubContent>
