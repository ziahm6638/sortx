<script lang="ts">
  import { type VariantProps } from "class-variance-authority";
  import { LoaderIcon } from "lucide-svelte";
  import { twMerge } from "tailwind-merge";
  import { buttonVariants } from "./ButtonVariants";

  type ButtonProps = VariantProps<typeof buttonVariants>;

  interface Props {
    asChild?: boolean;
    loading?: boolean;
    href?: $$Props["href"];
    class?: $$Props["class"];
    size?: ButtonProps["size"];
    variant?: ButtonProps["variant"];
    children?: import("svelte").Snippet;
    [key: string]: any;
  }

  let {
    loading = false,
    href = undefined,
    class: className = undefined,
    size = "default",
    variant = "default",
    children,
    ...rest
  }: Props = $props();
</script>

<a
  class={twMerge(buttonVariants({ variant, size, class: className }))}
  {...rest}
  {href}
  role="button"
>
  {#if loading}
    <LoaderIcon class="h-4 w-4 animate-spin" />
  {:else}
    {@render children?.()}
  {/if}
</a>
