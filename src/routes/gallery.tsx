import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SpiralLoader } from "@/components/site/SpiralLoader";
import { CarvedWoodNavbar } from "@/components/site/CarvedWoodNavbar";
import { ScrollableBuildingBackground } from "@/components/site/ScrollableBuildingBackground";
import { PinnedTopRollCanvas } from "@/components/scroll-canvas/PinnedTopRollCanvas";
import { PaperFolioContainer } from "@/components/scroll-canvas/PaperFolioContainer";
import { Footer } from "@/components/site/footer";
import { FloatingWhatsApp } from "@/components/site/floating-whatsapp";
import { Motion } from "@/components/site/motion";
import { gallerySitesData, galleryCategories, GallerySite } from "@/components/gallery/galleryData";
import { GalleryCard } from "@/components/gallery/GalleryCard";
import { FullscreenSiteModal } from "@/components/gallery/FullscreenSiteModal";

const title = "Developments Gallery — Asterisk Construction | Completed & Ongoing Sites";
const description =
  "Explore high-resolution developments gallery by Asterisk Construction. Featuring luxury mansions, modern residential apartments, bungalows, and hospitality developments built across Kenya.";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "construction gallery, Asterisk Construction projects, luxury mansions Kenya, residential apartments Nairobi, building contractors Kenya, developments portfolio",
      },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [preloadingSite, setPreloadingSite] = useState<GallerySite | null>(null);
  const [activeSite, setActiveSite] = useState<GallerySite | null>(null);

  // Minimal initial page loading phase to allow layout and DOM to render cleanly
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const filteredSites =
    selectedCategory === "all"
      ? gallerySitesData
      : gallerySitesData.filter((site) => site.category === selectedCategory);

  // On-demand image preloading: when user selects a site, show spiral loader while image downloads
  const handleSelectSite = (site: GallerySite) => {
    setPreloadingSite(site);

    const img = new Image();
    img.src = site.fullImage;

    const onComplete = () => {
      setPreloadingSite(null);
      setActiveSite(site);
    };

    if (img.complete) {
      // If already cached by browser
      setTimeout(onComplete, 200);
    } else {
      img.onload = () => {
        setTimeout(onComplete, 300);
      };
      img.onerror = () => {
        // Fallback to open modal even if network issue occurs
        onComplete();
      };
    }
  };

  const activeIndex = activeSite
    ? filteredSites.findIndex((s) => s.id === activeSite.id)
    : -1;

  const handleNavigate = (direction: "next" | "prev") => {
    if (activeIndex === -1) return;
    const nextIndex =
      direction === "next"
        ? (activeIndex + 1) % filteredSites.length
        : (activeIndex - 1 + filteredSites.length) % filteredSites.length;

    const targetSite = filteredSites[nextIndex];
    if (targetSite) {
      // Preload next image seamlessly
      const nextImg = new Image();
      nextImg.src = targetSite.fullImage;
      setActiveSite(targetSite);
    }
  };

  return (
    <>
      {/* Initial page loader */}
      {isPageLoading && <SpiralLoader />}

      {/* On-demand site preloader when user selects a site */}
      {preloadingSite && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <SpiralLoader />
          <div className="absolute bottom-16 sm:bottom-24 px-6 py-2.5 rounded-full bg-slate-900/90 border border-[#c85a32]/60 text-center shadow-xl">
            <p className="text-xs sm:text-sm font-semibold text-white tracking-wide">
              Loading high-resolution gallery for <span className="text-[#ff8e5a]">{preloadingSite.title}</span>...
            </p>
          </div>
        </div>
      )}

      {/* Fullscreen Modal Viewer */}
      {activeSite && (
        <FullscreenSiteModal
          site={activeSite}
          onClose={() => setActiveSite(null)}
          onNavigate={handleNavigate}
          hasNext={filteredSites.length > 1}
          hasPrev={filteredSites.length > 1}
          currentIndex={activeIndex}
          totalSites={filteredSites.length}
        />
      )}

      <ScrollableBuildingBackground />
      <CarvedWoodNavbar />
      <PinnedTopRollCanvas />

      <PaperFolioContainer>
        <Motion />
        <main className="container-shell py-12 sm:py-16 lg:py-20 text-slate-900">
          {/* Header Section */}
          <div className="max-w-3xl">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#c85a32] hover:text-[#9e3a15] mb-4 transition-colors"
            >
              <span>← Back to Home</span>
            </a>
            <p className="eyebrow text-[#c85a32] font-bold tracking-[0.2em] uppercase">
              Developments Showcase
            </p>
            <h1 className="text-fluid-section mt-2 font-black text-slate-950">
              Site Developments Gallery
            </h1>
            <p className="text-fluid-body mt-3 text-slate-700 font-medium leading-relaxed">
              Explore our master-planned estates, multi-floor apartment buildings, modern bungalows, and hospitality developments delivered across Kenya and East Africa.
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="mt-8 flex flex-wrap gap-2 sm:gap-3">
            {galleryCategories.map((c) => {
              const isActive = selectedCategory === c.id;
              const count =
                c.id === "all"
                  ? gallerySitesData.length
                  : gallerySitesData.filter((p) => p.category === c.id).length;

              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCategory(c.id)}
                  className={`rounded-xs px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#c85a32] text-white border-2 border-[#c85a32] shadow-sm"
                      : "border-2 border-slate-300 bg-white text-slate-700 hover:border-slate-800 hover:text-slate-950"
                  }`}
                >
                  {c.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Developments Responsive Grid */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSites.map((site) => (
              <GalleryCard
                key={site.id}
                site={site}
                onSelect={handleSelectSite}
                isLoading={preloadingSite?.id === site.id}
              />
            ))}
          </div>
        </main>
        <Footer />
      </PaperFolioContainer>

      <FloatingWhatsApp />
    </>
  );
}
