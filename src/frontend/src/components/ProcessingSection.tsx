import {
  Flame,
  Hand,
  Package,
  Scissors,
  SlidersHorizontal,
  Wind,
} from "lucide-react";

const stages = [
  {
    icon: Flame,
    number: "01",
    title: "Steaming",
    description:
      "Raw cashew nuts are steam-cooked under controlled pressure to soften the shell and neutralize the caustic CNSL (Cashew Nut Shell Liquid), making shelling safer and more efficient.",
    detail: "Temperature: 100–120°C | Duration: 20–30 min",
  },
  {
    icon: Scissors,
    number: "02",
    title: "Shelling",
    description:
      "Steamed nuts are shelled using mechanical or manual cutting machines. The goal is to extract whole kernels with minimal breakage. Shelling efficiency directly affects the whole-kernel yield ratio.",
    detail: "Target: >60% whole kernel recovery",
  },
  {
    icon: Wind,
    number: "03",
    title: "Drying",
    description:
      "Shelled kernels, still covered in the testa (thin red skin), are dried in controlled ovens or sun-dryers to reduce moisture content. Target moisture: 3–5% for optimal shelf life.",
    detail: "Moisture target: 3–5% | Method: Oven or solar drying",
  },
  {
    icon: Hand,
    number: "04",
    title: "Peeling",
    description:
      "The dried testa is removed by mechanical peeling machines or by hand. This reveals the ivory-white kernel beneath. Peeling quality determines the cosmetic grade of the kernel.",
    detail: "Key quality step: Determines kernel whiteness grade",
  },
  {
    icon: SlidersHorizontal,
    number: "05",
    title: "Grading",
    description:
      "Peeled kernels are sorted by size using grading machines and visual inspection. Whole grades (W180–W450) are separated from broken grades (Splits, Butts, Pieces) and industrial grades (Baby Bits, Granules).",
    detail: "Grades: W180, W210, W240, W320, W450 + Broken + Industrial",
  },
  {
    icon: Package,
    number: "06",
    title: "Packing",
    description:
      "Graded kernels are vacuum-packed in nitrogen-flushed tins (typically 25 lbs / 11.34 kg) to preserve freshness. Premium grades are packed separately. Packaged product is ready for distribution.",
    detail: "Pack format: 25 lb tins, vacuum nitrogen flush",
  },
];

const outputs = [
  {
    title: "Whole Kernels",
    grades: ["W180", "W210", "W240", "W320", "W450"],
    icon: "🥜",
    pct: "~65–70%",
    color: "bg-gold-light border-gold/40",
    textColor: "text-gold-dark",
    description: "Premium whole kernels sorted by size per pound",
  },
  {
    title: "Broken Kernels",
    grades: ["Splits", "Butts", "Large Pieces", "Small Pieces"],
    icon: "⚡",
    pct: "~20–25%",
    color: "bg-forest/8 border-forest/30",
    textColor: "text-forest",
    description:
      "Broken during processing, used in snacks and food manufacturing",
  },
  {
    title: "Industrial Grades",
    grades: ["Baby Bits", "Granules"],
    icon: "⚙️",
    pct: "~5–10%",
    color: "bg-terracotta/10 border-terracotta/30",
    textColor: "text-terracotta",
    description: "Fine particles for bakery, confectionery, and industrial use",
  },
];

export default function ProcessingSection() {
  return (
    <section
      id="processing"
      className="section-padding"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.98 0.008 85) 0%, oklch(0.96 0.014 88) 50%, oklch(0.97 0.01 82) 100%)",
      }}
    >
      <div className="container-tight">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold/60" />
            <span className="font-ui text-xs font-bold uppercase tracking-widest text-gold">
              Processing Model
            </span>
            <div className="h-px w-8 bg-gold/60" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-forest mb-4 leading-tight">
            Contract <em style={{ fontStyle: "italic" }}>Processing</em> Model
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto leading-relaxed">
            Imported RCN is processed at partner facilities in Kerala through a
            6-stage sequence that converts raw nuts into multiple market-ready
            kernel grades.
          </p>
        </div>

        {/* 6-stage grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.number}
                className="bg-card rounded-2xl p-6 shadow-card border border-border card-hover relative overflow-hidden group"
              >
                {/* Background number */}
                <span className="absolute top-4 right-4 font-display text-5xl font-bold text-forest/5 select-none group-hover:text-forest/10 transition-colors">
                  {stage.number}
                </span>
                <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center mb-4 shadow-gold">
                  <Icon className="w-6 h-6 text-forest-dark" />
                </div>
                <h3 className="font-ui font-bold text-lg text-foreground mb-2">
                  {stage.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-3">
                  {stage.description}
                </p>
                <div className="text-xs font-ui font-semibold text-forest bg-forest/8 rounded-lg px-3 py-1.5">
                  {stage.detail}
                </div>
              </div>
            );
          })}
        </div>

        {/* Processing outputs */}
        <div>
          <h3 className="font-display text-2xl font-bold text-forest mb-6 text-center">
            Processing Output Categories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {outputs.map((output) => (
              <div
                key={output.title}
                className={`rounded-2xl p-6 border ${output.color} shadow-card card-hover`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{output.icon}</span>
                  <span
                    className={`font-display text-2xl font-bold ${output.textColor}`}
                  >
                    {output.pct}
                  </span>
                </div>
                <h4
                  className={`font-ui font-bold text-lg mb-2 ${output.textColor}`}
                >
                  {output.title}
                </h4>
                <p className="font-body text-sm text-muted-foreground mb-4 leading-relaxed">
                  {output.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {output.grades.map((grade) => (
                    <span
                      key={grade}
                      className={`font-ui text-xs font-semibold px-2.5 py-1 rounded-full border ${output.color} ${output.textColor}`}
                    >
                      {grade}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
