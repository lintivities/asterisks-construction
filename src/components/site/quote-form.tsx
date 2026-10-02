import { useState } from "react";
import { quotationLink } from "@/lib/whatsapp";
import { WaIcon } from "./wa-icon";

const projectTypes = ["Residential", "Commercial", "Renovation"];
const budgets = [
  "Under KSh 5M",
  "KSh 5M – 20M",
  "KSh 20M – 50M",
  "KSh 50M – 200M",
  "Above KSh 200M",
];

const fieldClass =
  "min-h-[48px] w-full rounded-sm border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground";

export function QuoteForm({ compact = false }: { compact?: boolean }) {
  const [projectType, setProjectType] = useState(projectTypes[0]!);
  const [budget, setBudget] = useState(budgets[1]!);
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(quotationLink({ projectType, budget, location, notes }), "_blank", "noopener");
  };

  return (
    <form onSubmit={submit} className="grid gap-4">
      <label className="grid gap-2 text-xs tracking-[0.18em] uppercase text-muted-foreground">
        Project type
        <select
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
          className={fieldClass}
        >
          {projectTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2 text-xs tracking-[0.18em] uppercase text-muted-foreground">
        Estimated budget
        <select value={budget} onChange={(e) => setBudget(e.target.value)} className={fieldClass}>
          {budgets.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2 text-xs tracking-[0.18em] uppercase text-muted-foreground">
        Location
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Karen, Nairobi"
          className={fieldClass}
        />
      </label>

      {!compact && (
        <label className="grid gap-2 text-xs tracking-[0.18em] uppercase text-muted-foreground">
          Project details (optional)
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Plot size, number of units, timelines…"
            className={`${fieldClass} py-3`}
          />
        </label>
      )}

      <button type="submit" className="btn-base btn-primary mt-2 w-full">
        <WaIcon className="h-4 w-4" />
        Send on WhatsApp
      </button>
    </form>
  );
}
