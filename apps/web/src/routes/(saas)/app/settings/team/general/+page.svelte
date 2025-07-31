<script lang="ts">
  import ChangeTeamNameForm from "$lib/modules/saas/settings/components/ChangeTeamNameForm.svelte";
  import DeleteTeamForm from "$lib/modules/saas/settings/components/DeleteTeamForm.svelte";
  import TeamAvatarForm from "@saas/settings/components/TeamAvatarForm.svelte";
  import type { LayoutServerData } from "../../../$types";

  interface Props {
    data: LayoutServerData;
  }

  let { data }: Props = $props();
  let teamMembership = $derived(data.teamMembership);
</script>

<div class="grid grid-cols-1 gap-6">
  <TeamAvatarForm {teamMembership} />
  <ChangeTeamNameForm {teamMembership} />
  <DeleteTeamForm teamId={teamMembership.teamId} />
</div>
