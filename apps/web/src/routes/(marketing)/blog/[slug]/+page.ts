import type { MetaTagsProps } from "svelte-meta-tags";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { getBaseUrl } from "$lib/util/base-url";

export const load: PageLoad = async ({ params }) => {
  try {
    const post = await import(`../../../../../content/posts/${params.slug}.md`);
    const pageMetaTags: MetaTagsProps = {
      title: post?.metadata?.title,
      description: post?.metadata?.excerpt,
      openGraph: {
        title: post?.metadata?.title,
        description: post?.metadata?.excerpt,
        images: post?.metadata?.image
          ? [
              {
                url: new URL(
                  post?.metadata?.image ?? "",
                  getBaseUrl(),
                ).toString(),
              },
            ]
          : [],
      },
    };
    return {
      content: post.default,
      meta: { ...post.metadata, url: `/blog/${params.slug}` },
      pageMetaTags,
    };
  } catch (e) {
    error(404, {
      message: `Could not find ${params.slug}`,
    });
  }
};
