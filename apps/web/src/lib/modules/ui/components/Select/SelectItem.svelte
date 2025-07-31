<script lang="ts">
  import { Select, type SelectItemEvents, type SelectItemProps } from "bits-ui";
  import { CheckIcon } from "lucide-svelte";
  import { twMerge } from "tailwind-merge";

  type $$Props = SelectItemProps;
  type $$Events = SelectItemEvents;

  
  interface Props {
    class?: $$Props["class"];
    value?: $$Props["value"];
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { class: className = undefined, value = undefined, children, ...rest }: Props = $props();
</script>

<Select.Item
  class={twMerge(
    "focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    className,
  )}
  {value}
  {...rest}
>
  <span class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
    <Select.ItemIndicator>
      <CheckIcon className="h-4 w-4" />
    </Select.ItemIndicator>
  </span>
  {@render children?.()}
</Select.Item>
