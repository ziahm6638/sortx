<script lang="ts">
  import { Tabs, TabsList, TabsTrigger } from "@ui/components";

  interface Props {
    activeMode: string;
    onChange: (value: string | undefined) => void;
    class?: string;
  }

  let { activeMode, onChange, class: className = "" }: Props = $props();
  
</script>

<Tabs value={activeMode} onValueChange={onChange} class={className}>
  <TabsList class="w-full">
    <TabsTrigger value="magic-link" class="flex-1">Magic Link</TabsTrigger>
    <TabsTrigger value="password" class="flex-1">Password</TabsTrigger>
  </TabsList>
</Tabs>
