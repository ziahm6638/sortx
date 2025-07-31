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
  class={twMerge(
    "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</div>
