<script lang="ts">
  import { Dialog, type DialogOverlayProps } from "bits-ui";
  import { twMerge } from "tailwind-merge";
  type $$Props = DialogOverlayProps;

  interface Props {
    class?: DialogOverlayProps["class"];
    children?: import('svelte').Snippet;
  }

  let { class: className = undefined, children }: Props = $props();
  
</script>

<Dialog.Overlay
  class={twMerge(
    "bg-background/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 backdrop-blur-sm",
    className,
  )}
>
  {@render children?.()}
</Dialog.Overlay>
