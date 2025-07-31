<script lang="ts">
  import { twMerge } from "tailwind-merge";

  interface Props {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { class: className = "", children, ...rest }: Props = $props();
  
</script>

<div
  class={twMerge("bg-card text-card-foreground rounded-lg shadow", className)}
  {...rest}
>
  {@render children?.()}
</div>
