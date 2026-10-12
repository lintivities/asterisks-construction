const services = [
  {
    title: "Architectural & Interior Design",
    body: "Concept through construction drawings, optimised for efficiency, daylight and future expansion.",
  },
  {
    title: "Structural, Mechanical & Electrical Engineering",
    body: "Integrated engineering design coordinated across disciplines before a single block is laid.",
  },
  {
    title: "Construction & Demolition Workflows",
    body: "Full build delivery on schedule and on budget, with local labour and enforced site safety.",
  },
  {
    title: "Landscaping & Land Surveying",
    body: "Topographic and boundary surveys, site planning and manicured external works.",
  },
  {
    title: "Project Valuation & Quantity Surveying",
    body: "Bills of quantities, cost planning, valuations and transparent payment certification.",
  },
  {
    title: "Waste Management & Green Building",
    body: "Sorting, reuse and compliant disposal that keeps sites clean and projects certifiable.",
  },
];

export function Services() {
  return (
    <section id="services" className="hairline-grid border-t border-border bg-[#151c24]/95 text-white">
      <div className="container-shell py-20 lg:py-28">
        <p className="eyebrow text-accent font-bold tracking-[0.2em] uppercase">Services Matrix</p>
        <h2 className="text-fluid-section mt-5 max-w-[26ch] font-black text-white">
          One accountable team, end to end.
        </h2>

        <div data-reveal className="mt-12 grid gap-px border border-border bg-border md:grid-cols-2 xl:grid-cols-3">
          {services.map((s, i) => (
            <article key={s.title} className="service-card bg-[#1b2430] p-7 lg:p-9 border border-border/80">
              <span className="font-display text-sm font-bold text-[#ff8e5a]">
                {String(i + 1).padStart(2, "0")}.
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-white">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-200 font-medium">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
