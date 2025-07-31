<script lang="ts">
  import ChangelogSection from "@marketing/changelog/components/ChangelogSection.svelte";

  const changelogItems = [
    {
      date: "2024-03-01",
      changes: ["🚀 Improved performance"],
    },
    {
      date: "2024-02-01",
      changes: ["🎨 Updated design", "🐞 Fixed a bug"],
    },
    {
      date: "2024-01-01",
      changes: ["🎉 Added new feature", "🐞 Fixed a bug"],
    },
  ];
</script>

<div class="container max-w-3xl pb-16 pt-32">
  <div class="mb-12 text-balance pt-8 text-center">
    <h1 class="mb-2 text-5xl font-bold">Changelog</h1>
    <p class="text-lg opacity-50">
      Stay up to date with the latest changes in our product.
    </p>
  </div>
  <ChangelogSection items={changelogItems} />
</div>
