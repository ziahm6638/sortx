<script lang="ts">
  import { twMerge } from "tailwind-merge";

  interface Props {
    className?: string;
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { className = "", children, ...rest }: Props = $props();
</script>

<div
  class={twMerge("text-muted-foreground text-sm", className)}
  {...rest}
>
  {@render children?.()}
</div>
