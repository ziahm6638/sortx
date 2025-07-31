<script lang="ts">
  import { updateCurrentTeamIdCookie } from "$lib/modules/saas/auth/lib/current-team-id";
  import CreateTeamDialog from "$lib/modules/saas/shared/components/CreateTeamDialog.svelte";
  import type { TeamMembership } from "$lib/types";
  import TeamAvatar from "@shared/components/TeamAvatar.svelte";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@ui/components";
  import type { Team } from "database";
  import { ChevronsUpDownIcon, PlusIcon } from "lucide-svelte";

  interface Props {
    teams?: Team[];
    teamMembership: TeamMembership;
    className?: string;
  }

  let { teams = [], teamMembership, className = "" }: Props = $props();

  let activeTeam = $derived(teams.find((team) => team.id === teamMembership?.teamId));

  function switchTeam(teamId: string | undefined) {
    if (!teamId) return;
    updateCurrentTeamIdCookie(teamId);
    location.reload();
  }
  let dialogOpen = $state(false);

  function openCreateTeamDialog() {
    dialogOpen = true;
  }

  function onOpenChange(isOpen: boolean) {
    dialogOpen = isOpen;
  }
</script>

{#if activeTeam}
  <div class={className}>
    <DropdownMenu>
      <DropdownMenuTrigger
        class="focus-visible:ring-ring focus-visible:border-primary -ml-2 flex w-full items-center justify-between rounded-md px-2 py-2 text-left outline-none focus-visible:ring-1"
      >
        <div class="flex items-center justify-start gap-2 text-sm">
          <span class="hidden lg:block">
            <TeamAvatar
              name={activeTeam.name}
              avatarUrl={activeTeam.avatarUrl ?? ""}
            />
          </span>
          <span class="block flex-1 truncate">{activeTeam.name}</span>
          <ChevronsUpDownIcon class="block h-4 w-4 opacity-50" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={activeTeam.id}
          onValueChange={switchTeam}
        >
          {#each teams as team}
            <DropdownMenuRadioItem
              value={team.id}
              class="flex items-center justify-center gap-2"
            >
              <div class="flex flex-1 items-center justify-start gap-2">
                <TeamAvatar
                  className="size-6"
                  size={24}
                  name={team.name}
                  avatarUrl={team.avatarUrl ?? ""}
                />
                {team.name}
              </div>
            </DropdownMenuRadioItem>
          {/each}
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem inset={false} on:click={openCreateTeamDialog}>
            <PlusIcon class="mr-2 h-4 w-4" />
            Create a new team
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>

    <CreateTeamDialog {dialogOpen} {onOpenChange} />
  </div>
{/if}
