<script lang="ts">
  import SettingsMenu from "$lib/modules/saas/settings/components/SettingsMenu.svelte";
  import type { MenuItems } from "$lib/types";
  import TeamAvatar from "@shared/components/TeamAvatar.svelte";
  import UserAvatar from "@shared/components/UserAvatar.svelte";
  import type { LayoutServerData } from "./$types";
  interface Props {
    data: LayoutServerData;
    children?: import("svelte").Snippet;
  }

  let { data, children }: Props = $props();

  let user = $derived(data.user);
  let teamMembership = $derived(data.teamMembership);
  let menuItems: MenuItems = $derived([
    {
      title: "Team",
      avatar: {
        component: TeamAvatar,
        props: {
          avatarUrl: teamMembership?.team.avatarUrl,
          name: teamMembership?.team.name,
          className: "size-8",
        },
      },
      items: [
        {
          title: "General",
          href: `/app/settings/team/general`,
        },
        {
          title: "Members",
          href: `/app/settings/team/members`,
        },
        {
          title: "Billing",
          href: `/app/settings/team/billing`,
        },
      ],
    },
    {
      title: "Account",
      avatar: {
        component: UserAvatar,
        props: {
          name: user?.name,
          avatarUrl: user?.avatarUrl,
        },
      },
      items: [
        {
          title: "General",
          href: `/app/settings/account/general`,
        },
      ],
    },
  ]);
</script>

<div class="container max-w-6xl py-8">
  <div class="align-start flex flex-col gap-8 md:flex-row">
    <div class="w-full md:max-w-[200px]">
      <SettingsMenu {menuItems} />
    </div>

    <div class="flex-1">
      {@render children?.()}
    </div>
  </div>
</div>
