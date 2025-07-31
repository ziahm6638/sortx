<script lang="ts">
  import DialogOverlay from "@ui/components/Dialog/DialogOverlay.svelte";
  import { Dialog, type DialogContentProps } from "bits-ui";
  import { XIcon } from "lucide-svelte";
  import { twMerge } from "tailwind-merge";

  type $$Props = DialogContentProps;
  interface Props {
    class?: DialogContentProps["class"];
    children?: import('svelte').Snippet;
  }

  let { class: className = undefined, children }: Props = $props();
  
</script>

<Dialog.Portal>
  <DialogOverlay />
  <Dialog.Content
    class={twMerge(
      "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg md:w-full",
      className,
    )}
  >
    {@render children?.()}
    <Dialog.Close
      class="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
    >
      <XIcon className="h-4 w-4" />
      <span class="sr-only">Close</span>
    </Dialog.Close>
  </Dialog.Content>
</Dialog.Portal>
