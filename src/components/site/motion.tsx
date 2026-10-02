import { useEffect } from "react";

/** Minimal motion: Lenis weighted scroll + simple 0.3s fade-up on [data-reveal]. */
export function Motion() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    const onScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => window.removeEventListener("scroll", onScroll);
    }

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    els.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(12px)";
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.style.transition = "opacity .3s ease-out, transform .3s ease-out";
          el.style.opacity = "1";
          el.style.transform = "";
          io.unobserve(el);
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));

    let destroy = () => {};
    import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      let id = 0;
      const raf = (t: number) => {
        lenis.raf(t);
        id = requestAnimationFrame(raf);
      };
      id = requestAnimationFrame(raf);
      const click = (ev: MouseEvent) => {
        const a = (ev.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
        const el = a && document.querySelector(a.getAttribute("href")!);
        if (el) {
          ev.preventDefault();
          lenis.scrollTo(el as HTMLElement, { offset: -70 });
        }
      };
      document.addEventListener("click", click);
      destroy = () => {
        cancelAnimationFrame(id);
        lenis.destroy();
        document.removeEventListener("click", click);
      };
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      destroy();
    };
  }, []);
  return null;
}
