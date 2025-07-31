<script lang="ts">
  import SideMenu from "$lib/modules/saas/admin/components/SideMenu.svelte";
  import { UsersIcon } from "lucide-svelte";
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="container max-w-6xl py-8">
  <div class="flex flex-col items-start gap-8 md:flex-row">
    <div class="w-full md:max-w-[200px]">
      <SideMenu
        menuItems={[
          {
            title: "Users",
            href: "users",
            icon: UsersIcon,
          },
        ]}
      />
    </div>

    <div class="flex-1">
      {@render children?.()}
    </div>
  </div>
</div>
