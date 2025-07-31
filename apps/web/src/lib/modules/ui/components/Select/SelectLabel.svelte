<script lang="ts">
  import {
    Select,
    type SelectLabelProps,
    type SelectLabelEvents,
  } from "bits-ui";
  import { twMerge } from "tailwind-merge";

  type $$Props = SelectLabelProps;
  type $$Events = SelectLabelEvents;

  interface Props {
    class?: $$Props["class"];
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { class: className = undefined, children, ...rest }: Props = $props();
  
</script>

<Select.Content
  class={twMerge("px-2 py-1.5 text-sm font-semibold", className)}
  {...rest}
  >{@render children?.()}
</Select.Content>
