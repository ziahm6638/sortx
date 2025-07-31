<!-- @migration-task Error while migrating Svelte code: Can't migrate code with afterUpdate. Please migrate by hand. -->
<script lang="ts">
  import {
    Button,
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
  } from "@ui/components";
  import Cropper from "cropperjs";
  import "cropperjs/dist/cropper.min.css";
  import { afterUpdate, onDestroy } from "svelte";

  export let image: File | null = null;
  export let dialogOpen = false;
  export let onOpenChange: (open: boolean) => void;
  export let onCrop: (croppedImage: Blob | null) => void;

  $: imageSrc = image && URL.createObjectURL(image);

  let cropper;
  let img: HTMLImageElement;

  function initCropper() {
    cropper = new Cropper(img, {
      aspectRatio: 1,
    });
  }

  const getCroppedImage = async () => {
    const imageBlob = await new Promise<Blob | null>((resolve) => {
      cropper!
        ?.getCroppedCanvas({
          maxWidth: 256,
          maxHeight: 256,
        })
        .toBlob(resolve);
    });

    return imageBlob;
  };

  afterUpdate(() => {
    if (image && img) {
      img.addEventListener("load", initCropper);
    }
  });

  onDestroy(() => {
    if (img) {
      img.removeEventListener("load", initCropper);
    }
  });
</script>

<Dialog bind:open={dialogOpen} {onOpenChange}>
  <DialogContent>
    <DialogHeader />
    <div>
      {#if imageSrc}
        <img bind:this={img} id="image" src={imageSrc} alt="avatar" />
      {/if}
    </div>
    <DialogFooter>
      <Button
        onclick={async () => {
          onCrop(await getCroppedImage());
          onOpenChange(false);
        }}
      >
        Save
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
