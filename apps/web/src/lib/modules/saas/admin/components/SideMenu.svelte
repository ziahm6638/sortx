<script lang="ts">
  import { page } from "$app/state";
  import type { AdminMenuItems } from "$lib/types";

  interface Props {
    menuItems: AdminMenuItems;
  }

  let { menuItems }: Props = $props();
</script>

<div class="space-y-8">
  <ul class="list-none">
    {#each menuItems as menuItem}
      <li>
        <a
          href={menuItem.href}
          class="flex items-center gap-2 py-1.5"
          class:font-bold={page.url.pathname.includes(menuItem.href)}
        >
          <menuItem.icon class="size-4" />
          {menuItem.title}
        </a>
      </li>
    {/each}
  </ul>
</div>
