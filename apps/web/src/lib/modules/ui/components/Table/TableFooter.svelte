<script lang="ts">
  import { twMerge } from "tailwind-merge";
  import type { HTMLAttributes } from "svelte/elements";

  type $$Props = HTMLAttributes<HTMLTableSectionElement>;

  interface Props {
    class?: $$Props["class"];
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { class: className = undefined, children, ...rest }: Props = $props();
  
</script>

<tfoot
  class={twMerge("bg-primary text-primary-foreground font-medium", className)}
  {...rest}
>
  {@render children?.()}
</tfoot>
