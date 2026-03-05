import { Button } from "@/components/ui/button";
import { Leaf, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Opportunity", href: "#opportunity" },
  { label: "Value Chain", href: "#value-chain" },
  { label: "Processing", href: "#processing" },
  { label: "Grades", href: "#kernel-grades" },
  { label: "Industries", href: "#industries" },
  { label: "Calculators", href: "#calculators" },
  { label: "Origins", href: "#origins" },
  { label: "Investors", href: "#investors" },
  { label: "Schemes", href: "#govt-schemes" },
  { label: "Pitch Deck", href: "#pitch-deck" },
  { label: "Intelligence", href: "#intelligence" },
  { label: "FAQs", href: "#faqs" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/97 backdrop-blur-md shadow-card"
          : "bg-gradient-to-b from-black/40 to-transparent"
      }`}
      style={
        scrolled
          ? { borderBottom: "1px solid oklch(0.88 0.025 80)" }
          : undefined
      }
    >
      <nav className="container-tight flex items-center justify-between h-16 lg:h-18">
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleNavClick("#home")}
          className="flex items-center gap-2 group"
          data-ocid="nav.link"
        >
          <div className="w-8 h-8 gradient-forest rounded-lg flex items-center justify-center shadow-forest">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <div className="leading-tight">
            <span
              className={`font-display font-bold text-base tracking-tight transition-colors ${
                scrolled ? "text-forest" : "text-white"
              }`}
            >
              Amma's Naturalz<sup className="text-xs">™</sup>
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <ul className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                type="button"
                onClick={() => handleNavClick(link.href)}
                className={`px-2.5 py-1.5 text-xs font-ui font-semibold transition-colors rounded-md ${
                  scrolled
                    ? "text-foreground/70 hover:text-forest hover:bg-muted"
                    : "text-white/90 hover:text-white hover:bg-white/15"
                }`}
                data-ocid={`nav.${link.label.toLowerCase().replace(/\s+/g, "_")}.link`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className={`hidden md:flex font-ui text-xs transition-colors ${
              scrolled
                ? "bg-forest hover:bg-forest-dark text-white"
                : "bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-sm"
            }`}
            onClick={() => handleNavClick("#contact")}
            data-ocid="nav.contact.primary_button"
          >
            Get in Touch
          </Button>
          <button
            type="button"
            className={`xl:hidden p-2 rounded-md transition-colors ${
              scrolled
                ? "hover:bg-muted text-foreground"
                : "hover:bg-white/15 text-white"
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="xl:hidden bg-white/98 backdrop-blur-sm border-t border-border shadow-lg">
          <ul className="container-tight py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left px-3 py-2.5 text-sm font-ui font-medium text-foreground/80 hover:text-forest hover:bg-muted rounded-md transition-colors"
                  data-ocid={`nav.mobile.${link.label.toLowerCase().replace(/\s+/g, "_")}.link`}
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li className="pt-2">
              <Button
                className="w-full bg-forest hover:bg-forest-dark text-white font-ui"
                onClick={() => handleNavClick("#contact")}
                data-ocid="nav.mobile.contact.primary_button"
              >
                Get in Touch
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
