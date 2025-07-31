<script lang="ts">
  import Forbidden from "@marketing/shared/components/Forbidden.svelte";
  import NotFound from "@marketing/shared/components/NotFound.svelte";
  import { page } from "$app/state";
</script>

{#if page.status === 404}
  <NotFound />
{:else if page.status === 403}
  <Forbidden />
{/if}
