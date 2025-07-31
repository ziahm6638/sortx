<script lang="ts">
  import { twMerge } from "tailwind-merge";

  interface Props {
    className?: string;
    children?: import('svelte').Snippet;
  }

  let { className = "", children }: Props = $props();
</script>

<div class={twMerge("space-y-1.5", className)}>
  {@render children?.()}
</div>
