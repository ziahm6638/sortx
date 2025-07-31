<script lang="ts">
  import { Tabs, type TabsListProps } from "bits-ui";
  import { twMerge } from "tailwind-merge";
  type $$Props = TabsListProps;

  interface Props {
    class?: $$Props["class"];
    children?: import('svelte').Snippet;
  }

  let { class: className = undefined, children }: Props = $props();
  
</script>

<Tabs.List
  class={twMerge(
    "text-card-foreground/80 border-b-2 inline-flex items-center justify-center text-sm",
    className,
  )}
>
  {@render children?.()}
</Tabs.List>
