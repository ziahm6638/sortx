<script lang="ts">
  import { Progress, type ProgressProps } from "bits-ui";
  import { twMerge } from "tailwind-merge";

  type $$Props = ProgressProps;

  interface Props {
    class?: $$Props["class"];
    value?: $$Props["value"];
    [key: string]: any
  }

  let { class: className = "", value = 0, ...rest }: Props = $props();
  
</script>

<Progress.Root
  class={twMerge(
    "bg-border relative h-4 w-full overflow-hidden rounded-full",
    className,
  )}
  {value}
  {...rest}
>
  <div
    class="size-full flex-1 rounded-full bg-primary transition-all"
    style={`transform: translateX(-${100 - (value ?? 0)}%) `}
></div>
</Progress.Root>
