<script lang="ts">
  import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@ui/components";
  import { twMerge } from "tailwind-merge";

  interface Props {
    title: string;
    className?: string;
    onSubmit?: (() => void) | undefined;
    danger?: boolean;
    isSubmitDisabled?: boolean;
    submitLabel?: string;
    isSubmitting?: boolean;
    children?: import("svelte").Snippet;
  }

  let {
    title,
    className = "",
    onSubmit = undefined,
    danger = false,
    isSubmitDisabled = false,
    submitLabel = "",
    isSubmitting = false,
    children,
  }: Props = $props();

  function handleSubmit(
    event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement },
  ) {
    event.preventDefault();
    if (onSubmit) {
      onSubmit();
    }
  }
</script>

<Card class={twMerge(className, danger ? "border-destructive/50 border" : "")}>
  <form onsubmit={handleSubmit}>
    <CardHeader>
      <CardTitle className={danger ? "text-destructive" : ""}>
        {title}
      </CardTitle>
    </CardHeader>

    <CardContent>
      {@render children?.()}

      {#if typeof onSubmit !== "undefined"}
        <div class=" mt-6 flex justify-end border-t pt-3">
          <Button
            type="submit"
            disabled={isSubmitDisabled}
            loading={isSubmitting}
            variant={danger ? "error" : "default"}
          >
            {submitLabel || "Save"}
          </Button>
        </div>
      {/if}
    </CardContent>
  </form>
</Card>
