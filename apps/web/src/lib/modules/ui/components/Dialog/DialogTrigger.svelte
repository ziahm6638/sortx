<script lang="ts">
  import { Dialog, type DialogTriggerProps } from "bits-ui";
  interface Props {
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { children, ...rest }: Props = $props();
  type $$Props = DialogTriggerProps;
</script>

<Dialog.Trigger {...rest}>
  {@render children?.()}
</Dialog.Trigger>
