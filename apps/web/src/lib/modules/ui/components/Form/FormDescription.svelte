<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { twMerge } from "tailwind-merge";
  interface Props {
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { children, ...rest }: Props = $props();

  type $$Props = HTMLAttributes<HTMLParagraphElement>;
  let className: $$Props["class"] = "";
</script>

<p class={twMerge("text-muted-foreground text-sm", className)} {...rest}>
  {@render children?.()}
</p>
