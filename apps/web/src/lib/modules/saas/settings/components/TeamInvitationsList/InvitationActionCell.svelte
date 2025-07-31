<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { page } from "$app/state";
  import TeamRoleSelect from "$lib/modules/saas/settings/components/TeamRoleSelect.svelte";
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
  import { MoreVerticalIcon, UndoIcon } from "lucide-svelte";

  type TeamInvitations = ApiOutput["team"]["invitations"];
  type TeamMembershipsOutput = ApiOutput["team"]["memberships"];

  interface Props {
    row: Row<TeamInvitations[number]>;
    currentTeamMembership: TeamMembershipsOutput[number];
  }

  let { row, currentTeamMembership }: Props = $props();
  async function handleRevokeInvitation() {
    const revokeInvitationPromise = apiClient(page)
      .team.revokeInvitation.mutate({ invitationId: row.original.id })
      .then(async () => {
        await invalidateAll();
      });
    toast.promise(revokeInvitationPromise, {
      loading: "Revoking invitation...",
      success: "The invitation has been revoked.",
      error: "The invitation could not be revoked. Please try again later.",
    });
  }
</script>

<div class="flex flex-row justify-end gap-2">
  <TeamRoleSelect value={row.original.role} disabled onSelect={() => {}} />
  {#if currentTeamMembership.role === "OWNER"}
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button size="icon" variant="ghost">
          <MoreVerticalIcon class="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem inset={false} on:click={handleRevokeInvitation}>
          <UndoIcon class="mr-2 h-4 w-4" />
          Revoke invitation
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  {/if}
</div>
