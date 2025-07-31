<script lang="ts">
  import type { BadgeProps } from "@ui/components/Badge.svelte";
  import type { SubscriptionStatusType } from "database";
  import { Badge } from "@ui/components";

  interface Props {
    status: SubscriptionStatusType;
  }

  let { status }: Props = $props();

  const badgeLabels: Record<SubscriptionStatusType, string> = {
    ACTIVE: "Active",
    CANCELED: "Canceled",
    EXPIRED: "Expired",
    INCOMPLETE: "Incomplete",
    PAST_DUE: "Past due",
    PAUSED: "Paused",
    TRIALING: "Trialing",
    UNPAID: "Unpaid",
  };

  const badgeColors: Record<SubscriptionStatusType, BadgeProps["status"]> = {
    ACTIVE: "success",
    CANCELED: "error",
    EXPIRED: "error",
    INCOMPLETE: "warning",
    PAST_DUE: "warning",
    PAUSED: "warning",
    TRIALING: "info",
    UNPAID: "error",
  };
</script>

<Badge status={badgeColors[status]}>{badgeLabels[status]}</Badge>
