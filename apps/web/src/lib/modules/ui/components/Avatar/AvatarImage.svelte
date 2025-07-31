<script lang="ts">
  import { Avatar, type AvatarImageProps } from "bits-ui";
  import { twMerge } from "tailwind-merge";

  type $$Props = AvatarImageProps;
  interface Props {
    src?: AvatarImageProps["src"];
    alt?: AvatarImageProps["alt"];
    class?: AvatarImageProps["class"];
  }

  let { src = undefined, alt = undefined, class: className = undefined }: Props = $props();
  
</script>

<Avatar.Image
  {src}
  {alt}
  class={twMerge("aspect-square h-full w-full", className)}
></Avatar.Image>
