<script lang="ts">
  import { twMerge } from "tailwind-merge";

  
  
  interface Props {
    for?: string;
    required?: boolean;
    class?: string;
    error?: boolean;
    children?: import('svelte').Snippet;
  }

  let {
    for: htmlFor = "",
    required = false,
    class: className = "",
    error = false,
    children
  }: Props = $props();
</script>

<label
  for={htmlFor}
  class={twMerge(
    "mb-2 block font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    className,
  )}
  class:text-destructive={error}
>
  {@render children?.()}
  {#if required}
    &nbsp;*
  {/if}
</label>
