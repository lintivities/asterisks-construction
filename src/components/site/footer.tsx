import { EMAIL, PHONE_DISPLAY } from "@/lib/whatsapp";
import { QuoteForm } from "./quote-form";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-card/60">
      <div className="container-shell grid gap-12 py-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:py-20">
        <div>
          <p className="font-display text-lg font-bold tracking-[0.2em] uppercase">
            Asterisk Construction
          </p>
          <p className="mt-2 text-sm text-accent">Building Africa&apos;s Future, Today.</p>

          <dl className="mt-8 grid gap-3 text-sm">
            <div className="flex flex-wrap gap-2">
              <dt className="text-muted-foreground">Email:</dt>
              <dd>
                <a href={`mailto:${EMAIL}`} className="break-all hover:text-accent">
                  {EMAIL}
                </a>
              </dd>
            </div>
            <div className="flex flex-wrap gap-2">
              <dt className="text-muted-foreground">Phone:</dt>
              <dd>
                <a href="tel:+254722112807" className="hover:text-accent">
                  {PHONE_DISPLAY}
                </a>
              </dd>
            </div>
            <div className="flex flex-wrap gap-2">
              <dt className="text-muted-foreground">Location:</dt>
              <dd>Nairobi, Kenya</dd>
            </div>
          </dl>

          <div className="mt-8">
            <p className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
              Industry benchmarks
            </p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <a
                href="https://www.integrum.co.ke"
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent"
              >
                www.integrum.co.ke
              </a>
              <a
                href="https://www.rickfes.co.ke"
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent"
              >
                www.rickfes.co.ke
              </a>
            </div>
          </div>
        </div>

        <div className="border border-border bg-background p-6 sm:p-8">
          <p className="eyebrow">Quick WhatsApp Quotation</p>
          <div className="mt-6">
            <QuoteForm compact />
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-shell flex flex-col gap-2 py-6 pb-24 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:pb-6">
          <p>© 2026 Asterisk Construction. All rights reserved.</p>
          <p>Design · Engineering · Turnkey Construction</p>
        </div>
      </div>
    </footer>
  );
}
