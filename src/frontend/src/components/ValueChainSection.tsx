import { Cog, MapPin, Ship, Tag, Truck } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MapPin,
    title: "Raw Cashew Origin",
    subtitle: "Africa",
    description:
      "Raw Cashew Nuts (RCN) are harvested across West and East Africa. Countries like Ivory Coast, Tanzania, Nigeria, and Benin supply millions of metric tons annually. Quality is assessed by Kernel Outturn Ratio (KOR) and nut count.",
    highlight: "Major Origins: Ivory Coast, Tanzania, Nigeria, Benin",
  },
  {
    number: "02",
    icon: Ship,
    title: "Import to India",
    subtitle: "Ocean Freight",
    description:
      "RCN is shipped on Cost-Insurance-Freight (CIF) terms to Indian ports. Kerala and Goa serve as primary entry points. Currency exchange rates, shipping costs, and port duties form part of the landed cost calculation.",
    highlight: "CIF pricing, USD/INR conversion, port duties",
  },
  {
    number: "03",
    icon: Cog,
    title: "Contract Processing",
    subtitle: "Partner Facilities",
    description:
      "RCN undergoes a multi-stage processing sequence: steaming, shelling, drying, peeling, grading, and packing. Contract processing facilities in Kerala process RCN on a toll/contract basis, converting it into marketable kernel grades.",
    highlight: "6-stage processing: Steam → Shell → Dry → Peel → Grade → Pack",
  },
  {
    number: "04",
    icon: Tag,
    title: "Kernel Grading",
    subtitle: "Quality Sorting",
    description:
      "Processed kernels are sorted into grade categories: whole premium grades (W180–W450), broken grades (Splits, Butts, Pieces), and industrial grades (Baby Bits, Granules). Each grade commands a distinct market price and serves specific industries.",
    highlight: "W180, W210, W240, W320, W450 + Broken + Industrial grades",
  },
  {
    number: "05",
    icon: Truck,
    title: "Pan India Distribution",
    subtitle: "Market Supply",
    description:
      "Kernels are distributed via road logistics networks across major Indian markets — Delhi, Mumbai, Bangalore, Chennai, Hyderabad, and beyond. Freight is calculated by weight and distance from Palakkad, Kerala.",
    highlight: "12+ major cities, road logistics, VRL-equivalent networks",
  },
];

export default function ValueChainSection() {
  return (
    <section
      id="value-chain"
      className="section-padding"
      style={{
        background:
          "linear-gradient(145deg, oklch(0.17 0.055 155) 0%, oklch(0.22 0.06 150) 60%, oklch(0.19 0.05 155) 100%)",
      }}
    >
      <div className="container-tight">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold/60" />
            <span className="font-ui text-xs font-bold uppercase tracking-widest text-gold">
              Process Overview
            </span>
            <div className="h-px w-8 bg-gold/60" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            How the Cashew{" "}
            <em style={{ fontStyle: "italic", color: "oklch(0.88 0.14 80)" }}>
              Value Chain
            </em>{" "}
            Works
          </h2>
          <p className="text-white/65 font-body text-lg max-w-2xl mx-auto leading-relaxed">
            From African farms to Indian kitchens — a clear, step-by-step
            walkthrough of the cashew value creation journey.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute left-[2.25rem] top-8 bottom-8 w-px bg-gradient-to-b from-gold via-forest/30 to-gold" />

          <div className="flex flex-col gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="flex gap-6 items-start group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Icon circle */}
                  <div className="relative flex-shrink-0">
                    <div className="w-[4.5rem] h-[4.5rem] rounded-2xl gradient-forest flex items-center justify-center shadow-forest group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gold text-forest-dark font-ui font-bold text-[10px] flex items-center justify-center shadow">
                      {step.number.replace("0", "")}
                    </span>
                  </div>

                  {/* Content */}
                  <div
                    className="flex-1 rounded-2xl p-6 card-hover border"
                    style={{
                      background: "oklch(0.22 0.045 155 / 0.7)",
                      borderColor: "oklch(0.32 0.06 155 / 0.6)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <span className="font-ui text-xs font-bold uppercase tracking-widest text-gold/80">
                          Step {step.number}
                        </span>
                        <h3 className="font-display text-xl font-bold text-white mt-0.5">
                          {step.title}
                        </h3>
                      </div>
                      <span className="font-ui text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white/70">
                        {step.subtitle}
                      </span>
                    </div>
                    <p className="font-body text-white/60 leading-relaxed mb-3">
                      {step.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-ui font-semibold text-gold-dark bg-gold/15 rounded-lg px-3 py-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                      <span className="text-gold/90">{step.highlight}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
