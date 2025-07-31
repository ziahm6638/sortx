<script lang="ts">
  import { twMerge } from "tailwind-merge";

  interface Props {
    class?: string;
    children?: import('svelte').Snippet;
  }

  let { class: className = "", children }: Props = $props();
  
</script>

<div
  class={twMerge(
    "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
    className,
  )}
>
  {@render children?.()}
</div>
