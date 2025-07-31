<script lang="ts">
  import { roleOptions } from "$lib/modules/saas/shared/constants";
  import type { RoleOption } from "$lib/types";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@ui/components";
  import type { TeamMemberRoleType } from "database";

  interface Props {
    value: TeamMemberRoleType;
    onSelect: (selected: RoleOption | unknown) => void;
    disabled: boolean;
  }

  let { value, onSelect, disabled }: Props = $props();

  const selectedLabel = roleOptions.find(
    (roleOption) => roleOption.value === value,
  )?.label;
  const selected = { label: selectedLabel, value };
</script>

<Select {disabled} {selected} onSelectedChange={onSelect}>
  <SelectTrigger>
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
