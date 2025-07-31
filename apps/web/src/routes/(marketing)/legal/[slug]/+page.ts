import { error } from "@sveltejs/kit";
import type { MetaTagsProps } from "svelte-meta-tags";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  try {
    const post = await import(`../../../../../content/legal/${params.slug}.md`);
    const pageMetaTags: MetaTagsProps = {
      title: post?.metadata?.title,
      openGraph: {
        title: post?.metadata?.title,
      },
    };
    return {
      content: post.default,
      meta: { ...post.metadata, url: `/legal/${params.slug}` },
      pageMetaTags,
    };
  } catch (e) {
    error(404, {
      message: `Could not find ${params.slug}`,
    });
  }
};
