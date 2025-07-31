<script lang="ts">
  interface Props {
    title: string;
    subtitle?: string;
  }

  let { title, subtitle = "" }: Props = $props();
</script>

<div class="mb-8 border-b pb-4">
  <h2 class="text-2xl font-bold lg:text-3xl">{title}</h2>
  <p class="mt-1 opacity-50">{subtitle}</p>
</div>
