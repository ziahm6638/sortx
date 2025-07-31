<script lang="ts">
  import { twMerge } from "tailwind-merge";
  import { Avatar, type AvatarProps } from "bits-ui";

  type $$Props = AvatarProps;
  interface Props {
    class?: AvatarProps["class"];
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { class: className = undefined, children, ...rest }: Props = $props();
  
</script>

<Avatar.Root
  class={twMerge(
    "relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</Avatar.Root>
