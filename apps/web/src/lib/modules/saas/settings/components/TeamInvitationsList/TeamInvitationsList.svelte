<!-- @migration-task Error while migrating Svelte code: Can't migrate code with afterUpdate. Please migrate by hand. -->
<script lang="ts">
  import {
    renderComponent,
    type ColumnDef,
    type TableOptions,
    getCoreRowModel,
    flexRender,
    createSvelteTable,
  } from "@tanstack/svelte-table";
  import InvitationActionCell from "$lib/modules/saas/settings/components/TeamInvitationsList/InvitationActionCell.svelte";
  import EmailCell from "$lib/modules/saas/settings/components/TeamInvitationsList/EmailCell.svelte";
  import { Table, TableBody, TableCell, TableRow } from "@ui/components";
  import type { ApiOutput } from "api/trpc/router";
  import { writable } from "svelte/store";
  import { afterUpdate } from "svelte";

  type TeamInvitations = ApiOutput["team"]["invitations"];
  type TeamMembershipsOutput = ApiOutput["team"]["memberships"];

  export let invitations: TeamInvitations;
  export let currentTeamMembership: TeamMembershipsOutput[number];

  const columns: ColumnDef<TeamInvitations[number]>[] = [
    {
      accessorKey: "email",
      accessorFn: (row) => row.email,
      cell: ({ row }) => renderComponent(EmailCell, { row }),
    },
    {
      accessorKey: "actions",
      header: "",
      cell: ({ row }) =>
        renderComponent(InvitationActionCell, { row, currentTeamMembership }),
    },
  ];

  const options = writable<TableOptions<TeamInvitations[number]>>({
    data: invitations,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  afterUpdate(() => {
    options.update(() => {
      return {
        data: invitations,
        columns,
        getCoreRowModel: getCoreRowModel(),
      };
    });
  });

  const table = createSvelteTable(options);
</script>

<div class="rounded-md border">
  <Table>
    <TableBody>
      {#if $table.getRowModel().rows.length}
        {#each $table.getRowModel().rows as row}
          <TableRow>
            {#each row.getVisibleCells() as cell}
              <TableCell>
                <svelte:component
                  this={flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext(),
                  )}
                />
              </TableCell>
            {/each}
          </TableRow>
        {/each}
      {:else}
        <TableRow>
          <TableCell class="h-24 text-center">No results</TableCell>
        </TableRow>
      {/if}
    </TableBody>
  </Table>
</div>
