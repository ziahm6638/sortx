<script lang="ts">
  import type { Row } from "@tanstack/svelte-table";
  import type { ApiOutput } from "api/trpc/router";

  type TeamInvitations = ApiOutput["team"]["invitations"];

  interface Props {
    row: Row<TeamInvitations[number]>;
  }

  let { row }: Props = $props();
</script>

<div>{row.original.email}</div>
