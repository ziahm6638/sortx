<script lang="ts">
  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@ui/components/Accordion";
  import { twMerge } from "tailwind-merge";

  const items = [
    {
      question: "What is the refund policy?",
      answer:
        "We offer a 30-day money-back guarantee if you're not happy with our product.",
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription by visiting the billing page.",
    },
    {
      question: "Can I change my plan?",
      answer:
        "Yes, you can change your plan at any time by visiting the billing page.",
    },
    {
      question: "Do you offer a free trial?",
      answer: "Yes, we offer a 14-day free trial.",
    },
  ];

  interface Props {
    className?: string;
  }

  let { className = "" }: Props = $props();
</script>

{#if items && items.length}
  <section class={twMerge("py-16 lg:py-24 bg-primary/5", className)} id="faq">
    <div class="container max-w-3xl">
      <div class="mb-12 text-center">
        <h1 class="mb-2 text-5xl font-bold">Frequently asked questions</h1>
        <p class="text-lg opacity-50">
          Do you have any questions? We have got you covered.
        </p>
      </div>
      <Accordion multiple={false} class="flex flex-col gap-3">
        {#each items as item, i}
          <AccordionItem
            value={`faq-item-${i}`}
            class="rounded-xl border bg-card px-6 py-4"
          >
            <AccordionTrigger class="py-2 text-lg">
              {item.question}
            </AccordionTrigger>
            <AccordionContent class="">{item.answer}</AccordionContent>
          </AccordionItem>
        {/each}
      </Accordion>
    </div>
  </section>
{/if}
