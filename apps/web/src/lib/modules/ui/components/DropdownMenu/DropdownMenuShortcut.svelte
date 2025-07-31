<script lang="ts">
  import { twMerge } from "tailwind-merge";

  interface Props {
    class?: string;
    children?: import('svelte').Snippet;
  }

  let { class: className = "", children }: Props = $props();
  
</script>

<span class={twMerge("ml-auto text-xs tracking-widest opacity-60", className)}>
  {@render children?.()}
</span>
