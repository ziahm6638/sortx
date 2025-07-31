<script lang="ts">
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

  interface Props {
    teamId: string;
  }

  let { teamId }: Props = $props();

  let alertDialogOpen = $state(false);
  let isSubmitting = $state(false);
  function showConfirmation() {
    alertDialogOpen = true;
  }

  async function handleSubmit() {
    isSubmitting = true;
    try {
      await apiClient(page).team.deleteTeam.mutate({ id: teamId });
      toast.success("Your team has been deleted.");
      window.location.reload();
    } catch (error) {
      toast.error(
        "We were unable to delete your team. Please try again later.",
      );
    } finally {
      isSubmitting = false;
      alertDialogOpen = false;
    }
  }
</script>

<div>
  <ActionBlock
    danger
    title="Delete team"
    onSubmit={showConfirmation}
    submitLabel="Delete team"
  >
    <p>
      Permanently delete your team. Once you delete your team, there is no going
      back. Please be certain.
    </p>
  </ActionBlock>

  <AlertDialog
    open={alertDialogOpen}
    onOpenChange={(open) => (alertDialogOpen = open)}
  >
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle class="text-destructive">Delete team</AlertDialogTitle
        >
        <AlertDialogDescription
          >Are you sure you want to delete your team?</AlertDialogDescription
        >
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <Button
          variant="error"
          loading={isSubmitting}
          onclick={async () => await handleSubmit()}
        >
          Delete team
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</div>
