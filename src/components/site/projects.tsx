import { useState, useRef } from "react";
import { projectsData, Project } from "@/data/projects";
import { whatsappLink } from "@/lib/whatsapp";
import { WaIcon } from "./wa-icon";

const categories = [
  { id: "all", label: "All Developments" },
  { id: "mansions", label: "Mansions & Villas" },
  { id: "apartments", label: "Commercial & Apartments" },
  { id: "bungalows", label: "Bungalows" },
  { id: "resorts", label: "Hospitality & Resorts" },
];

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [active, setActive] = useState<Project | null>(null);
  const [lastViewedId, setLastViewedId] = useState<string | null>(null);
  const savedScrollPosRef = useRef<number | null>(null);

  const filteredProjects =
    selectedCategory === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  const openDossier = (p: Project) => {
    savedScrollPosRef.current = window.scrollY;
    setLastViewedId(p.id);
    setActive(p);

    // Smoothly scroll the top of the projects section into view
    setTimeout(() => {
      const sectionEl = document.getElementById("projects");
      if (sectionEl) {
        sectionEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 40);
  };

  const closeDossier = () => {
    const targetId = active?.id || lastViewedId;
    setActive(null);

    // Return the user smoothly to the previous stage and exact card in the section
    setTimeout(() => {
      if (targetId) {
        const cardEl = document.getElementById(`project-card-${targetId}`);
        if (cardEl) {
          cardEl.scrollIntoView({ behavior: "smooth", block: "center" });
          // Highlight card briefly to orient the user
          cardEl.classList.add("ring-2", "ring-accent", "ring-offset-2", "ring-offset-[#151c24]");
          setTimeout(() => {
            cardEl.classList.remove("ring-2", "ring-accent", "ring-offset-2", "ring-offset-[#151c24]");
          }, 1800);
          return;
        }
      }
      if (savedScrollPosRef.current !== null) {
        window.scrollTo({ top: savedScrollPosRef.current, behavior: "smooth" });
      }
    }, 60);
  };

  // Quick navigation between projects in dossier stage
  const activeIndex = active ? filteredProjects.findIndex((p) => p.id === active.id) : -1;
  const prevProject =
    activeIndex > 0
      ? filteredProjects[activeIndex - 1]
      : filteredProjects[filteredProjects.length - 1];
  const nextProject =
    activeIndex >= 0 && activeIndex < filteredProjects.length - 1
      ? filteredProjects[activeIndex + 1]
      : filteredProjects[0];

  const switchDossierProject = (p: Project) => {
    setLastViewedId(p.id);
    setActive(p);
  };

  return (
    <section id="projects" className="border-t border-border bg-[#151c24]/95 text-white">
      <div className="container-shell py-20 lg:py-28">
        {/* STAGE 1: PORTFOLIO GRID STAGE (When no project is actively expanded) */}
        {!active ? (
          <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-3xl">
                <p className="eyebrow text-accent font-bold tracking-[0.2em] uppercase">
                  Developments Portfolio
                </p>
                <h2 className="text-fluid-section mt-5 font-black text-white">
                  Delivered work, expanded in detail.
                </h2>
                <p className="text-fluid-body mt-4 text-slate-200 font-medium leading-relaxed">
                  Explore our master-planned estates, multi-floor apartment complexes, modern
                  bungalows, and luxury hospitality retreats delivered across Kenya and East Africa.
                </p>
              </div>

              <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest">
                <span>Portfolio Count: </span>
                <span className="text-accent font-black text-sm">{projectsData.length} Projects</span>
              </div>
            </div>

            {/* Category Filters */}
            <div className="mt-10 flex flex-wrap gap-2.5">
              {categories.map((c) => {
                const isFilterActive = selectedCategory === c.id;
                const count =
                  c.id === "all"
                    ? projectsData.length
                    : projectsData.filter((p) => p.category === c.id).length;

                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCategory(c.id)}
                    className={`rounded-xs px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isFilterActive
                        ? "bg-[#c85a32] text-white border-2 border-[#c85a32] shadow-md"
                        : "border-2 border-white/30 bg-[#1b2430] text-slate-200 hover:border-white hover:text-white"
                    }`}
                  >
                    {c.label} ({count})
                  </button>
                );
              })}
            </div>

            {/* Project Cards Grid */}
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProjects.map((p) => {
                const isLastViewed = lastViewedId === p.id;
                return (
                  <article
                    key={p.id}
                    id={`project-card-${p.id}`}
                    data-reveal
                    className={`project-card flex flex-col overflow-hidden border-2 transition-all duration-300 rounded-xs ${
                      isLastViewed
                        ? "border-accent bg-[#1b2430] shadow-[0_0_20px_rgba(200,90,50,0.3)]"
                        : "border-border/80 bg-[#1b2430] hover:border-accent/70 hover:shadow-lg"
                    }`}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                      <img
                        src={p.image}
                        alt={`${p.title}, ${p.location}`}
                        loading="lazy"
                        width={1280}
                        height={960}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 rounded-xs bg-black/85 px-2.5 py-1 text-[0.65rem] font-bold tracking-[0.2em] uppercase text-accent border border-accent/40 shadow-xs">
                        {p.categoryLabel}
                      </span>
                      <span className="absolute bottom-3 right-3 rounded-xs bg-slate-950/85 px-2 py-0.5 text-[0.65rem] font-mono font-bold text-white border border-white/20">
                        SPEC #{p.id}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-display text-lg font-bold text-white leading-snug line-clamp-1">
                        {p.title}
                      </h3>
                      <p className="mt-1.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#ff8e5a]">
                        {p.location}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2 text-[0.7rem] font-mono text-slate-300">
                        <span className="border border-white/10 bg-white/5 px-2 py-0.5 rounded-xs">
                          {p.landSize}
                        </span>
                        <span className="border border-white/10 bg-white/5 px-2 py-0.5 rounded-xs">
                          {p.floorArea}
                        </span>
                      </div>

                      <p className="mt-4 flex-1 text-sm text-slate-200 font-medium leading-relaxed line-clamp-3">
                        {p.summary}
                      </p>

                      <button
                        type="button"
                        onClick={() => openDossier(p)}
                        className="btn-base mt-6 w-full font-bold uppercase tracking-wider text-xs border-2 border-white/60 text-white hover:bg-white hover:text-slate-950 transition-all cursor-pointer shadow-xs"
                      >
                        Expand Specs ↓
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ) : (
          /* STAGE 2: SPECIFICATION DOSSIER STAGE (Opens in the same section, immersive on canvas) */
          <div
            id="project-canvas-dossier"
            className="border-2 border-accent/80 bg-[#18222e] text-white p-6 sm:p-10 shadow-2xl rounded-sm transition-all duration-300"
          >
            {/* Top Stage Header with Return CTA & Project Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-6">
              <button
                type="button"
                onClick={closeDossier}
                aria-label="Return to previous portfolio stage"
                className="inline-flex items-center gap-2 rounded-xs border-2 border-accent bg-[#c85a32] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-[#b85428] transition-colors cursor-pointer"
              >
                <span>← Done Reviewing (Return to Projects)</span>
              </button>

              {/* Prev / Next Quick Switcher */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-300 uppercase tracking-widest hidden sm:inline">
                  {activeIndex + 1} of {filteredProjects.length}
                </span>
                {prevProject && (
                  <button
                    type="button"
                    onClick={() => switchDossierProject(prevProject)}
                    className="rounded-xs border border-white/30 bg-white/5 px-3 py-1.5 text-xs font-bold text-white hover:bg-white/15 transition-colors cursor-pointer"
                    title={`Previous: ${prevProject.title}`}
                  >
                    ← Prev
                  </button>
                )}
                {nextProject && (
                  <button
                    type="button"
                    onClick={() => switchDossierProject(nextProject)}
                    className="rounded-xs border border-white/30 bg-white/5 px-3 py-1.5 text-xs font-bold text-white hover:bg-white/15 transition-colors cursor-pointer"
                    title={`Next: ${nextProject.title}`}
                  >
                    Next →
                  </button>
                )}
              </div>
            </div>

            {/* Dossier Title Banner */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-[#c85a32] text-white font-display text-xl font-bold shadow-sm">
                  *
                </span>
                <div>
                  <span className="text-[0.7rem] font-bold tracking-[0.24em] uppercase text-accent block">
                    Architectural Specification Dossier · {active.categoryLabel}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-black text-white mt-1">
                    {active.title}
                  </h3>
                  <p className="text-xs font-mono text-[#ff8e5a] font-semibold mt-0.5">
                    {active.subtitle}
                  </p>
                </div>
              </div>

              <div className="rounded-xs border border-accent/40 bg-black/40 px-3 py-1.5 font-mono text-xs text-accent">
                SPEC #{active.id} · APPROVED
              </div>
            </div>

            {/* 2-Column Architectural Folio Layout */}
            <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1fr] items-start">
              {/* Left Column: Image & Property Specs */}
              <div className="space-y-4">
                <div className="overflow-hidden rounded-sm border-2 border-border/80 aspect-[16/10] bg-slate-900 shadow-md">
                  <img
                    src={active.image}
                    alt={active.title}
                    width={1280}
                    height={800}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3 text-center border border-white/15 bg-white/5 p-3.5 rounded-xs font-mono text-xs">
                  <div>
                    <span className="text-[0.65rem] text-slate-400 block uppercase">Location</span>
                    <span className="font-bold text-white text-xs">{active.location}</span>
                  </div>
                  <div className="border-x border-white/15 px-2">
                    <span className="text-[0.65rem] text-slate-400 block uppercase">Land Size</span>
                    <span className="font-bold text-white text-xs">{active.landSize}</span>
                  </div>
                  <div>
                    <span className="text-[0.65rem] text-slate-400 block uppercase">Floor Area</span>
                    <span className="font-bold text-accent text-xs">{active.floorArea}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Summary, Specifications, & CTAs */}
              <div className="flex flex-col justify-between h-full space-y-6">
                <div>
                  <h4 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-accent mb-2">
                    Executive Summary
                  </h4>
                  <p className="text-base text-slate-100 font-medium leading-relaxed">
                    {active.summary}
                  </p>

                  <h4 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-accent mt-6 mb-3">
                    Engineered Specifications &amp; Amenities ({active.amenities.length})
                  </h4>
                  <ul className="grid gap-2.5 sm:grid-cols-2 max-h-[380px] overflow-y-auto pr-2">
                    {active.amenities.map((s) => (
                      <li
                        key={s}
                        className="flex items-start gap-2.5 border-t border-white/10 pt-2.5 text-sm"
                      >
                        <span className="text-[#ff8e5a] font-black text-base leading-none shrink-0 mt-0.5">
                          •
                        </span>
                        <span className="text-slate-100 font-medium leading-snug">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Dossier Bottom Action Bar */}
                <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-4">
                  <a
                    href={whatsappLink(
                      `Hello Asterisk Construction, I am reviewing your Developments Portfolio on the folio canvas and would like a quotation for a project similar to ${active.title} (${active.location}). Please advise on preliminary architectural drawings and cost estimations.`,
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-base btn-primary font-bold shadow-lg text-white hover:bg-[#b85428]"
                  >
                    <WaIcon className="h-4 w-4" />
                    Discuss this build on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={closeDossier}
                    className="btn-base border-2 border-white/60 bg-transparent text-white hover:bg-white hover:text-slate-950 font-bold text-xs cursor-pointer transition-all"
                  >
                    Done Reviewing (Return to Projects)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
