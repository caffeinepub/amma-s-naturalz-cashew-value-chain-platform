import { Button } from "@/components/ui/button";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Globe,
  Layers,
  MessageCircle,
  Package,
  ShieldCheck,
  Star,
  TrendingUp,
  Truck,
  Users,
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Data ────────────────────────────────────────────────────────────────────

const gradeMarginData = [
  { grade: "W180", margin: 68, color: "#C4973A" },
  { grade: "W210", margin: 55, color: "#6B7C3F" },
  { grade: "W240", margin: 47, color: "#8B4513" },
  { grade: "W320", margin: 38, color: "#B5651D" },
  { grade: "W450", margin: 28, color: "#4A7C59" },
  { grade: "Broken", margin: 18, color: "#9E7340" },
];

const gradeDistData = [
  { name: "W320 (Volume)", value: 32, color: "#B5651D" },
  { name: "W240", value: 20, color: "#8B4513" },
  { name: "W210", value: 16, color: "#6B7C3F" },
  { name: "W180 (Premium)", value: 10, color: "#C4973A" },
  { name: "W450", value: 12, color: "#4A7C59" },
  { name: "Broken+Ind.", value: 10, color: "#9E7340" },
];

const industryData = [
  { name: "Snack Mfg", value: 28 },
  { name: "Wholesale", value: 22 },
  { name: "Export", value: 18 },
  { name: "Retail", value: 14 },
  { name: "Bakery", value: 10 },
  { name: "Others", value: 8 },
];

const logisticsData = [
  { city: "Delhi", freight: 4.5 },
  { city: "Mumbai", freight: 3.2 },
  { city: "Bengaluru", freight: 2.8 },
  { city: "Hyderabad", freight: 3.0 },
  { city: "Kolkata", freight: 5.5 },
  { city: "Chennai", freight: 2.5 },
];

// ─── Types ───────────────────────────────────────────────────────────────────

type Role = "Investor" | "Trader" | "Buyer";

interface Slide {
  id: string;
  icon: React.ReactNode;
  tag: string;
  headline: string;
  subheadline: string;
  bullets: string[];
  visual?: React.ReactNode;
  stat?: { value: string; label: string };
  cta?: boolean;
}

// ─── Charts ──────────────────────────────────────────────────────────────────

function GradeMarginChart() {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={gradeMarginData} barCategoryGap="30%">
        <XAxis dataKey="grade" tick={{ fontSize: 10 }} />
        <YAxis tick={{ fontSize: 10 }} unit="%" domain={[0, 80]} />
        <Tooltip formatter={(v) => `${v}% relative margin index`} />
        <Bar dataKey="margin" radius={[4, 4, 0, 0]}>
          {gradeMarginData.map((d) => (
            <Cell key={d.grade} fill={d.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function GradeDistChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={gradeDistData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="40%"
          outerRadius={60}
          label={false}
          labelLine={false}
        >
          {gradeDistData.map((d) => (
            <Cell key={d.name} fill={d.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{ fontSize: 10, paddingTop: 4 }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

function IndustryChart() {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={industryData} layout="vertical" barCategoryGap="20%">
        <XAxis type="number" tick={{ fontSize: 10 }} unit="%" />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fontSize: 10 }}
          width={70}
        />
        <Tooltip formatter={(v) => `${v}% demand share`} />
        <Bar dataKey="value" fill="#6B7C3F" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function LogisticsChart() {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={logisticsData} barCategoryGap="30%">
        <XAxis dataKey="city" tick={{ fontSize: 10 }} />
        <YAxis tick={{ fontSize: 10 }} unit="₹" domain={[0, 7]} />
        <Tooltip formatter={(v) => `~₹${v}/kg freight`} />
        <Bar dataKey="freight" fill="#C4973A" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── Slide Definitions ───────────────────────────────────────────────────────

function buildSlides(role: Role, _sendToWhatsApp: () => void): Slide[] {
  if (role === "Investor") {
    return [
      {
        id: "market-size",
        icon: <Globe className="w-5 h-5" />,
        tag: "Market Opportunity",
        headline: "A ₹60,000+ Crore Global Kernel Market",
        subheadline:
          "India processes ~50% of the world's raw cashew nuts, making it the dominant hub for cashew kernel supply.",
        bullets: [
          "Global cashew market estimated at USD 7–8 billion and growing at 4–5% CAGR",
          "India imports 1.2–1.5 million MT of RCN annually for domestic processing",
          "Processed kernels command 3–8× the value of raw cashew nuts",
        ],
        stat: {
          value: "~50%",
          label: "India's share in global cashew processing",
        },
      },
      {
        id: "value-chain-econ",
        icon: <TrendingUp className="w-5 h-5" />,
        tag: "Value Creation",
        headline: "Raw to Kernel: Where Value is Created",
        subheadline:
          "The transformation from RCN to graded kernels is where the majority of value is unlocked in the cashew supply chain.",
        bullets: [
          "RCN landed cost: approx. ₹100–130/kg (equivalent kernel basis, indicative)",
          "Premium whole kernels (W180–W240) retail at ₹800–1,200/kg in domestic markets",
          "Contract processing captures this differential without owning a processing facility",
        ],
        stat: {
          value: "3–8×",
          label: "Approximate value uplift from RCN to kernel",
        },
        visual: <GradeMarginChart />,
      },
      {
        id: "grade-diversification",
        icon: <Layers className="w-5 h-5" />,
        tag: "Revenue Diversification",
        headline: "One Batch. Six Revenue Streams.",
        subheadline:
          "A single RCN processing batch produces multiple kernel grades — each serving a different market segment at a distinct price point.",
        bullets: [
          "Whole kernels (W180–W450) serve premium, retail, snack, and export segments",
          "Broken kernels serve bakery, confectionery, and food processing industries",
          "Industrial grades (baby bits, granules) serve large-scale food manufacturers",
        ],
        visual: <GradeDistChart />,
      },
      {
        id: "processing-model",
        icon: <ShieldCheck className="w-5 h-5" />,
        tag: "Business Model",
        headline: "Contract Processing: Asset-Light Participation",
        subheadline:
          "The contract processing model allows participation in cashew value creation without owning processing infrastructure.",
        bullets: [
          "RCN is imported and sent to partner processing facilities in Kerala/coastal India",
          "Processing covers steaming, shelling, drying, peeling, grading, and packing",
          "Output kernels are graded and dispatched directly to buyers across India",
        ],
        stat: { value: "6 Stages", label: "End-to-end processing stages" },
      },
      {
        id: "pan-india",
        icon: <Truck className="w-5 h-5" />,
        tag: "Distribution Reach",
        headline: "Pan-India Distribution Network",
        subheadline:
          "Kernel supply capability across 12+ major Indian cities via established road logistics networks.",
        bullets: [
          "Major markets: Delhi, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata, Pune",
          "Freight estimated at ₹2.5–6.5/kg depending on distance and volume",
          "Single processing base enables multi-city distribution from Palakkad, Kerala",
        ],
        visual: <LogisticsChart />,
      },
      {
        id: "why-now",
        icon: <Star className="w-5 h-5" />,
        tag: "Why Now",
        headline: "Structural Tailwinds for Indian Cashew",
        subheadline:
          "Several long-term demand and supply-side factors are aligning to strengthen the India cashew processing opportunity.",
        bullets: [
          "Rising domestic consumption of packaged nuts and snacks in tier-2 and tier-3 cities",
          "Consistent demand from India's ₹3,000+ crore organised snack manufacturing sector",
          "Government support for food processing and agri-export infrastructure (AIF, PLI, APEDA)",
        ],
        stat: { value: "4–5%", label: "Global cashew market CAGR (estimated)" },
      },
      {
        id: "cta",
        icon: <MessageCircle className="w-5 h-5" />,
        tag: "Get Involved",
        headline: "Interested in This Opportunity?",
        subheadline:
          "Explore investment, distribution, or processing partnership opportunities with Amma's Naturalz – SBZ Enterprises.",
        bullets: [
          "Register your interest using the form in the Investor Insights section",
          "Connect directly on WhatsApp for a conversation with our team",
          "Request a detailed information package for your evaluation",
        ],
        cta: true,
      },
    ];
  }

  if (role === "Trader") {
    return [
      {
        id: "supply-opportunity",
        icon: <Globe className="w-5 h-5" />,
        tag: "Supply Opportunity",
        headline: "A Consistent Kernel Supply Pipeline",
        subheadline:
          "Access graded cashew kernels sourced from African RCN and processed in India — across all major grades.",
        bullets: [
          "Supply routed through African origins: Ivory Coast, Tanzania, Nigeria, Benin, Togo",
          "Processing in certified Indian facilities under contract processing model",
          "Consistent grade output for wholesale, export, and institutional trade",
        ],
        stat: {
          value: "1.2–1.5M MT",
          label: "RCN imported by India annually (industry estimate)",
        },
      },
      {
        id: "grade-portfolio",
        icon: <Layers className="w-5 h-5" />,
        tag: "Grade Portfolio",
        headline: "Full Grade Portfolio for Every Market",
        subheadline:
          "From premium W180 to industrial baby bits — supply across the complete cashew kernel grade spectrum.",
        bullets: [
          "Whole kernels: W180, W210, W240, W320, W450",
          "Broken grades: Splits, Butts, Large Pieces, Small Pieces",
          "Industrial: Baby Bits, Granules for food manufacturing",
        ],
        visual: <GradeDistChart />,
      },
      {
        id: "industry-demand",
        icon: <BarChart3 className="w-5 h-5" />,
        tag: "Market Demand",
        headline: "Multiple Industry Verticals. One Supply Source.",
        subheadline:
          "Diversified demand across India's food industry reduces concentration risk and ensures consistent offtake.",
        bullets: [
          "Snack manufacturers and wholesale traders form the largest demand segments",
          "Export traders require consistent whole kernel supply meeting international standards",
          "Bakery and confectionery sectors drive demand for broken and industrial grades",
        ],
        visual: <IndustryChart />,
      },
      {
        id: "pricing-transparency",
        icon: <TrendingUp className="w-5 h-5" />,
        tag: "Pricing Framework",
        headline: "Transparent Kernel Pricing Structure",
        subheadline:
          "Kernel pricing is driven by grade, nut count, and prevailing market conditions — calculable and estimable.",
        bullets: [
          "Use our RCN to Kernel Yield Calculator to estimate kernel cost basis",
          "Grade output calculator helps plan supply mix for buyer requirements",
          "Pan-India delivery estimator provides landed cost transparency by city",
        ],
        stat: { value: "5 Calculators", label: "Available on this platform" },
      },
      {
        id: "logistics",
        icon: <Truck className="w-5 h-5" />,
        tag: "Logistics",
        headline: "Pan-India Kernel Delivery",
        subheadline:
          "Supply from Kerala processing base to 12+ major markets across India using established logistics networks.",
        bullets: [
          "Road freight via established carriers (VRL and equivalent networks)",
          "Estimated freight: ₹2.5–6.5/kg to major cities",
          "Flexible volume dispatch from small lots to bulk quantities",
        ],
        visual: <LogisticsChart />,
      },
      {
        id: "cta",
        icon: <MessageCircle className="w-5 h-5" />,
        tag: "Connect",
        headline: "Ready to Discuss a Supply Arrangement?",
        subheadline:
          "Connect with the SBZ Enterprises team to discuss grade requirements, volumes, pricing, and supply scheduling.",
        bullets: [
          "Share your grade requirements and target markets",
          "Request an indicative price list for the grades you need",
          "Set up a call to discuss supply terms and scheduling",
        ],
        cta: true,
      },
    ];
  }

  // Buyer
  return [
    {
      id: "quality",
      icon: <ShieldCheck className="w-5 h-5" />,
      tag: "Quality Assurance",
      headline: "India-Processed Kernels. Consistent Quality.",
      subheadline:
        "Cashew kernels processed in Indian facilities under established quality protocols for moisture, grade, and packaging.",
      bullets: [
        "Processing at partner facilities with grading and moisture checks",
        "Kernel output graded per standard AGMARK / international grading norms",
        "Packing in standard 10kg / 25kg cartons or as per buyer specification",
      ],
      stat: { value: "35+", label: "Kernel grades and sub-grades available" },
    },
    {
      id: "grade-selection",
      icon: <Layers className="w-5 h-5" />,
      tag: "Grade Selection",
      headline: "Find the Right Grade for Your Application",
      subheadline:
        "Different industries require different kernel grades. Our platform helps you identify the best match for your use case.",
      bullets: [
        "Snack manufacturers: W320, W240, Splits",
        "Bakery & confectionery: Broken grades, Baby Bits, Granules",
        "Retail packs and gifting: W180, W210 (premium whole kernels)",
      ],
      visual: <GradeDistChart />,
    },
    {
      id: "delivery",
      icon: <Truck className="w-5 h-5" />,
      tag: "Delivery Network",
      headline: "Delivered to Your City. Estimated Cost Upfront.",
      subheadline:
        "Use the Pan-India Delivery Calculator to estimate landed kernel cost to your location before you commit.",
      bullets: [
        "Coverage: Delhi, Mumbai, Ahmedabad, Bengaluru, Hyderabad, Chennai, Kolkata and more",
        "Estimated freight range published per city for planning purposes",
        "Flexible dispatch scheduling based on order size and delivery timeline",
      ],
      visual: <LogisticsChart />,
    },
    {
      id: "industry-applications",
      icon: <Package className="w-5 h-5" />,
      tag: "Industry Applications",
      headline: "What Industry Are You In?",
      subheadline:
        "Amma's Naturalz supply covers the full spectrum of cashew-consuming industries across India.",
      bullets: [
        "Snack manufacturing, food processing, retail brands, private label",
        "Bakery, confectionery, catering, and institutional kitchens",
        "Cashew wholesalers, regional distributors, and export traders",
      ],
      visual: <IndustryChart />,
    },
    {
      id: "pricing-estimator",
      icon: <BarChart3 className="w-5 h-5" />,
      tag: "Pricing Transparency",
      headline: "Estimate Your Kernel Cost Before You Buy",
      subheadline:
        "Use our calculator suite to estimate kernel cost, grade mix, and delivery cost to your city.",
      bullets: [
        "RCN Yield Calculator: estimate kernel cost basis from import parameters",
        "Grade Output Calculator: estimate quantity per grade from your RCN input",
        "Delivery Calculator: estimate landed cost to your location",
      ],
      stat: {
        value: "~₹350–1,200/kg",
        label: "Indicative kernel price range across grades",
      },
    },
    {
      id: "cta",
      icon: <Users className="w-5 h-5" />,
      tag: "Get Started",
      headline: "Ready to Place an Inquiry?",
      subheadline:
        "Connect with the SBZ Enterprises team to discuss your grade requirements, quantity, and delivery needs.",
      bullets: [
        "Fill the Contact form with your grade and quantity requirements",
        "Use the WhatsApp button for a quick direct conversation",
        "Request a sample for quality evaluation before bulk ordering",
      ],
      cta: true,
    },
  ];
}

// ─── Slide Component ──────────────────────────────────────────────────────────

function SlideView({
  slide,
  current,
  total,
  role,
  onWhatsApp,
  onScroll,
}: {
  slide: Slide;
  current: number;
  total: number;
  role: Role;
  onWhatsApp: () => void;
  onScroll: (id: string) => void;
}) {
  return (
    <div className="min-h-[420px] flex flex-col">
      {/* Slide header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-gold/15 flex items-center justify-center text-gold">
          {slide.icon}
        </div>
        <div>
          <span className="font-ui text-xs font-bold uppercase tracking-widest text-gold/80">
            {slide.tag}
          </span>
          <div className="font-ui text-xs text-muted-foreground">
            Slide {current} of {total}
          </div>
        </div>
      </div>

      <h3 className="font-display text-2xl md:text-3xl font-bold text-forest mb-3 leading-snug">
        {slide.headline}
      </h3>
      <p className="font-body text-sm text-muted-foreground mb-6 leading-relaxed max-w-xl">
        {slide.subheadline}
      </p>

      <div className="flex-1 grid md:grid-cols-2 gap-6 items-start">
        {/* Bullets */}
        <div>
          <ul className="space-y-3">
            {slide.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                <span className="font-body text-sm text-foreground/80 leading-relaxed">
                  {b}
                </span>
              </li>
            ))}
          </ul>

          {slide.stat && (
            <div
              className="mt-6 inline-block rounded-xl px-5 py-4"
              style={{
                background: "oklch(0.96 0.018 85)",
                border: "1px solid oklch(0.88 0.04 80)",
              }}
            >
              <div className="font-display text-3xl font-bold text-gold">
                {slide.stat.value}
              </div>
              <div className="font-ui text-xs text-muted-foreground mt-0.5">
                {slide.stat.label}
              </div>
            </div>
          )}

          {slide.cta && (
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                className="bg-[#25D366] hover:bg-[#1fb855] text-white font-ui font-bold gap-2 shadow-md"
                onClick={onWhatsApp}
                data-ocid="pitch.whatsapp.primary_button"
              >
                <MessageCircle className="w-4 h-4" />
                Connect on WhatsApp
              </Button>
              <Button
                variant="outline"
                className="border-forest text-forest hover:bg-forest/5 font-ui font-semibold"
                onClick={() =>
                  onScroll(role === "Buyer" ? "#contact" : "#investors")
                }
                data-ocid="pitch.register.secondary_button"
              >
                {role === "Buyer" ? "Send an Inquiry" : "Register Interest"}
              </Button>
            </div>
          )}
        </div>

        {/* Visual */}
        {slide.visual && (
          <div
            className="rounded-xl overflow-hidden p-3"
            style={{
              background: "oklch(0.97 0.008 80)",
              border: "1px solid oklch(0.90 0.02 80)",
            }}
          >
            {slide.visual}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function InvestorPitchSection() {
  const [role, setRole] = useState<Role>("Investor");
  const [slideIdx, setSlideIdx] = useState(0);

  const roles: Role[] = ["Investor", "Trader", "Buyer"];

  const sendToWhatsApp = () => {
    const msgs: Record<Role, string> = {
      Investor:
        "Hello! I viewed the Investor Pitch on Amma's Naturalz platform and I'm interested in exploring investment or partnership opportunities. Please get in touch.",
      Trader:
        "Hello! I reviewed the Trader Pitch on Amma's Naturalz platform. I'm interested in discussing cashew kernel supply arrangements. Please contact me.",
      Buyer:
        "Hello! I came across Amma's Naturalz and I'd like to enquire about cashew kernel supply for my business. Please share details.",
    };
    window.open(
      `https://wa.me/919188520881?text=${encodeURIComponent(msgs[role])}`,
      "_blank",
    );
  };

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const slides = buildSlides(role, sendToWhatsApp);

  const handleRoleChange = (r: Role) => {
    setRole(r);
    setSlideIdx(0);
  };

  const prev = () => setSlideIdx((i) => Math.max(0, i - 1));
  const next = () => setSlideIdx((i) => Math.min(slides.length - 1, i + 1));

  const roleColors: Record<Role, string> = {
    Investor: "bg-amber-600",
    Trader: "bg-emerald-700",
    Buyer: "bg-blue-700",
  };

  return (
    <section
      id="pitch-deck"
      className="section-padding"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.18 0.06 155) 0%, oklch(0.22 0.05 80) 100%)",
      }}
    >
      <div className="container-tight">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold/60" />
            <span className="font-ui text-xs font-bold uppercase tracking-widest text-gold">
              Investor Pitch
            </span>
            <div className="h-px w-8 bg-gold/60" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Your Role in the{" "}
            <em className="text-gold" style={{ fontStyle: "italic" }}>
              Cashew Cycle
            </em>
          </h2>
          <p className="text-white/65 font-body text-lg max-w-2xl mx-auto leading-relaxed">
            Select your role below to see a tailored pitch explaining how you
            can participate in the cashew value chain — from RCN import to
            kernel distribution across India.
          </p>
        </div>

        {/* Role Selector */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {roles.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => handleRoleChange(r)}
              className={`px-6 py-2.5 rounded-full font-ui font-bold text-sm transition-all border-2 ${
                role === r
                  ? `${roleColors[r]} text-white border-transparent shadow-lg scale-105`
                  : "bg-white/10 text-white/70 border-white/20 hover:bg-white/20 hover:text-white"
              }`}
              data-ocid="pitch.role.tab"
            >
              {r === "Investor" && "I'm an Investor"}
              {r === "Trader" && "I'm a Trader"}
              {r === "Buyer" && "I Want to Buy"}
            </button>
          ))}
        </div>

        {/* Pitch Card */}
        <div
          className="rounded-3xl overflow-hidden shadow-xl"
          style={{ border: "1px solid oklch(0.85 0.025 80 / 0.3)" }}
        >
          {/* Card header bar */}
          <div
            className={`px-6 py-3 flex items-center gap-3 ${roleColors[role]}`}
          >
            <span className="font-ui text-xs font-bold uppercase tracking-widest text-white/90">
              {role} Pitch Deck
            </span>
            <span className="ml-auto font-ui text-xs text-white/60">
              Amma's Naturalz™ – SBZ Enterprises
            </span>
          </div>

          {/* Slide content */}
          <div className="bg-white px-6 md:px-10 py-8">
            <SlideView
              slide={slides[slideIdx]}
              current={slideIdx + 1}
              total={slides.length}
              role={role}
              onWhatsApp={sendToWhatsApp}
              onScroll={scrollTo}
            />
          </div>

          {/* Navigation footer */}
          <div
            className="bg-white px-6 md:px-10 py-4 flex items-center justify-between"
            style={{ borderTop: "1px solid oklch(0.92 0.015 80)" }}
          >
            {/* Dot indicators */}
            <div className="flex items-center gap-1.5">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSlideIdx(i)}
                  className={`rounded-full transition-all ${
                    i === slideIdx
                      ? "w-5 h-2 bg-gold"
                      : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  }`}
                  data-ocid="pitch.slide.toggle"
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prev}
                disabled={slideIdx === 0}
                className="gap-1 font-ui font-semibold border-forest/20 text-forest hover:bg-forest/5 disabled:opacity-30"
                data-ocid="pitch.prev.secondary_button"
              >
                <ChevronLeft className="w-4 h-4" />
                Prev
              </Button>
              <Button
                size="sm"
                onClick={next}
                disabled={slideIdx === slides.length - 1}
                className="gap-1 bg-forest hover:bg-forest-dark text-white font-ui font-bold disabled:opacity-30"
                data-ocid="pitch.next.primary_button"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => scrollTo("#market-guide")}
            className="font-ui text-sm text-gold/80 hover:text-gold underline underline-offset-4 transition-colors"
            data-ocid="pitch.download_guide.link"
          >
            Download the Cashew Market Guide →
          </button>
          <span className="text-white/20 hidden md:block">|</span>
          <button
            type="button"
            onClick={sendToWhatsApp}
            className="font-ui text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1.5"
            data-ocid="pitch.whatsapp.link"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Chat with us on WhatsApp
          </button>
        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-center font-body text-xs text-white/35 max-w-2xl mx-auto leading-relaxed">
          Note: All figures, percentages, and market data presented in this
          pitch deck are indicative estimates based on publicly available
          industry information and internal analysis. They are not guarantees of
          future performance, returns, or outcomes. Participation in any
          commercial arrangement is subject to due diligence, applicable laws,
          and mutual agreement.
        </p>
      </div>
    </section>
  );
}
