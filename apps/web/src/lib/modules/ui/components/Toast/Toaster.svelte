<script lang="ts">
  import { getThemeState } from "@shared/lib/ThemeContext.svelte";
  import { Toaster as Sonner, type ToasterProps } from "svelte-sonner";
  const { ...restProps } = $props();
  const themeState = getThemeState();
  const theme = themeState.getTheme();
</script>

<Sonner
  theme={theme as ToasterProps["theme"]}
  class="toaster group"
  toastOptions={{
    classes: {
      toast:
        "group toast !rounded-lg !font-sans group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-md",
      description: "group-[.toast]:text-muted-foreground",
      actionButton:
        "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
      cancelButton:
        "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
      success: "!text-success",
      error: "!text-destructive",
    },
    duration: 5000,
  }}
  {...restProps}
/>
