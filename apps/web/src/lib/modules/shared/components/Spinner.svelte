<script lang="ts">
  import { Loader2Icon } from "lucide-svelte";
  import { twMerge } from "tailwind-merge";
  interface Props {
    className?: string;
  }

  let { className = "" }: Props = $props();
</script>

<Loader2Icon class={twMerge("size-4 animate-spin text-primary", className)} />
