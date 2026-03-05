import { Leaf, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Opportunity", href: "#opportunity" },
  { label: "Value Chain", href: "#value-chain" },
  { label: "Contract Processing", href: "#processing" },
  { label: "Kernel Grades", href: "#kernel-grades" },
  { label: "Industry Solutions", href: "#industries" },
  { label: "Calculators", href: "#calculators" },
  { label: "Origins & Supply", href: "#origins" },
  { label: "Investor Insights", href: "#investors" },
  { label: "Market Intelligence", href: "#intelligence" },
  { label: "FAQs", href: "#faqs" },
  { label: "Contact", href: "#contact" },
];

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function Footer() {
  const year = new Date().getFullYear();
  const host = window.location.hostname;

  return (
    <footer className="bg-gradient-to-b from-forest to-forest-dark text-white">
      <div className="container-tight py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gold/20 rounded-lg flex items-center justify-center">
                <Leaf className="w-4 h-4 text-gold" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                Amma's Naturalz<sup className="text-xs">™</sup>
              </span>
            </div>
            <p className="font-body text-sm text-white/60 leading-relaxed mb-4">
              A cashew value chain platform by SBZ Enterprises, helping
              wholesalers, manufacturers, and investors understand cashew
              processing economics.
            </p>
            <div className="font-ui text-xs text-gold/80 italic">
              Import Raw Cashew · Process in India · Supply Kernels Across the
              Market
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-ui font-bold text-sm uppercase tracking-widest text-gold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.slice(0, 6).map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    className="font-body text-sm text-white/65 hover:text-white transition-colors"
                    data-ocid={`footer.${link.label.toLowerCase().replace(/\s+/g, "_")}.link`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-ui font-bold text-sm uppercase tracking-widest text-gold mb-4">
              Platform
            </h4>
            <ul className="space-y-2">
              {quickLinks.slice(6).map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    className="font-body text-sm text-white/65 hover:text-white transition-colors"
                    data-ocid={`footer.${link.label.toLowerCase().replace(/\s+/g, "_")}.link`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-ui font-bold text-sm uppercase tracking-widest text-gold mb-4">
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex gap-2 text-sm">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span className="font-body text-white/65">
                  SBZ Enterprises, Palakkad, Kerala, India
                </span>
              </div>
              <div className="flex gap-2 text-sm">
                <Phone className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <div className="font-body text-white/65">
                  <a
                    href="tel:+919188520881"
                    className="hover:text-white block"
                  >
                    +91 91885 20881
                  </a>
                  <a
                    href="tel:+919400051880"
                    className="hover:text-white block"
                  >
                    +91 94000 51880
                  </a>
                </div>
              </div>
              <div className="flex gap-2 text-sm">
                <Mail className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:sbzintl@gmail.com"
                  className="font-body text-white/65 hover:text-white"
                >
                  sbzintl@gmail.com
                </a>
              </div>
              <a
                href="https://wa.me/919188520881"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 mt-3 px-4 py-2 rounded-lg bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] font-ui font-semibold text-sm hover:bg-[#25D366]/30 transition-colors"
                data-ocid="footer.whatsapp.primary_button"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body text-white/40">
          <div>
            © {year} Amma's Naturalz™ | SBZ Enterprises, Palakkad, Kerala,
            India. All rights reserved.
          </div>
          <div>
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(host)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/60 hover:text-gold transition-colors"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
