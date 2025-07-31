<script lang="ts">
  import type { User } from "$lib/types";
  import ActionBlock from "@saas/shared/components/ActionBlock.svelte";
  import { toast } from "@ui/components";
  import UserAvatarUpload from "./UserAvatarUpload.svelte";

  interface Props {
    user: User;
  }

  let { user }: Props = $props();
</script>

<ActionBlock title="Your avatar">
  <div class="flex items-center gap-4">
    <div>
      <p>
        To change your avatar click the picture on the right side of this block
        and select a file from your computer to upload.
      </p>
    </div>

    <UserAvatarUpload
      onSuccess={() => {
        toast.success("Your avatar has been updated.");
      }}
      onError={() => {
        toast.error("We were unable to update your avatar. Please try again.");
      }}
      {user}
    />
  </div>
</ActionBlock>
