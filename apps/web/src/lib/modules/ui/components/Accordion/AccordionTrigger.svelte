<script lang="ts">
  import {
    Accordion,
    type AccordionTriggerEvents,
    type AccordionTriggerProps,
  } from "bits-ui";
  import { ChevronDownIcon } from "lucide-svelte";
  import { twMerge } from "tailwind-merge";
  type $$Props = AccordionTriggerProps;
  type $$Events = AccordionTriggerEvents;

  interface Props {
    class?: AccordionTriggerProps["class"];
    children?: import('svelte').Snippet;
  }

  let { class: className = undefined, children }: Props = $props();
  
</script>

<Accordion.Header class="flex">
  <Accordion.Trigger
    class={twMerge(
      "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
      className,
    )}
  >
    {@render children?.()}
    <ChevronDownIcon
      class="size-4 shrink-0 text-muted-foreground transition-transform duration-200"
    />
  </Accordion.Trigger>
</Accordion.Header>
