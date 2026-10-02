import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Highly Prominent 3D Pinned Archimedean Spiral Roll in Three.js
 * - Positioned visibly at the top of the screen hanging down into the viewport
 * - Thick, multi-turn spiral parchment roll with rich tactile relief
 * - Spins and unrolls dynamically in real-time as the user scrolls
 * - Dual textures: front crumpled texture with directional studio lighting,
 *   interior back crumpled texture with cylinder depth shadowing.
 * - Casts a deep realistic drop shadow over the paper sheet below.
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
  varying float vDepth;

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
      vDepth = pos.z;
    } else {
      // Flat lip extending slightly downwards into the page with soft gradient blend
      pos.z = 0.35 * (1.0 + s / 0.5);
      n = vec3(0.0, 0.0, 1.0);
      vAlpha = smoothstep(0.0, 0.4, 0.4 + s);
      vDepth = pos.z;
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
  varying float vDepth;

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
      // Subtle interior shadow inside cylinder roll
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

    // Dynamic studio key light creating deep 3D roll curvature
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

      // Prominent coil radius (~8.5% of visible screen height)
      const baseRadius = visibleHeight * 0.085;
      const topScreenY = visibleHeight * 0.5;
      const Y_pin = topScreenY - (baseRadius * 1.05);

      // Substantial sheet length rolled into the cylinder (multi-turn spiral)
      const rollSheetLength = 2.8;
      const lipLength = 0.5;
      const totalH = rollSheetLength + lipLength;

      if (mesh) {
        mesh.geometry.dispose();
      }

      // High-density subdivision for super smooth 3D curved cylinder
      const geometry = new THREE.PlaneGeometry(
        visibleWidth * 1.06,
        totalH,
        180,
        360
      );
      // Position plane centered on Y_pin
      geometry.translate(0, Y_pin + (rollSheetLength - lipLength) * 0.5, 0);

      mesh = new THREE.Mesh(geometry, shaderMaterial);
      scene.add(mesh);

      const uniforms = shaderMaterial.uniforms;
      if (uniforms["uVisibleHeight"])
        uniforms["uVisibleHeight"].value = visibleHeight;
      if (uniforms["uBaseRadius"]) uniforms["uBaseRadius"].value = baseRadius;
    }

    window.addEventListener("resize", updateDimensions);
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
          filter: "drop-shadow(0 24px 28px rgba(0, 0, 0, 0.28))",
        }}
        aria-hidden="true"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Deep Contact Shadow Beneath Pinned Roll Cast Downward onto Content */}
      <div
        ref={shadowRef}
        className="fixed top-0 left-0 w-full h-28 pointer-events-none z-30 transition-opacity duration-150"
        style={{
          background:
            "linear-gradient(to bottom, rgba(17, 24, 39, 0.42) 0%, rgba(17, 24, 39, 0.16) 45%, transparent 100%)",
        }}
        aria-hidden="true"
      />
    </>
  );
}
