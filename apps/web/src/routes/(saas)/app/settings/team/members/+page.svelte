<script lang="ts">
  import InviteMemberForm from "$lib/modules/saas/settings/components/InviteMemberForm.svelte";
  import TeamMembersBlock from "$lib/modules/saas/settings/components/TeamMembersBlock.svelte";
  import type { PageServerData } from "./$types";

  interface Props {
    data: PageServerData;
  }

  let { data }: Props = $props();

  let memberships = $derived(data.memberships);
  let user = $derived(data.user);
  let currentTeamMembership = $derived(data.currentTeamMembership);
  let invitations = $derived(data.invitations);
</script>

<div class="grid grid-cols-1 gap-6">
  <InviteMemberForm
    teamId={currentTeamMembership.team.id}
    {currentTeamMembership}
  />
  <TeamMembersBlock
    {memberships}
    {user}
    {currentTeamMembership}
    {invitations}
  />
</div>
