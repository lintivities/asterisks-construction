import React from "react";
import { whatsappLink } from "@/lib/whatsapp";
import { WaIcon } from "@/components/site/wa-icon";

interface PaperFolioContainerProps {
  children: React.ReactNode;
}

export function PaperFolioContainer({ children }: PaperFolioContainerProps) {
  const coordinateMarkers = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"];

  return (
    <div
      className="relative w-full min-h-screen pt-20 sm:pt-24 md:pt-28 pb-24 sm:pb-32 md:pb-40 px-3 sm:px-6 md:px-10 lg:px-14 overflow-x-hidden bg-transparent"
    >
      {/* Folio wrapper conforming to the organic torn deckled silhouette on the table */}
      <div
        id="paper-folio-wrapper"
        className="relative mx-auto w-full max-w-[1560px]"
      >
        {/* Central Architectural Parchment Paper Folio with Authentic Torn Deckled Edges */}
        <div
          id="paper-canvas-folio"
          className="folio-deckle-mask relative w-full min-h-screen bg-[rgba(250,249,246,0.50)] text-foreground overflow-visible rounded-[2px]"
        >

          {/* Authentic Master Parchment Texture matching the Folding Roll */}
          <div
            className="absolute inset-0 pointer-events-none -z-0 opacity-40 mix-blend-multiply bg-repeat-y bg-top"
            style={{
              backgroundImage: "url('/assets/textures/master-parchment-front.png')",
              backgroundSize: "100% 1024px",
            }}
            aria-hidden="true"
          />

          {/* Technical Drafting Frame: Outer & Inner Margin Borders positioned safely inside deckles */}
          <div className="absolute inset-y-3 inset-x-5 sm:inset-4 md:inset-5 border border-[#cbd5e1] pointer-events-none z-10">
            {/* 4 Precision Corner Crosshairs */}
            <div className="absolute -top-2.5 -left-2.5 w-5 h-5 flex items-center justify-center">
              <span className="absolute w-5 h-px bg-slate-900" />
              <span className="absolute h-5 w-px bg-slate-900" />
              <span className="w-1.5 h-1.5 rounded-full border border-slate-900 bg-[#faf9f6]" />
            </div>
            <div className="absolute -top-2.5 -right-2.5 w-5 h-5 flex items-center justify-center">
              <span className="absolute w-5 h-px bg-slate-900" />
              <span className="absolute h-5 w-px bg-slate-900" />
              <span className="w-1.5 h-1.5 rounded-full border border-slate-900 bg-[#faf9f6]" />
            </div>
            <div className="absolute -bottom-2.5 -left-2.5 w-5 h-5 flex items-center justify-center">
              <span className="absolute w-5 h-px bg-slate-900" />
              <span className="absolute h-5 w-px bg-slate-900" />
              <span className="w-1.5 h-1.5 rounded-full border border-slate-900 bg-[#faf9f6]" />
            </div>
            <div className="absolute -bottom-2.5 -right-2.5 w-5 h-5 flex items-center justify-center">
              <span className="absolute w-5 h-px bg-slate-900" />
              <span className="absolute h-5 w-px bg-slate-900" />
              <span className="w-1.5 h-1.5 rounded-full border border-slate-900 bg-[#faf9f6]" />
            </div>

            {/* Coordinate Markers (A through K) Along Top & Bottom Borders */}
            <div className="hidden lg:flex absolute -top-5 inset-x-12 justify-between text-[11px] font-mono font-bold text-slate-800">
              {coordinateMarkers.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
            <div className="hidden lg:flex absolute -bottom-5 inset-x-12 justify-between text-[11px] font-mono font-bold text-slate-800">
              {coordinateMarkers.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
          </div>

        {/* Architectural Master Folio Ledger Sheet Stamp */}
        <div className="relative z-20 pt-8 sm:pt-10 px-5 sm:px-8 md:px-12 lg:px-16 pb-5 border-b border-[#cbd5e1]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-sm bg-[#c85a32] font-display text-base font-bold text-white shadow-xs">
                *
              </span>
              <div>
                <span className="font-display text-sm sm:text-base font-black tracking-[0.14em] uppercase text-slate-950">
                  Asterisk Construction · Folio Sheet AR-01
                </span>
                <span className="block font-mono text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-[#c85a32] font-bold">
                  Nairobi &amp; Pan-Africa · Structural &amp; Civil Specifications
                </span>
              </div>
            </div>

            <div className="flex items-center gap-5 text-[10px] font-mono tracking-widest text-slate-800 font-bold uppercase">
              <span className="hidden sm:inline">SCALE: 1:100</span>
              <span>REV: 2.4</span>
              <span>STATUS: ACTIVE SPEC</span>
            </div>
          </div>
        </div>

        {/* Main Content Container with Lateral Margins for Separation of Concerns */}
        <div className="relative z-20 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 pt-6 pb-20">
          {children}
        </div>
      </div>
      </div>
    </div>
  );
}
