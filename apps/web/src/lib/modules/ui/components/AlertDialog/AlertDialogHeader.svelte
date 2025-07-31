<script lang="ts">
  import { twMerge } from "tailwind-merge";

  interface Props {
    class?: string;
    children?: import('svelte').Snippet;
  }

  let { class: className = "", children }: Props = $props();
  
</script>

<div
  class={twMerge("flex flex-col space-y-2 text-center sm:text-left", className)}
>
  {@render children?.()}
</div>
