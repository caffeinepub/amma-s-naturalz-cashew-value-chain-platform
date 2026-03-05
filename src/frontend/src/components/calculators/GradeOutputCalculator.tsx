import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const GRADE_DISTRIBUTION = [
  { grade: "W320", pct: 35, color: "#6B7C3F" },
  { grade: "W240", pct: 20, color: "#C4973A" },
  { grade: "W210", pct: 15, color: "#8B4513" },
  { grade: "W180", pct: 5, color: "#B5651D" },
  { grade: "W450", pct: 10, color: "#4A7C59" },
  { grade: "Broken", pct: 15, color: "#9E7340" },
];

export default function GradeOutputCalculator() {
  const [volume, setVolume] = useState(20);
  const [kor, setKor] = useState(48);
  const [nutCount, setNutCount] = useState(180);
  const [results, setResults] = useState<
    null | { grade: string; kg: number; pct: number; color: string }[]
  >(null);

  const calculate = () => {
    const kernelYieldPerMT = ((kor * 0.45359237) / 80) * 1000;
    const totalKernelKg = volume * kernelYieldPerMT;

    const data = GRADE_DISTRIBUTION.map((g) => ({
      ...g,
      kg: Math.round((totalKernelKg * g.pct) / 100),
    }));

    setResults(data);
    // suppress nutCount unused warning
    void nutCount;
  };

  const sendToWhatsApp = (
    data: { grade: string; kg: number; pct: number }[],
  ) => {
    const gradeLines = data
      .map(
        (g) => `  ${g.grade}: ${g.kg.toLocaleString("en-IN")} kg (${g.pct}%)`,
      )
      .join("\n");
    const totalKg = data.reduce((sum, g) => sum + g.kg, 0);
    const msg = `*Kernel Grade Output Enquiry – Amma's Naturalz*

*--- Inputs ---*
*RCN Volume:* ${volume} MT
*KOR (lbs/80kg bag):* ${kor}
*Nut Count:* ${nutCount} nuts/kg

*--- Calculated Results ---*
*Total Kernel Output:* ${totalKg.toLocaleString("en-IN")} kg

*Grade-wise Output:*
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
        Calculator 2: Kernel Grade Output
      </h3>
      <p className="font-body text-sm text-muted-foreground mb-6">
        See how much of each grade your RCN batch will produce.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <div className="space-y-1.5">
          <Label className="font-ui text-xs font-semibold">
            RCN Volume (MT)
          </Label>
          <Input
            type="number"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            data-ocid="calc2.volume.input"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="font-ui text-xs font-semibold">
            KOR (lbs/80kg)
          </Label>
          <Input
            type="number"
            value={kor}
            onChange={(e) => setKor(Number(e.target.value))}
            data-ocid="calc2.kor.input"
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
            data-ocid="calc2.nut_count.input"
          />
        </div>
      </div>

      <Button
        className="bg-forest hover:bg-forest-dark text-white font-ui font-bold"
        onClick={calculate}
        data-ocid="calc2.calculate.primary_button"
      >
        Generate Grade Output →
      </Button>

      {results && (
        <div className="mt-8 space-y-6" data-ocid="calc2.results.section">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {results.map((r) => (
              <div
                key={r.grade}
                className="rounded-xl p-3 text-center"
                style={{
                  backgroundColor: `${r.color}18`,
                  borderColor: `${r.color}40`,
                  border: "1px solid",
                }}
              >
                <div
                  className="font-display text-lg font-bold"
                  style={{ color: r.color }}
                >
                  {r.grade}
                </div>
                <div className="font-ui text-sm font-semibold text-foreground mt-0.5">
                  {r.kg.toLocaleString("en-IN")} kg
                </div>
                <div className="font-body text-xs text-muted-foreground">
                  {r.pct}%
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-ui font-semibold text-sm text-foreground mb-3">
                Grade Distribution (%)
              </h4>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={results}
                    dataKey="kg"
                    nameKey="grade"
                    cx="50%"
                    cy="42%"
                    outerRadius={75}
                    label={false}
                  >
                    {results.map((r) => (
                      <Cell key={r.grade} fill={r.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v) => [
                      `${Number(v).toLocaleString("en-IN")} kg`,
                    ]}
                  />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h4 className="font-ui font-semibold text-sm text-foreground mb-3">
                Grade Output by Volume (kg)
              </h4>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={results} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tick={{ fontSize: 10 }} />
                  <YAxis
                    dataKey="grade"
                    type="category"
                    tick={{ fontSize: 11 }}
                    width={50}
                  />
                  <Tooltip
                    formatter={(v) => [
                      `${Number(v).toLocaleString("en-IN")} kg`,
                    ]}
                  />
                  <Bar dataKey="kg" radius={[0, 4, 4, 0]}>
                    {results.map((r) => (
                      <Cell key={r.grade} fill={r.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              className="bg-[#25D366] hover:bg-[#1fb855] text-white font-ui font-bold gap-2"
              onClick={() => sendToWhatsApp(results)}
              data-ocid="calc2.whatsapp.primary_button"
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
