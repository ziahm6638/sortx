<script lang="ts">
  interface Props {
    content: any;
  }

  let { content }: Props = $props();

  const SvelteComponent = $derived(content);
</script>

<div class="prose dark:prose-invert mx-auto mt-6 max-w-2xl">
  <SvelteComponent />
</div>
