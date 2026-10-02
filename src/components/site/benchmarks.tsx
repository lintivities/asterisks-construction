const references = [
  {
    name: "Integrum Construction Consultancy",
    url: "https://www.integrum.co.ke",
    label: "www.integrum.co.ke",
    body: "Referenced for consultancy-grade engineering standards and project documentation practice in Kenya.",
  },
  {
    name: "Rickfes Construction",
    url: "https://www.rickfes.co.ke",
    label: "www.rickfes.co.ke",
    body: "Referenced for local construction execution benchmarks and quality-assurance workflows.",
  },
];

export function Benchmarks() {
  return (
    <section id="benchmarks" className="border-t border-border bg-surface text-surface-foreground">
      <div className="container-shell py-20 lg:py-28">
        <p className="eyebrow" style={{ color: "var(--color-primary)" }}>
          Industry Benchmarks
        </p>
        <h2 className="text-fluid-section mt-5 max-w-[30ch] font-bold">
          We hold our work to Kenya&apos;s leading consultancy standards.
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {references.map((r) => (
            <a
              key={r.url}
              href={r.url}
              target="_blank"
              rel="noreferrer"
              className="group border border-surface-foreground/15 bg-white/60 p-7 transition-colors hover:border-primary lg:p-9"
            >
              <h3 className="font-display text-xl font-bold">{r.name}</h3>
              <p className="mt-3 text-sm opacity-75">{r.body}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                {r.label}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
