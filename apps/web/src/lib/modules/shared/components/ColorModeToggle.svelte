<script lang="ts">
  import { browser } from "$app/environment";
  import { getThemeState, type Theme } from "@shared/lib/ThemeContext.svelte";
  import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
  } from "@ui/components";
  import { HardDriveIcon, MoonIcon, SunIcon } from "lucide-svelte";
  import { onMount } from "svelte";
  const THEME_KEY = "theme";
  const SYSTEM_THEME = "system";
  const DARK_MODE_MEDIA_QUERY = "(prefers-color-scheme: dark)";
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

  let selectedSystemTheme;
  const themeState = getThemeState();

  function setSelectedSystemTheme() {
    const mql = window.matchMedia(DARK_MODE_MEDIA_QUERY);
    selectedSystemTheme = mql.matches ? "dark" : "light";
  }

  function registerSystemThemeChangeHandler() {
    const mql = window.matchMedia(DARK_MODE_MEDIA_QUERY);

    mql.addEventListener("change", (mqlEvent) => {
      const userSetTheme = localStorage.getItem(THEME_KEY);
      selectedSystemTheme = mqlEvent.matches ? "dark" : "light";
      if (userSetTheme === SYSTEM_THEME) {
        updateTheme(SYSTEM_THEME);
      }
    });
  }

  let theme: string | undefined = $state();
  let resolvedTheme: string | undefined = $state();

  onMount(() => {
    setSelectedSystemTheme();
    registerSystemThemeChangeHandler();

    if (browser) {
      const userSetTheme = localStorage.getItem(THEME_KEY);
      if (userSetTheme) {
        theme = userSetTheme;
        resolvedTheme =
          userSetTheme === SYSTEM_THEME ? selectedSystemTheme! : userSetTheme;
      } else {
        theme = SYSTEM_THEME;
        resolvedTheme = selectedSystemTheme!;
      }
      themeState.setTheme(resolvedTheme as Theme);
    }
  });

  function updateTheme(selectedTheme: string | undefined) {
    const { classList, style } = document.querySelector("html") as HTMLElement;
    if (resolvedTheme) {
      classList.remove(resolvedTheme);
    }
    if (selectedTheme === SYSTEM_THEME) {
      localStorage.setItem(THEME_KEY, SYSTEM_THEME);
      resolvedTheme = selectedSystemTheme!;
    } else {
      resolvedTheme = selectedTheme!;
      localStorage.setItem(THEME_KEY, resolvedTheme);
    }
    theme = selectedTheme!;
    if (resolvedTheme) {
      style.colorScheme = resolvedTheme;
      classList.add(resolvedTheme);
      themeState.setTheme(resolvedTheme as Theme);
    }
  }
</script>

{#if theme}
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button variant="ghost" size="icon" data-test="color-mode-toggle">
        {#if resolvedTheme === "light"}
          <SunIcon class="h-4 w-4" />
        {:else}
          <MoonIcon class="h-4 w-4" />
        {/if}
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent>
      <DropdownMenuRadioGroup value={theme} onValueChange={updateTheme}>
        {#each colorModeOptions as option}
          <DropdownMenuRadioItem
            value={option.value}
            data-test={`color-mode-toggle-item-${option.value}`}
          >
            <option.icon class="mr-2 h-4 w-4 opacity-50" />
            {option.label}
          </DropdownMenuRadioItem>
        {/each}
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
{/if}
