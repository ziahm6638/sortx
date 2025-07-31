<script lang="ts">
  import { Alert } from "@ui/components";
  import { MailCheckIcon } from "lucide-svelte";
  interface Props {
    class?: string;
  }

  let { class: className = "" }: Props = $props();
  
</script>

<Alert variant="primary" {className}>
  <MailCheckIcon className="h-4 w-4" />
  {#snippet title()}
    Accept team invitation
  {/snippet}
  {#snippet description()}
    You have been invited to join a team. By logging in or signing up you will
      automatically accept the invitation and join the team.
  {/snippet}
</Alert>
