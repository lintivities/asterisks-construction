import React from "react";
import { whatsappLink } from "@/lib/whatsapp";
import { WaIcon } from "@/components/site/wa-icon";

interface PaperFolioContainerProps {
  children: React.ReactNode;
}

export function PaperFolioContainer({ children }: PaperFolioContainerProps) {
  const coordinateMarkers = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"];

  return (
    <div className="relative w-full min-h-screen bg-[#edece8] py-4 sm:py-8 px-2 sm:px-4 md:px-8 overflow-x-hidden">
      {/* Central Architectural Parchment Paper Folio */}
      <div className="relative mx-auto w-full max-w-[1560px] min-h-screen bg-[#faf9f6] text-[#111827] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.22)] border border-[#111827]/25 rounded-[2px]">
        {/* Subtle Tactile Crumpled Paper Texture Overlay */}
        <div
          className="absolute inset-0 pointer-events-none -z-0 opacity-15 mix-blend-multiply bg-repeat bg-contain"
          style={{
            backgroundImage: "url('/assets/textures/paper-front.jpg')",
          }}
          aria-hidden="true"
        />

        {/* Technical Drafting Frame: Outer & Inner Margin Borders */}
        <div className="absolute inset-2 sm:inset-3 md:inset-4 border border-[#e5e7eb] pointer-events-none z-10">
          {/* 4 Precision Corner Crosshairs */}
          <div className="absolute -top-2.5 -left-2.5 w-5 h-5 flex items-center justify-center">
            <span className="absolute w-5 h-px bg-[#111827]" />
            <span className="absolute h-5 w-px bg-[#111827]" />
            <span className="w-1.5 h-1.5 rounded-full border border-[#111827] bg-[#faf9f6]" />
          </div>
          <div className="absolute -top-2.5 -right-2.5 w-5 h-5 flex items-center justify-center">
            <span className="absolute w-5 h-px bg-[#111827]" />
            <span className="absolute h-5 w-px bg-[#111827]" />
            <span className="w-1.5 h-1.5 rounded-full border border-[#111827] bg-[#faf9f6]" />
          </div>
          <div className="absolute -bottom-2.5 -left-2.5 w-5 h-5 flex items-center justify-center">
            <span className="absolute w-5 h-px bg-[#111827]" />
            <span className="absolute h-5 w-px bg-[#111827]" />
            <span className="w-1.5 h-1.5 rounded-full border border-[#111827] bg-[#faf9f6]" />
          </div>
          <div className="absolute -bottom-2.5 -right-2.5 w-5 h-5 flex items-center justify-center">
            <span className="absolute w-5 h-px bg-[#111827]" />
            <span className="absolute h-5 w-px bg-[#111827]" />
            <span className="w-1.5 h-1.5 rounded-full border border-[#111827] bg-[#faf9f6]" />
          </div>

          {/* Coordinate Markers (A through K) Along Top & Bottom Borders */}
          <div className="hidden lg:flex absolute -top-5 inset-x-12 justify-between text-[11px] font-mono font-semibold text-[#6b7280]">
            {coordinateMarkers.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
          <div className="hidden lg:flex absolute -bottom-5 inset-x-12 justify-between text-[11px] font-mono font-semibold text-[#6b7280]">
            {coordinateMarkers.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </div>

        {/* Integrated Top Architectural Ledger Header (Unobstructed by any fixed navbar) */}
        <div className="relative z-20 pt-28 sm:pt-36 lg:pt-40 px-4 sm:px-8 md:px-12 lg:px-16 pb-6 border-b border-[#e5e7eb]/80">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-[#c85a32] font-display text-xl font-bold text-white shadow-sm">
                *
              </span>
              <div>
                <span className="font-display text-lg font-bold tracking-[0.16em] uppercase text-[#111827]">
                  Asterisk Construction
                </span>
                <span className="block font-mono text-[10px] tracking-[0.24em] uppercase text-[#c85a32]">
                  Architectural Master Folio AR-01 · Nairobi &amp; Pan-Africa
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <nav className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-[0.14em] text-[#4b5563]">
                <a href="#about" className="hover:text-[#c85a32] transition-colors">
                  About
                </a>
                <a href="#services" className="hover:text-[#c85a32] transition-colors">
                  Services
                </a>
                <a href="#projects" className="hover:text-[#c85a32] transition-colors">
                  Projects
                </a>
                <a href="#benchmarks" className="hover:text-[#c85a32] transition-colors">
                  Benchmarks
                </a>
                <a href="#team" className="hover:text-[#c85a32] transition-colors">
                  Team
                </a>
              </nav>

              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-[#c85a32] hover:bg-[#b85428] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:-translate-y-0.5"
              >
                <WaIcon className="h-3.5 w-3.5" />
                Request Quote
              </a>
            </div>
          </div>
        </div>

        {/* Main Content Container with Lateral Margins for Separation of Concerns */}
        <div className="relative z-20 px-3 sm:px-6 md:px-10 lg:px-14 xl:px-16 pt-6 pb-20">
          {children}
        </div>
      </div>
    </div>
  );
}
