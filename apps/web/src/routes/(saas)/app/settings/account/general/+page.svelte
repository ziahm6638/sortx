<script lang="ts">
  import ChangeNameForm from "$lib/modules/saas/settings/components/ChangeNameForm.svelte";
  import ChangePasswordForm from "$lib/modules/saas/settings/components/ChangePasswordForm.svelte";
  import DeleteAccountForm from "$lib/modules/saas/shared/components/DeleteAccountForm.svelte";
  import UserAvatarForm from "@saas/settings/components/UserAvatarForm.svelte";
  import type { LayoutServerData } from "../../../$types";

  interface Props {
    data: LayoutServerData;
  }

  let { data }: Props = $props();
</script>

<div class="grid gap-6">
  <UserAvatarForm user={data.user} />
  <ChangeNameForm initialValue={data.user?.name || ""} />
  <ChangePasswordForm />
  <DeleteAccountForm />
</div>
