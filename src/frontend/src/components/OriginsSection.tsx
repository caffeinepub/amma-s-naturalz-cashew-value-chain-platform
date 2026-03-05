import { MapPin } from "lucide-react";
import { useState } from "react";

interface Country {
  name: string;
  flag: string;
  region: string;
  globalShare: string;
  annualProduction: string;
  mainPorts: string;
  kor: string;
  role: string;
  details: string;
  color: string;
  borderColor: string;
}

const countries: Country[] = [
  {
    name: "Ivory Coast",
    flag: "🇨🇮",
    region: "West Africa",
    globalShare: "~40%",
    annualProduction: "700,000+ MT/year",
    mainPorts: "Abidjan, San-Pédro",
    kor: "44–50 lbs/80kg",
    role: "World's Largest RCN Supplier",
    details:
      "Ivory Coast (Côte d'Ivoire) is the world's single largest producer and exporter of Raw Cashew Nuts, accounting for nearly 40% of global supply. The country's cashew belt runs through the north and center, with millions of smallholder farmers producing high-quality RCN. Most of Ivory Coast's production is exported to India for processing. The nuts are known for reasonable KOR with moderate nut counts.",
    color: "bg-orange-50 border-orange-200",
    borderColor: "border-orange-400",
  },
  {
    name: "Tanzania",
    flag: "🇹🇿",
    region: "East Africa",
    globalShare: "~8%",
    annualProduction: "250,000+ MT/year",
    mainPorts: "Dar es Salaam, Mtwara",
    kor: "46–54 lbs/80kg",
    role: "East Africa's Premier RCN Origin",
    details:
      "Tanzania is East Africa's largest cashew producer and one of India's key sourcing origins. Tanzanian RCN is prized for its relatively high KOR and large nut size, often producing more premium whole kernel grades (W180, W210). The cashew growing regions are concentrated in the southern coastal areas — particularly Mtwara and Lindi. India imports significant volumes of Tanzanian RCN annually.",
    color: "bg-emerald-50 border-emerald-200",
    borderColor: "border-emerald-500",
  },
  {
    name: "Nigeria",
    flag: "🇳🇬",
    region: "West Africa",
    globalShare: "~10%",
    annualProduction: "280,000+ MT/year",
    mainPorts: "Lagos, Calabar",
    kor: "42–48 lbs/80kg",
    role: "Significant West African Producer",
    details:
      "Nigeria is a major RCN producer with significant and growing export capacity. Nigerian cashews are grown primarily in the middle belt and southwest regions. The country has been investing in improving cashew quality and post-harvest handling. Nigerian RCN is increasingly competitive on price and volume. As growing season and harvest logistics improve, Nigeria is emerging as a key sourcing destination.",
    color: "bg-green-50 border-green-200",
    borderColor: "border-green-600",
  },
  {
    name: "Benin",
    flag: "🇧🇯",
    region: "West Africa",
    globalShare: "~6%",
    annualProduction: "150,000+ MT/year",
    mainPorts: "Cotonou",
    kor: "42–48 lbs/80kg",
    role: "Strategic RCN Transit Hub",
    details:
      "Benin serves as a critical hub in the West African cashew trade. While its own production is significant, Benin also handles transit trade from neighboring landlocked countries. The port of Cotonou is a major RCN export point. Benin exported over 132,000 MT of RCN in 2023, with India as the primary destination at nearly 90% of total exports. Benin RCN is priced competitively and serves as an important supplementary source for Indian processors seeking to diversify their RCN origins.",
    color: "bg-yellow-50 border-yellow-200",
    borderColor: "border-yellow-500",
  },
  {
    name: "Togo",
    flag: "🇹🇬",
    region: "West Africa",
    globalShare: "~1%",
    annualProduction: "20,000+ MT/year",
    mainPorts: "Lomé",
    kor: "42–46 lbs/80kg",
    role: "Emerging West African RCN Origin",
    details:
      "Togo is a growing RCN exporting country in West Africa, with the port of Lomé serving as its main export gateway. Togo exported over 7,500 MT of RCN in 2023, a volume that more than doubled year-on-year. India is the dominant buyer, accounting for over 90% of Togo's RCN exports. As cashew cultivation expands in Togo's central and northern regions, the country is gaining attention as a supplementary origin for Indian processors looking to diversify supply.",
    color: "bg-red-50 border-red-200",
    borderColor: "border-red-500",
  },
];

export default function OriginsSection() {
  const [activeCountry, setActiveCountry] = useState<string | null>(null);

  return (
    <section
      id="origins"
      className="section-padding"
      style={{
        background:
          "linear-gradient(170deg, oklch(0.97 0.014 84) 0%, oklch(0.955 0.018 90) 100%)",
      }}
    >
      <div className="container-tight">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold/60" />
            <span className="font-ui text-xs font-bold uppercase tracking-widest text-gold">
              Sourcing Origins
            </span>
            <div className="h-px w-8 bg-gold/60" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-forest mb-4 leading-tight">
            Origins & <em style={{ fontStyle: "italic" }}>Supply</em>
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto leading-relaxed">
            Amma's Naturalz sources RCN from five major African origins. Click
            each country to explore production details and supply
            characteristics.
          </p>
        </div>

        {/* Stylized Africa map indicator */}
        <div className="bg-gradient-to-br from-forest/8 to-gold-light/30 rounded-2xl p-8 mb-10 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, oklch(0.35 0.09 155) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative z-10">
            <div className="font-ui text-xs font-bold uppercase tracking-widest text-gold mb-2">
              RCN Sourcing Map
            </div>
            <div className="font-display text-2xl font-bold text-forest mb-4">
              West & East Africa → India
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {countries.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() =>
                    setActiveCountry(activeCountry === c.name ? null : c.name)
                  }
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-ui font-semibold text-sm border-2 transition-all ${
                    activeCountry === c.name
                      ? "bg-forest text-white border-forest shadow-forest"
                      : "bg-white text-foreground border-border hover:border-forest/30"
                  }`}
                  data-ocid={`origins.${c.name.toLowerCase().replace(/\s+/g, "_")}.button`}
                >
                  <span>{c.flag}</span>
                  <MapPin className="w-3 h-3" />
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Country cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {countries.map((country) => {
            const isActive = activeCountry === country.name;
            return (
              <div
                key={country.name}
                className={`rounded-2xl border-2 shadow-card transition-all duration-300 overflow-hidden ${
                  isActive
                    ? `${country.color} ${country.borderColor} shadow-elevated`
                    : "bg-card border-border"
                }`}
                data-ocid={`origins.${country.name.toLowerCase().replace(/\s+/g, "_")}.card`}
              >
                <button
                  type="button"
                  className="w-full text-left p-6"
                  onClick={() =>
                    setActiveCountry(isActive ? null : country.name)
                  }
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{country.flag}</span>
                      <div>
                        <h3 className="font-display text-xl font-bold text-forest">
                          {country.name}
                        </h3>
                        <span className="font-ui text-xs font-semibold text-gold uppercase tracking-wider">
                          {country.region}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-2xl font-bold text-forest">
                        {country.globalShare}
                      </div>
                      <div className="font-ui text-xs text-muted-foreground">
                        Global Supply
                      </div>
                    </div>
                  </div>

                  <div className="font-ui text-sm font-semibold text-foreground bg-white/60 rounded-lg px-3 py-2 mb-3">
                    {country.role}
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="font-ui text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        Production
                      </div>
                      <div className="font-body font-medium text-foreground">
                        {country.annualProduction}
                      </div>
                    </div>
                    <div>
                      <div className="font-ui text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        Main Ports
                      </div>
                      <div className="font-body font-medium text-foreground">
                        {country.mainPorts}
                      </div>
                    </div>
                    <div>
                      <div className="font-ui text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        Typical KOR
                      </div>
                      <div className="font-body font-medium text-foreground">
                        {country.kor}
                      </div>
                    </div>
                  </div>
                </button>

                {isActive && (
                  <div className="px-6 pb-6 border-t border-current/10 pt-4">
                    <p className="font-body text-sm text-foreground/80 leading-relaxed">
                      {country.details}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
