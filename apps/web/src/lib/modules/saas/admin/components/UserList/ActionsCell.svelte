<script lang="ts">
  import { page } from "$app/state";
  import { apiClient } from "@shared/lib/ApiClient";
  import type { Row } from "@tanstack/svelte-table";
  import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    toast,
  } from "@ui/components";
  import type { ApiOutput } from "api/trpc/router";
  import {
    MoreVerticalIcon,
    Repeat1Icon,
    SquareUserRoundIcon,
    TrashIcon,
  } from "lucide-svelte";

  type Users = ApiOutput["admin"]["users"]["users"];


  interface Props {
    row: Row<Users[number]>;
    impersonateUser: (userId: string, name: string) => void;
    resendVerificationMail: (id: string) => void;
    deleteUser: (id: string) => void;
  }

  let {
    row,
    impersonateUser,
    resendVerificationMail,
    deleteUser
  }: Props = $props();
</script>

<div class="flex flex-row justify-end gap-2">
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button size="icon" variant="ghost">
        <MoreVerticalIcon class="size-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem
        inset={false}
        on:click={() =>
          impersonateUser(
            row.original.id,
            row.original.name ?? row.original.email,
          )}
      >
        <SquareUserRoundIcon class="mr-2 size-4" />
        Impersonate
      </DropdownMenuItem>

      {#if !row.original.emailVerified}
        <DropdownMenuItem
          inset={false}
          on:click={() => resendVerificationMail(row.original.id)}
        >
          <Repeat1Icon class="mr-2 size-4" />
          Resend verification mail
        </DropdownMenuItem>
      {/if}

      <DropdownMenuItem
        inset={false}
        on:click={() => deleteUser(row.original.id)}
      >
        <span class="flex items-center text-destructive hover:text-destructive">
          <TrashIcon class="mr-2 size-4" />
          Delete
        </span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</div>
