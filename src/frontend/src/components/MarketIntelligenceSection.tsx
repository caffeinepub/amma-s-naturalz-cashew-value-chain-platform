import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const cards = [
  {
    id: "grading",
    title: "Cashew Grading System Explained",
    icon: "📏",
    summary:
      "The cashew grading system is based on kernel count per pound (lb) for whole grades, with distinct categories for broken and industrial grades.",
    content: `
The cashew kernel grading system is governed by international standards (primarily AICMA — All India Cashew Manufacturers Association standards and international trade conventions).

**Whole Kernel Grades** are designated by the letter "W" followed by the number of kernels per pound:
• W180 — Approx. 180 kernels/lb (Jumbo — largest, most premium)
• W210 — Approx. 210 kernels/lb (Extra Large)
• W240 — Approx. 240 kernels/lb (Large)
• W320 — Approx. 320 kernels/lb (Medium — highest volume traded)
• W450 — Approx. 450 kernels/lb (Small Whole)

**Color Grades:**
• White (W): Pure white/ivory color
• Scorched Wholes (SW): Slight discoloration from over-roasting
• Dessert Wholes (DW): More pronounced color variation
• Scorched Small (SS): Smaller with some color

**Broken Kernel Grades:**
• Splits (S): Kernel split in two halves
• Butts (B): 3/4 of the kernel intact
• Large Pieces (LP): Pieces larger than 1/2 kernel
• Small Pieces (SP): Smaller irregular pieces

**Industrial Grades:**
• Baby Bits (BB): Fine pieces, 2–5mm range
• Granules (G): Very fine particles, 1–2mm
    `,
  },
  {
    id: "terminology",
    title: "Processing Terminology Glossary",
    icon: "📖",
    summary:
      "Key terms used in raw cashew trading, processing, and kernel commerce — essential vocabulary for every buyer and investor.",
    content: `
**RCN** — Raw Cashew Nut. The unprocessed cashew in its shell, as harvested from the tree (Anacardium occidentale). Traded by metric ton (MT).

**KOR** — Kernel Outturn Ratio. Measured in lbs of kernel produced per 80kg bag of RCN. A KOR of 48 means 48 lbs of kernels from an 80kg bag. Higher KOR = better quality RCN.

**CIF** — Cost, Insurance, and Freight. Pricing term meaning the seller covers costs including freight and insurance to the destination port. Most RCN is traded on CIF terms to Indian ports.

**Outturn** — The actual quantity and quality of kernels obtained from processing a given quantity of RCN. Affected by KOR, moisture, and nut count.

**Nut Count** — The number of raw cashew nuts per kilogram of RCN. Lower nut count = larger individual nuts = typically more premium kernel grades.

**CNSL** — Cashew Nut Shell Liquid. A caustic oil found between the shell layers, removed during steaming and processing. Has industrial applications in coatings and lubricants.

**Testa** — The thin brown/red skin covering the kernel inside the shell. Removed during the peeling stage of processing.

**Moisture Content** — Percentage of water by weight in RCN or kernels. Higher moisture = lower effective kernel yield and shorter shelf life. Target: <5% in finished kernels.

**MT** — Metric Ton (1,000 kg). Standard unit for bulk cashew trading.

**FCL** — Full Container Load. 40ft containers typically carry 20–24 MT of processed kernels or 18–20 MT of RCN.
    `,
  },
  {
    id: "quality",
    title: "RCN Quality Parameters",
    icon: "🔬",
    summary:
      "Key quality parameters that determine RCN value, kernel yield, and grade distribution — critical for procurement decisions.",
    content: `
**1. KOR (Kernel Outturn Ratio)**
The single most important quality parameter. Higher KOR = more kernel per unit of RCN.
• Poor: Below 44 lbs/80kg
• Average: 44–50 lbs/80kg
• Good: 50–54 lbs/80kg
• Premium: 54+ lbs/80kg

**2. Nut Count**
Nuts per kilogram of RCN. Lower count = larger individual nuts = more premium grades.
• Premium: 140–180 nuts/kg
• Standard: 180–200 nuts/kg
• Industrial: 200–240+ nuts/kg

**3. Moisture Content**
High moisture reduces effective kernel yield and causes spoilage.
• Ideal: 8–10% for RCN
• Maximum acceptable: 12–14%

**4. Defects**
• Immature nuts (shriveled kernel)
• Discolored kernels (black spots, yellow tints)
• Insect damage
• Shell cracks (pre-shelling)

**5. CNSL Contamination**
Excess CNSL on nuts can affect processing and kernel color.

**6. Outturn Report**
Processors conduct sample outturn tests before full processing to estimate grade distribution and plan procurement pricing.
    `,
  },
  {
    id: "trade",
    title: "Global Cashew Trade Overview",
    icon: "🌍",
    summary:
      "An overview of global cashew production, processing flows, and consumption markets — the foundation of the cashew value chain.",
    content: `
**Global Production**
World RCN production: approximately 3.5–4 million MT per year. Major producing countries:
• Ivory Coast: ~700,000 MT (40% of global supply)
• India: ~700,000 MT (domestic production)
• Vietnam: ~400,000 MT
• Tanzania: ~250,000 MT
• Nigeria: ~280,000 MT

**Processing Hubs**
• India: Processes 55–60% of global RCN. Kerala, Goa, Andhra Pradesh are primary hubs.
• Vietnam: Significant processor, primarily for US/EU export.

**Global Kernel Trade**
• Global cashew kernel exports: ~600,000–700,000 MT/year
• Major export destinations: USA, Netherlands, UAE, Germany, UK, Japan

**India's Domestic Market**
India's own cashew consumption is growing significantly, driven by:
• Rising middle class and health-conscious consumers
• FMCG and snack industry growth
• E-commerce cashew brands
• Demand from bakery, confectionery, and food processing sectors

**Price Drivers**
• RCN harvest season (March–May peak in Africa)
• USD/INR exchange rate
• Global supply/demand dynamics
• Competing crops affecting African farmland allocation
• Indian domestic consumption growth
    `,
  },
];

function IntelCard({ card }: { card: (typeof cards)[0] }) {
  const [open, setOpen] = useState(false);

  const lines = card.content
    .trim()
    .split("\n")
    .map((line, i) => {
      const lineKey = `line-${i}-${line.slice(0, 20)}`;
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <p key={lineKey} className="font-ui font-bold text-forest mt-3 mb-1">
            {line.replace(/\*\*/g, "")}
          </p>
        );
      }
      if (line.includes("**")) {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <p
            key={lineKey}
            className="font-body text-sm text-foreground/80 leading-relaxed"
          >
            {parts.map((part, j) =>
              j % 2 === 1 ? (
                // biome-ignore lint/suspicious/noArrayIndexKey: positional render parts
                <strong key={j} className="text-foreground">
                  {part}
                </strong>
              ) : (
                part
              ),
            )}
          </p>
        );
      }
      if (line.startsWith("• ")) {
        return (
          <li
            key={lineKey}
            className="font-body text-sm text-foreground/80 ml-4 list-disc leading-relaxed"
          >
            {line.replace("• ", "")}
          </li>
        );
      }
      if (!line.trim()) return null;
      return (
        <p
          key={lineKey}
          className="font-body text-sm text-foreground/80 leading-relaxed"
        >
          {line}
        </p>
      );
    });

  return (
    <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden">
      <button
        type="button"
        className="w-full text-left p-6 flex items-start justify-between gap-4"
        onClick={() => setOpen(!open)}
        data-ocid={`intelligence.${card.id}.toggle`}
      >
        <div className="flex items-start gap-4">
          <span className="text-3xl flex-shrink-0">{card.icon}</span>
          <div>
            <h3 className="font-display text-lg font-bold text-forest mb-1">
              {card.title}
            </h3>
            <p className="font-body text-sm text-muted-foreground">
              {card.summary}
            </p>
          </div>
        </div>
        <div className="flex-shrink-0 mt-1">
          {open ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
      </button>

      {open && (
        <div className="px-6 pb-6 border-t border-border pt-4 bg-muted/20 space-y-1">
          {lines}
        </div>
      )}
    </div>
  );
}

export default function MarketIntelligenceSection() {
  return (
    <section
      id="intelligence"
      className="section-padding"
      style={{
        background:
          "linear-gradient(175deg, oklch(0.98 0.008 85) 0%, oklch(0.965 0.012 88) 100%)",
      }}
    >
      <div className="container-tight">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold/60" />
            <span className="font-ui text-xs font-bold uppercase tracking-widest text-gold">
              Knowledge Base
            </span>
            <div className="h-px w-8 bg-gold/60" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-forest mb-4 leading-tight">
            Market <em style={{ fontStyle: "italic" }}>Intelligence</em>
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto leading-relaxed">
            Educational resources to understand cashew grading, processing,
            quality parameters, and global trade dynamics.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {cards.map((card) => (
            <IntelCard key={card.id} card={card} />
          ))}
        </div>

        {/* Download guide CTA */}
        <div className="mt-10 bg-gradient-to-r from-gold-light to-cream-dark rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-gold/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-gold-dark" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-forest">
                Download the Full Market Guide
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                Get our comprehensive cashew market intelligence guide — free.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() =>
              document
                .querySelector("#market-guide")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex-shrink-0 font-ui font-bold px-6 py-3 rounded-xl bg-forest text-white hover:bg-forest-dark transition-colors shadow-forest"
            data-ocid="intelligence.download_guide.primary_button"
          >
            Download Free Guide →
          </button>
        </div>
      </div>
    </section>
  );
}
