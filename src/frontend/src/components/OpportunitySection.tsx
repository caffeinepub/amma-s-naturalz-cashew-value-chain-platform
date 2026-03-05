import { Factory, Globe, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: "5.6% CAGR",
    label: "Global Cashew Market Growth",
    description:
      "The global cashew kernel market is projected to grow at 5.6% CAGR through 2030, driven by rising health-conscious snacking trends.",
    color: "bg-gold-light text-gold-dark",
  },
  {
    icon: Factory,
    value: "55%",
    label: "India Processes World's Cashews",
    description:
      "India remains the world's largest cashew processor, converting raw cashew nuts from West Africa and East Africa into premium kernels.",
    color: "bg-forest/10 text-forest",
  },
  {
    icon: Globe,
    value: "35+",
    label: "Kernel Grades Serve Diverse Industries",
    description:
      "From premium W180 to industrial granules, cashew processing generates over 35 distinct grades meeting every industry demand.",
    color: "bg-terracotta/10 text-terracotta",
  },
];

export default function OpportunitySection() {
  return (
    <section
      id="opportunity"
      className="section-padding"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.97 0.018 82) 0%, oklch(0.95 0.022 88) 50%, oklch(0.96 0.015 78) 100%)",
      }}
    >
      <div className="container-tight">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold/60" />
            <span className="font-ui text-xs font-bold uppercase tracking-widest text-gold">
              Market Opportunity
            </span>
            <div className="h-px w-8 bg-gold/60" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-forest mb-4 leading-tight">
            The Global Cashew{" "}
            <em className="not-italic" style={{ fontStyle: "italic" }}>
              Opportunity
            </em>
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto leading-relaxed">
            Cashews represent one of the most value-rich commodities in global
            agri-trade — with Africa supplying raw nuts and India converting
            them into premium kernels.
          </p>
        </div>

        {/* Visual flow infographic */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-0 mb-16">
          {(
            [
              {
                type: "node" as const,
                icon: "🌍",
                label: "Africa",
                sub: "Raw Cashew Origin",
                bg: "gradient-gold",
              },
              { type: "arrow" as const, key: "arrow-1" },
              {
                type: "node" as const,
                icon: "🚢",
                label: "Import",
                sub: "CIF India Ports",
                bg: "bg-forest/10",
              },
              { type: "arrow" as const, key: "arrow-2" },
              {
                type: "node" as const,
                icon: "🏭",
                label: "India",
                sub: "Contract Processing",
                bg: "bg-white border-2 border-forest",
              },
              { type: "arrow" as const, key: "arrow-3" },
              {
                type: "node" as const,
                icon: "🛒",
                label: "Indian Markets",
                sub: "Pan India Distribution",
                bg: "gradient-forest",
              },
            ] as const
          ).map((item) => {
            if (item.type === "arrow") {
              return (
                <div
                  key={item.key}
                  className="hidden md:flex items-center justify-center px-2"
                >
                  <svg
                    width="40"
                    height="20"
                    viewBox="0 0 40 20"
                    aria-hidden="true"
                  >
                    <path
                      d="M0 10 L30 10 M22 4 L30 10 L22 16"
                      stroke="oklch(0.78 0.16 75)"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              );
            }
            return (
              <div
                key={item.label}
                className={`flex flex-col items-center justify-center p-6 rounded-2xl min-w-[140px] shadow-card text-center ${item.bg}`}
              >
                <span className="text-4xl mb-2">{item.icon}</span>
                <span
                  className={`font-ui font-bold text-lg ${
                    item.bg === "gradient-gold" || item.bg === "gradient-forest"
                      ? "text-white"
                      : "text-foreground"
                  }`}
                >
                  {item.label}
                </span>
                <span
                  className={`font-body text-xs mt-1 ${
                    item.bg === "gradient-gold" || item.bg === "gradient-forest"
                      ? "text-white/75"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.sub}
                </span>
              </div>
            );
          })}
        </div>

        {/* Mobile arrow for flow */}
        <div className="md:hidden flex justify-center mb-8 text-3xl">↓</div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-card rounded-2xl p-6 shadow-elevated card-hover border border-t-2"
                style={{
                  borderColor: "oklch(0.85 0.025 80)",
                  borderTopColor: "oklch(0.78 0.16 75 / 0.4)",
                }}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${stat.color.split(" ")[0]}`}
                >
                  <Icon className={`w-6 h-6 ${stat.color.split(" ")[1]}`} />
                </div>
                <div
                  className="font-display text-3xl font-bold text-forest mb-1"
                  style={{ textShadow: "0 1px 2px oklch(0.78 0.16 75 / 0.15)" }}
                >
                  {stat.value}
                </div>
                <div className="font-ui font-semibold text-sm text-foreground mb-2">
                  {stat.label}
                </div>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Context text */}
        <div className="mt-12 grid md:grid-cols-2 gap-8 bg-muted/50 rounded-2xl p-8">
          <div>
            <h3 className="font-display text-xl font-bold text-forest mb-3">
              Africa: The Raw Cashew Heartland
            </h3>
            <p className="font-body text-muted-foreground leading-relaxed">
              West and East African nations — Ivory Coast, Tanzania, Nigeria,
              and Benin — together account for over 65% of global Raw Cashew Nut
              (RCN) production. These regions ship millions of metric tons
              annually to India for processing, making the India-Africa
              commodity corridor one of the most significant in global
              agriculture.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-forest mb-3">
              India: The Global Processing Hub
            </h3>
            <p className="font-body text-muted-foreground leading-relaxed">
              India's processing industry — centered in Kerala, Goa, and Andhra
              Pradesh — has developed unmatched expertise in cashew processing.
              Contract processing facilities convert RCN into multiple kernel
              grades, enabling value capture at every stage of the supply chain.
              Palakkad, Kerala is a key logistics node for cashew kernel
              distribution across India.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
