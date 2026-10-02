import { useEffect, useState } from "react";
import villa from "@/assets/project-villa.jpg";
import towers from "@/assets/project-towers.jpg";
import bustani from "@/assets/project-bustani.jpg";
import resort from "@/assets/project-resort.jpg";
import { whatsappLink } from "@/lib/whatsapp";
import { WaIcon } from "./wa-icon";

type Project = {
  id: string;
  name: string;
  location: string;
  tag: string;
  summary: string;
  image: string;
  specs: string[];
};

const projects: Project[] = [
  {
    id: "mohammed",
    name: "Mr. & Mrs. Mohammed Family Home",
    location: "Kilifi, Kenya",
    tag: "Luxury Residential",
    summary: "12-bedroom luxury villa on 5 acres.",
    image: villa,
    specs: [
      "12 bedrooms plus master, 7 ensuite, 11 bathrooms",
      "Underground parking for 10 cars, exterior parking for 15",
      "Private cinema, library, gym, steam room and office",
      "Infinity pool, guest house and gazebo",
      "Solar microgrid with battery backup",
      "Climate-responsive ventilation inspired by Swahili coastal architecture",
    ],
  },
  {
    id: "joyville",
    name: "Joy Ville Towers",
    location: "Juja Farm, Kiambu",
    tag: "High-Rise",
    summary: "15-floor high-rise residential apartment block.",
    image: towers,
    specs: [
      "High-density urban housing: 2 two-bedroom units of 103m² per floor",
      "Rooftop garden terrace and landscaped garden area",
      "Borehole water treatment system",
      "Integrated solar backup plus generator for lifts and security lighting",
      "Child-safe play area and shared laundry",
      "Firefighting system and lift services throughout",
    ],
  },
  {
    id: "bustani",
    name: "Bustani Apartments",
    location: "Donholm, Nairobi",
    tag: "Investor ROI",
    summary: "4-floor multi-unit residential complex.",
    image: bustani,
    specs: [
      "Mixed unit plan: two-bedroom, one-bedroom and bedsitter units per floor",
      "Optimised for high investor ROI over a 6-year return period",
      "Rainwater harvesting and storage",
      "Modular brick facades for low-maintenance durability",
      "Smart access control and secure parking",
      "Developed on a 100 × 100 ft plot",
    ],
  },
  {
    id: "crest",
    name: "The Crest Resort",
    location: "Kitui, Kenya",
    tag: "Eco-Tourism",
    summary: "6-acre eco-tourism resort development.",
    image: resort,
    specs: [
      "Timber A-frame cabins with jacuzzi and ensuite master",
      "Ensuite single-room cabins and a campsite",
      "Restaurant, bar, boardrooms, gym and mini mart",
      "Quad bike tracks across the 6-acre site",
      "Swimming pool and shaded outdoor terraces",
      "Zero-waste wastewater processing",
    ],
  },
];

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section id="projects" className="border-t border-border">
      <div className="container-shell py-20 lg:py-28">
        <p className="eyebrow">Developments Portfolio</p>
        <h2 className="text-fluid-section mt-5 max-w-[24ch] font-bold">
          Delivered work, expanded in detail.
        </h2>

        <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:overflow-visible xl:grid-cols-4">
          {projects.map((p) => (
            <article
              key={p.id}
              data-reveal className="project-card flex w-[82vw] shrink-0 snap-center flex-col overflow-hidden border border-accent/30 bg-surface text-surface-foreground md:w-auto"
            >
              <img
                src={p.image}
                alt={`${p.name}, ${p.location}`}
                loading="lazy"
                width={1280}
                height={960}
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-6">
                <span className="text-[0.65rem] font-semibold tracking-[0.24em] uppercase text-primary">
                  {p.tag}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold">{p.name}</h3>
                <p className="mt-1 text-xs tracking-[0.16em] uppercase text-surface-foreground/60">
                  {p.location}
                </p>
                <p className="mt-4 flex-1 text-sm text-surface-foreground/75">{p.summary}</p>
                <button
                  type="button"
                  onClick={() => setActive(p)}
                  className="btn-base mt-6 w-full border border-surface-foreground/80 text-surface-foreground transition-colors hover:bg-surface-foreground hover:text-surface"
                >
                  Expand Specs
                </button>
              </div>
            </article>
          ))}
        </div>

        <div data-reveal className="mt-10 grid gap-4 border-t border-accent/40 pt-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <p className="eyebrow">Additional Executive Villas &amp; Mansions</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Thika · Kabete · Kitengela · Syokimau · Ruai · Kenol · Limuru
          </p>
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center modal-backdrop bg-black/70 p-0 sm:items-center sm:p-6"
          onClick={() => setActive(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={active.name}
            onClick={(e) => e.stopPropagation()}
            className="modal-panel max-h-[90vh] w-full max-w-3xl overflow-y-auto border border-border bg-popover shadow-[var(--shadow-elevated)]"
          >
            <div className="relative">
              <img
                src={active.image}
                alt={active.name}
                loading="lazy"
                width={1280}
                height={960}
                className="aspect-[16/9] w-full object-cover"
              />
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close project details"
                className="absolute top-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-background/80 text-xl"
              >
                ×
              </button>
            </div>
            <div className="p-6 sm:p-10">
              <span className="text-[0.65rem] font-semibold tracking-[0.24em] uppercase text-accent">
                {active.tag} · {active.location}
              </span>
              <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">{active.name}</h3>
              <p className="mt-3 text-muted-foreground">{active.summary}</p>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {active.specs.map((s) => (
                  <li key={s} className="flex gap-3 border-t border-border pt-3 text-sm">
                    <span className="text-accent">*</span>
                    <span className="text-muted-foreground">{s}</span>
                  </li>
                ))}
              </ul>
              <a
                href={whatsappLink(
                  `Hello Asterisk Construction, I would like a quotation for a project similar to ${active.name} (${active.location}). Please guide me on the next steps.`,
                )}
                target="_blank"
                rel="noreferrer"
                className="btn-base btn-primary mt-9 w-full sm:w-auto"
              >
                <WaIcon className="h-4 w-4" />
                Discuss a similar project
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
