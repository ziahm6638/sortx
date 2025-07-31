<script lang="ts">
  import { Select, type SelectSeparatorProps } from "bits-ui";
  import { twMerge } from "tailwind-merge";

  type $$Props = SelectSeparatorProps;

  interface Props {
    class?: $$Props["class"];
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { class: className = undefined, children, ...rest }: Props = $props();
  
</script>

<Select.Separator
  class={twMerge("bg-muted -mx-1 my-1 h-px", className)}
  {...rest}
  >{@render children?.()}
</Select.Separator>
