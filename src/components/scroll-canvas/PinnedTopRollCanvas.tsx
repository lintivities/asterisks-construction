import React, { useEffect, useRef } from "react";
import * as THREE from "three";

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

    // Pin line anchored at the top edge of visible viewport
    float Y_pin = uVisibleHeight * 0.5;

    // Position along sheet: sheet extends above Y_pin into the roll
    float s = position.y - Y_pin;

    vec3 pos = position;
    vec3 n = normal;

    if (s >= 0.0) {
      // 3D Archimedean spiral coiled cylinder pinned at top edge
      float uncurl = smoothstep(0.92, 1.0, uProgress);
      float R = mix(uBaseRadius + uSpiralFactor * s, uBaseRadius * 4.0, uncurl);

      // Continuous rotation as user scrolls
      float scrollAngle = uProgress * 14.0;
      float theta = (s / R) + scrollAngle;

      float y_curl = Y_pin + sin(theta) * R;
      float z_curl = (1.0 - cos(theta)) * R + 0.18;

      pos.y = mix(y_curl, position.y, uncurl);
      pos.z = mix(z_curl, 0.0, uncurl);
      n = vec3(0.0, -sin(theta), cos(theta));
      vAlpha = 1.0;
    } else {
      // Below Y_pin: flat lip with soft fade-out
      pos.z = 0.18 * (1.0 + s / 0.45);
      n = vec3(0.0, 0.0, 1.0);
      vAlpha = smoothstep(0.0, 0.35, 0.35 + s);
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
    if (vAlpha <= 0.01) discard;

    vec3 L = normalize(uLightPos - vPosition);
    vec3 V = normalize(cameraPosition - vPosition);
    vec3 H = normalize(L + V);

    float diff = max(dot(vNormal, L), 0.0);
    float wrapDiff = max(0.0, (dot(vNormal, L) + 0.3) / 1.3);
    float spec = pow(max(dot(vNormal, H), 0.0), 24.0) * 0.04;
    vec3 totalLight = uAmbientColor + uLightColor * (diff * 0.4 + wrapDiff * 0.2) + vec3(spec);

    if (!gl_FrontFacing) {
      // Back underside of cylinder roll
      vec2 backUv = vec2(1.0 - vUv.x, vUv.y);
      vec3 backPaper = texture2D(uBackTexture, backUv).rgb;
      backPaper = pow(backPaper, vec3(1.2));
      gl_FragColor = vec4(backPaper * totalLight, vAlpha);
      return;
    }

    // Front surface of roll
    vec3 frontPaper = texture2D(uFrontTexture, vUv).rgb;
    frontPaper = pow(frontPaper, vec3(1.25));
    gl_FragColor = vec4(frontPaper * totalLight, vAlpha);
  }
`;

export function PinnedTopRollCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true, // Transparent background so page DOM is fully visible underneath
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      38,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.0);
    camera.lookAt(0, 0, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.55);
    keyLight.position.set(3.0, 5.0, 4.5);
    scene.add(keyLight);

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
        uBaseRadius: { value: 0.22 },
        uSpiralFactor: { value: 0.024 },
        uFrontTexture: { value: frontPaperTexture },
        uBackTexture: { value: backPaperTexture },
        uLightPos: { value: new THREE.Vector3(3.0, 5.0, 4.5) },
        uLightColor: { value: new THREE.Vector3(0.45, 0.45, 0.45) },
        uAmbientColor: { value: new THREE.Vector3(0.7, 0.7, 0.7) },
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

      const Y_pin = visibleHeight * 0.5;
      const rollHeight = 1.6; // Height segment for the coiled cylinder roll
      const lipHeight = 0.45;
      const totalMeshH = rollHeight + lipHeight;

      if (mesh) {
        mesh.geometry.dispose();
      }

      // Plane positioned around Y_pin
      const geometry = new THREE.PlaneGeometry(
        visibleWidth * 1.02,
        totalMeshH,
        140,
        280
      );
      // Translate geometry so Y_pin is positioned accurately
      geometry.translate(0, Y_pin + (rollHeight - lipHeight) * 0.5, 0);

      mesh = new THREE.Mesh(geometry, shaderMaterial);
      scene.add(mesh);

      const uniforms = shaderMaterial.uniforms;
      if (uniforms["uVisibleHeight"])
        uniforms["uVisibleHeight"].value = visibleHeight;
      if (uniforms["uBaseRadius"])
        uniforms["uBaseRadius"].value = visibleHeight * 0.05;
    }

    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    // Scroll progress driver (Default page scrolling axis)
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
      currentProgress += (targetProgress - currentProgress) * 0.12;

      if (shaderMaterial.uniforms["uProgress"]) {
        shaderMaterial.uniforms["uProgress"].value = currentProgress;
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
    <div
      className="fixed inset-0 w-screen h-screen z-40 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}
