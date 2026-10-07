import { useEffect, useRef, useState } from "react";
import heroImage from "@/assets/hero-site.jpg";
import { whatsappLink } from "@/lib/whatsapp";
import { WaIcon } from "./wa-icon";

const metrics = [
  { value: 100, suffix: "+", label: "Completed projects" },
  { value: 6, suffix: "-Year", label: "Avg ROI" },
  { value: 0, suffix: "Pan-Africa", label: "Operations" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [shown, setShown] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / 1400, 1);
          setShown(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className="font-display text-3xl font-bold text-accent sm:text-4xl xl:text-5xl">
      {value > 0 ? shown : null}
      {suffix}
    </span>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <img
        src={heroImage}
        alt="Asterisk Construction high-rise project at dusk in Nairobi"
        width={1920}
        height={1200}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
        aria-hidden="true"
      />

      <div className="container-shell flex min-h-[92vh] flex-col justify-end pt-32 pb-14 lg:pt-40 lg:pb-20">
        <p className="eyebrow">Design &amp; Build · Nairobi, Kenya</p>
        <h1 className="text-fluid-hero mt-5 max-w-[22ch] font-bold">
          Building Africa&apos;s Future, Today.
        </h1>
        <p className="text-fluid-body mt-6 max-w-[62ch] text-muted-foreground">
          Sustainable, high-end infrastructure, residential, and commercial developments across
          Kenya and Pan-Africa.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-base btn-primary">
            <WaIcon className="h-4 w-4" />
            Request Quote via WhatsApp
          </a>
          <a href="#projects" className="btn-base btn-outline">
            View Projects
          </a>
        </div>

        <dl data-reveal className="mt-14 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
          {metrics.map((m) => (
            <div key={m.label} className="bg-card/80 px-6 py-7">
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <Counter value={m.value} suffix={m.suffix} />
                <span className="mt-2 block text-xs tracking-[0.22em] uppercase text-muted-foreground">
                  {m.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
