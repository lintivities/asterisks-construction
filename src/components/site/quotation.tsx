import { EMAIL, PHONE_DISPLAY } from "@/lib/whatsapp";
import { QuoteForm } from "./quote-form";

const steps = [
  "Share your project type, budget range and site location.",
  "We reply on WhatsApp with a preliminary cost band and required drawings.",
  "Site visit, measured survey and a full bill of quantities.",
  "Signed contract, programme of works and construction start.",
];

export function Quotation() {
  return (
    <section id="quotation" className="border-t border-border">
      <div className="container-shell grid gap-12 py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:py-28">
        <div>
          <p className="eyebrow">Quotation Calculator</p>
          <h2 className="text-fluid-section mt-5 max-w-[22ch] font-bold">
            Get a costed starting point today.
          </h2>
          <p className="text-fluid-body mt-6 max-w-[54ch] text-muted-foreground">
            Fill in three details and we will open WhatsApp with your brief already drafted. No
            forms lost in an inbox.
          </p>

          <ol className="mt-10 grid gap-4">
            {steps.map((s, i) => (
              <li key={s} className="flex gap-4 border-t border-border pt-4">
                <span className="font-display text-sm font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-muted-foreground">{s}</span>
              </li>
            ))}
          </ol>

          <p className="mt-10 text-sm text-muted-foreground">
            Prefer to talk?{" "}
            <a href={`tel:+${PHONE_DISPLAY.replace(/\s/g, "")}`} className="text-accent">
              {PHONE_DISPLAY}
            </a>{" "}
            ·{" "}
            <a href={`mailto:${EMAIL}`} className="text-accent break-all">
              {EMAIL}
            </a>
          </p>
        </div>

        <div className="border border-border bg-card p-6 sm:p-9">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
