<script lang="ts">
  import {
    AlertDialog,
    type AlertDialogActionProps,
    type AlertDialogActionEvents,
  } from "bits-ui";
  import { buttonVariants } from "@ui/components/ButtonVariants";
  import { twMerge } from "tailwind-merge";
  type $$Props = AlertDialogActionProps;
  type $$Events = AlertDialogActionEvents;

  interface Props {
    class?: AlertDialogActionProps["class"];
    children?: import('svelte').Snippet;
  }

  let { class: className = undefined, children }: Props = $props();
  
</script>

<AlertDialog.Action class={twMerge(buttonVariants(), className)}>
  {@render children?.()}
</AlertDialog.Action>
