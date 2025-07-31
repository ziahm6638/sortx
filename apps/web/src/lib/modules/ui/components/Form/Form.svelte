<script lang="ts">
  import { enhance } from "$app/forms";
  import type { HTMLFormAttributes } from "svelte/elements";
  interface Props {
    children?: import('svelte').Snippet<[any]>;
    [key: string]: any
  }

  let { children, ...rest }: Props = $props();
  type $$Props = HTMLFormAttributes;
  let submitting = $state(false);
</script>

<form
  method="post"
  {...rest}
  use:enhance={() => {
    submitting = true;
    return async ({ update }) => {
      await update();
      submitting = false;
    };
  }}
>
  {@render children?.({ submitting, })}
</form>
