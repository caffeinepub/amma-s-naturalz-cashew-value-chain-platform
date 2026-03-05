import {
  Activity,
  BarChart2,
  Calculator,
  TrendingUp,
  Truck,
} from "lucide-react";
import { useState } from "react";
import DeliveryCalculator from "./calculators/DeliveryCalculator";
import GradeOutputCalculator from "./calculators/GradeOutputCalculator";
import IndustryDemandCalculator from "./calculators/IndustryDemandCalculator";
import KernelYieldCalculator from "./calculators/KernelYieldCalculator";
import ProfitImpactSimulator from "./calculators/ProfitImpactSimulator";

const tabs = [
  { id: "yield", label: "Kernel Yield", shortLabel: "Yield", icon: Calculator },
  { id: "grade", label: "Grade Output", shortLabel: "Grades", icon: BarChart2 },
  {
    id: "demand",
    label: "Industry Demand",
    shortLabel: "Demand",
    icon: TrendingUp,
  },
  {
    id: "delivery",
    label: "Pan India Delivery",
    shortLabel: "Delivery",
    icon: Truck,
  },
  {
    id: "profit",
    label: "Profit Simulator",
    shortLabel: "Profit",
    icon: Activity,
  },
];

export default function CalculatorsSection() {
  const [activeTab, setActiveTab] = useState("yield");

  return (
    <section
      id="calculators"
      className="section-padding"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.22 0.04 155) 0%, oklch(0.18 0.035 155) 100%)",
      }}
    >
      <div className="container-tight">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold/60" />
            <span className="font-ui text-xs font-bold uppercase tracking-widest text-gold">
              Decision Tools
            </span>
            <div className="h-px w-8 bg-gold/60" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Cashew Value{" "}
            <em style={{ fontStyle: "italic", color: "oklch(0.88 0.14 80)" }}>
              Calculator Suite
            </em>
          </h2>
          <p className="font-body text-lg text-white/65 max-w-2xl mx-auto leading-relaxed">
            Five powerful tools to simulate cashew processing economics, kernel
            yield, grade distribution, industry demand, and delivery costs.
          </p>
        </div>

        {/* Tab nav */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-ui font-semibold text-sm transition-all ${
                  activeTab === tab.id
                    ? "bg-gold text-forest-dark shadow-gold"
                    : "bg-white/10 text-white/70 hover:bg-white/15 hover:text-white"
                }`}
                data-ocid={`calculators.${tab.id}.tab`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Calculator content */}
        <div
          className="bg-white rounded-2xl p-6 md:p-8 shadow-elevated"
          style={{
            border: "1px solid oklch(0.85 0.025 80)",
            borderTop: "2px solid oklch(0.78 0.16 75 / 0.3)",
          }}
        >
          {activeTab === "yield" && <KernelYieldCalculator />}
          {activeTab === "grade" && <GradeOutputCalculator />}
          {activeTab === "demand" && <IndustryDemandCalculator />}
          {activeTab === "delivery" && <DeliveryCalculator />}
          {activeTab === "profit" && <ProfitImpactSimulator />}
        </div>
      </div>
    </section>
  );
}
