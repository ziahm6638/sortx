<script lang="ts">
  import { cva, type VariantProps } from "class-variance-authority";
  import { twMerge } from "tailwind-merge";

  const alertVariants = cva(
    "relative w-full rounded-lg border p-6 [&>svg~*]:pl-8 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-6 [&>svg]:top-6 [&>svg]:text-foreground",
    {
      variants: {
        variant: {
          default: "bg-background text-foreground",
          primary:
            "border-primary/20 bg-primary/10 text-primary [&>svg]:text-primary",
          error:
            "border-destructive/20 bg-destructive/10 text-destructive [&>svg]:text-destructive",
          success:
            "border-success/20 bg-success/10 text-success [&>svg]:text-success",
        },
      },
      defaultVariants: {
        variant: "default",
      },
    },
  );

  type AlertVariantProps = VariantProps<typeof alertVariants>;

  interface Props {
    variant?: AlertVariantProps["variant"];
    className?: string;
    children?: import('svelte').Snippet;
    title?: import('svelte').Snippet;
    description?: import('svelte').Snippet;
  }

  let {
    variant = "default",
    className = "",
    children,
    title,
    description
  }: Props = $props();
</script>

<div role="alert" class={twMerge(alertVariants({ variant, class: className }))}>
  {@render children?.()}

  {#if title}
    <h5 class="mb-1 font-medium leading-none tracking-tight">
      {@render title?.()}
    </h5>
  {/if}

  {#if description}
    <div class="text-sm [&_p]:leading-relaxed">
      {@render description?.()}
    </div>
  {/if}
</div>
