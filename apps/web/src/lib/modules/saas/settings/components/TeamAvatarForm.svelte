<script lang="ts">
  import type { TeamMembership } from "$lib/types";
  import ActionBlock from "@saas/shared/components/ActionBlock.svelte";
  import { toast } from "@ui/components";
  import TeamAvatarUpload from "./TeamAvatarUpload.svelte";

  interface Props {
    teamMembership: TeamMembership;
  }

  let { teamMembership }: Props = $props();
</script>

<ActionBlock title="Your avatar">
  <div class="flex items-center gap-4">
    <div>
      <p>
        To change your avatar click the picture on the right side of this block
        and select a file from your computer to upload.
      </p>
    </div>

    <TeamAvatarUpload
      onSuccess={() => {
        toast.success("Your avatar has been updated.");
      }}
      onError={() => {
        toast.error("We were unable to update your avatar. Please try again.");
      }}
      {teamMembership}
    />
  </div>
</ActionBlock>
