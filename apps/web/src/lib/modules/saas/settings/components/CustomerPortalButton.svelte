<script lang="ts">
  import { page } from "$app/state";
  import { apiClient } from "@shared/lib/ApiClient";
  import { Button } from "@ui/components";
  import { CreditCardIcon } from "lucide-svelte";

  interface Props {
    subscriptionId: string;
  }

  let { subscriptionId }: Props = $props();

  let isLoading = $state(false);
  async function createCustomerPortal() {
    try {
      isLoading = true;
      const url = await apiClient(
        page,
      ).billing.createCustomerPortalLink.mutate({
        subscriptionId,
        redirectUrl: window.location.href,
      });
      window.location.href = url;
    } catch (error) {
    } finally {
      isLoading = false;
    }
  }
</script>

<Button variant="default" onclick={createCustomerPortal} loading={isLoading}>
  <CreditCardIcon className="mr-2 h-4 w-4" />
  Manage billing details
</Button>
