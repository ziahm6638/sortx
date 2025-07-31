<script lang="ts">
  import {
    AlertDialog,
    type AlertDialogCancelProps,
    type AlertDialogCancelEvents,
  } from "bits-ui";
  import { buttonVariants } from "@ui/components/ButtonVariants";
  import { twMerge } from "tailwind-merge";
  type $$Props = AlertDialogCancelProps;
  type $$Events = AlertDialogCancelEvents;

  interface Props {
    class?: AlertDialogCancelProps["class"];
    children?: import('svelte').Snippet;
  }

  let { class: className = undefined, children }: Props = $props();
  
</script>

<AlertDialog.Cancel
  class={twMerge(buttonVariants({ variant: "outline" }), className)}
>
  {@render children?.()}
</AlertDialog.Cancel>
