<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { twMerge } from "tailwind-merge";

  type $$Props = HTMLAttributes<HTMLDivElement>;
  interface Props {
    class?: $$Props["class"];
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { class: className = undefined, children, ...rest }: Props = $props();
  
</script>

<div
  class={twMerge("animate-pulse rounded-md bg-muted", className)}
  {...rest}
>
  {@render children?.()}
</div>
