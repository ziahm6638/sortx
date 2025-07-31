<script lang="ts">
  import { updateCurrentTeamIdCookie } from "$lib/modules/saas/auth/lib/current-team-id";
  import CreateTeamForm from "$lib/modules/saas/shared/components/CreateTeamForm.svelte";
  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@ui/components";

  interface Props {
    dialogOpen?: boolean;
    onOpenChange: (isOpen: boolean) => void;
  }

  let { dialogOpen = $bindable(false), onOpenChange }: Props = $props();

  function switchTeam(teamId: string) {
    updateCurrentTeamIdCookie(teamId);
    location.reload();
  }
</script>

<Dialog bind:open={dialogOpen} {onOpenChange}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create a team</DialogTitle>
    </DialogHeader>

    <CreateTeamForm
      onSuccess={async (team) => {
        switchTeam(team.id);
        dialogOpen = false;
      }}
    />
  </DialogContent>
</Dialog>
