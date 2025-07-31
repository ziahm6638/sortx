<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import type { User } from "$lib/types";
  import UserAvatar from "@shared/components/UserAvatar.svelte";
  import { apiClient } from "@shared/lib/ApiClient";
  import { getThemeState, type Theme } from "@shared/lib/ThemeContext.svelte";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@ui/components";
  import {
    BookIcon,
    HardDriveIcon,
    LogOutIcon,
    MoonIcon,
    SettingsIcon,
    SunIcon,
  } from "lucide-svelte";

  interface Props {
    user: User | null;
  }

  let { user }: Props = $props();

  const THEME_KEY = "theme";
  const SYSTEM_THEME = "system";
  const colorModeOptions = [
    {
      value: "system",
      label: "System",
      icon: HardDriveIcon,
    },
    {
      value: "light",
      label: "Light",
      icon: SunIcon,
    },
    {
      value: "dark",
      label: "Dark",
      icon: MoonIcon,
    },
  ];
  const themeState = getThemeState();

  function getPreferredColorScheme() {
    const isMediaDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
    return isMediaDarkTheme ? "dark" : "light";
  }
  let theme: string | undefined = $state();
  let resolvedTheme: string | undefined = undefined;

  if (browser) {
    const userSetTheme = localStorage.getItem(THEME_KEY);
    if (userSetTheme) {
      theme = userSetTheme;
      resolvedTheme =
        userSetTheme === SYSTEM_THEME
          ? getPreferredColorScheme()
          : userSetTheme;
    } else {
      theme = SYSTEM_THEME;
      resolvedTheme = getPreferredColorScheme();
    }
    themeState.setTheme(resolvedTheme as Theme);
  }

  function updateTheme(selectedTheme: string | undefined) {
    const { classList, style } = document.querySelector("html") as HTMLElement;
    if (resolvedTheme) {
      classList.remove(resolvedTheme);
    }
    if (selectedTheme === SYSTEM_THEME) {
      localStorage.removeItem(THEME_KEY);
      resolvedTheme = getPreferredColorScheme();
    } else {
      resolvedTheme = selectedTheme!;
      localStorage.setItem(THEME_KEY, resolvedTheme);
    }
    theme = selectedTheme!;
    style.colorScheme = resolvedTheme;
    classList.add(resolvedTheme);
    themeState.setTheme(resolvedTheme as Theme);
  }

  async function logout() {
    await apiClient(page).auth.logout.mutate();
    goto("/");
  }
</script>

<DropdownMenu>
  <DropdownMenuTrigger class="flex flex-1 gap-4">
    <button
      class="focus-visible:ring-primary rounded-full outline-none focus-visible:ring-2"
    >
      <UserAvatar name={user?.name || ""} avatarUrl={user?.avatarUrl || ""} />
    </button>
    <div class="flex-1 overflow-hidden text-left">
      <p class="truncate text-sm font-medium">{user?.name || "User"}</p>
      <p class="truncate text-xs text-muted-foreground">{user?.email}</p>
    </div>
  </DropdownMenuTrigger>

  <DropdownMenuContent align="end">
    <DropdownMenuLabel>
      {user?.name}
      <span class="block text-xs font-normal opacity-70">{user?.email}</span>
    </DropdownMenuLabel>

    <DropdownMenuSeparator />

    <DropdownMenuSub>
      <DropdownMenuSubTrigger inset={false}>
        <SunIcon class="mr-2 h-4 w-4" /> Color mode
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuRadioGroup value={theme} onValueChange={updateTheme}>
          {#each colorModeOptions as colorOption}
            <DropdownMenuRadioItem
              value={colorOption.value}
              data-test={`color-mode-toggle-item-${colorOption.value}`}
            >
              <colorOption.icon class="mr-2 h-4 w-4 opacity" />
              {colorOption.label}
            </DropdownMenuRadioItem>
          {/each}
        </DropdownMenuRadioGroup>
      </DropdownMenuSubContent>
    </DropdownMenuSub>

    <DropdownMenuSeparator />

    <DropdownMenuItem inset={false}>
      <a href={`/app/settings/account/general`} class="flex items-center">
        <SettingsIcon class="mr-2 h-4 w-4" /> Account settings
      </a>
    </DropdownMenuItem>

    <DropdownMenuItem inset={false}>
      <!-- svelte-ignore a11y_invalid_attribute -->
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center"
      >
        <BookIcon class="mr-2 h-4 w-4" /> Documentation
      </a>
    </DropdownMenuItem>

    <DropdownMenuItem on:click={logout} inset={false}>
      <LogOutIcon class="mr-2 h-4 w-4" /> Logout
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
