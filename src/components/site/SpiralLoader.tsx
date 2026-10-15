import React, { useEffect, useState } from "react";

interface SpiralLoaderProps {
  /**
   * Minimum display duration in ms so the transition feels intentional and never flashes.
   * Defaults to 1200ms.
   */
  minDuration?: number;
  /**
   * Maximum fallback timeout in ms so user is never stuck if an asset hangs.
   * Defaults to 3200ms.
   */
  maxTimeout?: number;
}

/**
 * SpiralLoader
 * Minimal spiral loading screen with zero AI jargon — purely the elegant mathematical spiral spinner.
 * Holds until critical page textures, fonts, and DOM readiness are confirmed, then dissolves smoothly.
 */
export function SpiralLoader({ minDuration = 1200, maxTimeout = 3200 }: SpiralLoaderProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // 1. Lock scrolling while preloader is active to avoid initial scroll jump
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const mountTime = performance.now();
    let isDismissed = false;

    // 2. Pre-warm key visual assets into browser cache while spinner spins
    const criticalAssets = [
      "/building-background.jpg",
      "/master-parchment-front.png",
      "/paper-front.jpg",
      "/paper-back.jpg",
      "/deckle-alpha-mask.png",
    ];

    criticalAssets.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const finish = () => {
      if (isDismissed) return;
      isDismissed = true;

      const elapsed = performance.now() - mountTime;
      const remainingTime = Math.max(0, minDuration - elapsed);

      setTimeout(() => {
        setIsExiting(true);
        // Restore scrolling as fade-out begins
        document.body.style.overflow = originalOverflow || "";

        // Trigger resize event to ensure 3D canvas and layout dimensions sync
        window.dispatchEvent(new Event("resize"));

        setTimeout(() => {
          setIsMounted(false);
          window.dispatchEvent(new Event("resize"));
        }, 500);
      }, remainingTime);
    };

    // 3. Check page readiness (window load, document ready, fonts ready)
    const checkReady = () => {
      if (document.readyState === "complete") {
        if ("fonts" in document) {
          document.fonts.ready.then(finish).catch(finish);
        } else {
          finish();
        }
      } else {
        window.addEventListener("load", finish, { once: true });
      }
    };

    checkReady();

    // 4. Maximum safety timeout
    const safetyTimer = setTimeout(finish, maxTimeout);

    return () => {
      clearTimeout(safetyTimer);
      document.body.style.overflow = originalOverflow || "";
      window.removeEventListener("load", finish);
    };
  }, [minDuration, maxTimeout]);

  if (!isMounted) return null;

  return (
    <div
      id="site-spiral-loader"
      aria-label="Loading page"
      role="status"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#0d1520] select-none transition-all duration-500 ease-out ${
        isExiting ? "opacity-0 pointer-events-none scale-[0.98]" : "opacity-100 pointer-events-auto scale-100"
      }`}
    >
      <style>{`
        @keyframes spiral-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes spiral-pulse {
          0%, 100% {
            opacity: 0.85;
            filter: drop-shadow(0 0 12px rgba(200, 90, 50, 0.45));
          }
          50% {
            opacity: 1;
            filter: drop-shadow(0 0 24px rgba(255, 142, 90, 0.75));
          }
        }
        .spiral-spinner-svg {
          animation: spiral-spin 1.25s linear infinite;
          transform-origin: 50px 50px;
        }
        .spiral-spinner-container {
          animation: spiral-pulse 2.2s ease-in-out infinite;
        }
      `}</style>

      <div className="relative flex items-center justify-center">
        {/* Soft Ambient Radial Glow */}
        <div
          className="absolute -inset-10 rounded-full pointer-events-none opacity-40 blur-2xl"
          style={{
            background: "radial-gradient(circle, rgba(200, 90, 50, 0.45) 0%, rgba(13, 21, 32, 0) 70%)",
          }}
          aria-hidden="true"
        />

        {/* Minimal Spiral Spinner */}
        <div className="spiral-spinner-container relative flex items-center justify-center">
          <svg
            className="spiral-spinner-svg w-16 h-16 sm:w-20 sm:h-20"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="spiral-stroke-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c85a32" stopOpacity="0.25" />
                <stop offset="45%" stopColor="#c85a32" stopOpacity="0.85" />
                <stop offset="85%" stopColor="#ff8e5a" stopOpacity="1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
              </linearGradient>
              <filter id="spiral-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#ff8e5a" floodOpacity="0.6" />
              </filter>
            </defs>

            {/* Minimal Outer Architectural Orientation Ring */}
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1"
              strokeDasharray="2 4"
            />

            {/* Archimedean Spiral Path */}
            <path
              d="M 53.00 50.00 L 53.26 50.34 L 53.47 50.74 L 53.61 51.17 L 53.70 51.65 L 53.72 52.15 L 53.67 52.67 L 53.56 53.20 L 53.36 53.73 L 53.09 54.26 L 52.75 54.77 L 52.33 55.24 L 51.85 55.68 L 51.29 56.08 L 50.67 56.41 L 50.00 56.68 L 49.28 56.87 L 48.51 56.99 L 47.72 57.01 L 46.91 56.95 L 46.08 56.79 L 45.26 56.53 L 44.45 56.16 L 43.67 55.70 L 42.92 55.14 L 42.22 54.49 L 41.59 53.74 L 41.03 52.91 L 40.55 52.01 L 40.17 51.03 L 39.89 50.00 L 39.72 48.92 L 39.67 47.80 L 39.74 46.67 L 39.94 45.52 L 40.27 44.38 L 40.73 43.27 L 41.32 42.19 L 42.04 41.16 L 42.88 40.19 L 43.83 39.31 L 44.89 38.52 L 46.05 37.84 L 47.30 37.28 L 48.62 36.84 L 50.00 36.55 L 51.43 36.40 L 52.89 36.41 L 54.36 36.58 L 55.83 36.91 L 57.27 37.40 L 58.68 38.05 L 60.03 38.86 L 61.30 39.82 L 62.48 40.93 L 63.55 42.18 L 64.49 43.55 L 65.29 45.03 L 65.94 46.61 L 66.43 48.27 L 66.73 50.00 L 66.86 51.77 L 66.79 53.57 L 66.53 55.37 L 66.08 57.16 L 65.43 58.91 L 64.59 60.60 L 63.56 62.21 L 62.36 63.72 L 60.98 65.12 L 59.45 66.37 L 57.78 67.46 L 55.97 68.39 L 54.06 69.12 L 52.07 69.65 L 50.00 69.98 L 47.89 70.08 L 45.76 69.96 L 43.63 69.61 L 41.53 69.03 L 39.47 68.23 L 37.50 67.20 L 35.63 65.96 L 33.88 64.52 L 32.28 62.88 L 30.84 61.06 L 29.60 59.08 L 28.56 56.97 L 27.74 54.73 L 27.15 52.40 L 26.81 50.00 L 26.73 47.55 L 26.90 45.09 L 27.34 42.64 L 28.04 40.22 L 29.00 37.87 L 30.21 35.62 L 31.66 33.49 L 33.35 31.50 L 35.25 29.69 L 37.34 28.08 L 39.62 26.68 L 42.05 25.52 L 44.61 24.62 L 47.27 23.98 L 50.00 23.63 L 52.78 23.56 L 55.57 23.79 L 58.35 24.32 L 61.07 25.14 L 63.71 26.25 L 66.25 27.64 L 68.63 29.30 L 70.85 31.22 L 72.87 33.38 L 74.67 35.76 L 76.21 38.33 L 77.49 41.07 L 78.48 43.95 L 79.16 46.93 L 79.53 50.00 L 79.58 53.11 L 79.30 56.23 L 78.69 59.32 L 77.75 62.35 L 76.48 65.29 L 74.91 68.10 L 73.04 70.74 L 70.88 73.19 L 68.47 75.42 L 65.81 77.39 L 62.95 79.09 L 59.90 80.48 L 56.71 81.55 L 53.39 82.29 L 50.00 82.67 L 46.56 82.70 L 43.12 82.37 L 39.71 81.67 L 36.37 80.61 L 33.14 79.20 L 30.06 77.45 L 27.16 75.37 L 24.48 72.98 L 22.05 70.31 L 19.90 67.38 L 18.06 64.22 L 16.55 60.87 L 15.39 57.36 L 14.61 53.72 L 14.20 50.00 L 14.19 46.24 L 14.58 42.47 L 15.36 38.75 L 16.54 35.10 L 18.10 31.58 L 20.03 28.23 L 22.32 25.07 L 24.94 22.16 L 27.86 19.53 L 31.06 17.20 L 34.51 15.21 L 38.17 13.59 L 42.00 12.35 L 45.95 11.51 L 50.00 11.09 L 54.09 11.10 L 58.17 11.54 L 62.21 12.41 L 66.16 13.70 L 69.97 15.41 L 73.60 17.52 L 77.00 20.01 L 80.14 22.86 L 82.98 26.04 L 85.48 29.51 L 87.62 33.25 L 89.36 37.21 L 90.68 41.35 L 91.57 45.63 L 92.00 50.00"
              stroke="url(#spiral-stroke-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#spiral-glow)"
            />

            {/* Minimal Central Pivot Pin */}
            <circle cx="50" cy="50" r="1.75" fill="#ff8e5a" />
          </svg>
        </div>
      </div>
    </div>
  );
}
