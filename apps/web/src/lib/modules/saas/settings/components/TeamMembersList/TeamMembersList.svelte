<!-- @migration-task Error while migrating Svelte code: Can't migrate code with afterUpdate. Please migrate by hand. -->
<script lang="ts">
  import UserActionCell from "$lib/modules/saas/settings/components/TeamMembersList/UserActionCell.svelte";
  import {
    renderComponent,
    createSvelteTable,
    flexRender,
    getCoreRowModel,
  } from "@tanstack/svelte-table";
  import UserCell from "$lib/modules/saas/settings/components/TeamMembersList/UserCell.svelte";
  import { Table, TableBody, TableCell, TableRow } from "@ui/components";
  import type { ColumnDef, TableOptions } from "@tanstack/svelte-table";
  import type { ApiOutput } from "api/trpc/router";
  import { writable } from "svelte/store";
  import type { User } from "$lib/types";
  import { afterUpdate } from "svelte";

  type TeamMembershipsOutput = ApiOutput["team"]["memberships"];

  export let user: User;
  export let memberships: TeamMembershipsOutput;
  export let currentTeamMembership: TeamMembershipsOutput[number];

  const columns: ColumnDef<TeamMembershipsOutput[number]>[] = [
    {
      accessorKey: "user",
      header: "",
      accessorFn: (row) => row.user,
      cell: ({ row }) => renderComponent(UserCell, { row }),
    },
    {
      accessorKey: "actions",
      header: "",
      cell: ({ row }) =>
        renderComponent(UserActionCell, { row, user, currentTeamMembership }),
    },
  ];

  const options = writable<TableOptions<TeamMembershipsOutput[number]>>({
    data: memberships,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  afterUpdate(() => {
    options.update(() => {
      return {
        data: memberships,
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
