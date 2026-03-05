import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Disclaimer from "./Disclaimer";

const INDUSTRY_DEMAND: Record<string, { grade: string; pct: number }[]> = {
  "Snack Manufacturer": [
    { grade: "W320", pct: 40 },
    { grade: "W240", pct: 25 },
    { grade: "W210", pct: 20 },
    { grade: "Splits", pct: 15 },
  ],
  "Food Processor": [
    { grade: "W450", pct: 30 },
    { grade: "Baby Bits", pct: 25 },
    { grade: "Granules", pct: 25 },
    { grade: "Splits", pct: 20 },
  ],
  "Wholesale Trader": [
    { grade: "W320", pct: 30 },
    { grade: "W240", pct: 25 },
    { grade: "W210", pct: 20 },
    { grade: "W180", pct: 10 },
    { grade: "Others", pct: 15 },
  ],
  "Retail Brand": [
    { grade: "W180", pct: 20 },
    { grade: "W210", pct: 25 },
    { grade: "W240", pct: 30 },
    { grade: "W320", pct: 25 },
  ],
  "Bakery & Confectionery": [
    { grade: "Baby Bits", pct: 35 },
    { grade: "Granules", pct: 30 },
    { grade: "Splits", pct: 20 },
    { grade: "Butts", pct: 15 },
  ],
  "Export Trader": [
    { grade: "W180", pct: 25 },
    { grade: "W210", pct: 25 },
    { grade: "W240", pct: 25 },
    { grade: "W320", pct: 25 },
  ],
  "Private Label Brand": [
    { grade: "W240", pct: 35 },
    { grade: "W320", pct: 30 },
    { grade: "W210", pct: 20 },
    { grade: "Splits", pct: 15 },
  ],
};

const COLORS = [
  "#6B7C3F",
  "#C4973A",
  "#8B4513",
  "#B5651D",
  "#4A7C59",
  "#9E7340",
  "#7D5A50",
];

export default function IndustryDemandCalculator() {
  const [industry, setIndustry] = useState("");
  const [shown, setShown] = useState(false);

  const data = industry ? INDUSTRY_DEMAND[industry] : [];

  const sendToWhatsApp = () => {
    if (!industry || data.length === 0) return;
    const gradeLines = data
      .map((d) => `  ${d.grade}: ${d.pct}% demand share`)
      .join("\n");
    const msg = `*Industry Demand Enquiry – Amma's Naturalz*

*--- Input ---*
*Selected Industry:* ${industry}

*--- Recommended Grades & Demand Profile ---*
${gradeLines}

*Primary Grade:* ${data[0].grade} (${data[0].pct}% demand)
*Secondary Grade:* ${data[1]?.grade ?? "N/A"} (${data[1]?.pct ?? 0}% demand)

I would like to discuss kernel supply for my industry.`;
    window.open(
      `https://wa.me/919188520881?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  return (
    <div>
      <h3 className="font-display text-xl font-bold text-forest mb-1">
        Calculator 3: Industry Demand Calculator
      </h3>
      <p className="font-body text-sm text-muted-foreground mb-6">
        Select your industry to see recommended kernel grades and typical demand
        distribution.
      </p>

      <div className="flex flex-wrap gap-4 items-end mb-6">
        <div className="space-y-1.5 min-w-[220px]">
          <Label className="font-ui text-xs font-semibold">
            Select Industry
          </Label>
          <Select
            value={industry}
            onValueChange={(v) => {
              setIndustry(v);
              setShown(false);
            }}
          >
            <SelectTrigger data-ocid="calc3.industry.select">
              <SelectValue placeholder="Choose your industry..." />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(INDUSTRY_DEMAND).map((ind) => (
                <SelectItem key={ind} value={ind}>
                  {ind}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          className="bg-forest hover:bg-forest-dark text-white font-ui font-bold"
          onClick={() => setShown(true)}
          disabled={!industry}
          data-ocid="calc3.show_demand.primary_button"
        >
          Show Demand Profile →
        </Button>
      </div>

      {shown && data.length > 0 && (
        <div className="mt-6 space-y-6" data-ocid="calc3.results.section">
          <div className="flex flex-wrap gap-3">
            {data.map((d, i) => (
              <div
                key={d.grade}
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-ui font-semibold text-sm text-white shadow-sm"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              >
                {d.grade}
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {d.pct}%
                </span>
              </div>
            ))}
          </div>

          <div>
            <h4 className="font-ui font-semibold text-sm text-foreground mb-3">
              Typical Demand Distribution — {industry}
            </h4>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.88 0.02 75)"
                />
                <XAxis
                  dataKey="grade"
                  tick={{ fontSize: 12, fontFamily: "Satoshi" }}
                />
                <YAxis
                  tickFormatter={(v) => `${v}%`}
                  domain={[0, 50]}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip formatter={(v) => [`${v}%`, "Demand Share"]} />
                <Bar dataKey="pct" radius={[4, 4, 0, 0]}>
                  {data.map((d, i) => (
                    <Cell key={d.grade} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-muted/50 rounded-xl p-4 text-sm text-muted-foreground font-body">
            <strong className="text-foreground font-ui">For {industry}:</strong>{" "}
            The primary grade demand is{" "}
            <strong className="text-forest">{data[0].grade}</strong> at{" "}
            {data[0].pct}%, followed by{" "}
            <strong className="text-forest">{data[1]?.grade}</strong> at{" "}
            {data[1]?.pct}%. This profile reflects typical buying patterns
            across this industry segment.
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              className="bg-[#25D366] hover:bg-[#1fb855] text-white font-ui font-bold gap-2"
              onClick={sendToWhatsApp}
              data-ocid="calc3.whatsapp.primary_button"
            >
              <MessageCircle className="w-4 h-4" />
              Enquire for {industry} via WhatsApp
            </Button>
          </div>

          <Disclaimer />
        </div>
      )}
    </div>
  );
}
