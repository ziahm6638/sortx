<script>
  import Logo from "@shared/components/Logo.svelte";
</script>

<footer class="bg-muted text-muted-foreground py-12">
  <div class="container grid grid-cols-1 gap-6 lg:grid-cols-3">
    <div>
      <Logo />
      <p class="mt-3 text-sm opacity-70">
        <a href="https://supastarter.dev">Built with supastarter</a>
      </p>
    </div>

    <div class="flex flex-col gap-2">
      <a href="/blog" class="block"> Blog </a>
      <a href="/#features" class="block"> Features </a>
      <a href="/pricing" class="block"> Pricing </a>
      <a href="/auth/signup" class="block font-semibold"> Sign Up </a>
    </div>

    <div class="flex flex-col gap-2">
      <a href="/legal/privacy-policy" class="block">Privacy policy</a>
      <a href="/legal/terms" class="block">Terms and conditions</a>
    </div>
  </div>
</footer>
