import React, { useState } from "react";
import { whatsappLink } from "@/lib/whatsapp";
import { WaIcon } from "./wa-icon";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#benchmarks", label: "Benchmarks" },
  { href: "#team", label: "Team" },
  { href: "#quote", label: "Quote" },
];

export function CarvedWoodNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      id="site-wood-navbar"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out select-none bg-transparent"
    >
      {/* Main Bar */}
      <div className="relative z-10 max-w-[1560px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 h-16 flex items-center justify-between">
        {/* Brand Stamp: Physical carved insignia with painted enamel */}
        <a href="#top" className="flex items-center gap-3 group">
          <div
            className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-[#c85a32] text-white font-display text-xl font-bold transition-transform group-hover:scale-105"
            style={{
              boxShadow:
                "0 2px 8px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.4), inset 0 -1px 2px rgba(0, 0, 0, 0.6)",
              border: "1px solid rgba(240, 120, 75, 0.4)",
            }}
          >
            *
          </div>
          <div>
            <span
              className="font-display text-base sm:text-lg font-black tracking-[0.18em] uppercase text-[#ffffff] block leading-none"
              style={{
                textShadow:
                  "0 1px 1px rgba(255, 255, 255, 0.45), 0 -1px 2px rgba(0, 0, 0, 0.95), 0 0 10px rgba(0, 0, 0, 0.8)",
              }}
            >
              Asterisk
            </span>
            <span
              className="font-mono text-[9px] sm:text-[10px] tracking-[0.28em] uppercase text-[#ff8e5a] block font-bold leading-tight mt-0.5"
              style={{
                textShadow: "0 1px 2px rgba(0, 0, 0, 1), 0 -1px 1px rgba(255, 255, 255, 0.25)",
              }}
            >
              Construction · Nairobi
            </span>
          </div>
        </a>

        {/* Desktop Nav Links: Carved letterpress with painted enamel ivory */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-black uppercase tracking-[0.16em] text-[#ffffff] hover:text-[#ff8e5a] transition-colors relative py-1"
              style={{
                textShadow:
                  "0 1px 1px rgba(255, 255, 255, 0.35), 0 -1px 2px rgba(0, 0, 0, 0.95), 0 0 6px rgba(0, 0, 0, 0.6)",
              }}
            >
              {link.label}
            </a>
          ))}

          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-sm bg-[#c85a32] hover:bg-[#b85428] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:-translate-y-0.5"
            style={{
              boxShadow:
                "0 3px 10px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.35), inset 0 -1px 2px rgba(0, 0, 0, 0.5)",
              border: "1px solid rgba(230, 110, 65, 0.5)",
            }}
          >
            <WaIcon className="h-3.5 w-3.5" />
            Request Quote
          </a>
        </nav>

        {/* Mobile Hamburger: Carved into the wood table surface */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          className="lg:hidden relative grid h-10 w-10 place-items-center rounded-sm transition-all focus:outline-none"
          style={{
            backgroundColor: "rgba(22, 14, 9, 0.75)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow:
              "inset 0 1px 3px rgba(0, 0, 0, 0.8), 0 1px 0 rgba(255, 255, 255, 0.15)",
          }}
        >
          <div className="relative w-5 h-4 flex flex-col justify-between items-center">
            <span
              className={`block h-0.5 w-full bg-[#f7f2ea] rounded-full transition-transform duration-300 ${
                isOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
              style={{
                boxShadow: "0 1px 1px rgba(0, 0, 0, 0.8)",
              }}
            />
            <span
              className={`block h-0.5 w-full bg-[#f7f2ea] rounded-full transition-opacity duration-200 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
              style={{
                boxShadow: "0 1px 1px rgba(0, 0, 0, 0.8)",
              }}
            />
            <span
              className={`block h-0.5 w-full bg-[#f7f2ea] rounded-full transition-transform duration-300 ${
                isOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
              style={{
                boxShadow: "0 1px 1px rgba(0, 0, 0, 0.8)",
              }}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Drawer on Wood Surface (Smooth expansion pushing down the canvas) */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[380px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative z-10 px-5 pt-3 pb-6 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="py-2.5 px-3 text-sm font-black uppercase tracking-[0.18em] text-[#ffffff] hover:text-[#ff8e5a] rounded-sm transition-colors flex items-center justify-between"
              style={{
                textShadow:
                  "0 1px 1px rgba(255, 255, 255, 0.35), 0 -1px 2px rgba(0, 0, 0, 0.95), 0 0 8px rgba(0, 0, 0, 0.7)",
              }}
            >
              <span>{link.label}</span>
              <span className="text-[#c85a32] text-xs">→</span>
            </a>
          ))}

          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            onClick={() => setIsOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 rounded-sm bg-[#c85a32] hover:bg-[#b85428] px-4 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all"
            style={{
              boxShadow:
                "0 4px 12px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.35)",
              border: "1px solid rgba(230, 110, 65, 0.5)",
            }}
          >
            <WaIcon className="h-4 w-4" />
            Request Quote (WhatsApp)
          </a>
        </div>
      </div>
    </header>
  );
}
