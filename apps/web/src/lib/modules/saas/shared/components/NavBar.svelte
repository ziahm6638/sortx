<script lang="ts">
  import { page } from "$app/state";
  import TeamSelect from "$lib/modules/saas/shared/components/TeamSelect.svelte";
  import UserMenu from "$lib/modules/saas/shared/components/UserMenu.svelte";
  import type { TeamMembership, User } from "$lib/types";
  import Logo from "@shared/components/Logo.svelte";
  import type { Team } from "database";
  import {
    ChevronRightIcon,
    GridIcon,
    SettingsIcon,
    UserCogIcon,
    WandIcon,
  } from "lucide-svelte";

  interface Props {
    user: User | null;
    teamMembership: TeamMembership;
    teams: Team[];
    isAdmin?: boolean;
  }

  let {
    user,
    teamMembership,
    teams,
    isAdmin = false
  }: Props = $props();

  const menuItems = [
    {
      label: "Dashboard",
      href: `/app/dashboard`,
      icon: GridIcon,
    },
    {
      label: "AI Demo",
      href: `/app/ai-demo`,
      icon: WandIcon,
    },
    {
      label: "Settings",
      href: `/app/settings/account/general`,
      icon: SettingsIcon,
    },
  ];

  if (isAdmin) {
    menuItems.push({
      label: "Admin",
      href: `/app/admin/users`,
      icon: UserCogIcon,
    });
  }
</script>

<nav class="w-full border-b">
  <div class="container max-w-6xl py-4">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <a href="/" class="block">
          <Logo withLabel={false} />
        </a>

        <span class="hidden opacity-30 lg:block">
          <ChevronRightIcon class="h-4 w-4" />
        </span>

        <TeamSelect {teams} {teamMembership} />
      </div>

      <div class="ml-auto mr-0 flex items-center justify-end gap-4">
        <UserMenu {user} />
      </div>
    </div>

    <ul
      class="no-scrollbar -mx-8 -mb-4 mt-6 flex list-none items-center justify-start gap-6 overflow-x-auto px-8 text-sm lg:text-base"
    >
      {#each menuItems as menuItem}
        <li>
          <a
            href={menuItem.href}
            class={`flex items-center text-sm gap-2 border-b-2 px-1 pb-3 ${
              page.url.pathname.includes(menuItem.href)
                ? "border-primary font-bold"
                : "border-transparent"
            }`}
          >
            <menuItem.icon
              class="h-4 w-4 shrink-0 {page.url.pathname.includes(
                menuItem.href,
              )
                ? 'text-primary'
                : ''}"
            />
            <span>{menuItem.label}</span>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</nav>
