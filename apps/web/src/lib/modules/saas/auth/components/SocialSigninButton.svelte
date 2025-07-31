<script lang="ts">
  import { LinkButton } from "@ui/components";
  import GitHub from "@ui/components/icons/GitHub.svelte";
  import Google from "@ui/components/icons/Google.svelte";

  const providers: Record<
    string,
    {
      name: string;
      icon?: any;
    }
  > = {
    google: {
      name: "Google",
      icon: Google,
    },
    github: {
      name: "Github",
      icon: GitHub,
    },
  };

  interface Props {
    provider: keyof typeof providers;
    class?: string | undefined;
  }

  let { provider, class: className = undefined }: Props = $props();
  

  const providerData = providers[provider];
</script>

<LinkButton
  href={`/api/oauth/${provider}`}
  variant="secondary"
  class={className}
>
  {#if providerData.icon}
    <i class="mr-2 opacity-70">
      <providerData.icon class="h-4 w-4" />
    </i>
  {/if}
  Continue with {providerData.name}
</LinkButton>
