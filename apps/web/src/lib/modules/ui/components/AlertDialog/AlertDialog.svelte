<script lang="ts">
  import { AlertDialog, type AlertDialogProps } from "bits-ui";
  type $$Props = AlertDialogProps;
  interface Props {
    open?: boolean;
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { open = $bindable(false), children, ...rest }: Props = $props();
</script>

<AlertDialog.Root bind:open {...rest}>
  {#if open}
    {@render children?.()}
  {/if}
</AlertDialog.Root>
