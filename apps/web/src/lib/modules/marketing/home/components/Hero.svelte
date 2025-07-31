<script>
  import heroImageDark from "$lib/images/hero-image-dark.png";
  import heroImage from "$lib/images/hero-image.png";
  import { LinkButton } from "@ui/components";
</script>

<div class="container pb-20 pt-44 text-center">
  <div class="mb-4 flex justify-center">
    <div
      class="mx-auto flex flex-wrap items-center justify-center rounded-full border border-highlight p-px px-4 py-1 text-sm font-normal text-highlight"
    >
      <span
        class="flex items-center gap-2 rounded-full font-black text-highlight"
      >
        <span class="size-2 rounded-full bg-highlight"></span>
        New:
      </span>
      <span class="ml-1 block font-medium"
        >AI-powered tenant reporting now live</span
      >
    </div>
  </div>

  <h1 class="mx-auto max-w-4xl text-balance text-5xl font-bold lg:text-7xl">
    Property repairs sorted. Automatically.
  </h1>

  <p class="mt-5 text-lg opacity-75">
    From tenant report to repair complete in record time. <br />
    Join 500+ UK agencies streamlining their maintenance operations.
  </p>

  <div class="mt-6 flex flex-col items-center justify-center gap-3 md:flex-row">
    <LinkButton href="/auth/signup" size="lg">Sign Up</LinkButton>
    <LinkButton href="/auth/login" variant="outline" size="lg"
      >Book a demo</LinkButton
    >
  </div>

  <div class="mt-16 px-8 text-center">
    <h5
      class="text-xs font-semibold uppercase tracking-wider text-foreground/50"
    >
      Trusted by leading UK property managers
    </h5>

    <div
      class="mt-4 flex flex-col-reverse items-center justify-center gap-4 text-foreground/50 md:flex-row md:gap-8"
    >
      <!-- Logo placeholders - replace with actual client logos -->
      <div class="h-8 w-32 rounded bg-foreground/10"></div>
      <div class="h-8 w-32 rounded bg-foreground/10"></div>
      <div class="h-8 w-32 rounded bg-foreground/10"></div>
      <div class="h-8 w-32 rounded bg-foreground/10"></div>
    </div>
  </div>

  <div
    class="mt-16 rounded-2xl border bg-card/50 p-2 shadow-lg dark:shadow-foreground/10"
  >
    <img
      src={heroImage}
      alt="SortX Maintenance Pro dashboard showing active repairs"
      class="block w-full rounded-xl dark:hidden"
    />
    <img
      src={heroImageDark}
      alt="SortX Maintenance Pro dashboard showing active repairs"
      class="hidden w-full rounded-xl dark:block"
    />
  </div>
</div>
