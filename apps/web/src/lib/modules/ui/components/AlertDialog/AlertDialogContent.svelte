<script lang="ts">
  import AlertDialogOverlay from "@ui/components/AlertDialog/AlertDialogOverlay.svelte";
  import { AlertDialog, type AlertDialogContentProps } from "bits-ui";
  import { twMerge } from "tailwind-merge";

  type $$Props = AlertDialogContentProps;
  interface Props {
    class?: AlertDialogContentProps["class"];
    children?: import('svelte').Snippet;
  }

  let { class: className = undefined, children }: Props = $props();
  
</script>

<AlertDialog.Portal>
  <AlertDialogOverlay />
  <AlertDialog.Content
    class={twMerge(
      "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg md:w-full",
      className,
    )}
  >
    {@render children?.()}
  </AlertDialog.Content>
</AlertDialog.Portal>
