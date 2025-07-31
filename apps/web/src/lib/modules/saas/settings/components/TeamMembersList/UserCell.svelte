<script lang="ts">
  import UserAvatar from "@shared/components/UserAvatar.svelte";
  import type { Row } from "@tanstack/svelte-table";
  import type { ApiOutput } from "api/trpc/router";
  type TeamMembershipsOutput = ApiOutput["team"]["memberships"];

  interface Props {
    row: Row<TeamMembershipsOutput[number]>;
  }

  let { row }: Props = $props();
</script>

{#if row.original.user}
  <div class="flex items-center gap-2">
    <UserAvatar
      name={row.original.user.name ?? row.original.user.email}
      avatarUrl={row.original.user?.avatarUrl || undefined}
    />
    <div>
      <strong class="block">{row.original.user.name}</strong>
      <small class="text-muted-foreground">
        {row.original.user.email}
      </small>
    </div>
  </div>
{/if}
