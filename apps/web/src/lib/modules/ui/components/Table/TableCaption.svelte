<script lang="ts">
  import { twMerge } from "tailwind-merge";
  import type { HTMLAttributes } from "svelte/elements";

  type $$Props = HTMLAttributes<HTMLTableCaptionElement>;

  interface Props {
    class?: $$Props["class"];
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { class: className = undefined, children, ...rest }: Props = $props();
  
</script>

<caption
  class={twMerge("text-muted-foreground mt-4 text-sm", className)}
  {...rest}
>
  {@render children?.()}
</caption>
