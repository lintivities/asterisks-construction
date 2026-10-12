import React, { useEffect, useRef } from "react";

export function ScrollableBuildingBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let ticking = false;

    const updatePosition = () => {
      const container = containerRef.current;
      const img = imgRef.current;
      if (!container || !img) return;

      const vW = window.innerWidth;
      const vH = window.innerHeight;

      // Ensure the image covers the viewport with ample vertical travel distance
      // Aspect ratio of building-background.jpg is 523w / 1024h
      const minTravelH = vH * 1.5;
      const scale = Math.max(vW / 523, minTravelH / 1024);
      const imgW = Math.round(523 * scale);
      const imgH = Math.round(1024 * scale);

      img.style.width = `${imgW}px`;
      img.style.height = `${imgH}px`;

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - vH);
      const sTop = window.pageYOffset || document.documentElement.scrollTop || 0;
      const progress = Math.min(1.0, Math.max(0.0, sTop / maxScroll));

      const travelDist = imgH - vH;
      const currentY = -progress * travelDist;
      const currentX = (vW - imgW) / 2;

      img.style.transform = `translate3d(${Math.round(currentX)}px, ${Math.round(currentY)}px, 0)`;
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updatePosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    // Initial positioning
    updatePosition();

    // Recheck after initial render in case DOM height adjusts
    const timer = setTimeout(updatePosition, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="scrollable-building-bg-container"
      className="fixed inset-0 pointer-events-none -z-50 overflow-hidden bg-[#0d1520]"
      aria-hidden="true"
    >
      <img
        ref={imgRef}
        src="/building-background.jpg"
        alt=""
        className="absolute top-0 left-0 max-w-none will-change-transform block"
        style={{
          transformOrigin: "top left",
        }}
      />
    </div>
  );
}
