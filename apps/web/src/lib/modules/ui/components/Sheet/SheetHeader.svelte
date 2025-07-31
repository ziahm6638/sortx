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
  class={twMerge("flex flex-col space-y-2 text-center sm:text-left", className)}
  {...rest}
>
  {@render children?.()}
</div>
