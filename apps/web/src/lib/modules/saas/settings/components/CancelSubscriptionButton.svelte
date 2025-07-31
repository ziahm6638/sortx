<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { page } from "$app/state";
  import { apiClient } from "@shared/lib/ApiClient";
  import { Button, toast } from "@ui/components";
  import { XIcon } from "lucide-svelte";

  interface Props {
    id: string;
    label: string;
  }

  let { id, label }: Props = $props();

  let isLoading = $state(false);
  async function cancelSubscription() {
    try {
      isLoading = true;
      await apiClient(page).billing.cancelSubscription.mutate({ id });
      await invalidateAll();
      toast.success("Subscription was canceled");
    } catch (error) {
      toast.error("Could not cancel subscription");
    } finally {
      isLoading = false;
    }
  }
</script>

<Button variant="outline" onclick={cancelSubscription} loading={isLoading}>
  <XIcon className="mr-2 h-4 w-4" />
  {label}
</Button>
