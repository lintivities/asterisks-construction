import { teamData } from "@/data/team";

export function Team() {
  return (
    <section id="team" className="border-t border-border bg-[#151c24]/95 text-white">
      <div className="container-shell py-20 lg:py-28">
        <div className="max-w-3xl">
          <p className="eyebrow text-accent font-bold tracking-[0.2em] uppercase">
            Leadership &amp; Technical Directors
          </p>
          <h2 className="text-fluid-section mt-5 font-black text-white">
            The executive team behind every build.
          </h2>
          <p className="text-fluid-body mt-4 text-slate-200 font-medium leading-relaxed">
            A multidisciplinary leadership team of licensed engineers, architects, project managers,
            quantity surveyors, environmentalists, and legal counsel dedicated to engineering
            Africa&apos;s skyline.
          </p>
        </div>

        <div
          data-reveal
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {teamData.map((m) => (
            <article
              key={m.id}
              className="group relative flex flex-col items-center text-center p-8 bg-[#1b2430] border-2 border-border/80 hover:border-accent/80 transition-all duration-300 shadow-lg rounded-sm"
            >
              {/* Headshot Portrait */}
              <div className="relative mb-6 h-32 w-32 shrink-0 overflow-hidden rounded-full border-3 border-accent/70 bg-slate-900 shadow-[0_6px_24px_rgba(0,0,0,0.6)] group-hover:border-accent transition-all duration-300">
                <img
                  src={m.image}
                  alt={`${m.name} - ${m.role}`}
                  loading="lazy"
                  width={256}
                  height={256}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-108"
                />
              </div>

              {/* Identity & Department */}
              <h3 className="font-display text-xl font-bold text-white tracking-tight group-hover:text-amber-400 transition-colors">
                {m.name}
              </h3>
              <p className="mt-2 text-xs font-bold tracking-[0.16em] uppercase text-accent">
                {m.role}
              </p>
              <div className="mt-3 inline-block rounded-xs border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200 font-medium leading-snug">
                {m.department}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
