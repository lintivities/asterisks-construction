/**
 * GLSL Shaders from scroll-unroll.html.
 * Features:
 * - Full-screen Archimedean spiral curl line along Y axis
 * - Dual crumpled paper texture maps (front + back) with calibrated lighting
 * - Multiply blend with dynamic architectural folio canvas
 */

export const vertexShader = /* glsl */ `
  uniform float uProgress;
  uniform float uPlaneHeight;
  uniform float uPlaneWidth;
  uniform float uBaseRadius;
  uniform float uSpiralFactor;

  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;

  void main() {
    vUv = uv;

    // Rolling boundary curl line along Y:
    // At progress 0.02, curlY is near bottom (-0.5 * H) -> sheet curled into cylinder
    // At progress 1.0, curlY reaches top (+0.5 * H) -> entire sheet flat across screen
    float curlY = -uPlaneHeight * 0.5 + (uPlaneHeight * uProgress);

    vec3 pos = position;
    vec3 n = normal;

    if (pos.y <= curlY) {
      // 1. Flat unrolled section flush with screen:
      pos.z = 0.0;
      n = vec3(0.0, 0.0, 1.0);
    } else {
      // 2. Curled top roll (Archimedean spiral cylinder along X axis):
      float s = pos.y - curlY;
      float R = uBaseRadius + uSpiralFactor * s;
      float theta = s / R;

      float y_curl = curlY + sin(theta) * R;
      float z_curl = (1.0 - cos(theta)) * R;

      pos.y = y_curl;
      pos.z = z_curl;

      // Rotated normal around X axis
      n = vec3(0.0, -sin(theta), cos(theta));
    }

    vPosition = (modelMatrix * vec4(pos, 1.0)).xyz;
    vNormal = normalize(normalMatrix * n);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  uniform sampler2D uContentTexture;
  uniform sampler2D uFrontTexture;
  uniform sampler2D uBackTexture;
  uniform vec3 uLightPos;
  uniform vec3 uLightColor;
  uniform vec3 uAmbientColor;

  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;

  void main() {
    // Directional Studio Lighting for 3D roll curvature depth
    vec3 L = normalize(uLightPos - vPosition);
    vec3 V = normalize(cameraPosition - vPosition);
    vec3 H = normalize(L + V);

    float diff = max(dot(vNormal, L), 0.0);
    float wrapDiff = max(0.0, (dot(vNormal, L) + 0.3) / 1.3);
    float spec = pow(max(dot(vNormal, H), 0.0), 24.0) * 0.03;

    vec3 totalLight = uAmbientColor + uLightColor * (diff * 0.35 + wrapDiff * 0.15) + vec3(spec);

    // 1. Backpage Texture: Use realistic crumpled paper texture from video
    if (!gl_FrontFacing) {
      vec2 backUv = vec2(1.0 - vUv.x, vUv.y);
      vec3 backPaper = texture2D(uBackTexture, backUv).rgb;
      backPaper = pow(backPaper, vec3(1.2));
      gl_FragColor = vec4(backPaper * totalLight, 1.0);
      return;
    }

    // 2. Frontpage Texture: Rich, tactile crumpled paper texture clearly visible across the entire front
    vec3 frontPaper = texture2D(uFrontTexture, vUv).rgb;
    // Contrast curve to make the crumpled paper folds pop tangibly and realistically
    frontPaper = pow(frontPaper, vec3(1.35));

    vec4 contentTex = texture2D(uContentTexture, vUv);

    // Multiply blend architectural drawings with tactile crumpled paper texture
    vec3 surfaceColor = frontPaper * contentTex.rgb;
    gl_FragColor = vec4(surfaceColor * totalLight, 1.0);
  }
`;
