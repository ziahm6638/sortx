<script lang="ts">
  import { Tabs, type TabsTriggerEvents, type TabsTriggerProps } from "bits-ui";
  import { twMerge } from "tailwind-merge";
  type $$Props = TabsTriggerProps;
  type $$Events = TabsTriggerEvents;

  
  interface Props {
    class?: $$Props["class"];
    value?: $$Props["value"];
    children?: import('svelte').Snippet;
  }

  let { class: className = undefined, value = "", children }: Props = $props();
</script>

<Tabs.Trigger
  {value}
  class={twMerge(
    "ring-offset-background focus-visible:ring-ring border-b-2 -mb-0.5 border-transparent data-[state=active]:border-primary data-[state=active]:text-card-foreground data-[state=active]:font-semibold inline-flex items-center justify-center whitespace-nowrap px-3 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    className,
  )}
>
  {@render children?.()}
</Tabs.Trigger>
