<script lang="ts">
  import { DropdownMenu, type DropdownMenuLabelProps } from "bits-ui";
  import { twMerge } from "tailwind-merge";

  type $$Props = DropdownMenuLabelProps;
  
  interface Props {
    class?: $$Props["class"];
    inset?: boolean;
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { class: className = "", inset = false, children, ...rest }: Props = $props();
</script>

<DropdownMenu.Label
  class={twMerge(
    "px-3 py-2 text-sm font-semibold",
    inset ? "pl-8" : "",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</DropdownMenu.Label>
