<script lang="ts">
  import TeamSelect from "$lib/modules/saas/shared/components/TeamSelect.svelte";

  import type { TeamMembership, User } from "$lib/types";
  import {
    Badge,
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Input,
  } from "@ui/components";
  import type { Team } from "database";
  import {
    BellIcon,
    BuildingIcon,
    MenuIcon,
    PlusIcon,
    SearchIcon,
    TicketIcon,
  } from "lucide-svelte";

  interface Props {
    user: User | null;
    teamMembership: TeamMembership;
    teams: Team[];
    onMenuClick?: () => void;
  }

  let { user, teamMembership, teams, onMenuClick = () => {} }: Props = $props();

  let searchQuery = $state("");
  let notifications = $state([
    { id: 1, title: "New ticket assigned", time: "5 minutes ago", read: false },
    {
      id: 2,
      title: "Property inspection due",
      time: "1 hour ago",
      read: false,
    },
    { id: 3, title: "Maintenance completed", time: "2 hours ago", read: true },
  ]);

  let unreadCount = $derived(notifications.filter((n) => !n.read).length);

  function handleSearch(e: Event) {
    e.preventDefault();
    // TODO: Implement global search functionality
    console.log("Searching for:", searchQuery);
  }
</script>

<header
  class="fixed left-0 right-0 top-0 z-20 h-16 border-b bg-background/80 backdrop-blur-md shadow-sm supports-[backdrop-filter]:bg-background/60 lg:left-64"
>
  <div class="flex h-full items-center gap-4 px-6">
    <!-- Mobile menu button (hidden on desktop) -->
    <Button variant="ghost" size="icon" class="lg:hidden" onclick={onMenuClick}>
      <MenuIcon class="h-5 w-5" />
    </Button>

    <!-- Global Search -->
    <form onsubmit={handleSearch} class="hidden flex-1 max-w-md sm:block">
      <div class="relative group">
        <SearchIcon
          class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
        />
        <Input
          type="search"
          placeholder="Search properties, tickets, tenants..."
          bind:value={searchQuery}
          class="pl-9 pr-4 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </form>

    <!-- Right side actions -->
    <div class="ml-auto flex items-center gap-3">
      <!-- Team Switcher -->
      <TeamSelect {teams} {teamMembership} />

      <!-- Quick Add -->
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" class="gap-2">
            <PlusIcon class="h-4 w-4" />
            <span class="hidden sm:inline">Quick Add</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-48">
          <DropdownMenuLabel>Create New</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem href="/app/properties/new">
            <BuildingIcon class="mr-2 h-4 w-4" />
            Property
          </DropdownMenuItem>
          <DropdownMenuItem href="/app/tickets/new">
            <TicketIcon class="mr-2 h-4 w-4" />
            Ticket
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <!-- Notifications -->
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" class="relative group">
            <BellIcon
              class="h-5 w-5 transition-transform duration-200 group-hover:rotate-12"
            />
            {#if unreadCount > 0}
              <span
                class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-pulse"
              >
                {unreadCount}
              </span>
            {/if}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-80">
          <DropdownMenuLabel class="flex items-center justify-between">
            Notifications
            {#if unreadCount > 0}
              <Badge variant="secondary" class="ml-auto"
                >{unreadCount} new</Badge
              >
            {/if}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {#if notifications.length > 0}
            {#each notifications as notification}
              <DropdownMenuItem class="flex flex-col items-start gap-1 p-3">
                <div class="flex w-full items-center justify-between">
                  <span class="font-medium text-sm">{notification.title}</span>
                  {#if !notification.read}
                    <div class="h-2 w-2 rounded-full bg-primary"></div>
                  {/if}
                </div>
                <span class="text-xs text-muted-foreground"
                  >{notification.time}</span
                >
              </DropdownMenuItem>
            {/each}
            <DropdownMenuSeparator />
            <DropdownMenuItem class="justify-center text-sm">
              View all notifications
            </DropdownMenuItem>
          {:else}
            <div class="p-8 text-center text-sm text-muted-foreground">
              No new notifications
            </div>
          {/if}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</header>
