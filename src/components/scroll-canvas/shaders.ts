/**
 * GLSL Shaders for Asterisk Construction 3D Pinned Scroll-Unroll Experience.
 * Features:
 * - Top-edge pinned Archimedean spiral roll (Y_pin = +visibleHeight * 0.5)
 * - Continuous downward paper feed as user scrolls through the folio
 * - Dual texture mapping: Front crumpled paper texture + website canvas,
 *   Back crumpled paper texture from stock video with 3D cylinder lighting.
 */

export const vertexShader = /* glsl */ `
  uniform float uProgress;
  uniform float uPlaneHeight;
  uniform float uPlaneWidth;
  uniform float uVisibleHeight;
  uniform float uBaseRadius;
  uniform float uSpiralFactor;

  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;

  void main() {
    vUv = uv;

    // Pin line anchored at the top of the visible screen
    float Y_pin = uVisibleHeight * 0.5;

    // As user scrolls, paper feeds downward out of the top roll
    // At uProgress = 0.0: document is coiled at Y_pin
    // At uProgress = 1.0: entire document has fed through and unrolled flat
    float totalFeed = (uPlaneHeight - uVisibleHeight);
    float feedOffset = uProgress * totalFeed;

    // Linear unrolled position along vertical axis before curling:
    // Top of plane starts at Y_pin and feeds downward
    float flatY = position.y - (uPlaneHeight * 0.5) + Y_pin + feedOffset;

    vec3 pos = position;
    vec3 n = normal;

    if (flatY <= Y_pin) {
      // 1. Unrolled section: flat in front of the camera
      pos.y = flatY;
      pos.z = 0.0;
      n = vec3(0.0, 0.0, 1.0);
    } else {
      // 2. Coiled section pinned at top edge (Archimedean spiral cylinder along X axis)
      float s = flatY - Y_pin;
      
      // At the very bottom of scroll (uProgress > 0.96), uncurl the remaining roll
      float uncurlFactor = smoothstep(0.96, 1.0, uProgress);
      float R = mix(uBaseRadius + uSpiralFactor * s, uBaseRadius * 4.0, uncurlFactor);
      float theta = mix(s / R, 0.0, uncurlFactor);

      float y_curl = Y_pin + sin(theta) * R;
      float z_curl = (1.0 - cos(theta)) * R;

      pos.y = mix(y_curl, flatY, uncurlFactor);
      pos.z = mix(z_curl, 0.0, uncurlFactor);

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
