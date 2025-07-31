<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import StatsTile from "$lib/modules/saas/dashboard/components/StatsTile.svelte";
  import PageHeader from "$lib/modules/saas/shared/components/PageHeader.svelte";
  import { apiClient } from "@shared/lib/ApiClient";
  import { Card } from "@ui/components";
  import type { PageData } from "./$types";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
  const user = data?.user;

  async function logout() {
    await apiClient(page).auth.logout.mutate();
    goto("/");
  }
</script>

<div class="">
  <PageHeader
    title={`Welcome ${user?.name}!`}
    subtitle={"See the latest stats of your awesome business."}
  />
  <div class="mt-8 grid gap-4 lg:grid-cols-3">
    <StatsTile
      title="New clients"
      value={344}
      valueFormat="number"
      trend={0.12}
    />
    <StatsTile
      title="Revenue"
      value={5243}
      valueFormat="currency"
      trend={0.6}
    />
    <StatsTile
      title="Churn"
      value={0.03}
      valueFormat="percentage"
      trend={-0.3}
    />
  </div>

  <Card class="mt-8">
    <div
      class="text-muted-foreground flex h-64 items-center justify-center p-8"
    >
      Place your content here...
    </div>
  </Card>
</div>
