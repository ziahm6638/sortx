<script lang="ts">
  import { AlertDialog, type AlertDialogDescriptionProps } from "bits-ui";
  import { twMerge } from "tailwind-merge";
  type $$Props = AlertDialogDescriptionProps;

  interface Props {
    class?: AlertDialogDescriptionProps["class"];
    children?: import('svelte').Snippet;
  }

  let { class: className = undefined, children }: Props = $props();
  
</script>

<AlertDialog.Title class={twMerge("text-muted-foreground text-sm", className)}>
  {@render children?.()}
</AlertDialog.Title>
