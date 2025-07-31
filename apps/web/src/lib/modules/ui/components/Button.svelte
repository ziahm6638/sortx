<script lang="ts">
  import Spinner from "@shared/components/Spinner.svelte";
  import { buttonVariants } from "@ui/components/ButtonVariants";
  import { type VariantProps } from "class-variance-authority";
  import { twMerge } from "tailwind-merge";

  type ButtonProps = VariantProps<typeof buttonVariants>;

  interface Props {
    loading?: boolean;
    class?: $$Props["class"];
    size?: ButtonProps["size"];
    variant?: ButtonProps["variant"];
    children?: import("svelte").Snippet;
    [key: string]: any;
  }

  let {
    loading = false,
    class: className = undefined,
    size = "default",
    variant = "default",
    children,
    ...rest
  }: Props = $props();
</script>

<!-- svelte-ignore a11y_interactive_supports_focus -->
<button
  class={twMerge(buttonVariants({ variant, size, class: className }))}
  {...rest}
>
  {#if loading}
    <Spinner className="mr-1.5 size-4 text-inherit" />
    <!-- {:else} -->
  {/if}
  {@render children?.()}
</button>
