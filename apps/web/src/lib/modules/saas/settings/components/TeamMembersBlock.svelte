<script lang="ts">
  import TeamInvitationsList from "$lib/modules/saas/settings/components/TeamInvitationsList/TeamInvitationsList.svelte";
  import TeamMembersList from "$lib/modules/saas/settings/components/TeamMembersList/TeamMembersList.svelte";
  import ActionBlock from "$lib/modules/saas/shared/components/ActionBlock.svelte";
  import type { User } from "$lib/types";
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/components";
  import type { ApiOutput } from "api/trpc/router";

  let activeTab = $state("members");
  function setActiveTab(tab: string | undefined) {
    activeTab = tab as string;
  }

  interface Props {
    memberships: ApiOutput["team"]["memberships"];
    currentTeamMembership: ApiOutput["team"]["memberships"][number];
    invitations: ApiOutput["team"]["invitations"];
    user: User;
  }

  let {
    memberships,
    currentTeamMembership,
    invitations,
    user
  }: Props = $props();
</script>

<ActionBlock title="Members">
  <Tabs value={activeTab} onValueChange={(tab) => setActiveTab(tab)}>
    <TabsList class="mb-4">
      <TabsTrigger value="members">Active members</TabsTrigger>
      <TabsTrigger value="invitations">Pending invitations</TabsTrigger>
    </TabsList>
    <TabsContent value="members">
      <TeamMembersList {memberships} {user} {currentTeamMembership} />
    </TabsContent>
    <TabsContent value="invitations">
      <TeamInvitationsList {invitations} {currentTeamMembership} />
    </TabsContent>
  </Tabs>
</ActionBlock>
