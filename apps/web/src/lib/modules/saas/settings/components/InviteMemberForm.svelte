<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { page } from "$app/state";
  import { roleOptions } from "$lib/modules/saas/shared/constants";
  import type { RoleOption } from "$lib/types";
  import { apiClient } from "@shared/lib/ApiClient";
  import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Input,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    toast,
  } from "@ui/components";
  import type { ApiOutput } from "api/trpc/router";

  interface Props {
    currentTeamMembership: ApiOutput["team"]["memberships"][number];
    teamId: string;
  }

  let { currentTeamMembership, teamId }: Props = $props();

  let email = $state("");
  let selectedRole = $state(
    roleOptions.find((option) => option.value === "MEMBER") as RoleOption,
  );
  let isSubmitting = $state(false);

  function handleRoleChange(role: RoleOption | unknown) {
    selectedRole = role as RoleOption;
  }

  async function handleSubmit(
    event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement },
  ) {
    event.preventDefault();
    try {
      isSubmitting = true;
      await apiClient(page).team.inviteMember.mutate({
        role: selectedRole?.value,
        email,
        teamId,
      });
      await invalidateAll();
      isSubmitting = false;
      email = "";
      await invalidateAll();
      toast.success("The member has been invited.");
    } catch (error) {
      toast.error(
        "We were unable to invite the member. Please try again later.",
      );
    } finally {
      isSubmitting = false;
    }
  }
</script>

{#if currentTeamMembership.role === "OWNER"}
  <Card>
    <CardHeader>
      <CardTitle>Invite new member</CardTitle>
    </CardHeader>
    <CardContent>
      <form onsubmit={handleSubmit} class="@container">
        <div class="@md:flex-row flex flex-col gap-2">
          <div class="flex-1">
            <div class="space-y-2">
              <label
                for="email"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >Email</label
              >
              <Input
                type="email"
                bind:value={email}
                required
                class="border-input placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:border-primary flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
          <div>
            <div class="space-y-2">
              <label
                for="role"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >Role</label
              >
              <Select
                selected={selectedRole}
                onSelectedChange={handleRoleChange}
              >
                <SelectTrigger class="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {#each roleOptions as option}
                    <SelectItem value={option.value}>
                      {option.label}
                    </SelectItem>
                  {/each}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-end border-t pt-3">
          <Button type="submit" loading={isSubmitting}>Invite</Button>
        </div>
      </form>
    </CardContent>
  </Card>
{/if}
