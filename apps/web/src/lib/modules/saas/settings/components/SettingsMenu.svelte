<script lang="ts">
  import { page } from "$app/state";
  import type { MenuItems } from "$lib/types";

  interface Props {
    menuItems: MenuItems;
  }

  let { menuItems }: Props = $props();
</script>

<div class="space-y-8">
  {#each menuItems as item}
    <div>
      <div class="flex items-center justify-start gap-2">
        <!-- {item.avatar} -->
        <item.avatar.component {...item.avatar.props} />
        <h2 class="text-muted-foreground">{item.title}</h2>
      </div>

      <ul class="mt-1 list-none">
        {#each item.items as subitem}
          <li>
            <a
              href={subitem.href}
              class="block py-1.5 pl-10"
              class:font-bold={page.url.pathname.includes(subitem.href)}
            >
              {subitem.title}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  {/each}
</div>
