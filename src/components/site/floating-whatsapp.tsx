import { useEffect, useState } from "react";
import { whatsappLink } from "@/lib/whatsapp";
import { WaIcon } from "./wa-icon";

export function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const target = document.getElementById("quote") || document.getElementById("quotation");
    if (!target || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          // Hide floating bar when quote form is visible on screen to avoid covering submit buttons
          setIsVisible(!entry.isIntersecting);
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Persistent desktop badge */}
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

      {/* Smart sticky mobile bar - smoothly hides when user reaches the quote form */}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noreferrer"
        className={`glass-header fixed inset-x-0 bottom-0 z-40 flex min-h-[56px] items-center justify-center gap-2 border-t border-border font-display text-sm font-bold tracking-[0.12em] uppercase text-accent transition-all duration-300 sm:hidden ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none"
        }`}
      >
        <WaIcon className="h-4 w-4" />
        Request a quotation
      </a>
    </>
  );
}

