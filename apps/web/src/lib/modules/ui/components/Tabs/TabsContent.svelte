<script lang="ts">
  import { Tabs, type TabsContentProps } from "bits-ui";
  import { twMerge } from "tailwind-merge";
  type $$Props = TabsContentProps;

  
  interface Props {
    class?: $$Props["class"];
    value?: $$Props["value"];
    children?: import('svelte').Snippet;
  }

  let { class: className = undefined, value = "", children }: Props = $props();
</script>

<Tabs.Content
  {value}
  class={twMerge(
    "ring-offset-background focus-visible:ring-ring mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    className,
  )}
>
  {@render children?.()}
</Tabs.Content>
