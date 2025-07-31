<script lang="ts">
  import { page } from "$app/state";
  import type { User } from "$lib/types";
  import UserAvatarUpload from "@saas/settings/components/UserAvatarUpload.svelte";
  import { apiClient } from "@shared/lib/ApiClient";
  import {
    Button,
    FormDescription,
    FormItem,
    FormLabel,
    Input,
    toast,
  } from "@ui/components";
  import { ArrowRightIcon } from "lucide-svelte";

  interface Props {
    user: User;
    onCompleted: () => void;
  }

  let { user, onCompleted }: Props = $props();
  let name = $state("");
  let isSubmitting = $state(false);

  async function handleSubmit(
    event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement },
  ) {
    event.preventDefault();
    try {
      isSubmitting = true;
      await apiClient(page).auth.update.mutate({ name });
      onCompleted();
    } catch (error) {
      toast.error(
        "We are sorry, but we were unable to set up your account. Please try again later.",
      );
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div>
  <form class="flex flex-col items-stretch gap-8" onsubmit={handleSubmit}>
    <FormItem>
      <FormLabel>Name</FormLabel>
      <Input name="name" bind:value={name} />
    </FormItem>

    <FormItem className="flex items-center justify-between gap-4">
      <div>
        <FormLabel>Avatar</FormLabel>

        <FormDescription>
          Click the circle or drop an image to it to upload your avatar.
        </FormDescription>
      </div>

      <UserAvatarUpload
        onSuccess={() => {
          return;
        }}
        onError={() => {
          return;
        }}
        {user}
      />
    </FormItem>

    <Button type="submit" loading={isSubmitting}>
      Continue
      <ArrowRightIcon className="ml-2 size-4" />
    </Button>
  </form>
</div>
