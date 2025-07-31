<script lang="ts">
  import ProductNameGenerator from "@saas/ai/components/ProductNameGenerator.svelte";
  import PageHeader from "@saas/shared/components/PageHeader.svelte";
</script>

<div class="container max-w-6xl py-8">
  <PageHeader
    title="AI Demo"
    subtitle="This demo shows an example integration of the OpenAI API"
  />
  <div class="mx-auto max-w-3xl rounded-lg border bg-card p-8 text-foreground">
    <div>
      <p class="mb-4">
        Enter a topic and we will generate some funny product names for you:
      </p>
      <ProductNameGenerator />
    </div>
  </div>
</div>
