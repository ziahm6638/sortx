<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { page } from "$app/state";
  import TeamRoleSelect from "$lib/modules/saas/settings/components/TeamRoleSelect.svelte";
  import type { RoleOption, User } from "$lib/types";
  import { apiClient } from "@shared/lib/ApiClient";
  import type { Row } from "@tanstack/svelte-table";
  import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    toast,
  } from "@ui/components";
  import type { ApiOutput } from "api/trpc/router";
  import { LogOutIcon, MoreVerticalIcon, TrashIcon } from "lucide-svelte";
  type TeamMembershipsOutput = ApiOutput["team"]["memberships"];

  interface Props {
    row: Row<TeamMembershipsOutput[number]>;
    user: User;
    currentTeamMembership: TeamMembershipsOutput[number];
  }

  let { row, user, currentTeamMembership }: Props = $props();

  async function handleRemove() {
    const removeMemberPromise = apiClient(page)
      .team.removeMember.mutate({
        membershipId: row.original.id,
      })
      .then(async () => {
        await invalidateAll();
      });
    toast.promise(removeMemberPromise, {
      loading: "Removing member from team...",
      error: "Could not remove the member from your team. Please try again.",
      success: "The member has been successfully removed from your team.",
    });
  }

  async function onRoleSelect(role: RoleOption | unknown) {
    const updateMembershipPromise = apiClient(
      page,
    ).team.updateMembership.mutate({
      id: row.original.id,
      role: (role as RoleOption).value,
    });
    toast.promise(updateMembershipPromise, {
      loading: "Updating membership...",
      error: "Could not update team membership. Please try again.",
      success: "Membership was updated successfully",
    });
  }
  const disabled =
    currentTeamMembership.role !== "OWNER" || row.original.isCreator;
</script>

<div class="flex flex-row justify-end gap-2">
  <TeamRoleSelect
    value={row.original.role}
    {disabled}
    onSelect={onRoleSelect}
  />

  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button size="icon" variant="ghost">
        <MoreVerticalIcon class="size-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem
        inset
        disabled={row.original.isCreator}
        class="text-destructive"
        on:click={handleRemove}
      >
        {#if row.original.user?.id === user?.id}
          <LogOutIcon class="mr-2 h-4 w-4" />
          Remove member
        {:else}
          <TrashIcon class="mr-2 h-4 w-4" />
          Remove member
        {/if}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</div>
