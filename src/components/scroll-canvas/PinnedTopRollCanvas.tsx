import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * 3D Pinned Archimedean Spiral Roll in Three.js
 * - Constrained strictly to the width and position of #paper-canvas-folio (ZERO viewport overflow)
 * - Uses authentic torn paper texture and ragged deckled edge alpha masks from public/images.jpg
 * - Orthographic camera projection guaranteeing 1:1 pixel width alignment with zero perspective flare
 * - Thick, multi-turn spiral parchment roll with rich tactile relief and dynamic continuous rotation
 * - Sized and positioned dynamically with ResizeObserver to match the canvas folio perfectly
 */

const rollVertexShader = /* glsl */ `
  uniform float uProgress;
  uniform float uContainerHeight;
  uniform float uBaseRadius;
  uniform float uSpiralFactor;

  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vAlpha;

  void main() {
    vUv = uv;

    // Anchor the top roll so its center sits comfortably inside the top of the container
    float topScreenY = uContainerHeight * 0.5;
    float Y_pin = topScreenY - (uBaseRadius * 1.15);

    // s represents distance along the coiled sheet
    float s = position.y - Y_pin;

    vec3 pos = position;
    vec3 n = normal;

    if (s >= 0.0) {
      // 3D Archimedean spiral coiled cylinder
      float uncurl = smoothstep(0.85, 1.0, uProgress);
      float R = mix(uBaseRadius + uSpiralFactor * s, uBaseRadius * 3.8, uncurl);

      // Continuous dynamic spin rotation as user scrolls (prominent visual spin)
      float scrollAngle = uProgress * 26.0;
      float theta = (s / R) + scrollAngle;

      float y_curl = Y_pin + sin(theta) * R;
      // 3D curl forward in Z
      float z_curl = (1.0 - cos(theta)) * R + 10.0;

      pos.y = mix(y_curl, position.y, uncurl);
      pos.z = mix(z_curl, 0.0, uncurl);

      // Normal rotated around X axis following cylinder curvature
      n = vec3(0.0, -sin(theta), cos(theta));
      vAlpha = 1.0;
    } else {
      // Flat lip extending slightly downwards into the page with soft gradient blend
      pos.z = 10.0 * (1.0 + s / 45.0);
      n = vec3(0.0, 0.0, 1.0);
      vAlpha = smoothstep(0.0, 40.0, 45.0 + s);
    }

    vPosition = (modelMatrix * vec4(pos, 1.0)).xyz;
    vNormal = normalize(normalMatrix * n);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const rollFragmentShader = /* glsl */ `
  uniform sampler2D uFrontTexture;
  uniform sampler2D uBackTexture;
  uniform vec3 uLightPos;
  uniform vec3 uLightColor;
  uniform vec3 uAmbientColor;

  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vAlpha;

  void main() {
    if (vAlpha <= 0.02) discard;

    vec3 L = normalize(uLightPos - vPosition);
    vec3 V = vec3(0.0, 0.0, 1.0);
    vec3 H = normalize(L + V);

    float diff = max(dot(vNormal, L), 0.0);
    float wrapDiff = max(0.0, (dot(vNormal, L) + 0.35) / 1.35);
    float spec = pow(max(dot(vNormal, H), 0.0), 20.0) * 0.04;
    vec3 totalLight = uAmbientColor + uLightColor * (diff * 0.45 + wrapDiff * 0.25) + vec3(spec);

    if (!gl_FrontFacing) {
      // Back underside interior of cylinder roll using public/paper-back.jpg
      vec2 backUv = vec2(1.0 - vUv.x, vUv.y);
      vec3 backPaper = texture2D(uBackTexture, backUv).rgb;
      // Soft interior cylinder depth shadowing
      backPaper *= 0.90;
      gl_FragColor = vec4(backPaper * totalLight, vAlpha);
      return;
    }

    // Front tactile surface of roll using public/paper-front.jpg - same texture as unfolded canvas
    vec3 frontPaper = texture2D(uFrontTexture, vUv).rgb;
    gl_FragColor = vec4(frontPaper * totalLight, vAlpha);
  }
`;

export function PinnedTopRollCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const wrapShieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true, // Transparent background so paper canvas underneath is visible
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();

    // Orthographic camera guarantees exact 1:1 pixel width alignment with zero side perspective overflow
    const camera = new THREE.OrthographicCamera(
      -500,
      500,
      100,
      -100,
      0.1,
      1000
    );
    camera.position.set(0, 0, 500);
    camera.lookAt(0, 0, 0);

    // Studio lighting calibrated to match the unfolded canvas brightness seamlessly
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.82);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.45);
    keyLight.position.set(300, 200, 350);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xfef3c7, 0.20);
    fillLight.position.set(-300, -100, 250);
    scene.add(fillLight);

    // Load authentic paper textures: master front matching unfolded canvas, back from public/paper-back.jpg
    const textureLoader = new THREE.TextureLoader();
    const backPaperTexture = textureLoader.load("/paper-back.jpg");
    backPaperTexture.wrapS = THREE.ClampToEdgeWrapping;
    backPaperTexture.wrapT = THREE.ClampToEdgeWrapping;

    const frontPaperTexture = textureLoader.load("/master-parchment-front.jpg");
    frontPaperTexture.wrapS = THREE.ClampToEdgeWrapping;
    frontPaperTexture.wrapT = THREE.ClampToEdgeWrapping;

    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader: rollVertexShader,
      fragmentShader: rollFragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: {
        uProgress: { value: 0.0 },
        uContainerHeight: { value: 180.0 },
        uBaseRadius: { value: 42.0 },
        uSpiralFactor: { value: 0.032 },
        uFrontTexture: { value: frontPaperTexture },
        uBackTexture: { value: backPaperTexture },
        uLightPos: { value: new THREE.Vector3(300, 180, 350) },
        uLightColor: { value: new THREE.Vector3(0.35, 0.35, 0.35) },
        uAmbientColor: { value: new THREE.Vector3(0.82, 0.82, 0.82) },
      },
    });

    let mesh: THREE.Mesh | null = null;

    function updateDimensions() {
      const paperEl = document.getElementById("paper-canvas-folio");
      if (!paperEl) return;

      const rect = paperEl.getBoundingClientRect();
      const canvasW = Math.max(300, rect.width);
      const canvasLeft = rect.left;
      const rollTop = Math.max(0, rect.top);
      // Container height accommodates the coil diameter + uncurling lip + shadow
      const containerH = Math.min(220, Math.max(160, Math.round(window.innerHeight * 0.22)));

      // Position the container DOM element EXACTLY at the left & width of #paper-canvas-folio
      if (containerRef.current) {
        containerRef.current.style.top = `${rollTop}px`;
        containerRef.current.style.left = `${canvasLeft}px`;
        containerRef.current.style.width = `${canvasW}px`;
        containerRef.current.style.height = `${containerH}px`;
      }

      // Proportional coil radius (~4.5% of width, bounded between 28px and 44px)
      const baseRadius = Math.max(28.0, Math.min(44.0, canvasW * 0.045));
      const foldLipY = Math.round(baseRadius * 2.3);

      // Position the opaque paper wrap shield behind the roll to completely occlude scrolling content under the fold
      if (wrapShieldRef.current) {
        wrapShieldRef.current.style.top = `${rollTop}px`;
        wrapShieldRef.current.style.left = `${canvasLeft}px`;
        wrapShieldRef.current.style.width = `${canvasW}px`;
        wrapShieldRef.current.style.height = `${foldLipY}px`;
      }

      // Position the contact shadow element to match the canvas folio precisely
      if (shadowRef.current) {
        shadowRef.current.style.top = `${rollTop}px`;
        shadowRef.current.style.left = `${canvasLeft}px`;
        shadowRef.current.style.width = `${canvasW}px`;
      }

      renderer.setSize(canvasW, containerH);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Configure orthographic camera frustum to match canvas dimensions in exact pixel units
      camera.left = -canvasW * 0.5;
      camera.right = canvasW * 0.5;
      camera.top = containerH * 0.5;
      camera.bottom = -containerH * 0.5;
      camera.updateProjectionMatrix();

      const topY = containerH * 0.5;
      const Y_pin = topY - (baseRadius * 1.15);

      const rollSheetLength = baseRadius * 7.2;
      const lipLength = 45.0;
      const totalH = rollSheetLength + lipLength;

      if (mesh) {
        mesh.geometry.dispose();
      }

      // Geometry width is EXACTLY canvasW — 100% matched to #paper-canvas-folio with zero side overlap
      const geometry = new THREE.PlaneGeometry(canvasW, totalH, 200, 320);
      geometry.translate(0, Y_pin + (rollSheetLength - lipLength) * 0.5, 0);

      mesh = new THREE.Mesh(geometry, shaderMaterial);
      mesh.position.set(0, 0, 0);
      scene.add(mesh);

      const uniforms = shaderMaterial.uniforms;
      if (uniforms["uContainerHeight"]) uniforms["uContainerHeight"].value = containerH;
      if (uniforms["uBaseRadius"]) uniforms["uBaseRadius"].value = baseRadius;
      if (uniforms["uLightPos"]) uniforms["uLightPos"].value.set(canvasW * 0.25, containerH * 0.8, 350.0);
    }

    window.addEventListener("resize", updateDimensions);

    // ResizeObserver on the paper canvas element to guarantee continuous 1:1 width sync
    let resizeObserver: ResizeObserver | null = null;
    const paperEl = document.getElementById("paper-canvas-folio");
    if (paperEl && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        updateDimensions();
      });
      resizeObserver.observe(paperEl);
    }

    updateDimensions();

    // Scroll progress driver (Tracks standard window scroll)
    let targetProgress = 0.0;
    let currentProgress = 0.0;

    const handleScroll = () => {
      const docEl = document.documentElement;
      const body = document.body;
      const scrollTop =
        window.pageYOffset || docEl.scrollTop || body.scrollTop || 0;
      const maxScroll =
        Math.max(docEl.scrollHeight, body.scrollHeight) - window.innerHeight;
      if (maxScroll > 0) {
        targetProgress = Math.min(1.0, Math.max(0.0, scrollTop / maxScroll));
      }

      // Update vertical position if paper folio moves relative to top
      const pEl = document.getElementById("paper-canvas-folio");
      if (pEl && containerRef.current && shadowRef.current) {
        const r = pEl.getBoundingClientRect();
        const rollTop = Math.max(0, r.top);
        containerRef.current.style.top = `${rollTop}px`;
        shadowRef.current.style.top = `${rollTop}px`;
        if (wrapShieldRef.current) {
          wrapShieldRef.current.style.top = `${rollTop}px`;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth momentum lerping
      currentProgress += (targetProgress - currentProgress) * 0.14;

      if (shaderMaterial.uniforms["uProgress"]) {
        shaderMaterial.uniforms["uProgress"].value = currentProgress;
      }

      // Update drop shadow opacity based on uncurl state
      if (shadowRef.current) {
        const shadowOpacity = Math.max(0, 1.0 - currentProgress * 0.95);
        shadowRef.current.style.opacity = `${shadowOpacity.toFixed(2)}`;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("scroll", handleScroll);
      if (resizeObserver) resizeObserver.disconnect();
      if (mesh) mesh.geometry.dispose();
      shaderMaterial.dispose();
      frontPaperTexture.dispose();
      backPaperTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      {/* Opaque Paper Wrap Shield: Physically occludes and wraps scrolling page content underneath the fold */}
      <div
        ref={wrapShieldRef}
        className="fixed pointer-events-none overflow-hidden"
        style={{
          zIndex: 35,
          backgroundColor: "#faf9f6",
          backgroundImage: "url('/paper-back.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          boxShadow: "0 16px 22px -4px rgba(0, 0, 0, 0.28)",
        }}
        aria-hidden="true"
      />

      {/* Pinned 3D Roll Canvas strictly constrained to #paper-canvas-folio */}
      <div
        ref={containerRef}
        className="fixed top-0 pointer-events-none z-40 overflow-hidden"
        style={{
          filter: "drop-shadow(0 20px 24px rgba(0, 0, 0, 0.22))",
        }}
        aria-hidden="true"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Deep Contact Shadow Exactly Matched to the Paper Canvas Width */}
      <div
        ref={shadowRef}
        className="fixed top-0 pointer-events-none z-30 transition-opacity duration-150 h-24"
        style={{
          background:
            "linear-gradient(to bottom, rgba(17, 24, 39, 0.38) 0%, rgba(17, 24, 39, 0.14) 45%, transparent 100%)",
        }}
        aria-hidden="true"
      />
    </>
  );
}
