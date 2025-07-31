<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import ActionBlock from "$lib/modules/saas/shared/components/ActionBlock.svelte";
  import { apiClient } from "@shared/lib/ApiClient";
  import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    Button,
    toast,
  } from "@ui/components";

  let alertDialogOpen = $state(false);
  let isSubmitting = $state(false);
  function showConfirmation() {
    alertDialogOpen = true;
  }

  async function handleSubmit() {
    isSubmitting = true;
    try {
      await apiClient(page).auth.deleteAccount.mutate();
      toast.success("Your account has been deleted.");
      goto("/");
    } catch (error) {
      toast.error(
        "We were unable to delete your account. Please try again later.",
      );
    }
    isSubmitting = false;
    alertDialogOpen = false;
  }
</script>

<div>
  <ActionBlock
    danger
    title="Delete account"
    onSubmit={showConfirmation}
    submitLabel="Delete account"
  >
    <p>
      Permanently delete your account. Once you delete your account, there is no
      going back. Please be certain.
    </p>
  </ActionBlock>

  <AlertDialog
    bind:open={alertDialogOpen}
    onOpenChange={(open) => (alertDialogOpen = open)}
  >
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle class="text-destructive"
          >Delete account</AlertDialogTitle
        >
        <AlertDialogDescription>
          Are you sure you want to delete your account?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <Button
          variant="error"
          loading={isSubmitting}
          onclick={async () => await handleSubmit()}
        >
          Delete account
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</div>
