<script lang="ts">
  import { Dialog, type DialogProps } from "bits-ui";
  type $$Props = DialogProps;
  interface Props {
    open?: boolean;
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { open = $bindable(false), children, ...rest }: Props = $props();
</script>

<Dialog.Root bind:open {...rest}>
  {#if open}
    {@render children?.()}
  {/if}
</Dialog.Root>
