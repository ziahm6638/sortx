<script lang="ts">
  import { Accordion, type AccordionContentProps } from "bits-ui";
  import { slide } from "svelte/transition";
  import { twMerge } from "tailwind-merge";
  type $$Props = AccordionContentProps;

  interface Props {
    class?: AccordionContentProps["class"];
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { class: className = undefined, children, ...rest }: Props = $props();
  
</script>

<Accordion.Content
  class={twMerge("overflow-hidden text-sm", className)}
  {...rest}
  transition={slide}
  transitionConfig={{ duration: 200 }}
>
  <div class="pb-4 pt-0">
    {@render children?.()}
  </div>
</Accordion.Content>
