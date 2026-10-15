const values = [
  "Quality Workmanship",
  "Transparent Pricing",
  "On-Time Completion",
  "Safety First",
  "Reliable Delivery",
];

export function About() {
  return (
    <section id="about" className="border-t border-border bg-surface text-surface-foreground">
      <div className="container-shell grid gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-20 items-center">
        <div>
          <p className="eyebrow text-primary font-bold tracking-widest uppercase">
            About Asterisk Construction
          </p>
          <h2 className="text-fluid-section mt-3 font-black text-slate-950">
            Reliable design &amp; build contractors you can count on.
          </h2>
          <p className="text-fluid-body mt-5 text-slate-800 font-medium leading-relaxed">
            Asterisk Construction is a licensed building and design contractor based in Nairobi, Kenya. We design and build modern family homes, mansions, residential apartments, and commercial developments across Kenya and East Africa.
          </p>
          <p className="text-fluid-body mt-3 text-slate-700 leading-relaxed">
            From initial house plans and county permits to the final keys in your hand, we handle the entire project under one team. Our commitment is straightforward: top quality construction, transparent budgets with zero surprises, and dependable delivery on schedule.
          </p>
        </div>

        <div className="grid gap-4 bg-white/95 p-6 sm:p-8 border-2 border-slate-200 shadow-sm rounded-sm">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-950">Our Promise to You</h3>
            <p className="mt-2 text-sm text-slate-700 leading-relaxed">
              We treat every build like our own. We use certified materials, skilled local craftsmen, and experienced project managers to ensure your home or commercial property is built to last.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-2">
            {values.map((v) => (
              <span
                key={v}
                className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-800"
              >
                ✓ {v}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
