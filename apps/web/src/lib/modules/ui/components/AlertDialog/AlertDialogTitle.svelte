<script lang="ts">
  import { AlertDialog, type AlertDialogTitleProps } from "bits-ui";
  import { twMerge } from "tailwind-merge";
  type $$Props = AlertDialogTitleProps;

  interface Props {
    class?: AlertDialogTitleProps["class"];
    children?: import('svelte').Snippet;
  }

  let { class: className = undefined, children }: Props = $props();
  
</script>

<AlertDialog.Title class={twMerge("text-lg font-semibold", className)}>
  {@render children?.()}
</AlertDialog.Title>
