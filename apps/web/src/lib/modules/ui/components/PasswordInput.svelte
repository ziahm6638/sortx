<script lang="ts">
  import { EyeIcon, EyeOffIcon } from "lucide-svelte";
  import type { HTMLInputAttributes } from "svelte/elements";
  import { twMerge } from "tailwind-merge";
  import Input from "./Input.svelte";

  type $$Props = HTMLInputAttributes;
  interface Props {
    class?: $$Props["class"];
    value?: $$Props["value"];
    [key: string]: any
  }

  let { class: className = undefined, value = $bindable(undefined), ...rest }: Props = $props();
  
  let showPassword = $state(false);
</script>

<div class={twMerge("relative", className)}>
  <Input
    type={showPassword ? "text" : "password"}
    class="pr-10"
    bind:value
    on:blur
    on:change
    on:click
    on:focus
    on:focusin
    on:focusout
    on:keydown
    on:keypress
    on:keyup
    on:mouseover
    on:mouseenter
    on:mouseleave
    on:paste
    on:input
    {...rest}
  />
  <button
    type="button"
    onclick={() => (showPassword = !showPassword)}
    class="text-primary absolute inset-y-0 right-0 flex items-center pr-4 text-xl"
  >
    {#if showPassword}
      <EyeOffIcon className="h-4 w-4" />
    {:else}
      <EyeIcon className="h-4 w-4" />
    {/if}
  </button>
</div>
