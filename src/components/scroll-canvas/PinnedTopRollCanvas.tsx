import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * 3D Pinned Archimedean Spiral Roll in Three.js
 * - Constrained strictly to the width and position of #paper-canvas-folio (NO viewport overflow)
 * - Thick, multi-turn spiral parchment roll with rich tactile relief
 * - Spins and unrolls dynamically in real-time as the user scrolls
 * - Dual textures: front crumpled texture with directional studio lighting,
 *   interior back crumpled texture with cylinder depth shadowing.
 * - Sized and positioned dynamically with ResizeObserver to match the canvas perfectly.
 */

const rollVertexShader = /* glsl */ `
  uniform float uProgress;
  uniform float uVisibleHeight;
  uniform float uBaseRadius;
  uniform float uSpiralFactor;

  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vAlpha;

  void main() {
    vUv = uv;

    // Anchor the top roll so its center sits comfortably inside the top of the viewport
    float topScreenY = uVisibleHeight * 0.5;
    float Y_pin = topScreenY - (uBaseRadius * 1.05);

    // s represents distance along the coiled sheet
    float s = position.y - Y_pin;

    vec3 pos = position;
    vec3 n = normal;

    if (s >= 0.0) {
      // 3D Archimedean spiral coiled cylinder
      float uncurl = smoothstep(0.88, 1.0, uProgress);
      float R = mix(uBaseRadius + uSpiralFactor * s, uBaseRadius * 4.5, uncurl);

      // Continuous dynamic spin rotation as user scrolls (prominent visual spin)
      float scrollAngle = uProgress * 28.0;
      float theta = (s / R) + scrollAngle;

      float y_curl = Y_pin + sin(theta) * R;
      // Bring curl forward in Z so it pops dramatically in 3D
      float z_curl = (1.0 - cos(theta)) * R + 0.35;

      pos.y = mix(y_curl, position.y, uncurl);
      pos.z = mix(z_curl, 0.0, uncurl);

      // Normal rotated around X axis following cylinder curvature
      n = vec3(0.0, -sin(theta), cos(theta));
      vAlpha = 1.0;
    } else {
      // Flat lip extending slightly downwards into the page with soft gradient blend
      pos.z = 0.35 * (1.0 + s / 0.5);
      n = vec3(0.0, 0.0, 1.0);
      vAlpha = smoothstep(0.0, 0.4, 0.4 + s);
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
    vec3 V = normalize(cameraPosition - vPosition);
    vec3 H = normalize(L + V);

    float diff = max(dot(vNormal, L), 0.0);
    float wrapDiff = max(0.0, (dot(vNormal, L) + 0.35) / 1.35);
    float spec = pow(max(dot(vNormal, H), 0.0), 20.0) * 0.06;
    vec3 totalLight = uAmbientColor + uLightColor * (diff * 0.45 + wrapDiff * 0.25) + vec3(spec);

    if (!gl_FrontFacing) {
      // Back underside interior of cylinder roll
      vec2 backUv = vec2(1.0 - vUv.x, vUv.y);
      vec3 backPaper = texture2D(uBackTexture, backUv).rgb;
      backPaper = pow(backPaper, vec3(1.25));
      backPaper *= 0.88;
      gl_FragColor = vec4(backPaper * totalLight, vAlpha);
      return;
    }

    // Front tactile surface of roll
    vec3 frontPaper = texture2D(uFrontTexture, vUv).rgb;
    frontPaper = pow(frontPaper, vec3(1.35));
    gl_FragColor = vec4(frontPaper * totalLight, vAlpha);
  }
`;

export function PinnedTopRollCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true, // Transparent background so page DOM content is visible
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      36,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.0);
    camera.lookAt(0, 0, 0);

    // Studio lighting creating 3D roll depth
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.65);
    keyLight.position.set(3.5, 6.0, 5.0);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xfef3c7, 0.25);
    fillLight.position.set(-3.5, -2.0, 3.5);
    scene.add(fillLight);

    const textureLoader = new THREE.TextureLoader();
    const backPaperTexture = textureLoader.load(
      "/assets/textures/paper-back.jpg"
    );
    backPaperTexture.wrapS = THREE.ClampToEdgeWrapping;
    backPaperTexture.wrapT = THREE.ClampToEdgeWrapping;

    const frontPaperTexture = textureLoader.load(
      "/assets/textures/paper-front.jpg"
    );
    frontPaperTexture.wrapS = THREE.ClampToEdgeWrapping;
    frontPaperTexture.wrapT = THREE.ClampToEdgeWrapping;

    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader: rollVertexShader,
      fragmentShader: rollFragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: {
        uProgress: { value: 0.0 },
        uVisibleHeight: { value: 1.0 },
        uBaseRadius: { value: 0.38 },
        uSpiralFactor: { value: 0.035 },
        uFrontTexture: { value: frontPaperTexture },
        uBackTexture: { value: backPaperTexture },
        uLightPos: { value: new THREE.Vector3(3.5, 6.0, 5.0) },
        uLightColor: { value: new THREE.Vector3(0.5, 0.5, 0.5) },
        uAmbientColor: { value: new THREE.Vector3(0.68, 0.68, 0.7) },
      },
    });

    let mesh: THREE.Mesh | null = null;

    function updateDimensions() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const vFovRad = (camera.fov * Math.PI) / 180;
      const visibleHeight = 2 * Math.tan(vFovRad / 2) * camera.position.z;
      const visibleWidth = visibleHeight * camera.aspect;

      // Measure the exact position and width of #paper-canvas-folio
      const paperEl = document.getElementById("paper-canvas-folio");
      let worldWidth = visibleWidth;
      let worldCenterX = 0;

      if (paperEl && w > 0) {
        const rect = paperEl.getBoundingClientRect();
        // Convert screen pixel width to Three.js world units
        worldWidth = (rect.width / w) * visibleWidth;
        // Calculate center X offset in Three.js coordinates
        const canvasCenterScreenX = rect.left + rect.width * 0.5;
        worldCenterX = ((canvasCenterScreenX / w) - 0.5) * visibleWidth;

        // Position and size the contact shadow element to match the canvas precisely
        if (shadowRef.current) {
          shadowRef.current.style.width = `${rect.width}px`;
          shadowRef.current.style.left = `${rect.left}px`;
        }
      }

      // Prominent coil radius (~8.5% of visible screen height)
      const baseRadius = visibleHeight * 0.085;
      const topScreenY = visibleHeight * 0.5;
      const Y_pin = topScreenY - (baseRadius * 1.05);

      const rollSheetLength = 2.8;
      const lipLength = 0.5;
      const totalH = rollSheetLength + lipLength;

      if (mesh) {
        mesh.geometry.dispose();
      }

      // Geometry width EXACTLY matches the padded paper canvas - zero overflow to the viewport sides
      const geometry = new THREE.PlaneGeometry(
        worldWidth,
        totalH,
        180,
        360
      );
      geometry.translate(0, Y_pin + (rollSheetLength - lipLength) * 0.5, 0);

      mesh = new THREE.Mesh(geometry, shaderMaterial);
      mesh.position.x = worldCenterX;
      scene.add(mesh);

      const uniforms = shaderMaterial.uniforms;
      if (uniforms["uVisibleHeight"])
        uniforms["uVisibleHeight"].value = visibleHeight;
      if (uniforms["uBaseRadius"]) uniforms["uBaseRadius"].value = baseRadius;
    }

    window.addEventListener("resize", updateDimensions);

    // ResizeObserver on the paper canvas element to guarantee 1:1 width sync
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
      {/* Fixed Full-Screen WebGL Canvas for Prominent 3D Pinned Roll */}
      <div
        className="fixed inset-0 w-screen h-screen z-40 pointer-events-none overflow-hidden"
        style={{
          filter: "drop-shadow(0 22px 26px rgba(0, 0, 0, 0.26))",
        }}
        aria-hidden="true"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Deep Contact Shadow Exactly Matched to the Paper Canvas Width */}
      <div
        ref={shadowRef}
        className="fixed top-0 pointer-events-none z-30 transition-opacity duration-150 h-28"
        style={{
          background:
            "linear-gradient(to bottom, rgba(17, 24, 39, 0.38) 0%, rgba(17, 24, 39, 0.14) 45%, transparent 100%)",
        }}
        aria-hidden="true"
      />
    </>
  );
}
