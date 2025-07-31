<script lang="ts">
  import UserAvatar from "@shared/components/UserAvatar.svelte";
  import type { Row } from "@tanstack/svelte-table";
  import type { ApiOutput } from "api/trpc/router";
  import EmailVerified from "../EmailVerified.svelte";

  type Users = ApiOutput["admin"]["users"]["users"];

  interface Props {
    row: Row<Users[number]>;
  }

  let { row }: Props = $props();
  const memberships = row.original.memberships || [];
</script>

<div class="flex items-center gap-2">
  <UserAvatar
    name={row.original.name ?? row.original.email}
    avatarUrl={row.original.avatarUrl ?? undefined}
  />
  <div class="leading-tight">
    <strong class="block">
      {row.original.name ?? row.original.email}
    </strong>
    <small class="text-muted-foreground">
      {#if row.original.name}
        {row.original.email}
      {/if}
      <EmailVerified
        verified={row.original.emailVerified}
        className="inline-block align-text-top"
      />
      {#if row.original.role === "ADMIN"}
        - Admin
      {/if}
      {` - Teams: `}
      {#each memberships as membership}
        <span>
          {membership.team.name}
        </span>
      {/each}
    </small>
  </div>
</div>
