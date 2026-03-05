import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSubmitMarketGuideLead } from "@/hooks/useQueries";
import {
  BookOpen,
  CheckCircle,
  Download,
  FileText,
  Loader2,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface LeadForm {
  name: string;
  company: string;
  phone: string;
  email: string;
}

export default function MarketGuideSection() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<LeadForm>({
    name: "",
    company: "",
    phone: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { mutateAsync, isPending } = useSubmitMarketGuideLead();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await mutateAsync(form);
      setSubmitted(true);
      toast.success("Details received! Preparing your guide...");
    } catch {
      setSubmitted(true); // Still allow download
      toast.info("Opening your guide...");
    }
  };

  const handleDownload = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Amma's Naturalz – Cashew Market Intelligence Guide</title>
            <style>
              body { font-family: Georgia, serif; line-height: 1.6; padding: 40px; max-width: 800px; margin: 0 auto; }
              h1 { color: #2d5a27; font-size: 28px; }
              h2 { color: #2d5a27; font-size: 20px; margin-top: 24px; }
              p { color: #333; margin: 8px 0; }
              hr { border-color: #c4973a; margin: 24px 0; }
            </style>
          </head>
          <body>
            <h1>Amma's Naturalz™ Cashew Market Intelligence Guide</h1>
            <p>SBZ Enterprises, Palakkad, Kerala | sbzintl@gmail.com</p>
            <hr/>
            <h2>1. The Cashew Value Chain</h2>
            <p>Africa (RCN Origin) → Import to India → Contract Processing → Kernel Grading → Pan India Distribution</p>
            <p>India processes 55% of the world's cashews, converting RCN from African origins into 35+ kernel grades serving diverse industries.</p>
            <h2>2. Key Kernel Grades</h2>
            <p><strong>Whole Kernels:</strong> W180 (~180 nuts/lb, premium), W210, W240, W320 (highest volume), W450</p>
            <p><strong>Broken:</strong> Splits, Butts, Large Pieces, Small Pieces</p>
            <p><strong>Industrial:</strong> Baby Bits, Granules</p>
            <h2>3. Contract Processing</h2>
            <p>6 stages: Steaming → Shelling → Drying → Peeling → Grading → Packing. Target KOR: 44–54 lbs/80kg bag.</p>
            <h2>4. Industry Applications</h2>
            <p>Wholesale traders, snack manufacturers, food processors, bakery & confectionery, retail brands, export traders, private label brands.</p>
            <h2>5. Market Insights</h2>
            <p>Global cashew market growing at 5.6% CAGR. India's domestic consumption rising. W320 is the most traded grade. Premium grades command 30–50% price premium over W320.</p>
            <h2>6. Contact</h2>
            <p>SBZ Enterprises | Palakkad, Kerala, India</p>
            <p>+91 91885 20881 | +91 94000 51880 | sbzintl@gmail.com</p>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const sendToWhatsApp = () => {
    const msg = `*Market Guide Download Request – Amma's Naturalz*

*Name:* ${form.name}
*Company:* ${form.company || "N/A"}
*Phone/WhatsApp:* ${form.phone}
*Email:* ${form.email}

Please send me the Amma's Naturalz Cashew Market Intelligence Guide.

I would like to discuss further.`;
    window.open(
      `https://wa.me/919188520881?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  return (
    <section
      id="market-guide"
      className="py-16 bg-gradient-to-r from-forest to-forest-dark text-white"
    >
      <div className="container-tight">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-8 h-8 text-gold" />
            </div>
            <div>
              <span className="font-ui text-xs font-bold uppercase tracking-widest text-gold mb-2 block">
                Free Resource
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
                Download Our Cashew Market Intelligence Guide
              </h2>
              <p className="font-body text-white/70 text-sm max-w-lg">
                A comprehensive guide covering the cashew value chain, kernel
                grades, processing model, industry applications, and basic
                market insights. Enter your details to download.
              </p>
              <div className="flex flex-wrap gap-4 mt-3 text-xs font-ui text-white/60">
                <span>✓ Value Chain Overview</span>
                <span>✓ Grade Reference</span>
                <span>✓ Industry Applications</span>
                <span>✓ Market Insights</span>
              </div>
            </div>
          </div>

          <Button
            size="lg"
            className="flex-shrink-0 bg-gold hover:bg-gold-dark text-forest-dark font-ui font-bold shadow-gold gap-2"
            onClick={() => setOpen(true)}
            data-ocid="guide.download.open_modal_button"
          >
            <Download className="w-5 h-5" />
            Download Free Guide
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md" data-ocid="guide.download.modal">
          <DialogHeader>
            <DialogTitle className="font-display text-xl font-bold text-forest flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-gold" />
              Get the Market Guide
            </DialogTitle>
            <DialogDescription className="font-body text-sm">
              Please share your details to access the Cashew Market Intelligence
              Guide.
            </DialogDescription>
          </DialogHeader>

          {submitted ? (
            <div
              className="space-y-4 text-center py-4"
              data-ocid="guide.success_state"
            >
              <CheckCircle className="w-12 h-12 text-forest mx-auto" />
              <div>
                <h4 className="font-display text-lg font-bold text-forest mb-1">
                  Ready!
                </h4>
                <p className="font-body text-sm text-muted-foreground">
                  Your guide is being prepared. Click below to open and
                  print/save as PDF.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  className="bg-forest hover:bg-forest-dark text-white font-ui font-bold gap-2"
                  onClick={handleDownload}
                  data-ocid="guide.download.confirm_button"
                >
                  <Download className="w-4 h-4" />
                  Open & Save as PDF
                </Button>
                <Button
                  variant="outline"
                  className="border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 font-ui font-semibold gap-2"
                  onClick={sendToWhatsApp}
                  data-ocid="guide.whatsapp.primary_button"
                >
                  <MessageCircle className="w-4 h-4" />
                  Also Send Request via WhatsApp
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label className="font-ui text-xs font-semibold">Name *</Label>
                <Input
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="Your full name"
                  data-ocid="guide.name.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="font-ui text-xs font-semibold">Company</Label>
                <Input
                  value={form.company}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, company: e.target.value }))
                  }
                  placeholder="Company / Organization"
                  data-ocid="guide.company.input"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="font-ui text-xs font-semibold">
                    Phone/WhatsApp *
                  </Label>
                  <Input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                    placeholder="+91 XXXXX XXXXX"
                    data-ocid="guide.phone.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="font-ui text-xs font-semibold">
                    Email *
                  </Label>
                  <Input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    placeholder="your@email.com"
                    data-ocid="guide.email.input"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 bg-forest hover:bg-forest-dark text-white font-ui font-bold"
                  data-ocid="guide.submit.primary_button"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Get My Guide →"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  data-ocid="guide.cancel.cancel_button"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
