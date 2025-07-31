<script lang="ts">
  import { page } from "$app/state";
  import type { TeamMembership, User } from "$lib/types";
  import UserMenu from "@saas/shared/components/UserMenu.svelte";
  import Logo from "@shared/components/Logo.svelte";
  import type { Team } from "database";
  import {
    BuildingIcon,
    ChevronRightIcon,
    CreditCardIcon,
    HomeIcon,
    TicketIcon,
    UserCogIcon,
    UserIcon,
    UsersIcon,
    WrenchIcon,
  } from "lucide-svelte";

  interface Props {
    user: User | null;
    teamMembership: TeamMembership;
    teams: Team[];
    isAdmin?: boolean;
    open?: boolean;
    onClose?: () => void;
  }

  let {
    user,
    teamMembership,
    teams,
    isAdmin = false,
    open = true,
    onClose,
  }: Props = $props();

  const menuItems = [
    {
      label: "Dashboard",
      href: `/app/dashboard`,
      icon: HomeIcon,
    },
    {
      label: "Properties",
      href: `/app/properties`,
      icon: BuildingIcon,
    },
    {
      label: "Tickets",
      href: `/app/tickets`,
      icon: TicketIcon,
    },
    {
      label: "AI Demo",
      href: `/app/ai-demo`,
      icon: WrenchIcon,
    },
  ];

  const settingsItems = [
    {
      label: "Account",
      href: `/app/settings/account/general`,
      icon: UserIcon,
    },
    {
      label: "Team",
      href: `/app/settings/team/general`,
      icon: UsersIcon,
    },
    {
      label: "Billing",
      href: `/app/settings/team/billing`,
      icon: CreditCardIcon,
    },
  ];

  if (isAdmin) {
    menuItems.push({
      label: "Admin",
      href: `/app/admin/users`,
      icon: UserCogIcon,
    });
  }

  function isActive(href: string) {
    return page.url.pathname.startsWith(href);
  }

  function isSettingsActive() {
    return page.url.pathname.startsWith("/app/settings");
  }

  let settingsOpen = $state(false);

  $effect(() => {
    settingsOpen = isSettingsActive();
  });
</script>

<aside
  class="fixed left-0 top-0 z-30 h-screen w-64 border-r bg-background transition-transform duration-300 {open
    ? 'translate-x-0'
    : '-translate-x-full'} lg:translate-x-0"
>
  <div class="flex h-full flex-col">
    <!-- Logo Section -->
    <div class="flex h-16 items-center justify-between border-b px-6">
      <a href="/app/dashboard" class="flex items-center gap-3">
        <Logo />
      </a>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto p-4">
      <ul class="space-y-1">
        {#each menuItems as item}
          <li>
            <a
              href={item.href}
              class="group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-muted {isActive(
                item.href,
              )
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:text-foreground'}"
            >
              <item.icon
                class="h-5 w-5 transition-transform duration-200 group-hover:scale-110"
              />
              <span>{item.label}</span>
              {#if isActive(item.href)}
                <div
                  class="absolute inset-y-0 left-0 w-1 rounded-r-full bg-primary"
                />
                <ChevronRightIcon
                  class="ml-auto h-4 w-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                />
              {/if}
            </a>
          </li>
        {/each}
      </ul>
    </nav>

    <!-- User Section -->
    <div class="border-t bg-muted/30 p-4">
      <div class="flex items-center justify-between gap-3">
        <UserMenu {user} />
      </div>
    </div>
  </div>
</aside>
