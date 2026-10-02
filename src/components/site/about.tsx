const pillars = [
  {
    title: "Vision",
    body: "To be the trusted leader in shaping Africa's built environment through efficient, innovative and sustainable development that exists in balance with the natural environment and communities we serve.",
  },
  {
    title: "Mission",
    body: "To deliver high quality, reliable and value driven construction solutions that exceed client expectations, while fostering the professional growth, wellbeing and long-term careers of our people.",
  },
];

const values = [
  "Innovation",
  "Integrity",
  "Quality assurance",
  "Timely delivery",
  "Social responsibility",
];

export function About() {
  return (
    <section id="about" className="border-t border-border bg-surface text-surface-foreground">
      <div className="container-shell grid gap-14 py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:py-28">
        <div>
          <p className="eyebrow" style={{ color: "var(--color-primary)" }}>
            Established 2025
          </p>
          <h2 className="text-fluid-section mt-5 font-bold">
            A design-and-build firm engineered around efficiency.
          </h2>
          <p className="text-fluid-body mt-6 opacity-80">
            Asterisk Construction is a limited liability company designing and constructing
            infrastructure projects, residential and commercial buildings. We are based in Nairobi,
            Kenya and undertake works across Africa.
          </p>
          <p className="text-fluid-body mt-4 opacity-80">
            Our designs are optimised for operational efficiency while providing adequate space for
            current and future needs. Construction is delivered on schedule and on budget, largely
            with local labour, full PPE provision, onsite health officers, safety training and
            insurance cover for every worker and visitor.
          </p>
          <p className="text-fluid-body mt-4 opacity-80">
            Green building elements reduce the energy each structure needs to operate, and we partner
            with NGOs and CBOs working on environmental sustainability.
          </p>
        </div>

        <div className="grid gap-5 self-start">
          {pillars.map((p) => (
            <article
              key={p.title}
              className="border-l-2 border-primary bg-white/60 p-6 sm:p-8"
            >
              <h3 className="font-display text-xl font-bold">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed opacity-75">{p.body}</p>
            </article>
          ))}
          <div className="flex flex-wrap gap-2">
            {values.map((v) => (
              <span
                key={v}
                className="rounded-full border border-surface-foreground/15 px-4 py-2 text-xs font-semibold tracking-[0.14em] uppercase"
              >
                {v}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
