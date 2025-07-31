<script lang="ts">
  import { Avatar, AvatarFallback, AvatarImage } from "@ui/components";
  import BoringAvatar from "svelte-boring-avatars";
  import { lightVariables } from "tailwind-config";
  interface Props {
    name: string;
    size?: number;
    avatarUrl?: string | undefined;
    className?: string;
  }

  let {
    name,
    size = 32,
    avatarUrl = undefined,
    className = ""
  }: Props = $props();
</script>

<Avatar class={className}>
  <AvatarImage src={avatarUrl} alt="Avatar" />
  <AvatarFallback>
    <BoringAvatar
      {size}
      {name}
      variant="marble"
      colors={[
        lightVariables.colors.primary,
        lightVariables.colors.background,
        lightVariables.colors.highlight,
      ]}
    />
  </AvatarFallback>
</Avatar>
