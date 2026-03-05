import { AlertCircle } from "lucide-react";

export default function Disclaimer() {
  return (
    <div className="mt-6 flex gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800">
      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
      <p className="font-body text-xs leading-relaxed">
        <strong>Note:</strong> All calculations are approximate estimates based
        on input parameters such as kernel outturn, nut count, moisture levels,
        and logistics assumptions. Actual processing yield, grade distribution,
        freight cost, and market prices may vary depending on raw cashew
        quality, processing conditions, and market factors.
      </p>
    </div>
  );
}
