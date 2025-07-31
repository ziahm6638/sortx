<script lang="ts">
  import type { Post } from "$lib/types";

  interface Props {
    post: Post;
  }

  let { post }: Props = $props();
  const { title, excerpt, authorName, image, date, authorImage, tags, url } =
    post;
</script>

<div class="rounded-2xl border p-6">
  {#if image}
    <div class="relative -m-4 mb-4 aspect-[16/9] overflow-hidden rounded-xl">
      <a href={url} class="absolute inset-0">
        <img
          src={image}
          alt={title}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          class="object-cover object-center absolute h-full w-full inset-0"
        />
      </a>
    </div>
  {/if}

  {#if tags}
    <div class="mb-2 flex flex-wrap gap-2">
      {#each tags as tag}
        <span
          class="text-primary text-xs font-semibold uppercase tracking-wider"
        >
          #{tag}
        </span>
      {/each}
    </div>
  {/if}

  <a href={url} class="text-xl font-semibold">
    {title}
  </a>
  {#if excerpt}
    <p class="opacity-50">{excerpt}</p>
  {/if}

  <div class="mt-4 flex items-center justify-between">
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
  </div>
</div>
