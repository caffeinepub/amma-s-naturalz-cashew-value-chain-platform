import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, Layers, Presentation } from "lucide-react";

const scrollTo = (id: string) => {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/hero-banner.dim_1600x600.jpg"
          alt="Cashew processing facility"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Overlay: rich dark green gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.16_0.06_155/0.93)] via-[oklch(0.16_0.06_155/0.85)] to-[oklch(0.2_0.04_80/0.7)]" />
        {/* Grain */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* Decorative geometric accent */}
      <div className="absolute right-0 top-1/4 w-64 h-64 rounded-full opacity-10 bg-gold blur-3xl" />
      <div className="absolute right-1/4 bottom-1/4 w-48 h-48 rounded-full opacity-8 bg-gold blur-2xl" />

      <div className="relative z-10 container-tight py-32 md:py-40">
        <div className="max-w-3xl">
          {/* Tagline badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/20 border border-gold/40 text-gold mb-6 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="font-ui text-xs font-semibold tracking-widest uppercase">
              Import Raw Cashew · Process in India · Supply Kernels Across the
              Market
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Import Raw Cashew.
            <br />
            <span className="text-gold">Process in India.</span>
            <br />
            Capture the Kernel{" "}
            <span className="italic text-cream/90">Value Chain.</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-white/75 leading-relaxed mb-10 max-w-2xl font-body">
            A platform helping wholesalers, food manufacturers, and investors
            understand cashew processing economics and supply opportunities
            across India.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-gold hover:bg-gold-dark text-forest-dark font-ui font-bold shadow-gold gap-2"
              onClick={() => scrollTo("#opportunity")}
              data-ocid="hero.explore_opportunity.primary_button"
            >
              Explore Opportunity
              <ArrowRight className="w-4 h-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white/40 text-white bg-white/10 hover:bg-white/20 font-ui font-semibold backdrop-blur-sm gap-2"
              onClick={() => scrollTo("#calculators")}
              data-ocid="hero.kernel_calculator.secondary_button"
            >
              <Calculator className="w-4 h-4" />
              Try the Kernel Calculator
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white/40 text-white bg-white/10 hover:bg-white/20 font-ui font-semibold backdrop-blur-sm gap-2"
              onClick={() => scrollTo("#kernel-grades")}
              data-ocid="hero.kernel_grades.secondary_button"
            >
              <Layers className="w-4 h-4" />
              View Kernel Grades
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-gold/60 text-gold bg-gold/10 hover:bg-gold/20 font-ui font-semibold backdrop-blur-sm gap-2"
              onClick={() => scrollTo("#pitch-deck")}
              data-ocid="hero.pitch_deck.secondary_button"
            >
              <Presentation className="w-4 h-4" />
              View Investor Pitch
            </Button>
          </div>

          {/* Trust signals */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-8">
            {[
              { label: "Kernel Grades", value: "35+" },
              { label: "Indian Markets", value: "Pan India" },
              { label: "Processing Model", value: "Contract" },
            ].map((stat) => (
              <div key={stat.label} className="text-white/80">
                <div
                  className="font-display text-2xl font-bold text-gold"
                  style={{
                    textShadow:
                      "0 0 20px oklch(0.78 0.16 75 / 0.5), 0 0 40px oklch(0.78 0.16 75 / 0.2)",
                  }}
                >
                  {stat.value}
                </div>
                <div className="font-ui text-xs text-white/50 uppercase tracking-widest mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40">
        <span className="font-ui text-xs uppercase tracking-widest">
          Scroll to explore
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
