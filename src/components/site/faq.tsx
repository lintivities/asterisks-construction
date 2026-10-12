import { useState } from "react";

export const faqs = [
  {
    question: "How much does it cost to construct a residential home or apartment in Kenya?",
    answer:
      "Construction costs in Kenya typically range between KSh 35,000 and KSh 75,000+ per square meter depending on structural engineering requirements, soil topology, and finish specifications (standard, high-end, or luxury). Asterisk Construction provides an initial cost band via WhatsApp, followed by a measured site survey and an itemized Bill of Quantities (BQ) so you have cost certainty before breaking ground.",
  },
  {
    question: "What statutory approvals (NCA, NEMA, County Government) are required before building?",
    answer:
      "Every compliant build in Kenya requires County Government architectural and structural drawing approvals, a National Environment Management Authority (NEMA) Environmental Impact Assessment (EIA) license, and registration with the National Construction Authority (NCA). Our in-house Legal & Statutory lead (Jeremy Kiprotich) and engineering heads manage the entire permitting pipeline from submission to site compliance sign-off.",
  },
  {
    question: "What is the advantage of Asterisk Construction's integrated Design-and-Build approach?",
    answer:
      "Traditional contracting separates architects, structural engineers, quantity surveyors, and site contractors into disconnected silos, leading to finger-pointing and cost overruns. Asterisk Construction operates as one accountable team from architectural concept drawings to physical key handover, aligning engineering feasibility and budget constraints from day one.",
  },
  {
    question: "How do you guarantee construction stays on schedule and strictly on budget?",
    answer:
      "We build against verified Bills of Quantities (BQs) with transparent payment milestones certified by our Quantity Surveying lead (Lui Bahati). Work progresses along a critical path Gantt schedule with dedicated site managers, weekly progress audits, and formal milestone certifications, eliminating surprise cost escalations.",
  },
  {
    question: "What is the timeline from concept drawings to physical project handover?",
    answer:
      "A standard residential bungalow or mansionette takes approximately 4 to 8 months from groundbreaking to handover. Multi-floor commercial or apartment developments (such as Joy Ville Towers or Bustani Apartments) typically span 12 to 18 months depending on the number of levels, geotechnical conditions, and finish complexity.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="border-t border-border bg-[#151c24]/95 text-white">
      <div className="container-shell py-20 lg:py-28">
        <div className="max-w-3xl">
          <p className="eyebrow text-accent font-bold tracking-[0.2em] uppercase">
            Client Knowledge Base
          </p>
          <h2 className="text-fluid-section mt-5 font-black text-white">
            Frequently Asked Questions.
          </h2>
          <p className="text-fluid-body mt-4 text-slate-200 font-medium leading-relaxed">
            Clear, practical answers on building costs, regulatory approvals, engineering
            standards, and delivery timelines across Kenya and East Africa.
          </p>
        </div>

        <div className="mt-12 grid gap-4 max-w-4xl">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <article
                key={faq.question}
                className={`overflow-hidden border-2 transition-colors rounded-xs ${
                  isOpen ? "border-accent/80 bg-[#1b2430]" : "border-border/80 bg-[#18222e] hover:border-white/40"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between p-6 text-left cursor-pointer gap-4"
                >
                  <span className="font-display text-base sm:text-lg font-bold text-white leading-snug">
                    {faq.question}
                  </span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-xs border font-mono text-base font-bold transition-transform ${
                      isOpen
                        ? "border-accent bg-[#c85a32] text-white rotate-45"
                        : "border-white/30 bg-white/5 text-slate-200"
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-white/10 px-6 pb-6 pt-4 text-slate-100 font-medium text-sm sm:text-base leading-relaxed">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
