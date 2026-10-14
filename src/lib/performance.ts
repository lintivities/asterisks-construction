/**
 * Mobile and hardware-capability detection utilities
 * to guarantee 60fps performance on budget / low-end mobile devices.
 */

export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(pointer: coarse)").matches
  );
}

export function isLowEndDevice(): boolean {
  if (typeof window === "undefined") return false;

  // 1. Reduced motion preference
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 2. Low CPU cores (4 cores or fewer typical for entry-level mobile chips)
  const lowCores =
    typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 4;

  // 3. Low RAM (4GB or less)
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };
  const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;

  // 4. Data saver or slow connection
  const slowNet =
    nav.connection &&
    (nav.connection.saveData ||
      nav.connection.effectiveType === "2g" ||
      nav.connection.effectiveType === "3g");

  return prefersReducedMotion || (lowCores && lowMemory) || Boolean(slowNet);
}

export function getOptimalDpr(): number {
  if (typeof window === "undefined") return 1;
  const rawDpr = window.devicePixelRatio || 1;
  if (isTouchDevice() || isLowEndDevice() || window.innerWidth < 1024) {
    return Math.min(rawDpr, 1.25);
  }
  return Math.min(rawDpr, 2.0);
}
