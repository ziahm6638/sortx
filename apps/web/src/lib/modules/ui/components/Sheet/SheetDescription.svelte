<script lang="ts">
  import { Dialog, type DialogDescriptionProps } from "bits-ui";
  import { twMerge } from "tailwind-merge";
  type $$Props = DialogDescriptionProps;

  interface Props {
    class?: DialogDescriptionProps["class"];
    children?: import('svelte').Snippet;
  }

  let { class: className = undefined, children }: Props = $props();
  
</script>

<Dialog.Description class={twMerge("text-muted-foreground text-sm", className)}>
  {@render children?.()}
</Dialog.Description>
