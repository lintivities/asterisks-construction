import React from "react";
import { whatsappLink } from "@/lib/whatsapp";
import { WaIcon } from "@/components/site/wa-icon";

interface PaperFolioContainerProps {
  children: React.ReactNode;
}

export function PaperFolioContainer({ children }: PaperFolioContainerProps) {
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

          {/* Main Content Container */}
          <div className="relative z-20 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 pt-8 pb-20">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
