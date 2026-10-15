import { GallerySite } from "./galleryData";

interface GalleryCardProps {
  site: GallerySite;
  onSelect: (site: GallerySite) => void;
  isLoading?: boolean;
}

export function GalleryCard({ site, onSelect, isLoading }: GalleryCardProps) {
  return (
    <article
      id={`site-card-${site.id}`}
      className="group flex flex-col overflow-hidden rounded-sm border-2 border-slate-700/80 bg-[#17212d] text-white shadow-md transition-all duration-300 hover:border-[#c85a32] hover:shadow-xl"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
        <img
          src={site.thumbnail}
          alt={`${site.title} - ${site.location}`}
          loading="lazy"
          decoding="async"
          width={800}
          height={500}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Category Badge */}
        <span className="absolute top-3 left-3 rounded-xs bg-slate-950/90 px-2.5 py-1 text-[0.7rem] font-bold tracking-wider uppercase text-[#c85a32] border border-[#c85a32]/40 backdrop-blur-xs">
          {site.categoryLabel}
        </span>

        {/* Site ID */}
        <span className="absolute bottom-3 right-3 rounded-xs bg-black/80 px-2 py-0.5 text-[0.68rem] font-mono font-bold text-slate-300 border border-white/20">
          SITE #{site.id}
        </span>

        {/* Loading overlay if currently preloading this site */}
        {isLoading && (
          <div className="absolute inset-0 bg-slate-950/80 flex items-center justify-center backdrop-blur-xs z-10">
            <div className="flex flex-col items-center gap-2">
              <span className="w-6 h-6 border-2 border-[#c85a32] border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-semibold text-white">Loading photos...</span>
            </div>
          </div>
        )}
      </div>

      {/* Content Details */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-[#ff9d70] transition-colors line-clamp-1">
          {site.title}
        </h3>
        <p className="mt-1 text-xs font-semibold tracking-wider uppercase text-[#ff8e5a]">
          {site.location}
        </p>

        {/* Quick specs */}
        <div className="mt-3 flex flex-wrap gap-2 text-[0.72rem] text-slate-300">
          <span className="rounded-xs border border-white/15 bg-white/5 px-2 py-0.5 font-medium">
            📐 Land: {site.landSize}
          </span>
          <span className="rounded-xs border border-white/15 bg-white/5 px-2 py-0.5 font-medium">
            🏗️ Area: {site.floorArea}
          </span>
        </div>

        <p className="mt-3.5 flex-1 text-xs sm:text-sm text-slate-300 font-normal leading-relaxed line-clamp-3">
          {site.summary}
        </p>

        {/* View Details / Fullscreen Trigger */}
        <button
          type="button"
          onClick={() => onSelect(site)}
          disabled={isLoading}
          className="btn-base mt-5 w-full font-bold uppercase tracking-wider text-xs border-2 border-white/60 bg-transparent text-white hover:bg-[#c85a32] hover:border-[#c85a32] hover:text-white transition-all cursor-pointer shadow-xs disabled:opacity-50 inline-flex items-center justify-center gap-2"
        >
          <span>View Site Gallery</span>
          <span aria-hidden="true">↗</span>
        </button>
      </div>
    </article>
  );
}
