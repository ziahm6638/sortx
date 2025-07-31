<script lang="ts">
  import { navigating, page } from "$app/state";
  import type { User } from "$lib/types";
  import ColorModeToggle from "@shared/components/ColorModeToggle.svelte";
  import { Button, Sheet, SheetContent } from "@ui/components";
  import LinkButton from "@ui/components/LinkButton.svelte";
  import { MenuIcon } from "lucide-svelte";

  interface Props {
    user: User;
  }

  let { user }: Props = $props();
  let y: number = $state(0);
  let mobileMenuOpen = $state(false);
  let isTop = $derived(y < 10);

  const menuItems: {
    label: string;
    href: string;
  }[] = [
    {
      label: "Pricing",
      href: `/pricing`,
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "Changelog",
      href: "/changelog",
    },
  ];

  $effect(() => {
    if (navigating !== null && navigating.type !== null) {
      mobileMenuOpen = false;
    }
  });

  import SortXLogo from "@shared/lib/sortx-logo-new.svg?component";
</script>

<svelte:window bind:scrollY={y} />

<nav
  class={`fixed left-0 top-0 z-20 w-full ${isTop ? "shadow-none" : "bg-background/80 shadow-sm backdrop-blur-lg"}`}
  data-test="navigation"
>
  <div class="container">
    <div
      class={`flex items-center justify-stretch gap-6 transition-[padding] duration-150 ease-in-out ${isTop ? "py-8" : "py-4"}`}
    >
      <div class="flex flex-1 justify-start items-center">
        <a href="/" class="block">
          <SortXLogo width="150px" />
        </a>
      </div>

      <div class="hidden flex-1 items-center justify-center md:flex">
        {#each menuItems as menuItem}
          <a
            href={menuItem.href}
            class={`block px-3 py-2 text-sm ${
              page.url.pathname.includes(menuItem.href)
                ? "font-bold text-foreground"
                : "font-medium"
            }`}
          >
            {menuItem.label}
          </a>
        {/each}
      </div>

      <div class="flex flex-1 items-center justify-end gap-3">
        <ColorModeToggle />

        <Button
          class="md:hidden"
          size="icon"
          variant="outline"
          onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
        >
          <MenuIcon />
        </Button>

        <Sheet
          open={mobileMenuOpen}
          onOpenChange={() => (mobileMenuOpen = !mobileMenuOpen)}
        >
          <SheetContent class="w-[250px]" side="right">
            <div class="flex flex-col items-start justify-center">
              {#each menuItems as menuItem}
                <a href={menuItem.href} class="block px-3 py-2 text-sm">
                  {menuItem.label}
                </a>
              {/each}

              {#if user}
                <a href="/app/dashboard" class="block px-3 py-2 text-sm">
                  Dashboard
                </a>
              {:else}
                <a href="/auth/login" class="block px-3 py-2 text-sm">
                  Sign In
                </a>
                <a
                  href="/auth/signup"
                  class="block px-3 py-2 text-sm font-semibold"
                >
                  Sign Up
                </a>
              {/if}
            </div>
          </SheetContent>
        </Sheet>

        {#if user}
          <LinkButton
            class="hidden md:flex"
            href="/app/dashboard"
            variant="secondary">Dashboard</LinkButton
          >
        {:else}
          <LinkButton href="/auth/login" class="hidden md:flex" variant="ghost">
            Sign In
          </LinkButton>
          <LinkButton
            href="/auth/signup"
            class="hidden md:flex"
            variant="secondary"
          >
            Sign Up
          </LinkButton>
        {/if}
      </div>
    </div>
  </div>
</nav>
