<script lang="ts">
  import { formatDate, formatDistance, parseISO } from "date-fns";
  import type { ChangelogItem } from "../types";

  interface Props {
    items: ChangelogItem[];
  }

  let { items }: Props = $props();
</script>

<section id="changelog">
  <div class="mx-auto grid w-full max-w-xl grid-cols-1 gap-4 text-left">
    {#each items as item}
      <div class="rounded-xl bg-card/50 p-6">
        <small
          class="inline-block rounded-full border border-highlight/50 px-2 py-0.5 text-xs font-semibold text-highlight"
          title={formatDate(parseISO(item.date), "yyyy-MM-dd")}
        >
          {formatDistance(parseISO(item.date), new Date(), {
            addSuffix: true,
          })}
        </small>
        <ul class="mt-4 list-disc space-y-2 pl-6">
          {#each item.changes as change}
            <li>{change}</li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</section>
