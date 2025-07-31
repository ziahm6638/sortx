<script lang="ts">
  import { Tooltip } from "bits-ui";
  import { twMerge } from "tailwind-merge";

  interface Props {
    sideOffset?: number;
    className?: string;
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { sideOffset = 4, className = "", children, ...rest }: Props = $props();
</script>

<Tooltip.Content
    sideOffset={sideOffset}
    class={twMerge(
      "bg-popover text-popover-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 overflow-hidden rounded-md border px-3 py-1.5 text-sm shadow-md",
      className,
    )}
    {...rest}
  >{@render children?.()}</Tooltip.Content>