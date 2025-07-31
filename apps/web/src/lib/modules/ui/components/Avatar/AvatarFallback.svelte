<script lang="ts">
  import { twMerge } from "tailwind-merge";
  import { Avatar, type AvatarFallbackProps } from "bits-ui";

  type $$Props = AvatarFallbackProps;
  interface Props {
    class?: AvatarFallbackProps["class"];
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { class: className = undefined, children, ...rest }: Props = $props();
  
</script>

<Avatar.Fallback
  class={twMerge(
    "bg-muted flex h-full w-full items-center justify-center rounded-full text-xs font-bold",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</Avatar.Fallback>
