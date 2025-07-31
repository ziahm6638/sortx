<script lang="ts">
  import { twMerge } from "tailwind-merge";
  import type { HTMLAttributes } from "svelte/elements";

  type $$Props = HTMLAttributes<HTMLTableRowElement>;

  interface Props {
    class?: $$Props["class"];
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { class: className = undefined, children, ...rest }: Props = $props();
  
</script>

<tr
  class={twMerge(
    "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</tr>
