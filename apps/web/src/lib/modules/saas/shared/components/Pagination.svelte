<script lang="ts">
  import { Button } from "@ui/components";
  import { ChevronLeftIcon, ChevronRightIcon } from "lucide-svelte";

  interface Props {
    className?: string;
    currentPage: number;
    totalItems: number;
    onChangeCurrentPage: (page: number) => void;
    itemsPerPage: number;
  }

  let {
    className = "",
    currentPage,
    totalItems,
    onChangeCurrentPage,
    itemsPerPage
  }: Props = $props();

  const numberOfPages = Math.ceil(totalItems / itemsPerPage);
</script>

<div class={className}>
  <div class="flex items-center justify-center gap-4">
    <Button
      variant="ghost"
      size="icon"
      disabled={currentPage === 1}
      on:click={() => onChangeCurrentPage(currentPage - 1)}
    >
      <ChevronLeftIcon />
    </Button>
    <span class="text-sm text-gray-500">
      {currentPage * itemsPerPage - itemsPerPage + 1} -{" "}
      {currentPage * itemsPerPage > totalItems
        ? totalItems
        : currentPage * itemsPerPage}{" "}
      of {totalItems}
    </span>
    <Button
      variant="ghost"
      size="icon"
      disabled={currentPage === numberOfPages}
      on:click={() => onChangeCurrentPage(currentPage + 1)}
    >
      <ChevronRightIcon />
    </Button>
  </div>
</div>
