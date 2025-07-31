<script lang="ts">
  import { twMerge } from "tailwind-merge";

  interface Props {
    className?: string;
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { className = "", children, ...rest }: Props = $props();
</script>

<h3
  class={twMerge("text-xl font-semibold leading-none", className)}
  {...rest}
>
  {@render children?.()}
</h3>
