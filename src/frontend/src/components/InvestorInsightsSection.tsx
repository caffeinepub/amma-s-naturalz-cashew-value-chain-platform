import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitInvestorRegistration } from "@/hooks/useQueries";
import { CheckCircle, Loader2, MessageCircle } from "lucide-react";
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
import { toast } from "sonner";

const gradeValueData = [
  { name: "W180 (Premium)", value: 35, color: "#C4973A" },
  { name: "W210 (Export)", value: 25, color: "#6B7C3F" },
  { name: "W240 (Standard)", value: 20, color: "#8B4513" },
  { name: "W320 (Volume)", value: 30, color: "#B5651D" },
  { name: "W450 (Economy)", value: 15, color: "#4A7C59" },
  { name: "Broken+Industrial", value: 10, color: "#9E7340" },
];

const industryDemandData = [
  { industry: "Snack Mfg", demand: 85 },
  { industry: "Retail", demand: 72 },
  { industry: "Export", demand: 90 },
  { industry: "Bakery", demand: 55 },
  { industry: "Food Proc.", demand: 68 },
  { industry: "Private Label", demand: 60 },
  { industry: "Wholesale", demand: 95 },
];

interface InvestorForm {
  name: string;
  company: string;
  investmentInterest: string;
  phone: string;
  email: string;
}

export default function InvestorInsightsSection() {
  const [form, setForm] = useState<InvestorForm>({
    name: "",
    company: "",
    investmentInterest: "",
    phone: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { mutateAsync, isPending } = useSubmitInvestorRegistration();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await mutateAsync(form);
      setSubmitted(true);
      toast.success("Registration submitted! We'll be in touch soon.");
    } catch {
      toast.error("Submission failed. Please try WhatsApp directly.");
    }
  };

  const sendToWhatsApp = () => {
    const msg = `*Investor Registration – Amma's Naturalz*

*Name:* ${form.name}
*Company:* ${form.company || "N/A"}
*Investment Interest:* ${form.investmentInterest || "N/A"}
*Phone/WhatsApp:* ${form.phone}
*Email:* ${form.email}

I am interested in learning more about investment/partnership opportunities with Amma's Naturalz – SBZ Enterprises.

I would like to discuss further.`;
    window.open(
      `https://wa.me/919188520881?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  return (
    <section
      id="investors"
      className="section-padding"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.97 0.012 85) 0%, oklch(0.94 0.015 155) 100%)",
      }}
    >
      <div className="container-tight">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold/60" />
            <span className="font-ui text-xs font-bold uppercase tracking-widest text-gold">
              For Investors
            </span>
            <div className="h-px w-8 bg-gold/60" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-forest mb-4 leading-tight">
            Investor <em style={{ fontStyle: "italic" }}>Insights</em>
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto leading-relaxed">
            Understand how cashew processing generates multiple revenue streams
            through grade diversification and pan-India distribution.
          </p>
        </div>

        {/* Key insights */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {[
            {
              title: "Multi-Grade Revenue Streams",
              desc: "A single RCN batch produces 6+ distinct kernel grades, each commanding a different market price. This grade diversification hedges against single-price risk and opens access to multiple buyer segments simultaneously.",
              icon: "📊",
            },
            {
              title: "Value Creation Through Processing",
              desc: "RCN priced at ~₹100–120/kg (after conversion) transforms into kernels priced at ₹350–1,200/kg depending on grade. Contract processing in India captures this significant value differential.",
              icon: "⬆️",
            },
            {
              title: "Pan India Distribution Access",
              desc: "India's food industry is fragmented across multiple states and cities. A pan-India distribution network allows kernel sales across all 7 major industry verticals from a single processing base.",
              icon: "🌐",
            },
          ].map((insight) => (
            <div
              key={insight.title}
              className="bg-card rounded-2xl p-6 shadow-elevated card-hover"
              style={{
                border: "1px solid oklch(0.85 0.025 80)",
                borderTop: "2px solid oklch(0.78 0.16 75 / 0.35)",
              }}
            >
              <span className="text-3xl mb-4 block">{insight.icon}</span>
              <h3 className="font-ui font-bold text-base text-forest mb-2">
                {insight.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {insight.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-8 mb-14">
          <div
            className="bg-card rounded-2xl p-6 shadow-elevated"
            style={{ border: "1px solid oklch(0.85 0.025 80)" }}
          >
            <h3 className="font-display text-lg font-bold text-forest mb-4">
              Kernel Grade Value Distribution
            </h3>
            <p className="font-body text-sm text-muted-foreground mb-4">
              Relative value contribution of each kernel grade to total revenue.
            </p>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={gradeValueData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="42%"
                  outerRadius={75}
                  label={false}
                  labelLine={false}
                >
                  {gradeValueData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div
            className="bg-card rounded-2xl p-6 shadow-elevated"
            style={{ border: "1px solid oklch(0.85 0.025 80)" }}
          >
            <h3 className="font-display text-lg font-bold text-forest mb-4">
              Industry Demand Segmentation
            </h3>
            <p className="font-body text-sm text-muted-foreground mb-4">
              Relative demand index across key buyer industries (higher =
              stronger demand).
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={industryDemandData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="industry" tick={{ fontSize: 10 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar
                  dataKey="demand"
                  fill="oklch(0.35 0.09 155)"
                  radius={[4, 4, 0, 0]}
                >
                  {industryDemandData.map((d, i) => (
                    <Cell
                      key={d.industry}
                      fill={
                        [
                          "#6B7C3F",
                          "#C4973A",
                          "#8B4513",
                          "#B5651D",
                          "#4A7C59",
                          "#9E7340",
                          "#7D5A50",
                        ][i]
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Register Interest form */}
        <div className="bg-gradient-to-br from-forest to-forest-dark rounded-2xl p-8 text-white">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-display text-2xl font-bold mb-4">
                Register Your Interest
              </h3>
              <p className="font-body text-white/75 text-sm leading-relaxed mb-6">
                Interested in participating in the cashew value chain — through
                direct investment, distribution partnerships, or processing
                partnerships? Register your interest and our team will reach
                out.
              </p>
              <div className="space-y-3">
                {[
                  "Direct Investment Opportunities",
                  "Distribution Partnership",
                  "Processing Partnership",
                  "Market Intelligence Subscription",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-sm font-body text-white/80"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div>
              {submitted ? (
                <div
                  className="flex flex-col items-center justify-center h-full text-center gap-4"
                  data-ocid="investor.success_state"
                >
                  <CheckCircle className="w-12 h-12 text-gold" />
                  <div>
                    <h4 className="font-display text-xl font-bold mb-2">
                      Thank You!
                    </h4>
                    <p className="font-body text-white/75 text-sm">
                      Your registration has been received. We'll contact you
                      within 24–48 hours.
                    </p>
                  </div>
                  <Button
                    className="bg-[#25D366] hover:bg-[#1fb855] text-white font-ui font-bold gap-2"
                    onClick={sendToWhatsApp}
                    data-ocid="investor.whatsapp.primary_button"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Also Send via WhatsApp
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="font-ui text-xs font-semibold text-white/80">
                      Name *
                    </Label>
                    <Input
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-gold"
                      placeholder="Your full name"
                      data-ocid="investor.name.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="font-ui text-xs font-semibold text-white/80">
                      Company
                    </Label>
                    <Input
                      value={form.company}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, company: e.target.value }))
                      }
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-gold"
                      placeholder="Company name"
                      data-ocid="investor.company.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="font-ui text-xs font-semibold text-white/80">
                      Investment Interest
                    </Label>
                    <Select
                      value={form.investmentInterest}
                      onValueChange={(v) =>
                        setForm((f) => ({ ...f, investmentInterest: v }))
                      }
                    >
                      <SelectTrigger
                        className="bg-white/10 border-white/20 text-white"
                        data-ocid="investor.interest.select"
                      >
                        <SelectValue placeholder="Select interest area..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Direct Investment">
                          Direct Investment
                        </SelectItem>
                        <SelectItem value="Distribution Partnership">
                          Distribution Partnership
                        </SelectItem>
                        <SelectItem value="Processing Partnership">
                          Processing Partnership
                        </SelectItem>
                        <SelectItem value="Market Intelligence Subscription">
                          Market Intelligence Subscription
                        </SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="font-ui text-xs font-semibold text-white/80">
                        Phone/WhatsApp *
                      </Label>
                      <Input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, phone: e.target.value }))
                        }
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                        placeholder="+91 XXXXX XXXXX"
                        data-ocid="investor.phone.input"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="font-ui text-xs font-semibold text-white/80">
                        Email *
                      </Label>
                      <Input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, email: e.target.value }))
                        }
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                        placeholder="your@email.com"
                        data-ocid="investor.email.input"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-gold hover:bg-gold-dark text-forest-dark font-ui font-bold"
                    data-ocid="investor.submit.primary_button"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Register Interest →"
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
