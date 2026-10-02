import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "./shaders";
import { createAsterisksFolioCanvas } from "./texture-generator";

export function UnrollingFolioCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !canvasRef.current || !containerRef.current) return;

    const canvasElement = canvasRef.current;

    // Renderer setup with ACESFilmic tone mapping
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasElement,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1.0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // Perspective Camera: FOV 38deg for natural architectural perspective
    const camera = new THREE.PerspectiveCamera(
      38,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.0);
    camera.lookAt(0, 0, 0);

    // Studio Lighting calibrated to avoid blowing out paper crease shadows
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.5);
    keyLight.position.set(3.0, 5.0, 4.5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xf8fafc, 0.25);
    fillLight.position.set(-3.0, -2.5, 3.5);
    scene.add(fillLight);

    // Load Crumpled Paper Textures
    const textureLoader = new THREE.TextureLoader();
    const frontPaperTexture = textureLoader.load("/assets/textures/paper-front.jpg");
    frontPaperTexture.wrapS = THREE.ClampToEdgeWrapping;
    frontPaperTexture.wrapT = THREE.ClampToEdgeWrapping;
    frontPaperTexture.generateMipmaps = true;
    frontPaperTexture.minFilter = THREE.LinearMipmapLinearFilter;
    frontPaperTexture.magFilter = THREE.LinearFilter;

    const backPaperTexture = textureLoader.load("/assets/textures/paper-back.jpg");
    backPaperTexture.wrapS = THREE.ClampToEdgeWrapping;
    backPaperTexture.wrapT = THREE.ClampToEdgeWrapping;
    backPaperTexture.generateMipmaps = true;
    backPaperTexture.minFilter = THREE.LinearMipmapLinearFilter;
    backPaperTexture.magFilter = THREE.LinearFilter;

    // Generate High-Res Content Canvas
    const contentTexture = createAsterisksFolioCanvas(2048, 8192);

    let planeWidth = 1;
    let planeHeight = 1;
    let visibleHeight = 1;

    // Shader Material with Pinned Top-Roll Physics
    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      uniforms: {
        uProgress: { value: 0.02 },
        uPlaneHeight: { value: 1.0 },
        uPlaneWidth: { value: 1.0 },
        uVisibleHeight: { value: 1.0 },
        uBaseRadius: { value: 0.28 },
        uSpiralFactor: { value: 0.022 },
        uContentTexture: { value: contentTexture },
        uFrontTexture: { value: frontPaperTexture },
        uBackTexture: { value: backPaperTexture },
        uLightPos: { value: new THREE.Vector3(3.0, 5.0, 4.5) },
        uLightColor: { value: new THREE.Vector3(0.4, 0.4, 0.4) },
        uAmbientColor: { value: new THREE.Vector3(0.68, 0.68, 0.7) },
      },
    });

    let scrollMesh: THREE.Mesh | null = null;

    function updateDimensions() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Calculate visible viewport height at z = 0
      const vFovRad = (camera.fov * Math.PI) / 180;
      visibleHeight = 2 * Math.tan(vFovRad / 2) * camera.position.z;
      const visibleWidth = visibleHeight * camera.aspect;

      // Full screen width, with document height matching the 4:1 folio aspect
      planeWidth = visibleWidth;
      // Document is 4 times the screen height for multi-section editorial depth
      planeHeight = visibleHeight * 4.0;

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
      if (uniforms['uPlaneWidth']) uniforms['uPlaneWidth'].value = planeWidth;
      if (uniforms['uPlaneHeight']) uniforms['uPlaneHeight'].value = planeHeight;
      if (uniforms['uVisibleHeight']) uniforms['uVisibleHeight'].value = visibleHeight;
      if (uniforms['uBaseRadius']) uniforms['uBaseRadius'].value = visibleHeight * 0.055;
    }

    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    /* ==========================================================================
       MULTI-MODAL SCROLL ENGINE (INVERTED NATURAL SCROLL AXIS)
       ========================================================================== */

    let targetProgress = 0.02;
    let currentProgress = 0.02;
    const lerpFactor = 0.12;

    let isProgrammaticScroll = false;

    function syncWindowScrollFromProgress() {
      isProgrammaticScroll = true;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        const targetY = ((targetProgress - 0.02) / 0.98) * maxScroll;
        window.scrollTo({ top: targetY, behavior: "instant" });
      }
      requestAnimationFrame(() => {
        isProgrammaticScroll = false;
      });
    }

    // 1. Inverted Mouse Wheel: scrolling wheel down advances folio downward
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Inverted axis: -e.deltaY
      const delta = -e.deltaY * 0.00035;
      targetProgress = Math.min(1.0, Math.max(0.02, targetProgress + delta));
      syncWindowScrollFromProgress();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    // 2. Click & Drag: dragging down pulls paper down (unrolls)
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
      const deltaY = e.clientY - dragStartY;
      const progressDelta = deltaY / (window.innerHeight * 1.8);
      targetProgress = Math.min(
        1.0,
        Math.max(0.02, progressAtDragStart + progressDelta)
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

    // 3. Touch Drag (Mobile / Tablet)
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
        const deltaY = touch.clientY - touchStartY;
        const progressDelta = deltaY / (window.innerHeight * 1.8);
        targetProgress = Math.min(
          1.0,
          Math.max(0.02, touchProgressStart + progressDelta)
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
        const frac = Math.min(1.0, Math.max(0.0, scrollTop / maxScroll));
        targetProgress = 0.02 + frac * 0.98;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // 5. Keyboard Navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        targetProgress = Math.min(1.0, targetProgress + 0.06);
        syncWindowScrollFromProgress();
      } else if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        targetProgress = Math.max(0.02, targetProgress - 0.06);
        syncWindowScrollFromProgress();
      } else if (e.key === "Home") {
        targetProgress = 0.02;
        syncWindowScrollFromProgress();
      } else if (e.key === "End") {
        targetProgress = 1.0;
        syncWindowScrollFromProgress();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Animation & Render Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      currentProgress += (targetProgress - currentProgress) * lerpFactor;
      if (shaderMaterial.uniforms['uProgress']) {
        shaderMaterial.uniforms['uProgress'].value = currentProgress;
      }

      // Update bottom progress scrubber
      if (progressFillRef.current) {
        const percent = Math.min(100, Math.max(0, currentProgress * 100));
        progressFillRef.current.style.width = `${percent.toFixed(1)}%`;
      }

      // Subtle ambient breathing motion
      const t = clock.getElapsedTime();
      if (scrollMesh) {
        scrollMesh.rotation.y = Math.sin(t * 0.4) * 0.005;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup lifecycle
    return () => {
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

      renderer.dispose();
      shaderMaterial.dispose();
      contentTexture.dispose();
      frontPaperTexture.dispose();
      backPaperTexture.dispose();
      if (scrollMesh) scrollMesh.geometry.dispose();
    };
  }, [isClient]);

  return (
    <div ref={containerRef} className="relative w-full bg-white select-none">
      {/* Fixed WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-screen h-screen z-1 block bg-white pointer-events-none"
      />

      {/* Runway Spacer for Natural Scrolling */}
      <div className="w-full h-[380vh] pointer-events-none" />

      {/* Minimal Bottom Scrubber */}
      <div
        id="folio-progress-bar"
        className="fixed bottom-0 left-0 w-screen h-[3px] bg-black/5 z-50 cursor-pointer pointer-events-auto"
      >
        <div
          ref={progressFillRef}
          className="h-full bg-slate-900 transition-[width] duration-75 ease-out"
          style={{ width: "2%" }}
        />
      </div>
    </div>
  );
}
