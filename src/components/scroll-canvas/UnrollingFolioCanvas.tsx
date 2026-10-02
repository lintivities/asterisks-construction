import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "./shaders";
import {
  createPixelPerfectFolioCanvas,
  ImageAssets,
} from "./texture-generator";

import heroImg from "@/assets/hero-site.jpg";
import towersImg from "@/assets/project-towers.jpg";
import resortImg from "@/assets/project-resort.jpg";
import bustaniImg from "@/assets/project-bustani.jpg";
import villaImg from "@/assets/project-villa.jpg";

function preloadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(img);
    img.src = src;
  });
}

export function UnrollingFolioCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    /* ==========================================================================
       THREE.JS SETUP & LIGHTING
       ========================================================================== */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasElement,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1.0); // Solid pure white viewport background
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(
      38,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.0);
    camera.lookAt(0, 0, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.5);
    keyLight.position.set(3.0, 5.0, 4.5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xf8fafc, 0.25);
    fillLight.position.set(-3.0, -2.5, 3.5);
    scene.add(fillLight);

    /* ==========================================================================
       CRUMPLED PAPER TEXTURE LOADING
       ========================================================================== */
    const textureLoader = new THREE.TextureLoader();

    const backPaperTexture = textureLoader.load(
      "/assets/textures/paper-back.jpg"
    );
    backPaperTexture.wrapS = THREE.ClampToEdgeWrapping;
    backPaperTexture.wrapT = THREE.ClampToEdgeWrapping;
    backPaperTexture.generateMipmaps = true;
    backPaperTexture.minFilter = THREE.LinearMipmapLinearFilter;
    backPaperTexture.magFilter = THREE.LinearFilter;

    const frontPaperTexture = textureLoader.load(
      "/assets/textures/paper-front.jpg"
    );
    frontPaperTexture.wrapS = THREE.ClampToEdgeWrapping;
    frontPaperTexture.wrapT = THREE.ClampToEdgeWrapping;
    frontPaperTexture.generateMipmaps = true;
    frontPaperTexture.minFilter = THREE.LinearMipmapLinearFilter;
    frontPaperTexture.magFilter = THREE.LinearFilter;

    /* ==========================================================================
       SHADER MATERIAL: TOP-PINNED ARCHIMEDEAN SPIRAL
       ========================================================================== */
    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      uniforms: {
        uProgress: { value: 0.0 },
        uPlaneHeight: { value: 1.0 },
        uPlaneWidth: { value: 1.0 },
        uVisibleHeight: { value: 1.0 },
        uBaseRadius: { value: 0.28 },
        uSpiralFactor: { value: 0.024 },
        uContentTexture: { value: null },
        uFrontTexture: { value: frontPaperTexture },
        uBackTexture: { value: backPaperTexture },
        uLightPos: { value: new THREE.Vector3(3.0, 5.0, 4.5) },
        uLightColor: { value: new THREE.Vector3(0.4, 0.4, 0.4) },
        uAmbientColor: { value: new THREE.Vector3(0.68, 0.68, 0.7) },
      },
    });

    let planeWidth = 1;
    let planeHeight = 1;
    let contentTexture: THREE.CanvasTexture | null = null;
    let scrollMesh: THREE.Mesh | null = null;
    let loadedImages: ImageAssets = {};

    function updateDimensions() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Calculate exact visible viewport boundaries at z = 0
      const vFovRad = (camera.fov * Math.PI) / 180;
      const visibleHeight = 2 * Math.tan(vFovRad / 2) * camera.position.z;
      const visibleWidth = visibleHeight * camera.aspect;

      planeWidth = visibleWidth;
      planeHeight = visibleHeight * 4.6; // Extended plane height to feed full website

      if (scrollMesh) {
        scrollMesh.geometry.dispose();
        scrollMesh.geometry = new THREE.PlaneGeometry(
          planeWidth,
          planeHeight,
          160,
          640
        );
      } else {
        const geometry = new THREE.PlaneGeometry(
          planeWidth,
          planeHeight,
          160,
          640
        );
        scrollMesh = new THREE.Mesh(geometry, shaderMaterial);
        scene.add(scrollMesh);
      }

      const uniforms = shaderMaterial.uniforms;
      if (uniforms["uPlaneWidth"]) uniforms["uPlaneWidth"].value = planeWidth;
      if (uniforms["uPlaneHeight"]) uniforms["uPlaneHeight"].value = planeHeight;
      if (uniforms["uVisibleHeight"])
        uniforms["uVisibleHeight"].value = visibleHeight;
      if (uniforms["uBaseRadius"])
        uniforms["uBaseRadius"].value = visibleHeight * 0.055;

      // Regenerate offscreen architectural folio canvas texture
      const texW = 2048;
      const texH = 8600;
      if (contentTexture) contentTexture.dispose();
      contentTexture = createPixelPerfectFolioCanvas(
        texW,
        texH,
        loadedImages
      );
      if (uniforms["uContentTexture"]) {
        uniforms["uContentTexture"].value = contentTexture;
      }
    }

    // Preload project & hero photography asynchronously
    let isDisposed = false;
    Promise.all([
      preloadImage(heroImg),
      preloadImage(towersImg),
      preloadImage(resortImg),
      preloadImage(bustaniImg),
      preloadImage(villaImg),
    ]).then(([hero, towers, resort, bustani, villa]) => {
      if (isDisposed) return;
      loadedImages = { hero, towers, resort, bustani, villa };
      const texW = 2048;
      const texH = 8600;
      if (contentTexture) contentTexture.dispose();
      contentTexture = createPixelPerfectFolioCanvas(
        texW,
        texH,
        loadedImages
      );
      if (shaderMaterial.uniforms["uContentTexture"]) {
        shaderMaterial.uniforms["uContentTexture"].value = contentTexture;
      }
    });

    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    /* ==========================================================================
       SCROLL ENGINE: DEFAULT TOUCHPAD / WHEEL SCROLL AXIS
       - Scrolling upwards on touchpad / wheel down (e.deltaY > 0) scrolls page DOWN
       - Top fold is pinned at Y_pin
       ========================================================================== */
    let targetProgress = 0.0;
    let currentProgress = 0.0;
    const lerpFactor = 0.12;

    let isProgrammaticScroll = false;

    function syncWindowScrollFromProgress() {
      isProgrammaticScroll = true;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        const targetY = targetProgress * maxScroll;
        window.scrollTo({ top: targetY, behavior: "instant" });
      }
      requestAnimationFrame(() => {
        isProgrammaticScroll = false;
      });
    }

    // 1. Mouse Wheel / Touchpad: DEFAULT PAGE SCROLLING AXIS
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Upward touchpad swipe / mouse wheel roll (e.deltaY > 0) scrolls down the page
      const delta = e.deltaY * 0.00035;
      targetProgress = Math.min(1.0, Math.max(0.0, targetProgress + delta));
      syncWindowScrollFromProgress();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    // 2. Click & Drag on Screen (Swiping up advances downward)
    let isDragging = false;
    let dragStartY = 0;
    let progressAtDragStart = 0;

    const handleMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("#folio-progress-bar")) return;
      isDragging = true;
      dragStartY = e.clientY;
      progressAtDragStart = targetProgress;
      document.body.style.cursor = "grabbing";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      // Dragging upward (e.clientY < dragStartY) pulls next content into view
      const deltaY = dragStartY - e.clientY;
      const progressDelta = deltaY / (window.innerHeight * 2.5);
      targetProgress = Math.min(
        1.0,
        Math.max(0.0, progressAtDragStart + progressDelta)
      );
      syncWindowScrollFromProgress();
    };

    const handleMouseUp = () => {
      if (isDragging) {
        isDragging = false;
        document.body.style.cursor = "grab";
      }
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // 3. Touch Gestures (Mobile / Tablet)
    let touchStartY = 0;
    let touchProgressStart = 0;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        touchStartY = touch.clientY;
        touchProgressStart = targetProgress;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        // Swiping upward (touch.clientY < touchStartY) pulls page down
        const deltaY = touchStartY - touch.clientY;
        const progressDelta = deltaY / (window.innerHeight * 2.5);
        targetProgress = Math.min(
          1.0,
          Math.max(0.0, touchProgressStart + progressDelta)
        );
        syncWindowScrollFromProgress();
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    // 4. Native Browser Scrollbar Synchronization
    const handleScroll = () => {
      if (isProgrammaticScroll) return;
      const docEl = document.documentElement;
      const body = document.body;
      const scrollTop =
        window.pageYOffset || docEl.scrollTop || body.scrollTop || 0;
      const scrollHeight = Math.max(docEl.scrollHeight, body.scrollHeight);
      const clientHeight = docEl.clientHeight || window.innerHeight;
      const maxScroll = scrollHeight - clientHeight;
      if (maxScroll > 0) {
        targetProgress = Math.min(1.0, Math.max(0.0, scrollTop / maxScroll));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // 5. Keyboard Navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "ArrowDown" ||
        e.key === "PageDown" ||
        e.key === " "
      ) {
        targetProgress = Math.min(1.0, targetProgress + 0.05);
        syncWindowScrollFromProgress();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        targetProgress = Math.max(0.0, targetProgress - 0.05);
        syncWindowScrollFromProgress();
      } else if (e.key === "Home") {
        targetProgress = 0.0;
        syncWindowScrollFromProgress();
      } else if (e.key === "End") {
        targetProgress = 1.0;
        syncWindowScrollFromProgress();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // 6. Interactive Bottom Scrubber
    const handleScrubberClick = (e: MouseEvent) => {
      const bar = progressBarRef.current;
      if (!bar) return;
      const rect = bar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      targetProgress = Math.min(1.0, Math.max(0.0, clickX / rect.width));
      syncWindowScrollFromProgress();
    };

    const progressBarEl = progressBarRef.current;
    if (progressBarEl) {
      progressBarEl.addEventListener("click", handleScrubberClick);
    }

    // Animation & Render Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      currentProgress += (targetProgress - currentProgress) * lerpFactor;
      if (shaderMaterial.uniforms["uProgress"]) {
        shaderMaterial.uniforms["uProgress"].value = currentProgress;
      }

      // Update bottom progress bar fill
      if (progressFillRef.current) {
        const percent = Math.min(100, Math.max(0, currentProgress * 100));
        progressFillRef.current.style.width = `${percent.toFixed(1)}%`;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
      if (progressBarEl) {
        progressBarEl.removeEventListener("click", handleScrubberClick);
      }

      if (scrollMesh) {
        scrollMesh.geometry.dispose();
      }
      shaderMaterial.dispose();
      frontPaperTexture.dispose();
      backPaperTexture.dispose();
      if (contentTexture) contentTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative w-full min-h-[420vh] bg-white cursor-grab active:cursor-grabbing select-none"
    >
      {/* Fixed Full-Screen WebGL Canvas */}
      <canvas
        ref={canvasRef}
        id="webgl-canvas"
        className="fixed inset-0 w-screen h-screen z-10 block bg-white"
      />

      {/* Native Scroll Spacer Runway */}
      <div className="absolute inset-0 w-full h-[420vh] pointer-events-none z-20" />

      {/* Minimal Bottom Scrubber Line with Warm Terracotta Fill */}
      <div
        ref={progressBarRef}
        id="folio-progress-bar"
        title="Click or drag to scrub architectural folio"
        className="fixed bottom-0 left-0 w-screen h-[4px] bg-black/10 z-50 cursor-pointer"
      >
        <div
          ref={progressFillRef}
          className="h-full w-[0%] bg-[#c85a32] transition-[width] duration-75 ease-linear"
        />
      </div>
    </div>
  );
}
