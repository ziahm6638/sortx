<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { page } from "$app/state";
  import type { User } from "$lib/types";
  import UserAvatar from "@shared/components/UserAvatar.svelte";
  import { apiClient } from "@shared/lib/ApiClient";
  import { LoaderIcon } from "lucide-svelte";
  import Dropzone from "svelte-file-dropzone";
  import { v4 as uuid } from "uuid";
  import CropImageDialog from "./CropImageDialog.svelte";

  interface Props {
    user: User;
    onSuccess: () => void;
    onError: () => void;
  }

  let { user, onSuccess, onError }: Props = $props();

  let isUploading = $state(false);
  let isCropDialogOpen = $state(false);
  let image: File | null = $state(null);

  function handleFilesSelect(event: any) {
    const { acceptedFiles } = event.detail;
    image = acceptedFiles[0];
    isCropDialogOpen = true;
  }

  function toggleCropDialog() {
    isCropDialogOpen = !isCropDialogOpen;
  }

  async function onCrop(croppedImageData: Blob | null) {
    if (!croppedImageData) {
      return;
    }

    isUploading = true;
    try {
      const path = `${user?.id}-${uuid()}.png`;
      const uploadUrl = await apiClient(page).uploads.signedUploadUrl.mutate({
        path,
        bucket: "sortx-maintenance-pro",
      });

      const response = await fetch(uploadUrl, {
        method: "PUT",
        body: croppedImageData,
        headers: {
          "Content-Type": "image/png",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      await apiClient(page).auth.update.mutate({
        avatarUrl: path,
      });

      await invalidateAll();
      onSuccess();
    } catch (e) {
      onError();
    } finally {
      isUploading = false;
    }
  }
</script>

<div>
  <Dropzone disableDefaultStyles on:drop={handleFilesSelect} multiple={false}>
    <div class="relative rounded-full">
      <UserAvatar
        className="size-24 cursor-pointer text-xl"
        avatarUrl={user?.avatarUrl || ""}
        name={user?.name ?? ""}
      />

      {#if isUploading}
        <div
          class="absolute inset-0 z-20 flex items-center justify-center bg-card/90"
        >
          <LoaderIcon class="size-6 animate-spin text-primary" />
        </div>
      {/if}
    </div>
  </Dropzone>

  <CropImageDialog
    {image}
    dialogOpen={isCropDialogOpen}
    onOpenChange={toggleCropDialog}
    {onCrop}
  />
</div>
