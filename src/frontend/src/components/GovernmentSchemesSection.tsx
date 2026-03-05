import { Badge } from "@/components/ui/badge";
import { Building2, ChevronDown, ChevronUp, Info } from "lucide-react";
import { useState } from "react";

interface Scheme {
  name: string;
  shortName: string;
  ministry: string;
  audience: ("Investor" | "Trader" | "Buyer" | "Processor")[];
  summary: string;
  details: string;
  benefit: string;
  link?: string;
}

const schemes: Scheme[] = [
  {
    name: "Remission of Duties and Taxes on Exported Products",
    shortName: "RoDTEP",
    ministry: "Ministry of Commerce & Industry",
    audience: ["Trader"],
    summary:
      "Export incentive scheme that reimburses duties, taxes and levies embedded in exported goods not otherwise refunded.",
    details:
      "Exporters of cashew kernels may be eligible for RoDTEP benefits under the applicable HS code. The scheme reimburses central, state and local taxes/duties embedded in the cost of exported products. Benefits are credited as transferable scrip in an electronic ledger.",
    benefit:
      "Potential rebate on taxes embedded in export cost, improving net export realisation.",
  },
  {
    name: "APEDA Market Development Assistance",
    shortName: "APEDA MDA",
    ministry:
      "Agricultural & Processed Food Products Export Development Authority",
    audience: ["Trader", "Investor"],
    summary:
      "Financial assistance for promotion of agricultural and processed food exports, including participation in international trade fairs and market development.",
    details:
      "APEDA provides assistance for export promotion activities such as trade fairs, buyer-seller meets, brand promotion and quality development. Cashew kernels fall under APEDA's mandate. Registered exporters may be eligible to apply for various support programs as per current scheme guidelines.",
    benefit:
      "Potential support for export marketing, trade fair participation, and brand development activities.",
  },
  {
    name: "NABARD Agricultural Credit & RIDF",
    shortName: "NABARD Credit",
    ministry: "National Bank for Agriculture and Rural Development",
    audience: ["Investor", "Processor"],
    summary:
      "Financing and refinancing support for agricultural value chain infrastructure, processing units, and agri-businesses.",
    details:
      "NABARD provides refinancing facilities to banks for agricultural lending and infrastructure financing. The Rural Infrastructure Development Fund (RIDF) supports creation of agri-processing infrastructure. Cashew processing facilities and value chain investments may qualify under relevant categories, subject to banker and NABARD norms.",
    benefit:
      "Potentially concessional credit rates for agri-processing infrastructure and working capital financing.",
  },
  {
    name: "MSME Udyam Registration Benefits",
    shortName: "MSME Udyam",
    ministry: "Ministry of Micro, Small & Medium Enterprises",
    audience: ["Investor", "Trader", "Processor"],
    summary:
      "Registered MSMEs may access priority sector lending, collateral-free loans, government tender benefits, and scheme-linked subsidies.",
    details:
      "Cashew processing, trading, and distribution businesses falling within MSME turnover thresholds may register on the Udyam portal. Registered MSMEs may be eligible for priority sector lending from banks, reduced interest rates under CGTMSE (collateral-free credit guarantee), preference in government procurement, and access to various state and central MSME subsidy schemes.",
    benefit:
      "Access to priority sector credit, collateral-free loan guarantees, and government procurement preference.",
  },
  {
    name: "Production Linked Incentive – Food Processing",
    shortName: "PLI Food Processing",
    ministry: "Ministry of Food Processing Industries",
    audience: ["Investor", "Processor"],
    summary:
      "Incentive scheme for scaling food processing manufacturing, with incentives linked to incremental sales growth.",
    details:
      "PLI for Food Processing covers Ready-to-Eat / Ready-to-Cook and innovative food products. Processed cashew products (roasted, flavoured, packaged snacks) may qualify under relevant product categories. Eligible applicants receive incentives on incremental sales over a base year, subject to minimum investment thresholds and scheme eligibility criteria.",
    benefit:
      "Potential production-linked incentives for scaling cashew processing and value-added product manufacturing.",
  },
  {
    name: "Prime Minister's Employment Generation Programme",
    shortName: "PMEGP",
    ministry: "Ministry of Micro, Small & Medium Enterprises / KVIC",
    audience: ["Investor"],
    summary:
      "Credit-linked subsidy scheme for setting up new micro enterprises in manufacturing and service sectors, including food processing.",
    details:
      "PMEGP provides a margin money subsidy (15%–35% of project cost depending on category and location) for new micro enterprises. Food processing projects including cashew processing units may be eligible. The scheme is implemented through KVIC, District Industries Centres, and banks. Subject to project approval and scheme guidelines.",
    benefit:
      "Potential margin money subsidy for new cashew processing or trading enterprise setup.",
  },
  {
    name: "Stand-Up India Scheme",
    shortName: "Stand-Up India",
    ministry: "Ministry of Finance / SIDBI",
    audience: ["Investor"],
    summary:
      "Facilitates bank loans between ₹10 lakh to ₹1 crore for SC/ST and women entrepreneurs for setting up greenfield enterprises.",
    details:
      "Stand-Up India supports first-generation entrepreneurs in manufacturing, services, and trading. Women or SC/ST promoters setting up cashew processing, trading, or distribution enterprises may be eligible. Loans are composite, covering both term loan and working capital needs. Subject to bank credit norms.",
    benefit:
      "Composite bank loan facility of ₹10 lakh – ₹1 crore for eligible first-generation entrepreneurs.",
  },
  {
    name: "Export Credit Guarantee Corporation",
    shortName: "ECGC Cover",
    ministry: "Ministry of Commerce & Industry",
    audience: ["Trader"],
    summary:
      "Credit risk insurance for exporters covering commercial and political risks in export receivables.",
    details:
      "Cashew kernel exporters may obtain ECGC's Shipment Credit Insurance Policy (SCIP) or Buyer Exposure Policy to protect against buyer default and country risk. This can also help exporters obtain better terms from banks for pre-shipment and post-shipment credit facilities.",
    benefit:
      "Potential protection of export receivables against buyer default; may improve bank credit terms for export financing.",
  },
  {
    name: "Agricultural Infrastructure Fund",
    shortName: "AIF",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    audience: ["Investor", "Processor"],
    summary:
      "Medium to long-term debt financing facility for post-harvest management infrastructure and community farming assets.",
    details:
      "AIF provides interest subvention of 3% per annum for loans up to ₹2 crore for eligible post-harvest infrastructure projects. Cashew processing facilities, grading units, and cold storage infrastructure may be eligible. Applicable for FPOs, PACS, agri-entrepreneurs, and startups meeting eligibility criteria.",
    benefit:
      "Interest subvention of 3% p.a. on loans for eligible agri-processing and post-harvest infrastructure.",
  },
  {
    name: "GeM Portal (Government e-Marketplace)",
    shortName: "GeM Portal",
    ministry: "Ministry of Commerce & Industry",
    audience: ["Trader", "Buyer"],
    summary:
      "Online marketplace for government procurement of goods and services, including food products for institutional buyers.",
    details:
      "Registered sellers on GeM can supply cashew kernels and processed cashew products to government institutions including defence canteens, central kitchens, and government organisations. GeM mandates preference for MSMEs and domestic manufacturers in eligible categories.",
    benefit:
      "Access to government institutional buyers and procurement orders for cashew products.",
  },
  {
    name: "SFAC & Farmer Producer Organisation Support",
    shortName: "FPO / SFAC",
    ministry: "Ministry of Agriculture & Farmers Welfare / SFAC",
    audience: ["Investor"],
    summary:
      "Support for aggregation models, FPO formation, and value chain integration involving smallholder farmers.",
    details:
      "The Small Farmers Agribusiness Consortium (SFAC) and the 10,000 FPO scheme support creation and strengthening of Farmer Producer Organisations. Investors and agribusinesses integrating with cashew farming communities or sourcing from FPOs may access aggregation support, matching equity grants, and government-facilitated linkages.",
    benefit:
      "Potential equity grants and institutional support for FPO-linked agribusiness models.",
  },
];

const audienceColors: Record<string, string> = {
  Investor: "bg-amber-100 text-amber-800 border-amber-300",
  Trader: "bg-emerald-100 text-emerald-800 border-emerald-300",
  Buyer: "bg-blue-100 text-blue-800 border-blue-300",
  Processor: "bg-purple-100 text-purple-800 border-purple-300",
};

const filterLabels = [
  "All",
  "Investor",
  "Trader",
  "Buyer",
  "Processor",
] as const;
type FilterType = (typeof filterLabels)[number];

export default function GovernmentSchemesSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const filtered = schemes.filter(
    (s) =>
      activeFilter === "All" ||
      s.audience.includes(activeFilter as Scheme["audience"][0]),
  );

  return (
    <section
      id="govt-schemes"
      className="section-padding"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.97 0.010 260) 0%, oklch(0.95 0.012 155) 100%)",
      }}
    >
      <div className="container-tight">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold/60" />
            <span className="font-ui text-xs font-bold uppercase tracking-widest text-gold">
              Policy & Incentives
            </span>
            <div className="h-px w-8 bg-gold/60" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-forest mb-4 leading-tight">
            India Government <em style={{ fontStyle: "italic" }}>Schemes</em>{" "}
            &amp; Support
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto leading-relaxed">
            A reference overview of central government schemes that may be
            relevant to investors, traders, buyers, and processors participating
            in the cashew value chain. Subject to individual eligibility and
            scheme guidelines.
          </p>
        </div>

        {/* Info banner */}
        <div
          className="flex items-start gap-3 rounded-xl px-5 py-4 mb-10"
          style={{
            background: "oklch(0.97 0.015 260)",
            border: "1px solid oklch(0.82 0.04 260)",
          }}
        >
          <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="font-body text-sm text-blue-900/80 leading-relaxed">
            The schemes listed below are for general awareness and reference
            purposes only. Eligibility, quantum of benefit, and applicability
            depend on individual business profile, scheme guidelines, and
            applicable rules at the time of application. This is not financial
            or legal advice. We recommend consulting a qualified advisor or
            relevant government authority before making any investment or
            business decision based on this information.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8" role="tablist">
          {filterLabels.map((label) => (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={activeFilter === label}
              onClick={() => {
                setActiveFilter(label);
                setExpandedIdx(null);
              }}
              className={`px-4 py-1.5 rounded-full text-sm font-ui font-semibold transition-all border ${
                activeFilter === label
                  ? "bg-forest text-white border-forest shadow-sm"
                  : "bg-white text-forest/70 border-forest/20 hover:border-forest/50"
              }`}
              data-ocid="schemes.filter.tab"
            >
              {label}
              {label !== "All" && (
                <span className="ml-1.5 text-xs opacity-70">
                  (
                  {
                    schemes.filter((s) =>
                      s.audience.includes(label as Scheme["audience"][0]),
                    ).length
                  }
                  )
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Scheme cards */}
        <div className="space-y-3">
          {filtered.map((scheme, idx) => {
            const isOpen = expandedIdx === idx;
            return (
              <div
                key={scheme.shortName}
                className="bg-white rounded-2xl overflow-hidden shadow-card transition-all"
                style={{ border: "1px solid oklch(0.88 0.02 155)" }}
                data-ocid={`schemes.item.${idx + 1}`}
              >
                <button
                  type="button"
                  className="w-full text-left px-6 py-5 flex items-start gap-4 hover:bg-muted/30 transition-colors"
                  onClick={() => setExpandedIdx(isOpen ? null : idx)}
                  data-ocid={`schemes.toggle.${idx + 1}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-forest/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Building2 className="w-5 h-5 text-forest" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-ui font-bold text-sm text-forest">
                        {scheme.shortName}
                      </span>
                      {scheme.audience.map((a) => (
                        <span
                          key={a}
                          className={`text-xs px-2 py-0.5 rounded-full border font-ui font-semibold ${audienceColors[a]}`}
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                    <p className="font-body text-xs text-muted-foreground mb-1">
                      {scheme.ministry}
                    </p>
                    <p className="font-body text-sm text-foreground/80 leading-relaxed">
                      {scheme.summary}
                    </p>
                  </div>
                  <div className="flex-shrink-0 mt-1">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-forest/60" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-forest/60" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div
                    className="px-6 pb-6 pt-1"
                    style={{ borderTop: "1px solid oklch(0.92 0.01 155)" }}
                  >
                    <div className="ml-14 space-y-4">
                      <div>
                        <h4 className="font-ui text-xs font-bold uppercase tracking-wider text-forest/60 mb-1.5">
                          Full Name
                        </h4>
                        <p className="font-body text-sm text-foreground/80">
                          {scheme.name}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-ui text-xs font-bold uppercase tracking-wider text-forest/60 mb-1.5">
                          Applicability to Cashew Value Chain
                        </h4>
                        <p className="font-body text-sm text-foreground/80 leading-relaxed">
                          {scheme.details}
                        </p>
                      </div>
                      <div
                        className="rounded-xl px-4 py-3"
                        style={{
                          background: "oklch(0.96 0.02 85)",
                          border: "1px solid oklch(0.88 0.04 80)",
                        }}
                      >
                        <h4 className="font-ui text-xs font-bold uppercase tracking-wider text-gold mb-1">
                          Potential Benefit
                        </h4>
                        <p className="font-body text-sm text-foreground/80">
                          {scheme.benefit}
                        </p>
                      </div>
                      <p className="font-body text-xs text-muted-foreground italic">
                        * Eligibility, benefit quantum, and application process
                        are subject to scheme guidelines and individual
                        assessment. Consult a financial advisor or the relevant
                        ministry/authority for current scheme status.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom disclaimer */}
        <div
          className="mt-10 rounded-xl px-6 py-5"
          style={{
            background: "oklch(0.97 0.008 80)",
            border: "1px solid oklch(0.88 0.025 80)",
          }}
        >
          <p className="font-ui text-xs font-bold uppercase tracking-wider text-gold mb-2">
            Important Disclaimer
          </p>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            The government schemes listed above are provided for general
            awareness and educational reference only. Information is based on
            publicly available scheme details and may not reflect the latest
            amendments, notifications, or eligibility changes. Amma's Naturalz
            and SBZ Enterprises do not guarantee, endorse, or represent
            eligibility for any scheme on behalf of any user or investor.
            Benefits, quantum, and availability are subject to individual
            eligibility, scheme guidelines, and the decisions of competent
            authorities. This content should not be construed as financial,
            legal, or investment advice. Please consult a qualified professional
            and the relevant government authority before making any decisions.
          </p>
        </div>
      </div>
    </section>
  );
}
