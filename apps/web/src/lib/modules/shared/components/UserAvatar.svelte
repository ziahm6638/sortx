<script lang="ts">
  import { Avatar, AvatarFallback, AvatarImage } from "@ui/components";
  interface Props {
    name: string;
    avatarUrl?: string | undefined;
    className?: string;
  }

  let { name, avatarUrl = undefined, className = "" }: Props = $props();

  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "";
</script>

<Avatar class={className}>
  <AvatarImage src={avatarUrl} alt="Avatar" />
  <AvatarFallback>{initials}</AvatarFallback>
</Avatar>
