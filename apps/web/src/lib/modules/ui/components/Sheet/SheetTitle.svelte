<script lang="ts">
  import { Dialog, type DialogTitleProps } from "bits-ui";
  import { twMerge } from "tailwind-merge";
  type $$Props = DialogTitleProps;

  interface Props {
    class?: DialogTitleProps["class"];
    children?: import('svelte').Snippet;
  }

  let { class: className = undefined, children }: Props = $props();
  
</script>

<Dialog.Title
  class={twMerge("text-foreground text-lg font-semibold", className)}
>
  {@render children?.()}
</Dialog.Title>
