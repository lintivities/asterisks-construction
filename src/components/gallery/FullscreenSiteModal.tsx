import { useEffect, useState, useRef, useCallback } from "react";
import { GallerySite } from "./galleryData";
import { whatsappLink } from "@/lib/whatsapp";
import { WaIcon } from "@/components/site/wa-icon";

interface FullscreenSiteModalProps {
  site: GallerySite | null;
  onClose: () => void;
  onNavigate: (direction: "next" | "prev") => void;
  hasNext: boolean;
  hasPrev: boolean;
  currentIndex: number;
  totalSites: number;
}

export function FullscreenSiteModal({
  site,
  onClose,
  onNavigate,
  hasNext,
  hasPrev,
  currentIndex,
  totalSites,
}: FullscreenSiteModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const touchStartXRef = useRef<number | null>(null);

  // Reset active image when site changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [site?.id]);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (!site) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [site]);

  // Keyboard navigation: Escape to close, Arrow keys to navigate
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        if (hasNext) onNavigate("next");
      } else if (e.key === "ArrowLeft") {
        if (hasPrev) onNavigate("prev");
      }
    },
    [hasNext, hasPrev, onClose, onNavigate]
  );

  useEffect(() => {
    if (!site) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [site, handleKeyDown]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch) {
      touchStartXRef.current = touch.clientX;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touch = e.changedTouches[0];
    if (!touch) return;
    const touchEndX = touch.clientX;
    const diffX = touchEndX - touchStartXRef.current;
    const minSwipeDistance = 50;

    if (diffX > minSwipeDistance && hasPrev) {
      onNavigate("prev");
    } else if (diffX < -minSwipeDistance && hasNext) {
      onNavigate("next");
    }
    touchStartXRef.current = null;
  };

  if (!site) return null;

  const currentDisplayImage = site.images[activeImageIndex] || site.fullImage;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${site.title} - Fullscreen Gallery View`}
      className="fixed inset-0 z-50 flex flex-col bg-slate-950/98 backdrop-blur-md overflow-y-auto animate-fade-in"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Controls Bar */}
      <header className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-8 py-3.5 bg-slate-950/90 border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-xs bg-[#c85a32] text-white font-bold text-base shadow-xs">
            *
          </span>
          <div className="hidden sm:block">
            <span className="text-xs uppercase font-bold tracking-widest text-[#c85a32]">
              Asterisk Construction Gallery
            </span>
            <span className="mx-2 text-slate-500">·</span>
            <span className="text-xs text-slate-300 font-mono">
              Site #{site.id} ({currentIndex + 1} of {totalSites})
            </span>
          </div>
        </div>

        {/* Prev / Next & Close */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => onNavigate("prev")}
            disabled={!hasPrev}
            className="rounded-xs border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-bold text-white hover:bg-white/15 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            title="Previous Site (Left Arrow)"
          >
            ← Prev Site
          </button>
          <button
            type="button"
            onClick={() => onNavigate("next")}
            disabled={!hasNext}
            className="rounded-xs border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-bold text-white hover:bg-white/15 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            title="Next Site (Right Arrow)"
          >
            Next Site →
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xs border-2 border-white/40 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-white hover:text-slate-950 transition-colors cursor-pointer ml-2"
            title="Close Gallery (Esc)"
          >
            ✕ Close
          </button>
        </div>
      </header>

      {/* Main Fullscreen Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        {/* Large High-Res Image Display */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[72vh] rounded-sm overflow-hidden bg-black/90 border-2 border-white/10 shadow-2xl flex items-center justify-center">
          <img
            src={currentDisplayImage}
            alt={`${site.title} - ${site.location}`}
            className="max-h-full max-w-full object-contain"
          />

          {/* Quick Floating Badge */}
          <div className="absolute top-4 left-4 rounded-xs bg-black/80 backdrop-blur-xs px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#ff8e5a] border border-[#c85a32]/50">
            {site.categoryLabel}
          </div>
        </div>

        {/* Multiple Images Selector (if site has more than 1 image) */}
        {site.images.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {site.images.map((img, idx) => (
              <button
                key={img}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`relative h-16 w-24 shrink-0 rounded-xs overflow-hidden border-2 transition-all cursor-pointer ${
                  activeImageIndex === idx ? "border-[#c85a32] ring-2 ring-[#c85a32]/50" : "border-white/20 opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt={`View ${idx + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Site Information and WhatsApp Quote CTA */}
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] bg-[#141d27] border-2 border-slate-700/80 rounded-sm p-6 sm:p-8 text-white">
          <div>
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-xs font-mono font-bold tracking-widest text-[#c85a32] uppercase">
                {site.categoryLabel}
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs font-semibold uppercase text-slate-300">
                {site.location}
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-white mt-1">
              {site.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              {site.summary}
            </p>

            {/* Key Specs */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3 border border-white/10 bg-white/5 p-3 rounded-xs font-mono text-xs">
              <div>
                <span className="text-[0.68rem] text-slate-400 block uppercase">Location</span>
                <span className="font-bold text-white">{site.location}</span>
              </div>
              <div className="border-x border-white/10 px-3">
                <span className="text-[0.68rem] text-slate-400 block uppercase">Land Size</span>
                <span className="font-bold text-white">{site.landSize}</span>
              </div>
              <div>
                <span className="text-[0.68rem] text-slate-400 block uppercase">Floor Area</span>
                <span className="font-bold text-[#ff8e5a]">{site.floorArea}</span>
              </div>
            </div>

            {/* Amenities list */}
            {site.amenities.length > 0 && (
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#ff8e5a] mb-2.5">
                  Key Features &amp; Finishes ({site.amenities.length})
                </h4>
                <ul className="grid sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-200">
                  {site.amenities.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-[#c85a32] font-black">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action Column */}
          <div className="flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/15 pt-6 lg:pt-0 lg:pl-8 space-y-6">
            <div>
              <h3 className="font-display text-lg font-bold text-white">
                Interested in a similar build?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                We can provide a preliminary architectural proposal, Bill of Quantities (BQ), and transparent timeline for this exact style of construction.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href={whatsappLink(
                  `Hello Asterisk Construction, I am viewing "${site.title}" (${site.location}) on your Developments Gallery and would like to request a quotation and discuss a similar construction project.`
                )}
                target="_blank"
                rel="noreferrer"
                className="btn-base btn-primary w-full font-bold shadow-lg text-white hover:bg-[#b85428] flex items-center justify-center gap-2 py-3"
              >
                <WaIcon className="h-5 w-5" />
                <span>Discuss on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="btn-base w-full border-2 border-white/40 bg-transparent text-white hover:bg-white hover:text-slate-950 font-bold text-xs cursor-pointer transition-colors py-2.5"
              >
                Back to Developments Grid
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
