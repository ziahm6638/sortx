<script lang="ts">
  import PostListItem from "@marketing/blog/components/PostListItem.svelte";
  import type { PageServerData } from "./$types";

  interface Props {
    data: PageServerData;
  }

  let { data }: Props = $props();
</script>

<div class="container max-w-6xl pt-32 pb-24">
  <div class="mb-12 pt-8 text-center">
    <h1 class="mb-2 text-5xl font-bold">My awesome blog</h1>
    <p class="text-lg opacity-50">Read the latest news from our company</p>
  </div>

  <div class="grid gap-4 md:grid-cols-2">
    {#each data.posts as post}
      <PostListItem {post} />
    {/each}
  </div>
</div>
