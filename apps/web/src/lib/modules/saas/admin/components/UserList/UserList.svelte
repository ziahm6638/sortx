<!-- @migration-task Error while migrating Svelte code: Can't migrate code with afterUpdate. Please migrate by hand. -->
<script lang="ts">
  import { page } from "$app/stores";
  import Pagination from "$lib/modules/saas/shared/components/Pagination.svelte";
  import { apiClient } from "@shared/lib/ApiClient";
  import {
    createSvelteTable,
    flexRender,
    getCoreRowModel,
    renderComponent,
    type ColumnDef,
    type TableOptions,
  } from "@tanstack/svelte-table";
  import {
    Input,
    Table,
    TableBody,
    TableCell,
    TableRow,
    toast,
  } from "@ui/components";
  import type { ApiOutput } from "api/trpc/router";
  import { LoaderIcon } from "lucide-svelte";
  import { afterUpdate, onMount } from "svelte";
  import { writable } from "svelte/store";
  import ActionsCell from "./ActionsCell.svelte";
  import UserCell from "./UserCell.svelte";

  const itemsPerPage = 10;
  let currentPage = 1;
  let searchTerm = "";
  let users: ApiOutput["admin"]["users"]["users"] = [];
  let total: number;
  let isLoading = false;

  function setCurrentPage(page: number) {
    currentPage = page;
  }

  function onSearchTermChange(event: Event) {
    const target = event.target as HTMLInputElement;
    searchTerm = target.value;
    fetchData();
  }

  onMount(async () => {
    await fetchData();
  });

  async function fetchData() {
    isLoading = true;
    const data = await apiClient($page).admin.users.query({
      limit: itemsPerPage,
      offset: (currentPage - 1) * itemsPerPage,
      searchTerm,
    });
    users = data.users;
    total = data.total;
    isLoading = false;
    return { users, total };
  }

  const impersonateUser = async (userId: string, name: string) => {
    const impersonateUserToastId = toast.loading(`Impersonating as ${name}`);
    await apiClient($page).admin.impersonate.mutate({ userId });
    toast.dismiss(impersonateUserToastId);
    const redirectUrl = new URL(
      "/app/dashboard",
      window.location.origin,
    ).toString();
    window.location.href = redirectUrl;
  };

  const deleteUser = async (id: string) => {
    toast.promise(
      async () => {
        await apiClient($page).admin.deleteUser.mutate({ id });
      },
      {
        loading: "Deleting user...",
        success: "User has been deleted successfully!",
        error: "User could not be deleted. Please try again.",
      },
    );
  };

  const resendVerificationMail = async (userId: string) => {
    toast.promise(
      async () => {
        await apiClient($page).admin.resendVerificationMail.mutate({ userId });
      },
      {
        loading: "Resending verification mail...",
        success: "Verification mail has been sent.",
        error: "Could not resend verification mail. Please try again.",
      },
    );
  };

  const columns: ColumnDef<ApiOutput["admin"]["users"]["users"][number]>[] = [
    {
      accessorKey: "user",
      header: "",
      accessorFn: (row) => row.name,
      cell: ({ row }) => renderComponent(UserCell, { row }),
    },
    {
      accessorKey: "actions",
      header: "",
      cell: ({ row }) =>
        renderComponent(ActionsCell, {
          row,
          impersonateUser,
          deleteUser,
          resendVerificationMail,
        }),
    },
  ];

  const options = writable<
    TableOptions<ApiOutput["admin"]["users"]["users"][number]>
  >({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  afterUpdate(() => {
    options.update(() => {
      return {
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),
      };
    });
  });

  const table = createSvelteTable(options);
</script>

<div class="rounded-lg bg-card p-6 shadow-sm">
  <h2 class="mb-4 text-2xl font-semibold">Manage users</h2>
  <Input
    type="search"
    placeholder="Search for name or email..."
    on:input={onSearchTermChange}
    class="mb-4"
  />

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
            <TableCell colspan={columns.length} class="h-24 text-center">
              {#if isLoading}
                <div class="flex h-full items-center justify-center">
                  <LoaderIcon class="mr-2 size-4 animate-spin text-primary" />
                  Loading users...
                </div>
              {:else}
                <p>No results.</p>
              {/if}
            </TableCell>
          </TableRow>
        {/if}
      </TableBody>
    </Table>
  </div>

  {#if users.length > 0}
    <Pagination
      className="mt-4"
      totalItems={total ?? 0}
      {itemsPerPage}
      {currentPage}
      onChangeCurrentPage={setCurrentPage}
    />
  {/if}
</div>
