<script lang="ts">
  import AppSidebar from "@saas/shared/components/AppSidebar.svelte";
  import AppTopBar from "@saas/shared/components/AppTopBar.svelte";
  import type { LayoutServerData } from "./$types";

  interface Props {
    data: LayoutServerData;
    children?: import("svelte").Snippet;
  }

  let { data, children }: Props = $props();
  let teamMembership = $derived(data.teamMembership);
  let user = $derived(data.user);
  let teams = $derived(data.teams);
  let isAdmin = $derived(data.isAdmin);

  let sidebarOpen = $state(false);

  function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
  }
</script>

<div class="relative flex h-screen overflow-hidden bg-background">
  <!-- Mobile sidebar backdrop -->
  {#if sidebarOpen}
    <button
      class="fixed inset-0 z-20 bg-black/50 lg:hidden"
      onclick={() => (sidebarOpen = false)}
      aria-label="Close sidebar"
    />
  {/if}

  <!-- Sidebar -->
  <AppSidebar
    {user}
    {teamMembership}
    {teams}
    {isAdmin}
    open={sidebarOpen}
    onClose={() => (sidebarOpen = false)}
  />

  <!-- Main Content Area -->
  <div class="flex flex-1 flex-col lg:pl-64">
    <!-- Top Bar -->
    <AppTopBar {user} {teamMembership} {teams} onMenuClick={toggleSidebar} />

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto pt-16 scroll-smooth">
      <div
        class="mx-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
      >
        {@render children?.()}
      </div>
    </main>
  </div>
</div>
