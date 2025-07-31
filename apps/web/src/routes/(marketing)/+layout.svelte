<script lang="ts">
  import Footer from "@marketing/shared/components/Footer.svelte";
  import Navbar from "@marketing/shared/components/Navbar.svelte";
  import type { LayoutServerData } from "./$types";

  interface Props {
    data: LayoutServerData;
    children?: import('svelte').Snippet;
  }

  let { data, children }: Props = $props();
</script>

<Navbar user={data.user} />
<main class="min-h-screen">
  {@render children?.()}
</main>
<Footer />
