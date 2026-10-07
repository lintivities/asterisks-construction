import { useEffect, useState } from "react";
import { whatsappLink } from "@/lib/whatsapp";
import { WaIcon } from "./wa-icon";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#team", label: "Team" },
  { href: "#benchmarks", label: "Benchmarks" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header data-site-header className="glass-header site-header fixed inset-x-0 top-0 z-50 border-b border-accent/60">
      <div className="container-shell grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3 lg:py-4">
        <a href="#top" className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-primary font-display text-xl font-bold text-primary-foreground">
            *
          </span>
          <span className="min-w-0 font-display text-[0.95rem] leading-tight font-bold tracking-[0.16em] uppercase sm:text-base">
            Asterisk
            <span className="block text-[0.6rem] tracking-[0.34em] text-accent sm:text-[0.65rem]">
              Construction
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 xl:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              {l.label}
            </a>
          ))}
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-base btn-outline">
            <WaIcon className="h-4 w-4" />
            Get Quote (WhatsApp)
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-12 w-12 place-items-center rounded-sm border border-border xl:hidden"
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute inset-x-0 top-0 h-[2px] bg-foreground transition-transform ${open ? "translate-y-[5px] rotate-45" : ""}`}
            />
            <span
              className={`absolute inset-x-0 bottom-0 h-[2px] bg-foreground transition-transform ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background xl:hidden">
          <nav className="container-shell flex flex-col py-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex min-h-[48px] items-center border-b border-border/60 text-base text-foreground/90"
              >
                {l.label}
              </a>
            ))}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="btn-base btn-primary my-4"
            >
              <WaIcon className="h-4 w-4" />
              Get Quote on WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
