import { whatsappLink } from "@/lib/whatsapp";
import { WaIcon } from "./wa-icon";

export function FloatingWhatsApp() {
  return (
    <>
      {/* Persistent badge */}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Asterisk Construction on WhatsApp"
        className="fixed right-4 bottom-20 z-50 hidden items-center gap-2 rounded-full border border-accent/50 bg-background px-5 py-3 text-sm font-semibold text-foreground shadow-[var(--shadow-elevated)] transition-all duration-300 hover:-translate-y-1 hover:border-accent sm:bottom-6 sm:flex"
      >
        <WaIcon className="h-4 w-4 text-primary" />
        WhatsApp
      </a>

      {/* Sticky mobile bar */}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noreferrer"
        className="glass-header fixed inset-x-0 bottom-0 z-40 flex min-h-[56px] items-center justify-center gap-2 border-t border-border font-display text-sm font-bold tracking-[0.12em] uppercase text-accent sm:hidden"
      >
        <WaIcon className="h-4 w-4" />
        Request a quotation
      </a>
    </>
  );
}
