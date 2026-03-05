import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Disclaimer from "./Disclaimer";

const GRADE_COLORS = [
  "#6B7C3F",
  "#C4973A",
  "#8B4513",
  "#B5651D",
  "#4A7C59",
  "#9E7340",
];

const GRADE_DISTRIBUTION = [
  { grade: "W320", pct: 35 },
  { grade: "W240", pct: 20 },
  { grade: "W210", pct: 15 },
  { grade: "W180", pct: 5 },
  { grade: "W450", pct: 10 },
  { grade: "Broken", pct: 15 },
];

export default function KernelYieldCalculator() {
  const [rcnPrice, setRcnPrice] = useState(1200);
  const [usdRate, setUsdRate] = useState(83);
  const [kor, setKor] = useState(48);
  const [nutCount, setNutCount] = useState(180);
  const [moisture, setMoisture] = useState(8);
  const [volume, setVolume] = useState(10);
  const [results, setResults] = useState<null | {
    yieldKg: number;
    costPerKg: number;
    gradeData: { grade: string; kg: number; pct: number }[];
    barData: { name: string; value: number }[];
  }>(null);

  const calculate = () => {
    // Kernel yield kg per MT of RCN
    const kernelYieldPerMT = ((kor * 0.45359237) / 80) * 1000;
    const moistureAdjusted = kernelYieldPerMT * (1 - moisture / 100);
    const totalKernelKg = volume * moistureAdjusted;

    // Cost per kg
    const rcnCostINR = (rcnPrice * usdRate) / 1000; // INR per kg RCN
    const rcnCostPerKernelKg = rcnCostINR / (moistureAdjusted / 1000);
    const processingCost = 35; // INR/kg approx
    const costPerKg = rcnCostPerKernelKg + processingCost;

    const gradeData = GRADE_DISTRIBUTION.map((g) => ({
      ...g,
      kg: Math.round((totalKernelKg * g.pct) / 100),
    }));

    const barData = [
      { name: "RCN Input (MT→kg)", value: Math.round(volume * 1000) },
      { name: "Kernel Yield (kg)", value: Math.round(totalKernelKg) },
    ];

    setResults({
      yieldKg: Math.round(totalKernelKg),
      costPerKg: Math.round(costPerKg),
      gradeData,
      barData,
    });
  };

  const sendToWhatsApp = () => {
    if (!results) return;
    const gradeLines = results.gradeData
      .map(
        (g) => `  ${g.grade}: ${g.kg.toLocaleString("en-IN")} kg (${g.pct}%)`,
      )
      .join("\n");
    const msg = `*Cashew Kernel Yield Enquiry – Amma's Naturalz*

*--- Inputs ---*
*RCN CIF Price:* $${rcnPrice}/MT
*USD to INR Rate:* ₹${usdRate}
*KOR (lbs/80kg bag):* ${kor}
*Nut Count:* ${nutCount} nuts/kg
*Moisture %:* ${moisture}%
*RCN Volume:* ${volume} MT

*--- Calculated Results ---*
*Total Kernel Yield:* ${results.yieldKg.toLocaleString("en-IN")} kg
*Estimated Cost/kg:* ₹${results.costPerKg.toLocaleString("en-IN")}/kg
*Kernel Yield %:* ${((results.yieldKg / (volume * 1000)) * 100).toFixed(1)}%

*Grade Distribution:*
${gradeLines}

I would like to discuss further.`;
    window.open(
      `https://wa.me/919188520881?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  return (
    <div>
      <h3 className="font-display text-xl font-bold text-forest mb-1">
        Calculator 1: RCN to Kernel Yield
      </h3>
      <p className="font-body text-sm text-muted-foreground mb-6">
        Estimate total kernel yield and approximate production cost from
        imported RCN.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
        <div className="space-y-1.5">
          <Label className="font-ui text-xs font-semibold">
            RCN CIF Price ($/MT)
          </Label>
          <Input
            type="number"
            value={rcnPrice}
            onChange={(e) => setRcnPrice(Number(e.target.value))}
            placeholder="1200"
            data-ocid="calc1.rcn_price.input"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="font-ui text-xs font-semibold">
            USD to INR Exchange Rate
          </Label>
          <Input
            type="number"
            value={usdRate}
            onChange={(e) => setUsdRate(Number(e.target.value))}
            placeholder="83"
            data-ocid="calc1.usd_rate.input"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="font-ui text-xs font-semibold">
            KOR (lbs per 80kg bag)
          </Label>
          <Input
            type="number"
            value={kor}
            onChange={(e) => setKor(Number(e.target.value))}
            placeholder="48"
            data-ocid="calc1.kor.input"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="font-ui text-xs font-semibold">
            Nut Count (nuts/kg)
          </Label>
          <Input
            type="number"
            value={nutCount}
            onChange={(e) => setNutCount(Number(e.target.value))}
            placeholder="180"
            data-ocid="calc1.nut_count.input"
          />
        </div>
        <div className="space-y-2">
          <Label className="font-ui text-xs font-semibold">
            Moisture %: <span className="text-gold font-bold">{moisture}%</span>
          </Label>
          <Slider
            min={0}
            max={15}
            step={0.5}
            value={[moisture]}
            onValueChange={([v]) => setMoisture(v)}
            className="py-2"
            data-ocid="calc1.moisture.input"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="font-ui text-xs font-semibold">
            RCN Volume (MT)
          </Label>
          <Input
            type="number"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            placeholder="10"
            data-ocid="calc1.volume.input"
          />
        </div>
      </div>

      <Button
        className="bg-forest hover:bg-forest-dark text-white font-ui font-bold w-full sm:w-auto"
        onClick={calculate}
        data-ocid="calc1.calculate.primary_button"
      >
        Calculate Yield →
      </Button>

      {results && (
        <div className="mt-8 space-y-6" data-ocid="calc1.results.section">
          {/* Summary stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-forest/8 rounded-xl p-4 text-center">
              <div className="font-display text-2xl font-bold text-forest">
                {results.yieldKg.toLocaleString("en-IN")} kg
              </div>
              <div className="font-ui text-xs text-muted-foreground mt-1">
                Total Kernel Yield
              </div>
            </div>
            <div className="bg-gold-light/40 rounded-xl p-4 text-center">
              <div className="font-display text-2xl font-bold text-gold-dark">
                ₹{results.costPerKg.toLocaleString("en-IN")}/kg
              </div>
              <div className="font-ui text-xs text-muted-foreground mt-1">
                Est. Cost/kg
              </div>
            </div>
            <div className="bg-muted rounded-xl p-4 text-center col-span-2 md:col-span-1">
              <div className="font-display text-2xl font-bold text-foreground">
                {((results.yieldKg / (volume * 1000)) * 100).toFixed(1)}%
              </div>
              <div className="font-ui text-xs text-muted-foreground mt-1">
                Kernel Yield %
              </div>
            </div>
          </div>

          {/* Bar chart */}
          <div>
            <h4 className="font-ui font-semibold text-sm text-foreground mb-3">
              Input vs Output (kg)
            </h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={results.barData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.88 0.02 75)"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fontFamily: "Satoshi" }}
                />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(v) => [`${Number(v).toLocaleString("en-IN")} kg`]}
                />
                <Bar
                  dataKey="value"
                  fill="oklch(0.35 0.09 155)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie chart */}
          <div>
            <h4 className="font-ui font-semibold text-sm text-foreground mb-3">
              Grade Distribution (kg)
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={results.gradeData}
                  dataKey="kg"
                  nameKey="grade"
                  cx="50%"
                  cy="42%"
                  outerRadius={85}
                  label={false}
                  labelLine={false}
                >
                  {results.gradeData.map((gd, i) => (
                    <Cell
                      key={gd.grade}
                      fill={GRADE_COLORS[i % GRADE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v, name) => [
                    `${Number(v).toLocaleString("en-IN")} kg`,
                    name,
                  ]}
                />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
                  formatter={(value) => {
                    const grade = results.gradeData.find(
                      (g) => g.grade === value,
                    );
                    return grade ? `${value} (${grade.pct}%)` : value;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              className="bg-[#25D366] hover:bg-[#1fb855] text-white font-ui font-bold gap-2"
              onClick={sendToWhatsApp}
              data-ocid="calc1.whatsapp.primary_button"
            >
              <MessageCircle className="w-4 h-4" />
              Send Results via WhatsApp
            </Button>
          </div>

          <Disclaimer />
        </div>
      )}
    </div>
  );
}
