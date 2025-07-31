<script lang="ts">
  import { twMerge } from "tailwind-merge";

  interface Props {
    className?: string;
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { className = "", children, ...rest }: Props = $props();
</script>

<div class={twMerge("p-6 pt-0", className)} {...rest}>
  {@render children?.()}
</div>
