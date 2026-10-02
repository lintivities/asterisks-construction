import React from "react";

interface PaperFolioContainerProps {
  children: React.ReactNode;
}

export function PaperFolioContainer({ children }: PaperFolioContainerProps) {
  const coordinateMarkers = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"];

  return (
    <div className="relative w-full min-h-screen bg-[#f3f2ee] py-6 sm:py-10 px-2 sm:px-4 md:px-8 overflow-x-hidden">
      {/* Central Architectural Parchment Paper Folio */}
      <div className="relative mx-auto w-full max-w-[1560px] min-h-screen bg-[#faf9f6] text-[#111827] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18)] border border-[#111827]/20 rounded-[2px]">
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

        {/* Content Container with Generous Lateral Padding and Separation of Concerns */}
        <div className="relative z-20 px-3 sm:px-6 md:px-10 lg:px-14 xl:px-16 pt-8 pb-16">
          {children}
        </div>
      </div>
    </div>
  );
}
