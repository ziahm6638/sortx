<script lang="ts">
  import { Accordion, type AccordionItemProps } from "bits-ui";
  import { twMerge } from "tailwind-merge";
  type $$Props = AccordionItemProps;

  
  interface Props {
    class?: AccordionItemProps["class"];
    value: $$Props["value"];
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { class: className = undefined, value, children, ...rest }: Props = $props();
</script>

<Accordion.Item {value} class={twMerge("border-b", className)} {...rest}>
  {@render children?.()}
</Accordion.Item>
