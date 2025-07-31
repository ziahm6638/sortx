<script lang="ts">
  import { onMount } from "svelte";

  const googleAnalyticsId = process.env.PUBLIC_GOOGLE_ANALYTICS_ID as string;

  onMount(() => {
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
    script.async = true;
    script.onload = () => {
      if (typeof window === "undefined") {
        return;
      }

      (window as any).dataLayer = (window as any).dataLayer || [];

      function gtag(...rest: any[]) {
        (window as any).dataLayer.push(...rest);
      }
      gtag("js", new Date());
      gtag("config", googleAnalyticsId);
    };
  });
</script>
