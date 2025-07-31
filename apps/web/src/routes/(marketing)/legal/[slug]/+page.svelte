<script lang="ts">
  import PostContent from "@marketing/blog/components/PostContent.svelte";
  import type { PageData } from "./$types";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
  let content = $derived(data.content);
  let title = $derived(data.meta.title);
</script>

<div class="container max-w-6xl pb-24 pt-32">
  <div class="mx-auto mb-12 max-w-2xl">
    <h1 class="text-center text-4xl font-bold">{title}</h1>
  </div>

  <PostContent {content} />
</div>
