<script lang="ts">
  import { Dialog } from "bits-ui";
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<Dialog.Portal>
  {@render children?.()}
</Dialog.Portal>
