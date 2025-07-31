<script lang="ts">
  import {
    createSvelteTable,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type TableOptions,
  } from "@tanstack/svelte-table";
  import {
    Badge,
    Button,
    Input,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@ui/components";
  import {
    BuildingIcon,
    PlusIcon,
    SearchIcon,
    SortAscIcon,
    SortDescIcon,
  } from "lucide-svelte";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  // Property types
  interface Property {
    id: string;
    fullAddress: string;
    type: "apartment" | "house" | "condo" | "townhouse" | "studio";
    rooms: number;
    bathrooms: number;
    tenant: {
      name: string;
      avatar?: string;
      email: string;
    } | null;
    ticketsOpen: number;
    status: "active" | "archive" | "draft";
    rent: number;
    createdAt: string;
    updatedAt: string;
  }

  // State management
  let currentTab: "active" | "archive" | "draft" = $state("active");
  let searchTerm = $state("");
  let isLoading = $state(false);
  let sorting = $state<SortingState>([]);
  let columnFilters = $state<ColumnFiltersState>([]);
  let selectedPropertyType = $state<string>("");
  let selectedRooms = $state<string>("");

  // Dummy data generator
  function generateDummyProperties(): Property[] {
    const addresses = [
      "123 Oak Street, Downtown, NY 10001",
      "456 Maple Avenue, Midtown, NY 10002",
      "789 Pine Road, Upper East Side, NY 10003",
      "321 Cedar Lane, Brooklyn, NY 11201",
      "654 Birch Street, Queens, NY 11101",
      "987 Elm Drive, Manhattan, NY 10004",
      "147 Willow Court, Bronx, NY 10451",
      "258 Aspen Way, Staten Island, NY 10301",
    ];

    const types: Property["type"][] = [
      "apartment",
      "house",
      "condo",
      "townhouse",
      "studio",
    ];
    const statuses: Property["status"][] = ["active", "archive", "draft"];
    const tenants = [
      { name: "John Smith", email: "john@example.com" },
      { name: "Sarah Johnson", email: "sarah@example.com" },
      { name: "Michael Brown", email: "michael@example.com" },
      { name: "Emily Davis", email: "emily@example.com" },
      { name: "David Wilson", email: "david@example.com" },
      null, // vacant property
    ];

    return addresses.map((address, index) => ({
      id: `prop-${index + 1}`,
      fullAddress: address,
      type: types[index % types.length],
      rooms: Math.floor(Math.random() * 4) + 1,
      bathrooms: Math.floor(Math.random() * 3) + 1,
      tenant: tenants[index % tenants.length],
      ticketsOpen: Math.floor(Math.random() * 5),
      status: statuses[index % statuses.length],
      rent: Math.floor(Math.random() * 3000) + 1500,
      createdAt: new Date(
        Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      updatedAt: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
      ).toISOString(),
    }));
  }

  // Data
  let allProperties = $state<Property[]>(generateDummyProperties());
  let filteredProperties = $derived(
    allProperties.filter((property) => {
      const matchesTab = property.status === currentTab;
      const matchesSearch =
        searchTerm === "" ||
        property.fullAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.tenant?.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        property.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        selectedPropertyType === "" || property.type === selectedPropertyType;
      const matchesRooms =
        selectedRooms === "" || property.rooms.toString() === selectedRooms;

      return matchesTab && matchesSearch && matchesType && matchesRooms;
    }),
  );

  // Property type options
  const propertyTypes = [
    { value: "", label: "All Types" },
    { value: "apartment", label: "Apartment" },
    { value: "house", label: "House" },
    { value: "condo", label: "Condo" },
    { value: "townhouse", label: "Townhouse" },
    { value: "studio", label: "Studio" },
  ];

  const roomOptions = [
    { value: "", label: "Any Rooms" },
    { value: "1", label: "1 Room" },
    { value: "2", label: "2 Rooms" },
    { value: "3", label: "3 Rooms" },
    { value: "4", label: "4+ Rooms" },
  ];

  // Utility functions
  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  }

  function formatPropertyType(type: string): string {
    return type.charAt(0).toUpperCase() + type.slice(1);
  }

  function getStatusVariant(status: string) {
    switch (status) {
      case "active":
        return "success";
      case "archive":
        return "secondary";
      case "draft":
        return "outline";
      default:
        return "secondary";
    }
  }

  // Table actions
  function handleView(property: Property) {
    console.log("View property:", property.id);
  }

  function handleEdit(property: Property) {
    console.log("Edit property:", property.id);
  }

  function handleDelete(property: Property) {
    console.log("Delete property:", property.id);
  }

  function handleAddProperty() {
    console.log("Add new property");
  }

  // Debounced search
  let searchTimeout: NodeJS.Timeout;
  function handleSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      searchTerm = target.value;
    }, 300);
  }

  // Clear all filters
  function clearFilters() {
    searchTerm = "";
    selectedPropertyType = "";
    selectedRooms = "";
    columnFilters = [];
    sorting = [];
  }

  // Table columns definition
  const columns: ColumnDef<Property>[] = [
    {
      accessorKey: "fullAddress",
      header: "Property",
      cell: ({ row }) => {
        const property = row.original;
        return `
          <div class="flex flex-col gap-1">
            <div class="font-medium text-sm">${property.fullAddress.split(",")[0]}</div>
            <div class="text-xs text-muted-foreground flex items-center gap-1">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
              </svg>
              ${property.fullAddress.split(",").slice(1).join(",").trim()}
            </div>
          </div>
        `;
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("type") as string;
        return `<span class="px-2 py-1 text-xs bg-muted rounded-md font-medium">${formatPropertyType(type)}</span>`;
      },
    },
    {
      accessorKey: "rooms",
      header: "Rooms",
      cell: ({ row }) => {
        const property = row.original;
        return `
          <div class="flex items-center gap-3 text-sm">
            <div class="flex items-center gap-1">
              <svg class="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 21l0-12 8 0 0 12"></path>
              </svg>
              <span class="font-medium">${property.rooms}</span>
            </div>
            <div class="flex items-center gap-1">
              <svg class="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path>
              </svg>
              <span class="font-medium">${property.bathrooms}</span>
            </div>
          </div>
        `;
      },
    },
    {
      accessorKey: "tenant",
      header: "Tenant",
      cell: ({ row }) => {
        const tenant = row.getValue("tenant") as Property["tenant"];
        if (!tenant) {
          return '<span class="text-muted-foreground text-sm">Vacant</span>';
        }
        return `
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span class="text-xs font-medium text-primary">${tenant.name
                .split(" ")
                .map((n) => n[0])
                .join("")}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-sm font-medium">${tenant.name}</span>
              <span class="text-xs text-muted-foreground">${tenant.email}</span>
            </div>
          </div>
        `;
      },
    },
    {
      accessorKey: "ticketsOpen",
      header: "Open Tickets",
      cell: ({ row }) => {
        const tickets = row.getValue("ticketsOpen") as number;
        if (tickets === 0) {
          return '<span class="text-muted-foreground text-sm">None</span>';
        }
        const variant =
          tickets > 2 ? "destructive" : tickets > 0 ? "secondary" : "outline";
        return `<span class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-md bg-${variant === "destructive" ? "red-100 text-red-800" : variant === "secondary" ? "orange-100 text-orange-800" : "gray-100 text-gray-800"}">${tickets} ${tickets === 1 ? "ticket" : "tickets"}</span>`;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const property = row.original;
        return `
          <div class="flex items-center gap-1">
            <button class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8" onclick="console.log('View ${property.id}')">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </button>
            <button class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8" onclick="console.log('Edit ${property.id}')">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </button>
            <button class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 text-destructive" onclick="console.log('Delete ${property.id}')">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        `;
      },
    },
  ];

  // Create table with reactive updates
  let table = $derived.by(() => {
    const tableOptions: TableOptions<Property> = {
      data: filteredProperties,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: {
        sorting,
        columnFilters,
      },
      onSortingChange: (updater) => {
        if (typeof updater === "function") {
          sorting = updater(sorting);
        } else {
          sorting = updater;
        }
      },
      onColumnFiltersChange: (updater) => {
        if (typeof updater === "function") {
          columnFilters = updater(columnFilters);
        } else {
          columnFilters = updater;
        }
      },
    };

    return createSvelteTable(writable(tableOptions));
  });

  // Tab counts
  let tabCounts = $derived({
    active: allProperties.filter((p) => p.status === "active").length,
    archive: allProperties.filter((p) => p.status === "archive").length,
    draft: allProperties.filter((p) => p.status === "draft").length,
  });

  onMount(() => {
    // Simulate initial loading
    isLoading = true;
    setTimeout(() => {
      isLoading = false;
    }, 1000);
  });
</script>

<!-- Page Header -->
<div class="flex flex-col gap-6">
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-primary/10 rounded-lg">
        <BuildingIcon class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Properties</h1>
        <p class="text-muted-foreground">Manage your property portfolio</p>
      </div>
    </div>
    <Button onclick={handleAddProperty} class="gap-2">
      <PlusIcon class="w-4 h-4" />
      Add Property
    </Button>
  </div>

  <!-- Search and Filters -->
  <div class="flex flex-col sm:flex-row gap-4">
    <div class="relative flex-1">
      <SearchIcon
        class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground"
      />
      <Input
        type="search"
        placeholder="Search properties, tenants, or addresses..."
        class="pl-10"
        oninput={handleSearchInput}
      />
    </div>
    <div class="flex gap-2">
      <select
        bind:value={selectedPropertyType}
        class="px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {#each propertyTypes as type}
          <option value={type.value}>{type.label}</option>
        {/each}
      </select>
      <select
        bind:value={selectedRooms}
        class="px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {#each roomOptions as room}
          <option value={room.value}>{room.label}</option>
        {/each}
      </select>
      {#if searchTerm || selectedPropertyType || selectedRooms}
        <Button variant="outline" size="sm" onclick={clearFilters}>
          Clear
        </Button>
      {/if}
    </div>
  </div>

  <!-- Tabs -->
  <Tabs bind:value={currentTab} class="w-full">
    <TabsList class="grid  grid-cols-3 w-1/2">
      <TabsTrigger value="active" class="gap-2">
        Active
        <Badge variant="secondary" class="text-xs">{tabCounts.active}</Badge>
      </TabsTrigger>
      <TabsTrigger value="archive" class="gap-2">
        Archive
        <Badge variant="secondary" class="text-xs">{tabCounts.archive}</Badge>
      </TabsTrigger>
      <TabsTrigger value="draft" class="gap-2">
        Draft
        <Badge variant="secondary" class="text-xs">{tabCounts.draft}</Badge>
      </TabsTrigger>
    </TabsList>

    <!-- Active Properties -->
    <TabsContent value="active" class="mt-6">
      <div class="rounded-lg border bg-card">
        {#if isLoading}
          <!-- Loading State -->
          <div class="p-6">
            <div class="space-y-4">
              {#each Array(5) as _}
                <div class="flex items-center space-x-4">
                  <Skeleton class="h-12 w-12 rounded-full" />
                  <div class="space-y-2 flex-1">
                    <Skeleton class="h-4 w-[250px]" />
                    <Skeleton class="h-4 w-[200px]" />
                  </div>
                  <Skeleton class="h-8 w-[80px]" />
                  <Skeleton class="h-8 w-[100px]" />
                </div>
              {/each}
            </div>
          </div>
        {:else if filteredProperties.length === 0}
          <!-- Empty State -->
          <div
            class="flex flex-col items-center justify-center py-16 px-6 text-center"
          >
            <div class="p-4 bg-muted/50 rounded-full mb-4">
              <BuildingIcon class="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 class="text-lg font-semibold mb-2">
              {#if searchTerm || selectedPropertyType || selectedRooms}
                No properties match your filters
              {:else}
                No active properties yet
              {/if}
            </h3>
            <p class="text-muted-foreground mb-6 max-w-sm">
              {#if searchTerm || selectedPropertyType || selectedRooms}
                Try adjusting your search criteria or filters to find what
                you're looking for.
              {:else}
                Get started by adding your first property to the system.
              {/if}
            </p>
            {#if searchTerm || selectedPropertyType || selectedRooms}
              <Button variant="outline" onclick={clearFilters}>
                Clear Filters
              </Button>
            {:else}
              <Button onclick={handleAddProperty} class="gap-2">
                <PlusIcon class="w-4 h-4" />
                Add First Property
              </Button>
            {/if}
          </div>
        {:else}
          <!-- Properties Table -->
          <Table>
            <TableHeader>
              <TableRow>
                {#each $table.getHeaderGroups() as headerGroup}
                  {#each headerGroup.headers as header}
                    <TableHead
                      class="cursor-pointer select-none {header.column.getCanSort()
                        ? 'hover:bg-muted/50'
                        : ''}"
                      onclick={() =>
                        header.column.getCanSort() &&
                        header.column.toggleSorting()}
                    >
                      <div class="flex items-center gap-2">
                        <svelte:component
                          this={flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        />
                        {#if header.column.getCanSort()}
                          {#if header.column.getIsSorted() === "asc"}
                            <SortAscIcon class="w-4 h-4" />
                          {:else if header.column.getIsSorted() === "desc"}
                            <SortDescIcon class="w-4 h-4" />
                          {:else}
                            <div class="w-4 h-4"></div>
                          {/if}
                        {/if}
                      </div>
                    </TableHead>
                  {/each}
                {/each}
              </TableRow>
            </TableHeader>
            <TableBody>
              {#each $table.getRowModel().rows as row}
                <TableRow class="hover:bg-muted/50 transition-colors">
                  {#each row.getVisibleCells() as cell}
                    <TableCell>
                      {@html flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  {/each}
                </TableRow>
              {/each}
            </TableBody>
          </Table>
        {/if}
      </div>
    </TabsContent>

    <!-- Archive Properties -->
    <TabsContent value="archive" class="mt-6">
      <div class="rounded-lg border bg-card">
        {#if allProperties.filter((p) => p.status === "archive").length === 0}
          <div
            class="flex flex-col items-center justify-center py-16 px-6 text-center"
          >
            <div class="p-4 bg-muted/50 rounded-full mb-4">
              <BuildingIcon class="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 class="text-lg font-semibold mb-2">No archived properties</h3>
            <p class="text-muted-foreground mb-6 max-w-sm">
              Properties that are no longer active will appear here.
            </p>
          </div>
        {:else}
          <!-- Archived Properties Table (same structure as active) -->
          <Table>
            <TableHeader>
              <TableRow>
                {#each $table.getHeaderGroups() as headerGroup}
                  {#each headerGroup.headers as header}
                    <TableHead
                      class="cursor-pointer select-none {header.column.getCanSort()
                        ? 'hover:bg-muted/50'
                        : ''}"
                      onclick={() =>
                        header.column.getCanSort() &&
                        header.column.toggleSorting()}
                    >
                      <div class="flex items-center gap-2">
                        <svelte:component
                          this={flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        />
                        {#if header.column.getCanSort()}
                          {#if header.column.getIsSorted() === "asc"}
                            <SortAscIcon class="w-4 h-4" />
                          {:else if header.column.getIsSorted() === "desc"}
                            <SortDescIcon class="w-4 h-4" />
                          {:else}
                            <div class="w-4 h-4"></div>
                          {/if}
                        {/if}
                      </div>
                    </TableHead>
                  {/each}
                {/each}
              </TableRow>
            </TableHeader>
            <TableBody>
              {#each $table.getRowModel().rows as row}
                <TableRow
                  class="hover:bg-muted/50 transition-colors opacity-75"
                >
                  {#each row.getVisibleCells() as cell}
                    <TableCell>
                      {@html flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  {/each}
                </TableRow>
              {/each}
            </TableBody>
          </Table>
        {/if}
      </div>
    </TabsContent>

    <!-- Draft Properties -->
    <TabsContent value="draft" class="mt-6">
      <div class="rounded-lg border bg-card">
        {#if allProperties.filter((p) => p.status === "draft").length === 0}
          <div
            class="flex flex-col items-center justify-center py-16 px-6 text-center"
          >
            <div class="p-4 bg-muted/50 rounded-full mb-4">
              <BuildingIcon class="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 class="text-lg font-semibold mb-2">No draft properties</h3>
            <p class="text-muted-foreground mb-6 max-w-sm">
              Properties being prepared for listing will appear here.
            </p>
            <Button onclick={handleAddProperty} class="gap-2">
              <PlusIcon class="w-4 h-4" />
              Create Draft Property
            </Button>
          </div>
        {:else}
          <!-- Draft Properties Table (same structure as active) -->
          <Table>
            <TableHeader>
              <TableRow>
                {#each $table.getHeaderGroups() as headerGroup}
                  {#each headerGroup.headers as header}
                    <TableHead
                      class="cursor-pointer select-none {header.column.getCanSort()
                        ? 'hover:bg-muted/50'
                        : ''}"
                      onclick={() =>
                        header.column.getCanSort() &&
                        header.column.toggleSorting()}
                    >
                      <div class="flex items-center gap-2">
                        <svelte:component
                          this={flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        />
                        {#if header.column.getCanSort()}
                          {#if header.column.getIsSorted() === "asc"}
                            <SortAscIcon class="w-4 h-4" />
                          {:else if header.column.getIsSorted() === "desc"}
                            <SortDescIcon class="w-4 h-4" />
                          {:else}
                            <div class="w-4 h-4"></div>
                          {/if}
                        {/if}
                      </div>
                    </TableHead>
                  {/each}
                {/each}
              </TableRow>
            </TableHeader>
            <TableBody>
              {#each $table.getRowModel().rows as row}
                <TableRow class="hover:bg-muted/50 transition-colors">
                  {#each row.getVisibleCells() as cell}
                    <TableCell>
                      {@html flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  {/each}
                </TableRow>
              {/each}
            </TableBody>
          </Table>
        {/if}
      </div>
    </TabsContent>
  </Tabs>
</div>

<style>
  /* Custom utility classes for property cards - using regular CSS to avoid @apply warnings */
  :global(.property-hover) {
    transition: all 200ms ease-in-out;
  }

  :global(.property-hover:hover) {
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1);
  }
</style>
