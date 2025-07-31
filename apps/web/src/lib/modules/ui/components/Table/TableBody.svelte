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

<tbody
  class={twMerge("[&_tr:last-child]:border-0", className)}
  {...rest}
>
  {@render children?.()}
</tbody>
