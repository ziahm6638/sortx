<script lang="ts">
  import {
    Badge,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@ui/components";

  interface Props {
    title: string;
    value: number;
    valueFormat: "currency" | "number" | "percentage";
    context?: string;
    trend?: number | undefined;
  }

  let {
    title,
    value,
    valueFormat,
    context = "",
    trend = undefined
  }: Props = $props();

  let formattedValue: string = $state();
  if (valueFormat === "currency") {
    formattedValue = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  } else if (valueFormat === "percentage") {
    formattedValue = new Intl.NumberFormat("default", {
      style: "percent",
    }).format(value / 100);
  } else if (valueFormat === "number") {
    formattedValue = value.toString();
  }
  let formattedTrend: string | null = $state();
  if (!trend) {
    formattedTrend = null;
  } else {
    const formattedTrendValue = new Intl.NumberFormat("default", {
      style: "percent",
    }).format(trend);
    formattedTrend =
      trend >= 0 ? `+${formattedTrendValue}` : formattedTrendValue;
  }
</script>

<Card>
  <CardHeader className="pb-2">
    <CardTitle className="text-muted-foreground text-sm">{title}</CardTitle>
  </CardHeader>
  <CardContent>
    <div class="flex items-center justify-between">
      <strong class="text-2xl font-bold">
        {formattedValue}
        {#if context}
          <small>{context}</small>
        {/if}
      </strong>
      {#if trend}
        <Badge status={trend > 0 ? "success" : "error"}>
          {formattedTrend}
        </Badge>
      {/if}
    </div>
  </CardContent>
</Card>
