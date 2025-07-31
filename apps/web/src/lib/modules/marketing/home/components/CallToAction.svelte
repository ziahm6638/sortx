<script>
  import { LinkButton } from "@ui/components";
</script>

<section class="py-24">
  <div class="container">
    <div class="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-primary/20 to-primary/10 p-12 text-center shadow-lg">
      <h2 class="text-3xl font-bold lg:text-4xl">
        Ready to Transform Your Property Management?
      </h2>
      <p class="mt-4 text-lg opacity-80">
        Join thousands of property managers who have streamlined their operations.
        Start your free trial today - no credit card required.
      </p>
      <div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <LinkButton href="/auth/signup" size="lg">
          Start Your Free Trial
        </LinkButton>
        <LinkButton href="/pricing" variant="outline" size="lg">
          View Pricing Plans
        </LinkButton>
      </div>
      <p class="mt-6 text-sm opacity-60">
        14-day free trial • No credit card required • Cancel anytime
      </p>
    </div>
  </div>
</section>