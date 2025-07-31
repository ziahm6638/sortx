<script lang="ts">
  import { AlertDialog, type AlertDialogTriggerProps } from "bits-ui";
  interface Props {
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { children, ...rest }: Props = $props();
  type $$Props = AlertDialogTriggerProps;
</script>

<AlertDialog.Trigger {...rest}>
  {@render children?.()}
</AlertDialog.Trigger>
