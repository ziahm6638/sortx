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
  class={twMerge("flex flex-col space-y-1.5 p-6", className)}
  {...rest}
>
  {@render children?.()}
</div>
