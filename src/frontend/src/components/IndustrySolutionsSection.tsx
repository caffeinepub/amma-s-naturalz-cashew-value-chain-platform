import { Badge } from "@/components/ui/badge";
import {
  Award,
  CakeSlice,
  Factory,
  Globe,
  Package,
  ShoppingCart,
  Tag,
} from "lucide-react";

const industries = [
  {
    icon: ShoppingCart,
    name: "Cashew Wholesalers",
    description:
      "Wholesale traders sourcing cashew kernels for redistribution across regional markets. Require consistent supply of multiple grades in large volumes.",
    grades: ["W320", "W240", "W210", "Splits", "Butts"],
    applications: [
      "Bulk kernel procurement",
      "Regional wholesale distribution",
      "Grade-based inventory",
      "Seasonal bulk buying",
    ],
    color: "border-gold/30 bg-gold-light/20",
    iconColor: "bg-gold-light text-gold-dark",
  },
  {
    icon: Package,
    name: "Snack Manufacturers",
    description:
      "Companies producing roasted, salted, or flavored cashew snacks for retail and food service. Need uniform size grades with consistent quality.",
    grades: ["W320", "W240", "Splits", "W210"],
    applications: [
      "Roasted & salted cashew packs",
      "Flavored cashew snacks",
      "Mixed nut products",
      "On-the-go snack formats",
    ],
    color: "border-forest/30 bg-forest/5",
    iconColor: "bg-forest/10 text-forest",
  },
  {
    icon: Factory,
    name: "Food Processing Companies",
    description:
      "Large FMCG and food manufacturers using cashews as ingredients in ready meals, curries, sauces, and processed foods.",
    grades: ["W450", "Baby Bits", "Granules", "Splits"],
    applications: [
      "Ready meal ingredients",
      "Cashew pastes and purees",
      "Curry and gravy inclusion",
      "Sauce manufacturing",
    ],
    color: "border-terracotta/30 bg-terracotta/5",
    iconColor: "bg-terracotta/10 text-terracotta",
  },
  {
    icon: CakeSlice,
    name: "Bakery & Confectionery",
    description:
      "Bakeries, sweet manufacturers, and confectionery brands using cashew pieces, granules, and bits as toppings, inclusions, and fillings.",
    grades: ["Baby Bits", "Granules", "Splits", "Butts"],
    applications: [
      "Biscuit and cookie toppings",
      "Mithai (Indian sweets)",
      "Chocolate and candy inclusions",
      "Cake decorations",
    ],
    color: "border-brown/30 bg-brown/5",
    iconColor: "bg-brown/10 text-brown",
  },
  {
    icon: Tag,
    name: "Retail Nut Brands",
    description:
      "Consumer-facing brands packaging and selling cashews under their own label. Require premium grades with perfect visual appeal.",
    grades: ["W180", "W210", "W240", "W320"],
    applications: [
      "Premium consumer packs",
      "Retail health snack ranges",
      "Supermarket private label",
      "E-commerce cashew brands",
    ],
    color: "border-gold/30 bg-gold-light/20",
    iconColor: "bg-gold/20 text-gold-dark",
  },
  {
    icon: Globe,
    name: "Export Traders",
    description:
      "Traders exporting kernels to international markets. Require export-quality grades meeting international standards (HACCP, ISO).",
    grades: ["W180", "W210", "W240", "W320"],
    applications: [
      "Export container loading",
      "International wholesale",
      "US/EU/Middle East markets",
      "Grade certification",
    ],
    color: "border-forest/30 bg-forest/5",
    iconColor: "bg-forest text-white",
  },
  {
    icon: Award,
    name: "Private Label Brands",
    description:
      "Businesses sourcing kernels for packaging under their own brand names. Need reliable, consistent supply with OEM/white-label packaging.",
    grades: ["W240", "W320", "W210", "Splits"],
    applications: [
      "White-label consumer packs",
      "Hotel & hospitality brands",
      "OEM manufacturing",
      "Custom grade blending",
    ],
    color: "border-terracotta/30 bg-terracotta/5",
    iconColor: "bg-terracotta/15 text-terracotta",
  },
];

export default function IndustrySolutionsSection() {
  return (
    <section
      id="industries"
      className="section-padding"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.96 0.015 155) 0%, oklch(0.97 0.012 85) 100%)",
      }}
    >
      <div className="container-tight">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold/60" />
            <span className="font-ui text-xs font-bold uppercase tracking-widest text-gold">
              Market Verticals
            </span>
            <div className="h-px w-8 bg-gold/60" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-forest mb-4 leading-tight">
            Industry <em style={{ fontStyle: "italic" }}>Solutions</em>
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto leading-relaxed">
            Different industries require different kernel grades. Here's how
            Amma's Naturalz serves each sector.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {industries.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <div
                key={industry.name}
                className={`bg-card rounded-2xl p-5 shadow-card card-hover border ${industry.color}`}
                data-ocid={`industries.item.${i + 1}`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${industry.iconColor}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-ui font-bold text-base text-foreground mb-2">
                  {industry.name}
                </h3>
                <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4">
                  {industry.description}
                </p>

                {/* Recommended grades */}
                <div className="mb-3">
                  <div className="font-ui text-[10px] font-bold uppercase tracking-widest text-gold mb-1.5">
                    Recommended Grades
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {industry.grades.map((grade) => (
                      <Badge
                        key={grade}
                        className="font-ui text-xs bg-forest/10 text-forest border-forest/20 hover:bg-forest/15"
                      >
                        {grade}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Applications */}
                <div>
                  <div className="font-ui text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                    Common Applications
                  </div>
                  <ul className="space-y-1">
                    {industry.applications.slice(0, 3).map((app) => (
                      <li
                        key={app}
                        className="flex items-start gap-1.5 text-xs text-muted-foreground font-body"
                      >
                        <span className="text-gold mt-0.5">•</span>
                        {app}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="font-body text-muted-foreground mb-4">
            Don't see your industry listed? We serve a wide range of buyers.
          </p>
          <button
            type="button"
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="font-ui font-bold px-8 py-3 rounded-xl bg-forest text-white hover:bg-forest-dark transition-colors shadow-forest"
            data-ocid="industries.contact.primary_button"
          >
            Discuss Your Requirements →
          </button>
        </div>
      </div>
    </section>
  );
}
