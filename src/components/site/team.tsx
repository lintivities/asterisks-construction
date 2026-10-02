const team = [
  { name: "Noel Kamau", role: "Project Manager & Managing Director" },
  { name: "Lilian Maruti", role: "Civil Engineer — H.O.D Civil & Structural Design" },
  { name: "G.N Kamau", role: "Architect — H.O.D Architectural & Interior Design" },
  { name: "Lui Bahati", role: "Quantity Surveyor — H.O.D Valuation & Costing" },
  { name: "Jeremy Kiprotich", role: "Legal & Statutory Lead" },
  { name: "Dennis Kimani", role: "Sustainability & Environmental Lead" },
];

export function Team() {
  return (
    <section id="team" className="border-t border-border">
      <div className="container-shell py-20 lg:py-28">
        <p className="eyebrow">Leadership</p>
        <h2 className="text-fluid-section mt-5 max-w-[24ch] font-bold">
          The executive team behind every build.
        </h2>

        <ul data-reveal className="mt-12 grid gap-px border border-border bg-border md:grid-cols-2 xl:grid-cols-3">
          {team.map((m) => (
            <li key={m.name} className="team-card bg-card p-7 lg:p-9">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-accent/50 font-display text-sm font-bold text-accent">
                {m.name
                  .split(" ")
                  .map((p) => p[0])
                  .join("")}
              </span>
              <h3 className="mt-5 font-display text-lg font-bold">{m.name}</h3>
              <p className="team-role mt-2 text-sm text-muted-foreground">{m.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
