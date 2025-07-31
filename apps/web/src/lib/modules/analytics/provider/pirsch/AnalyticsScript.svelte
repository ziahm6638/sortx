<script lang="ts">
  import { onMount } from "svelte";

  const pirschCode = process.env.PUBLIC_PIRSCH_CODE as string;

  onMount(() => {
    const script = document.createElement("script");
    script.src = `https://api.pirsch.io/pirsch-extended.js`;
    script.defer = true;
    script.id = "pirschextendedjs";
    script.setAttribute("data-code", pirschCode);
  });
</script>
