<script lang="ts" module>
  const badge = cva(
    [
      "inline-block",
      "rounded-full",
      "px-3",
      "py-1",
      "text-xs",
      "uppercase",
      "font-semibold",
      "leading-tight",
    ],
    {
      variants: {
        status: {
          success: ["bg-emerald-500/10", "text-emerald-500"],
          info: ["bg-primary/10", "text-primary"],
          warning: ["bg-amber-500/10", "text-amber-500"],
          error: ["bg-rose-500/10", "text-rose-500"],
        },
      },
      defaultVariants: {
        status: "info",
      },
    },
  );

  export type BadgeProps = VariantProps<typeof badge>;
</script>

<script lang="ts">
  import { cva, type VariantProps } from "class-variance-authority";
  import { twMerge } from "tailwind-merge";

  interface Props {
    className?: string;
    status?: BadgeProps["status"];
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { className = "", status = "info", children, ...rest }: Props = $props();
</script>

<span
  class={twMerge(badge({ status: status, class: className }))}
  {...rest}
>
  {@render children?.()}
</span>
