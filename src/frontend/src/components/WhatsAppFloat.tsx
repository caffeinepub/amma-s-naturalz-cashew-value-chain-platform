import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/919188520881"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-elevated transition-all hover:scale-105 hover:shadow-xl"
      style={{ backgroundColor: "#25D366" }}
      aria-label="Chat on WhatsApp"
      data-ocid="whatsapp.float.primary_button"
    >
      <MessageCircle className="w-5 h-5 text-white fill-white" />
      <span className="font-ui font-bold text-white text-sm hidden sm:inline">
        WhatsApp Us
      </span>
    </a>
  );
}
