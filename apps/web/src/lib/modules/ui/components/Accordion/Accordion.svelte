<script lang="ts">
  import { Accordion, type AccordionProps } from "bits-ui";
  interface Props {
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { children, ...rest }: Props = $props();
  type $$Props = AccordionProps<boolean>;
</script>

<Accordion.Root {...rest}>
  {@render children?.()}
</Accordion.Root>
