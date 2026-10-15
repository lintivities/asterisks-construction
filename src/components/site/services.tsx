const services = [
  {
    title: "Custom Home & Villa Construction",
    body: "Turnkey building of family bungalows, double-storey maisonettes, and luxury residences crafted to your exact taste.",
  },
  {
    title: "Apartments & Commercial Buildings",
    body: "Construction of multi-floor residential apartments, commercial plazas, and mixed-use rental developments.",
  },
  {
    title: "Architectural Plans & House Designs",
    body: "Practical floor layouts, attractive exterior styling, and full county government permit approvals.",
  },
  {
    title: "Structural & Civil Engineering",
    body: "Engineered foundations, strong reinforced concrete frames, roofing structures, and reliable drainage systems.",
  },
  {
    title: "Renovations & Property Extensions",
    body: "Modernizing older properties, adding extra bedrooms or floors, new roofing, and quality interior finishes.",
  },
  {
    title: "Cost Estimations & Bill of Quantities (BQ)",
    body: "Transparent construction budgeting and itemized material schedules so you have complete price certainty.",
  },
];

export function Services() {
  return (
    <section id="services" className="hairline-grid border-t border-border bg-[#151c24]/95 text-white">
      <div className="container-shell py-16 lg:py-24">
        <p className="eyebrow text-accent font-bold tracking-[0.2em] uppercase">Our Capabilities</p>
        <h2 className="text-fluid-section mt-3 max-w-[26ch] font-black text-white">
          Services Rendered
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
          From empty land to your finished building, we handle every stage with professional site supervision.
        </p>

        <div data-reveal className="mt-10 grid gap-4 border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <article key={s.title} className="service-card bg-[#1b2430] p-6 sm:p-7 border border-border/80 rounded-xs">
              <span className="font-display text-sm font-bold text-[#ff8e5a]">
                {String(i + 1).padStart(2, "0")}.
              </span>
              <h3 className="mt-3 font-display text-base sm:text-lg font-bold text-white">{s.title}</h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-300 font-normal">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
