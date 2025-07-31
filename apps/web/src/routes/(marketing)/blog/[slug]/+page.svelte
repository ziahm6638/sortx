<script lang="ts">
  import PostContent from "@marketing/blog/components/PostContent.svelte";
  import type { PageData } from "./$types";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
  const { title, date, authorName, authorImage, tags, image, url, body } =
    data.meta;
</script>

<div class="container max-w-6xl pb-24 pt-32">
  <div class="mx-auto max-w-2xl">
    <div class="mb-12">
      <a href="/blog">&larr; Back to blog</a>
    </div>

    <h1 class="text-4xl font-bold">{title}</h1>

    <div class="mt-4 flex items-center justify-start gap-6">
      {#if authorName}
        <div class="flex items-center">
          {#if authorImage}
            <div class="relative mr-2 h-8 w-8 overflow-hidden rounded-full">
              <img
                src={authorImage}
                alt={authorName}
                sizes="96px"
                class="object-cover object-center"
              />
            </div>
          {/if}

          <div>
            <p class="text-sm font-semibold opacity-50">{authorName}</p>
          </div>
        </div>
      {/if}

      <div class="ml-auto mr-0">
        <p class="text-sm opacity-30">
          {Intl.DateTimeFormat("en-US").format(new Date(date))}
        </p>
      </div>

      {#if tags}
        <div class="flex flex-1 flex-wrap gap-2">
          {#each tags as tag}
            <span
              class="text-primary text-xs font-semibold uppercase tracking-wider"
            >
              #{tag}
            </span>
          {/each}
        </div>
      {/if}
    </div>
  </div>

  {#if image}
    <div class="relative mt-6 aspect-[16/9] overflow-hidden rounded-xl">
      <img
        src={image}
        alt={title}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        class="object-cover object-center absolute h-full w-full inset-0"
      />
    </div>
  {/if}

  <PostContent content={data.content} />
</div>
