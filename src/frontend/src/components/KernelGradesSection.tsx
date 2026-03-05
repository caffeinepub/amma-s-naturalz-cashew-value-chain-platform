import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

type GradeCategory = "whole" | "broken" | "industrial";

interface Grade {
  name: string;
  size: string;
  description: string;
  industryUse: string;
  demandNotes: string;
  premium: "high" | "medium" | "standard";
  industries: string[];
}

const wholeKernels: Grade[] = [
  {
    name: "W180",
    size: "~180 kernels/lb",
    description:
      "The largest and most premium whole cashew kernel grade. Only around 180 kernels fit in one pound, indicating exceptional size. These are sometimes called 'Jumbo' cashews.",
    industryUse:
      "Premium retail packs, gift boxes, gourmet snack brands, luxury hotel buffets, export to high-value markets.",
    demandNotes:
      "High demand from premium retail chains and export markets. Commands a significant price premium over other grades.",
    premium: "high",
    industries: ["Retail Brands", "Export Traders", "Hospitality"],
  },
  {
    name: "W210",
    size: "~210 kernels/lb",
    description:
      "Extra-large whole kernels, slightly smaller than W180. Excellent appearance with uniform size and ivory-white color. A top export grade.",
    industryUse:
      "Export markets, premium retail, speciality food stores, airline catering, hotel hospitality.",
    demandNotes:
      "Strong export demand. Premium pricing, slightly lower than W180. High-volume retail seller in developed markets.",
    premium: "high",
    industries: ["Export Traders", "Retail Brands", "Snack Manufacturers"],
  },
  {
    name: "W240",
    size: "~240 kernels/lb",
    description:
      "Large whole kernels with good uniform appearance. The W240 is a versatile grade that balances premium quality with good yield from processing.",
    industryUse:
      "Retail consumer packs, snack manufacturers, bakery toppings, domestic wholesale, food service.",
    demandNotes:
      "One of the highest-volume whole kernel grades. Excellent balance of quality and supply availability. In consistent domestic and export demand.",
    premium: "medium",
    industries: [
      "Wholesale",
      "Snack Manufacturers",
      "Bakeries",
      "Retail Brands",
    ],
  },
  {
    name: "W320",
    size: "~320 kernels/lb",
    description:
      "Medium-size whole kernels. The most commercially produced and traded whole cashew grade globally. High yield, strong demand across multiple sectors.",
    industryUse:
      "Mass market retail, snack manufacturing, food processing, confectionery, dry fruit mixes, institutional buyers.",
    demandNotes:
      "Highest volume demand in the Indian domestic market. Anchors most cashew wholesale contracts. Widely used by FMCG manufacturers.",
    premium: "standard",
    industries: ["Wholesale", "FMCG", "Snack Manufacturers", "Retailers"],
  },
  {
    name: "W450",
    size: "~450 kernels/lb",
    description:
      "Smaller whole kernels, still intact and whole. W450 offers good value for industrial and food manufacturing applications where size is secondary to quality.",
    industryUse:
      "Food processing, mixing applications, institutional catering, lower-cost consumer packs, domestic food brands.",
    demandNotes:
      "High domestic demand from food processors and caterers. More affordable entry point for cashew buyers. Good availability.",
    premium: "standard",
    industries: ["Food Processors", "Caterers", "Domestic Brands"],
  },
];

const brokenKernels: Grade[] = [
  {
    name: "Splits",
    size: "Kernel split in two halves",
    description:
      "A kernel split into two clean halves. One of the more desirable broken grades as the halves maintain their shape and have a presentable appearance.",
    industryUse:
      "Snack manufacturing (roasted splits are popular), bakery toppings, trail mixes, confectionery.",
    demandNotes:
      "High demand from snack manufacturers. Roasted and salted splits are a popular retail snack format. Good price-to-value ratio.",
    premium: "medium",
    industries: ["Snack Manufacturers", "Bakeries", "Retail Snacks"],
  },
  {
    name: "Butts",
    size: "3/4 or more of kernel",
    description:
      "Kernels with approximately 3/4 or more of the whole kernel intact. Butts are essentially near-whole kernels that broke at one end during processing.",
    industryUse:
      "Snack packs, salted cashews, food service, mixed nut products.",
    demandNotes:
      "Moderate to strong demand. Often packaged as value snack packs or used in food service applications where exact size uniformity is not critical.",
    premium: "medium",
    industries: ["Snack Manufacturers", "Food Service", "Wholesale"],
  },
  {
    name: "Large Pieces",
    size: "Pieces larger than 1/2 kernel",
    description:
      "Larger broken pieces, irregular in shape but meaty in size. Suitable for applications where visual uniformity is not required.",
    industryUse:
      "Biscuit manufacturing, cake toppings, ice cream inclusions, granola bars, confectionery.",
    demandNotes:
      "Consistent demand from biscuit and bakery industries. A cost-effective ingredient for food manufacturers.",
    premium: "standard",
    industries: ["Bakeries", "Confectionery", "Biscuit Manufacturers"],
  },
  {
    name: "Small Pieces",
    size: "Small irregular pieces",
    description:
      "Smaller broken pieces with irregular shapes. Used extensively in food manufacturing where pieces are incorporated into the recipe rather than presented as-is.",
    industryUse:
      "Cashew butter, energy bars, chocolate bars with nut pieces, spice mixes, traditional Indian mithai.",
    demandNotes:
      "Steady demand from food manufacturers. Priced lower than larger pieces but essential for certain recipes and products.",
    premium: "standard",
    industries: ["Food Processors", "Confectionery", "Indian Sweets"],
  },
];

const industrialGrades: Grade[] = [
  {
    name: "Baby Bits",
    size: "Fine pieces, 2–5mm",
    description:
      "Very fine cashew pieces, smaller than small pieces, essentially particles ranging 2–5mm. These result from the smallest breakage during processing and grading.",
    industryUse:
      "Bakery coatings, ice cream toppings, chocolate coatings, energy bar inclusions, granola manufacturing.",
    demandNotes:
      "Consistent industrial demand. Critical ingredient for bakery and snack manufacturers at competitive pricing.",
    premium: "standard",
    industries: ["Bakeries", "Ice Cream", "Chocolate", "Granola"],
  },
  {
    name: "Granules",
    size: "Very fine, 1–2mm",
    description:
      "The finest cashew grade — very small granular particles. Used in industrial applications where a fine cashew texture or coating is needed.",
    industryUse:
      "Cashew butter production, confectionery coatings, flavoring powders, industrial food processing.",
    demandNotes:
      "Specialized industrial demand. Priced at the lower end of the kernel spectrum but essential for certain product categories.",
    premium: "standard",
    industries: [
      "Cashew Butter",
      "Industrial Food Processing",
      "Confectionery",
    ],
  },
];

function GradeCard({ grade }: { grade: Grade }) {
  const [expanded, setExpanded] = useState(false);

  const premiumColors = {
    high: "bg-gold-light border-gold/50 text-gold-dark",
    medium: "bg-forest/8 border-forest/30 text-forest",
    standard: "bg-muted border-border text-muted-foreground",
  };

  const badgeColors = {
    high: "bg-gold text-forest-dark",
    medium: "bg-forest text-white",
    standard: "bg-muted-foreground/20 text-muted-foreground",
  };

  return (
    <div
      className={`rounded-xl shadow-card transition-all duration-300 overflow-hidden bg-card ${
        expanded ? "shadow-elevated" : ""
      }`}
      style={{
        border: "1px solid oklch(0.85 0.025 80)",
        borderTop: `2px solid ${grade.premium === "high" ? "oklch(0.78 0.16 75 / 0.35)" : grade.premium === "medium" ? "oklch(0.28 0.08 155 / 0.25)" : "oklch(0.85 0.025 80)"}`,
      }}
    >
      <button
        type="button"
        className="w-full text-left p-5 flex items-center justify-between gap-4"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        data-ocid={`grades.${grade.name.toLowerCase().replace(/\s+/g, "_")}.toggle`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`px-3 py-1 rounded-lg border font-ui font-bold text-sm ${premiumColors[grade.premium]}`}
          >
            {grade.name}
          </div>
          <div>
            <div className="font-ui font-semibold text-sm text-foreground">
              {grade.size}
            </div>
            <div className="font-body text-xs text-muted-foreground mt-0.5 line-clamp-1">
              {grade.industryUse.split(",")[0]}...
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Badge className={`text-xs font-ui ${badgeColors[grade.premium]}`}>
            {grade.premium === "high"
              ? "Premium"
              : grade.premium === "medium"
                ? "Standard"
                : "Value"}
          </Badge>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="px-5 pb-5 border-t border-border pt-4 bg-muted/20">
          <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
            {grade.description}
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="font-ui text-xs font-bold uppercase tracking-widest text-gold mb-1.5">
                Industry Use
              </div>
              <p className="font-body text-sm text-foreground">
                {grade.industryUse}
              </p>
            </div>
            <div>
              <div className="font-ui text-xs font-bold uppercase tracking-widest text-forest mb-1.5">
                Demand Notes
              </div>
              <p className="font-body text-sm text-foreground">
                {grade.demandNotes}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {grade.industries.map((ind) => (
              <span
                key={ind}
                className="font-ui text-xs font-semibold px-2.5 py-1 rounded-full bg-forest/8 text-forest border border-forest/20"
              >
                {ind}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const tabs: { key: GradeCategory; label: string; count: number }[] = [
  { key: "whole", label: "Whole Kernels", count: wholeKernels.length },
  { key: "broken", label: "Broken Kernels", count: brokenKernels.length },
  {
    key: "industrial",
    label: "Industrial Grades",
    count: industrialGrades.length,
  },
];

const gradeMap: Record<GradeCategory, Grade[]> = {
  whole: wholeKernels,
  broken: brokenKernels,
  industrial: industrialGrades,
};

export default function KernelGradesSection() {
  const [active, setActive] = useState<GradeCategory>("whole");

  return (
    <section
      id="kernel-grades"
      className="section-padding"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.96 0.016 84) 0%, oklch(0.975 0.01 82) 100%)",
      }}
    >
      <div className="container-tight">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold/60" />
            <span className="font-ui text-xs font-bold uppercase tracking-widest text-gold">
              Grade Reference
            </span>
            <div className="h-px w-8 bg-gold/60" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-forest mb-4 leading-tight">
            Kernel Grades <em style={{ fontStyle: "italic" }}>Database</em>
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto leading-relaxed">
            A comprehensive reference to all major cashew kernel grades — from
            premium whole kernels to industrial-grade granules.
          </p>
        </div>

        {/* Tab switcher */}
        <div
          className="flex flex-wrap gap-2 justify-center mb-8"
          role="tablist"
          aria-label="Kernel grade categories"
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={active === tab.key}
              onClick={() => setActive(tab.key)}
              className={`font-ui font-semibold px-5 py-2.5 rounded-full transition-all text-sm gap-2 flex items-center ${
                active === tab.key
                  ? "bg-forest text-white shadow-forest"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              data-ocid={`grades.${tab.key}.tab`}
            >
              {tab.label}
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                  active === tab.key
                    ? "bg-white/20"
                    : "bg-forest/10 text-forest"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Grade cards */}
        <div className="flex flex-col gap-3">
          {gradeMap[active].map((grade) => (
            <GradeCard key={grade.name} grade={grade} />
          ))}
        </div>

        {/* Grade guide callout */}
        <div className="mt-10 bg-gradient-to-r from-forest to-forest-dark rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-xl font-bold mb-2">
                Need help choosing the right grade?
              </h3>
              <p className="font-body text-white/75 text-sm">
                Our Industry Solutions section maps specific kernel grades to
                your industry requirements.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                document
                  .querySelector("#industries")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex-shrink-0 font-ui font-bold px-6 py-3 rounded-xl bg-gold text-forest-dark hover:bg-gold-dark transition-colors shadow-gold"
              data-ocid="grades.industries.primary_button"
            >
              View Industry Solutions →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
