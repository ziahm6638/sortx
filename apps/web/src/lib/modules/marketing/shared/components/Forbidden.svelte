<script lang="ts">
  import { Button } from "@ui/components";
  import { UndoIcon } from "lucide-svelte";
</script>

<div class="flex h-screen flex-col items-center justify-center">
  <h1 class="text-5xl font-bold">403</h1>
  <p class="mt-2 text-2xl">Forbidden</p>

  <a href="/">
    <Button class="mt-4">
      <UndoIcon class="mr-2 h-4 w-4" />Go to homepage
    </Button>
  </a>
</div>
