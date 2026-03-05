import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Disclaimer from "./Disclaimer";

function calcScenario(kor: number, nutCount: number, moisture: number) {
  const DEFAULT_KOR = 48;
  const DEFAULT_NUT = 180;
  const DEFAULT_MOIST = 8;

  const yieldPct = ((kor * 0.45359237) / 80) * (1 - moisture / 100) * 100;

  // Profit margin index (normalized to 100 at defaults)
  const defaultYield =
    ((DEFAULT_KOR * 0.45359237) / 80) * (1 - DEFAULT_MOIST / 100) * 100;
  const defaultNutScore = 1 - ((DEFAULT_NUT - 140) / (220 - 140)) * 0.2;

  const nutScore = 1 - ((nutCount - 140) / (220 - 140)) * 0.2;
  const profitIndex = Math.round(
    (yieldPct / defaultYield) * (nutScore / defaultNutScore) * 100,
  );

  // Grade quality score: lower nut count + higher KOR = more premium grades
  const gradeScore = Math.round(
    ((kor - 40) / (56 - 40)) * 50 +
      ((220 - nutCount) / (220 - 140)) * 30 +
      ((15 - moisture) / (15 - 5)) * 20,
  );

  return { yieldPct: Math.round(yieldPct * 10) / 10, profitIndex, gradeScore };
}

export default function ProfitImpactSimulator() {
  const [kor, setKor] = useState(48);
  const [nutCount, setNutCount] = useState(180);
  const [moisture, setMoisture] = useState(8);
  const [showChart, setShowChart] = useState(false);

  const current = calcScenario(kor, nutCount, moisture);

  // Generate KOR sweep data
  const korData = Array.from({ length: 9 }, (_, i) => {
    const k = 40 + i * 2;
    const s = calcScenario(k, nutCount, moisture);
    return {
      kor: `KOR ${k}`,
      "Yield %": s.yieldPct,
      "Profit Index": s.profitIndex,
      "Grade Score": s.gradeScore,
    };
  });

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600";
    if (score >= 40) return "text-amber-600";
    return "text-red-500";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 70) return "Optimal";
    if (score >= 40) return "Average";
    return "Poor";
  };

  const sendToWhatsApp = () => {
    const lowScenario = calcScenario(42, nutCount, moisture);
    const highScenario = calcScenario(54, nutCount, moisture);
    const msg = `*RCN Quality Profit Impact – Amma's Naturalz*

*--- Inputs (Current Settings) ---*
*KOR:* ${kor} lbs/80kg bag
*Nut Count:* ${nutCount} nuts/kg
*Moisture %:* ${moisture}%

*--- Current Scenario Results ---*
*Kernel Yield %:* ${current.yieldPct}%
*Profit Index:* ${current.profitIndex} (base = 100)
*Grade Quality Score:* ${current.gradeScore}/100

*--- Low KOR Scenario (KOR 42) ---*
*Yield:* ${lowScenario.yieldPct}% | *Profit Index:* ${lowScenario.profitIndex} | *Grade Score:* ${lowScenario.gradeScore}/100

*--- High KOR Scenario (KOR 54) ---*
*Yield:* ${highScenario.yieldPct}% | *Profit Index:* ${highScenario.profitIndex} | *Grade Score:* ${highScenario.gradeScore}/100

I would like to discuss further.`;
    window.open(
      `https://wa.me/919188520881?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  return (
    <div>
      <h3 className="font-display text-xl font-bold text-forest mb-1">
        Calculator 5: RCN Quality Profit Impact Simulator
      </h3>
      <p className="font-body text-sm text-muted-foreground mb-2">
        Visualize how KOR, nut count, and moisture directly affect kernel yield,
        profit potential, and grade quality — a tool most traders don't have
        access to.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="space-y-3">
          <Label className="font-ui text-sm font-semibold flex justify-between">
            <span>KOR (lbs/80kg bag)</span>
            <span className="text-gold font-bold">{kor}</span>
          </Label>
          <Slider
            min={40}
            max={56}
            step={1}
            value={[kor]}
            onValueChange={([v]) => setKor(v)}
            data-ocid="calc5.kor.input"
          />
          <div className="flex justify-between text-xs text-muted-foreground font-ui">
            <span>40 (Poor)</span>
            <span>48 (Average)</span>
            <span>56 (Premium)</span>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="font-ui text-sm font-semibold flex justify-between">
            <span>Nut Count (nuts/kg)</span>
            <span className="text-gold font-bold">{nutCount}</span>
          </Label>
          <Slider
            min={140}
            max={220}
            step={5}
            value={[nutCount]}
            onValueChange={([v]) => setNutCount(v)}
            data-ocid="calc5.nut_count.input"
          />
          <div className="flex justify-between text-xs text-muted-foreground font-ui">
            <span>140 (Large)</span>
            <span>180 (Medium)</span>
            <span>220 (Small)</span>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="font-ui text-sm font-semibold flex justify-between">
            <span>Moisture %</span>
            <span className="text-gold font-bold">{moisture}%</span>
          </Label>
          <Slider
            min={5}
            max={15}
            step={0.5}
            value={[moisture]}
            onValueChange={([v]) => setMoisture(v)}
            data-ocid="calc5.moisture.input"
          />
          <div className="flex justify-between text-xs text-muted-foreground font-ui">
            <span>5% (Ideal)</span>
            <span>10%</span>
            <span>15% (High)</span>
          </div>
        </div>
      </div>

      {/* Live metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="rounded-xl p-4 bg-muted/50 text-center">
          <div
            className={`font-display text-2xl font-bold ${getScoreColor(current.yieldPct)}`}
          >
            {current.yieldPct}%
          </div>
          <div className="font-ui text-xs text-muted-foreground mt-1">
            Kernel Yield %
          </div>
          <div
            className={`font-ui text-xs font-bold mt-1 ${getScoreColor(current.yieldPct * 3.3)}`}
          >
            {getScoreLabel(current.yieldPct * 3.3)}
          </div>
        </div>
        <div className="rounded-xl p-4 bg-muted/50 text-center">
          <div
            className={`font-display text-2xl font-bold ${getScoreColor(current.profitIndex)}`}
          >
            {current.profitIndex}
          </div>
          <div className="font-ui text-xs text-muted-foreground mt-1">
            Profit Index (base=100)
          </div>
          <div
            className={`font-ui text-xs font-bold mt-1 ${getScoreColor(current.profitIndex)}`}
          >
            {getScoreLabel(current.profitIndex)}
          </div>
        </div>
        <div className="rounded-xl p-4 bg-muted/50 text-center">
          <div
            className={`font-display text-2xl font-bold ${getScoreColor(current.gradeScore)}`}
          >
            {current.gradeScore}/100
          </div>
          <div className="font-ui text-xs text-muted-foreground mt-1">
            Grade Quality Score
          </div>
          <div
            className={`font-ui text-xs font-bold mt-1 ${getScoreColor(current.gradeScore)}`}
          >
            {getScoreLabel(current.gradeScore)}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          className="bg-forest hover:bg-forest-dark text-white font-ui font-bold"
          onClick={() => setShowChart(!showChart)}
          data-ocid="calc5.simulate.primary_button"
        >
          {showChart ? "Hide KOR Sweep Chart" : "Show KOR Impact Chart →"}
        </Button>
        <Button
          variant="outline"
          className="border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 font-ui font-bold gap-2"
          onClick={sendToWhatsApp}
          data-ocid="calc5.whatsapp.primary_button"
        >
          <MessageCircle className="w-4 h-4" />
          Send Simulation to WhatsApp
        </Button>
      </div>

      {showChart && (
        <div className="mt-8 space-y-6" data-ocid="calc5.results.section">
          {/* Scenario comparison */}
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                label: "Low KOR Scenario (KOR 42)",
                ...calcScenario(42, nutCount, moisture),
                theme: "red",
              },
              {
                label: "Optimal KOR Scenario (KOR 54)",
                ...calcScenario(54, nutCount, moisture),
                theme: "green",
              },
            ].map((scenario) => (
              <div
                key={scenario.label}
                className={`rounded-xl p-5 border-2 ${
                  scenario.theme === "red"
                    ? "border-red-200 bg-red-50"
                    : "border-green-200 bg-green-50"
                }`}
              >
                <div
                  className={`font-ui font-bold text-sm mb-3 ${
                    scenario.theme === "red" ? "text-red-700" : "text-green-700"
                  }`}
                >
                  {scenario.label}
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div
                      className={`font-display text-xl font-bold ${
                        scenario.theme === "red"
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {scenario.yieldPct}%
                    </div>
                    <div className="font-ui text-[10px] text-muted-foreground">
                      Yield
                    </div>
                  </div>
                  <div>
                    <div
                      className={`font-display text-xl font-bold ${
                        scenario.theme === "red"
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {scenario.profitIndex}
                    </div>
                    <div className="font-ui text-[10px] text-muted-foreground">
                      Profit Idx
                    </div>
                  </div>
                  <div>
                    <div
                      className={`font-display text-xl font-bold ${
                        scenario.theme === "red"
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {scenario.gradeScore}
                    </div>
                    <div className="font-ui text-[10px] text-muted-foreground">
                      Grade Score
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h4 className="font-ui font-semibold text-sm text-foreground mb-3">
              KOR Impact — Yield, Profit Index & Grade Score
            </h4>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={korData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.88 0.02 75)"
                />
                <XAxis dataKey="kor" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <ReferenceLine
                  x={`KOR ${kor}`}
                  stroke="#C4973A"
                  strokeDasharray="4 2"
                  label={{ value: "Current", fill: "#C4973A", fontSize: 11 }}
                />
                <Line
                  type="monotone"
                  dataKey="Yield %"
                  stroke="#6B7C3F"
                  strokeWidth={2.5}
                  dot={{ fill: "#6B7C3F", r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="Profit Index"
                  stroke="#C4973A"
                  strokeWidth={2.5}
                  dot={{ fill: "#C4973A", r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="Grade Score"
                  stroke="#8B4513"
                  strokeWidth={2.5}
                  dot={{ fill: "#8B4513", r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-forest/8 rounded-xl p-4 text-sm font-body text-muted-foreground">
            <strong className="text-forest font-ui">Key Insight:</strong> A KOR
            improvement from 42 to 54 (12 lbs/bag increase) can improve kernel
            yield by approximately{" "}
            {Math.round(
              calcScenario(54, nutCount, moisture).yieldPct -
                calcScenario(42, nutCount, moisture).yieldPct,
            )}
            % and the profit index by approximately{" "}
            {Math.round(
              calcScenario(54, nutCount, moisture).profitIndex -
                calcScenario(42, nutCount, moisture).profitIndex,
            )}{" "}
            points. Lower nut count RCN (fewer, larger nuts) also produces more
            premium whole kernel grades.
          </div>

          <Disclaimer />
        </div>
      )}
    </div>
  );
}
