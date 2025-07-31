<script lang="ts">
  import { AlertDialog, type AlertDialogOverlayProps } from "bits-ui";
  import { twMerge } from "tailwind-merge";
  type $$Props = AlertDialogOverlayProps;

  interface Props {
    class?: AlertDialogOverlayProps["class"];
    children?: import('svelte').Snippet;
  }

  let { class: className = undefined, children }: Props = $props();
  
</script>

<AlertDialog.Overlay
  class={twMerge(
    "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0  fixed inset-0 z-50 bg-black/80",
    className,
  )}
>
  {@render children?.()}
</AlertDialog.Overlay>
