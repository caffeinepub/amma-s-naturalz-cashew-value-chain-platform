import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is RCN and where does it come from?",
    a: "RCN stands for Raw Cashew Nut — the unprocessed cashew still in its shell, as harvested from the cashew tree (Anacardium occidentale). The majority of the world's RCN comes from West and East Africa, primarily Ivory Coast (~40% of global supply), Tanzania, Nigeria, and Benin. India also produces RCN domestically, but imports significant volumes from Africa to meet processing capacity.",
  },
  {
    q: "What is KOR (Kernel Outturn Ratio)?",
    a: "KOR (Kernel Outturn Ratio) is a critical quality metric for Raw Cashew Nuts. It is expressed as the number of pounds of kernel produced from a standard 80kg bag of RCN. For example, a KOR of 48 means that an 80kg bag of RCN produces 48 lbs (approximately 21.8 kg) of kernels. Higher KOR indicates better quality RCN with more kernel content. Typical KOR ranges: Poor (<44), Average (44–48), Good (48–52), Premium (52+).",
  },
  {
    q: "What is contract processing?",
    a: "Contract processing (also called toll processing) is a model where the RCN owner imports raw cashews and sends them to a specialized processing facility for conversion into kernels. The processor charges a fee (per kg or per MT) for the processing service — which includes steaming, shelling, drying, peeling, grading, and packing. The RCN owner retains ownership of the kernels throughout the process. This model allows commodity buyers and investors to participate in cashew processing without owning processing equipment.",
  },
  {
    q: "Which kernel grades are most in demand?",
    a: "W320 is the highest-volume kernel grade globally and in India — it's the benchmark grade for cashew trading. W240 and W210 are also in strong demand, particularly from retail brands and export markets. W180 commands the highest price as a premium grade but has lower volume. For industrial buyers, Baby Bits and Granules are in consistent demand from bakeries and food processors. Splits are popular with snack manufacturers.",
  },
  {
    q: "How is the delivery cost calculated?",
    a: "Kernel delivery cost from Palakkad, Kerala is estimated based on typical road freight rates via logistics networks like VRL Logistics. Freight rates vary by distance: ₹2.5–3.5/kg for South Indian cities (Chennai), ₹3–4.5/kg for Bangalore/Hyderabad, ₹4–5.5/kg for Mumbai/Pune, and ₹5.5–7/kg for Delhi/Jaipur/Lucknow. These are approximate ranges — actual freight depends on quantity, transport mode, and market conditions. Use our Pan India Delivery Calculator for estimates.",
  },
  {
    q: "What industries use cashew kernels?",
    a: "Cashew kernels serve a wide range of industries: (1) Cashew wholesalers and commodity traders, (2) Snack manufacturers producing roasted/flavored cashews, (3) Food processing companies using kernels as ingredients in ready meals and sauces, (4) Bakery & confectionery industry using bits, granules, and whole kernels as toppings and inclusions, (5) Retail nut brands packaging premium kernels for consumers, (6) Export traders supplying to US, EU, Middle East markets, (7) Private label brands creating OEM cashew products.",
  },
  {
    q: "How do I estimate kernel yield from RCN?",
    a: "Kernel yield is primarily determined by KOR. The formula: Kernel Yield (kg) = Volume (MT) × 1000 × (KOR × 0.45359 / 80). For example, with KOR 48 and 10 MT of RCN: 10 × 1000 × (48 × 0.45359 / 80) = 2,722 kg of kernels (before moisture adjustment). Moisture content further reduces effective yield. Use our RCN to Kernel Yield Calculator for detailed estimates including grade distribution and approximate production cost.",
  },
  {
    q: "What is the difference between whole kernels and broken kernels?",
    a: "Whole kernels (W grades: W180, W210, W240, W320, W450) are intact, unbroken kernels sorted by size (kernels per pound). They command premium prices and are used in retail packs, snacking, and export. Broken kernels (Splits, Butts, Large Pieces, Small Pieces) are kernels that broke during the shelling or processing stage. They are priced lower than whole grades but are widely used in snack manufacturing, bakeries, and food processing where visual perfection isn't required.",
  },
  {
    q: "Can I get kernels delivered pan India?",
    a: "Yes. Amma's Naturalz, through SBZ Enterprises based in Palakkad, Kerala, supports kernel distribution to major Indian cities including Delhi, Mumbai, Ahmedabad, Bangalore, Hyderabad, Chennai, Kolkata, Pune, Nagpur, Jaipur, Lucknow, and Indore via road logistics networks. Freight is estimated based on standard carrier rates from Palakkad. Use the Pan India Delivery Calculator on this platform to estimate delivered cost for your grade and quantity.",
  },
  {
    q: "How do I get started with Amma's Naturalz?",
    a: "Getting started is simple: (1) Use our Calculators section to simulate your kernel yield, grade output, and delivery cost. (2) Contact us through the Contact form with your industry type and requirements. (3) Send a WhatsApp inquiry to +91 91885 20881 or +91 94000 51880 with your grade preference, quantity, and delivery location. (4) Our team at SBZ Enterprises, Palakkad will review your requirements and respond within 24–48 hours with availability and pricing.",
  },
];

export default function FAQSection() {
  return (
    <section
      id="faqs"
      className="section-padding"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.94 0.015 155) 0%, oklch(0.97 0.012 85) 100%)",
      }}
    >
      <div className="container-tight">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold/60" />
            <span className="font-ui text-xs font-bold uppercase tracking-widest text-gold">
              Common Questions
            </span>
            <div className="h-px w-8 bg-gold/60" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-forest mb-4 leading-tight">
            Frequently Asked <em style={{ fontStyle: "italic" }}>Questions</em>
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about cashew sourcing, processing,
            grading, and supply.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`faq-${i}`}
                className="bg-card rounded-xl border border-border shadow-card overflow-hidden px-0"
                data-ocid={`faqs.item.${i + 1}`}
              >
                <AccordionTrigger className="px-6 py-4 font-ui font-semibold text-sm text-left hover:no-underline hover:text-forest">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5">
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Still have questions */}
        <div className="mt-10 text-center">
          <p className="font-body text-muted-foreground mb-4">
            Still have questions? Our team is ready to help.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              type="button"
              onClick={() =>
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="font-ui font-bold px-6 py-3 rounded-xl bg-forest text-white hover:bg-forest-dark transition-colors"
              data-ocid="faqs.contact.primary_button"
            >
              Contact Us →
            </button>
            <a
              href="https://wa.me/919188520881"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-ui font-bold px-6 py-3 rounded-xl bg-[#25D366] text-white hover:bg-[#1fb855] transition-colors"
              data-ocid="faqs.whatsapp.primary_button"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
