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
import { useSubmitContactInquiry } from "@/hooks/useQueries";
import {
  CheckCircle,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ContactForm {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  industryType: string;
  message: string;
}

const INDUSTRIES = [
  "Cashew Wholesaler",
  "Snack Manufacturer",
  "Food Processor",
  "Bakery & Confectionery",
  "Retail Brand",
  "Export Trader",
  "Private Label Brand",
  "Investor",
  "Other",
];

export default function ContactSection() {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    industryType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { mutateAsync, isPending } = useSubmitContactInquiry();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await mutateAsync(form);
      setSubmitted(true);
      toast.success("Inquiry sent! We'll respond within 24 hours.");
    } catch {
      toast.error(
        "Submission failed. Please use WhatsApp to reach us directly.",
      );
    }
  };

  const sendToWhatsApp = () => {
    const msg = `*Business Inquiry – Amma's Naturalz*

*Name:* ${form.name}
*Company:* ${form.companyName || "N/A"}
*Email:* ${form.email}
*Phone/WhatsApp:* ${form.phone}
*Industry:* ${form.industryType || "N/A"}

*--- Message ---*
${form.message}

I would like to discuss further.`;
    window.open(
      `https://wa.me/919188520881?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  return (
    <section
      id="contact"
      className="section-padding"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.97 0.018 82) 0%, oklch(0.95 0.02 88) 100%)",
      }}
    >
      <div className="container-tight">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold/60" />
            <span className="font-ui text-xs font-bold uppercase tracking-widest text-gold">
              Get in Touch
            </span>
            <div className="h-px w-8 bg-gold/60" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-forest mb-4 leading-tight">
            Start a <em style={{ fontStyle: "italic" }}>Conversation</em>
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto leading-relaxed">
            Wholesalers, manufacturers, investors — tell us your requirements
            and we'll respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Company info */}
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-xl font-bold text-forest mb-4">
                SBZ Enterprises
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gold-light flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-gold-dark" />
                  </div>
                  <div>
                    <div className="font-ui text-xs font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
                      Location
                    </div>
                    <p className="font-body text-sm text-foreground">
                      Palakkad, Kerala, India
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-lg bg-forest/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-forest" />
                  </div>
                  <div>
                    <div className="font-ui text-xs font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
                      Phone / WhatsApp
                    </div>
                    <a
                      href="tel:+919188520881"
                      className="font-body text-sm text-foreground hover:text-forest block"
                    >
                      +91 91885 20881
                    </a>
                    <a
                      href="tel:+919400051880"
                      className="font-body text-sm text-foreground hover:text-forest block"
                    >
                      +91 94000 51880
                    </a>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-lg bg-terracotta/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-terracotta" />
                  </div>
                  <div>
                    <div className="font-ui text-xs font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
                      Email
                    </div>
                    <a
                      href="mailto:sbzintl@gmail.com"
                      className="font-body text-sm text-foreground hover:text-forest"
                    >
                      sbzintl@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 rounded-xl p-5">
              <h4 className="font-ui font-bold text-sm text-forest mb-3">
                Quick WhatsApp Contact
              </h4>
              <div className="flex flex-col gap-2">
                <a
                  href="https://wa.me/919188520881"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366] text-white font-ui font-semibold text-sm hover:bg-[#1fb855] transition-colors"
                  data-ocid="contact.whatsapp1.primary_button"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp: +91 91885 20881
                </a>
                <a
                  href="https://wa.me/919400051880"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366] text-white font-ui font-semibold text-sm hover:bg-[#1fb855] transition-colors"
                  data-ocid="contact.whatsapp2.primary_button"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp: +91 94000 51880
                </a>
              </div>
            </div>

            <div className="bg-forest/8 rounded-xl p-5">
              <p className="font-body text-sm text-forest/90 leading-relaxed">
                <strong className="font-ui">Response time:</strong> We typically
                respond within 24 business hours. For urgent inquiries, WhatsApp
                is the fastest way to reach us.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div
                className="bg-card rounded-2xl p-8 shadow-card border border-border text-center space-y-4"
                data-ocid="contact.success_state"
              >
                <CheckCircle className="w-14 h-14 text-forest mx-auto" />
                <div>
                  <h3 className="font-display text-2xl font-bold text-forest mb-2">
                    Inquiry Received!
                  </h3>
                  <p className="font-body text-muted-foreground">
                    Thank you, {form.name}. We've received your inquiry and will
                    respond within 24 hours.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    className="bg-[#25D366] hover:bg-[#1fb855] text-white font-ui font-bold gap-2"
                    onClick={sendToWhatsApp}
                    data-ocid="contact.whatsapp.primary_button"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Also Send via WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        companyName: "",
                        email: "",
                        phone: "",
                        industryType: "",
                        message: "",
                      });
                    }}
                    data-ocid="contact.reset.secondary_button"
                  >
                    Send Another Inquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-card rounded-2xl p-6 md:p-8 shadow-elevated space-y-5"
                style={{
                  border: "1px solid oklch(0.85 0.025 80)",
                  borderTop: "2px solid oklch(0.78 0.16 75 / 0.3)",
                }}
                data-ocid="contact.form.modal"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label className="font-ui text-xs font-semibold">
                      Name *
                    </Label>
                    <Input
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      placeholder="Your full name"
                      data-ocid="contact.name.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="font-ui text-xs font-semibold">
                      Company Name
                    </Label>
                    <Input
                      value={form.companyName}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, companyName: e.target.value }))
                      }
                      placeholder="Your company"
                      data-ocid="contact.company.input"
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
                      data-ocid="contact.email.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="font-ui text-xs font-semibold">
                      Phone / WhatsApp *
                    </Label>
                    <Input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, phone: e.target.value }))
                      }
                      placeholder="+91 XXXXX XXXXX"
                      data-ocid="contact.phone.input"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="font-ui text-xs font-semibold">
                    Industry Type *
                  </Label>
                  <Select
                    value={form.industryType}
                    onValueChange={(v) =>
                      setForm((f) => ({ ...f, industryType: v }))
                    }
                    required
                  >
                    <SelectTrigger data-ocid="contact.industry.select">
                      <SelectValue placeholder="Select your industry..." />
                    </SelectTrigger>
                    <SelectContent>
                      {INDUSTRIES.map((ind) => (
                        <SelectItem key={ind} value={ind}>
                          {ind}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="font-ui text-xs font-semibold">
                    Message / Inquiry *
                  </Label>
                  <Textarea
                    required
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    placeholder="Tell us about your cashew requirements — grade, quantity, delivery city, timeline..."
                    rows={4}
                    data-ocid="contact.message.textarea"
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="bg-forest hover:bg-forest-dark text-white font-ui font-bold gap-2"
                    data-ocid="contact.submit.primary_button"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Inquiry →"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 gap-2"
                    onClick={sendToWhatsApp}
                    disabled={!form.name}
                    data-ocid="contact.whatsapp_direct.primary_button"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Send via WhatsApp
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
