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
    <section id="quote" className="border-t border-border bg-[#151c24]/95 text-white">
      <div className="container-shell grid gap-12 pt-20 pb-28 lg:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
        <div>
          <p className="eyebrow text-accent font-bold tracking-[0.2em] uppercase">Quotation Calculator</p>
          <h2 className="text-fluid-section mt-5 max-w-[22ch] font-black text-white">
            Get a costed starting point today.
          </h2>
          <p className="text-fluid-body mt-6 max-w-[54ch] text-slate-200 font-medium leading-relaxed">
            Fill in three details and we will open WhatsApp with your brief already drafted. No
            forms lost in an inbox.
          </p>

          <ol className="mt-10 grid gap-4">
            {steps.map((s, i) => (
              <li key={s} className="flex gap-4 border-t border-border/80 pt-4">
                <span className="font-display text-sm font-black text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-slate-100 font-medium leading-relaxed">{s}</span>
              </li>
            ))}
          </ol>

          <p className="mt-10 text-sm text-slate-200 font-medium">
            Prefer to talk?{" "}
            <a href={`tel:+${PHONE_DISPLAY.replace(/\s/g, "")}`} className="text-amber-400 font-bold hover:underline">
              {PHONE_DISPLAY}
            </a>{" "}
            ·{" "}
            <a href={`mailto:${EMAIL}`} className="text-amber-400 font-bold hover:underline break-all">
              {EMAIL}
            </a>
          </p>
        </div>

        <div className="border border-border/80 bg-[#1b2430] p-6 sm:p-9 shadow-md">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
