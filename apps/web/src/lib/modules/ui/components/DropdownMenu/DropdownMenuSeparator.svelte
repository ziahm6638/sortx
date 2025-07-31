<script lang="ts">
  import { DropdownMenu, type DropdownMenuSeparatorProps } from "bits-ui";
  import { twMerge } from "tailwind-merge";

  type $$Props = DropdownMenuSeparatorProps;
  interface Props {
    class?: $$Props["class"];
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { class: className = "", children, ...rest }: Props = $props();
  
</script>

<DropdownMenu.Separator
  class={twMerge("bg-border -mx-1 my-1 h-px", className)}
  {...rest}
>
  {@render children?.()}
</DropdownMenu.Separator>
