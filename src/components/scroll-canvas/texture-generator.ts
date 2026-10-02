import * as THREE from "three";

/**
 * Creates the high-resolution architectural folio drawing canvas from scroll-unroll.html.
 * Styled with the authentic colors & typography of Asterisk Construction:
 * - Typography: "Syne", "Montserrat" (Headlines/Display), "Inter" (Body/Subtitles), "Space Mono" (Drafting/Technical)
 * - Colors: Charcoal Slate (#111827, #17191d), Warm Terracotta (#c85a32), Champagne Gold (#d4af37),
 *           Off-white surface (#faf9f6), Structural gray (#4b5563, #64748b), Gridlines (#cbd5e1, #e5e7eb)
 */
export function createOffscreenDocumentCanvas(
  width: number,
  height: number
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  // Pure off-white solid paper canvas background (NO dark background textures)
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  // Technical Drafting Borders
  ctx.strokeStyle = "#111827"; // Charcoal slate
  ctx.lineWidth = 3.5;
  ctx.strokeRect(36, 36, width - 72, height - 72);

  ctx.strokeStyle = "#e5e7eb";
  ctx.lineWidth = 1;
  ctx.strokeRect(46, 46, width - 92, height - 92);

  // Precision Drafting Corner Crosshairs
  function drawCrosshair(x: number, y: number) {
    if (!ctx) return;
    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x - 12, y);
    ctx.lineTo(x + 12, y);
    ctx.moveTo(x, y - 12);
    ctx.lineTo(x, y + 12);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.stroke();
  }

  drawCrosshair(36, 36);
  drawCrosshair(width - 36, 36);
  drawCrosshair(36, height - 36);
  drawCrosshair(width - 36, height - 36);

  // Edge Coordinate Indicators (A through K)
  ctx.fillStyle = "#6b7280";
  ctx.font = '600 12px "Space Mono", monospace';
  const cols = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"];
  for (let i = 0; i < cols.length; i++) {
    const colName = cols[i] ?? "";
    const x = 90 + i * ((width - 180) / (cols.length - 1));
    ctx.fillText(colName, x - 4, 28);
    ctx.fillText(colName, x - 4, height - 20);
    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, 32);
    ctx.lineTo(x, 36);
    ctx.moveTo(x, height - 36);
    ctx.lineTo(x, height - 32);
    ctx.stroke();
  }

  // Proportional layout scaling based on baseline height 1200px
  const baseH = 1200;
  const sY = Math.max(0.75, height / baseH);

  /* ==========================================================================
     HEADER BLOCK: FOLIO LEDGER & MASTER TITLE
     ========================================================================== */
  const headerY = Math.round(85 * sY);
  ctx.fillStyle = "#d4af37"; // Champagne Gold accent
  ctx.font = '700 13px "Space Mono", monospace';
  ctx.letterSpacing = "4px";
  ctx.textAlign = "center";
  ctx.fillText(
    "ASTERISK CONSTRUCTION · ARCHITECTURAL MASTER FOLIO AR-01",
    width * 0.5,
    headerY
  );

  // Master Title in Syne / Montserrat Display Typography
  ctx.fillStyle = "#111827"; // Deep Charcoal Slate
  ctx.font = '800 38px "Syne", "Montserrat", sans-serif';
  ctx.letterSpacing = "2px";
  ctx.fillText(
    "SUSTAINABLE ARCHITECTURAL PAVILION",
    width * 0.5,
    headerY + 48
  );

  // Subtitle in Inter Typography
  ctx.font = '500 15px "Inter", system-ui, sans-serif';
  ctx.letterSpacing = "0.5px";
  ctx.fillStyle = "#4b5563"; // Concrete gray
  ctx.fillText(
    "Structural Cantilevers, Facade Kinetics & Tectonic Assemblies · Nairobi & Pan-Africa",
    width * 0.5,
    headerY + 80
  );

  // Separator rule with Warm Terracotta center dot
  const dividerY = headerY + 102;
  ctx.strokeStyle = "#e5e7eb";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(140, dividerY);
  ctx.lineTo(width - 140, dividerY);
  ctx.stroke();

  ctx.fillStyle = "#c85a32"; // Warm Terracotta accent
  ctx.beginPath();
  ctx.arc(width * 0.5, dividerY, 3.5, 0, Math.PI * 2);
  ctx.fill();

  /* ==========================================================================
     FIGURE 1.0 : NORTH ELEVATION & PRIMARY STEEL TRUSS MORPHOLOGY
     ========================================================================== */
  const elevY = Math.round(230 * sY);
  ctx.textAlign = "left";

  // Figure Header with Warm Terracotta highlight
  ctx.fillStyle = "#c85a32";
  ctx.font = '700 13px "Space Mono", monospace';
  ctx.fillText("FIGURE 1.0 :", 80, elevY);

  ctx.fillStyle = "#111827";
  ctx.font = '700 13px "Space Mono", monospace';
  ctx.fillText(
    "NORTH ELEVATION & PRIMARY STEEL TRUSS MORPHOLOGY",
    185,
    elevY
  );

  const groundY = elevY + Math.round(250 * sY);

  // Ground Line with structural hatching
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#111827";
  ctx.beginPath();
  ctx.moveTo(80, groundY);
  ctx.lineTo(width - 80, groundY);
  ctx.stroke();

  // Ground hatching
  ctx.strokeStyle = "#9ca3af";
  ctx.lineWidth = 1;
  for (let gx = 80; gx < width - 80; gx += 20) {
    ctx.beginPath();
    ctx.moveTo(gx, groundY);
    ctx.lineTo(gx - 10, groundY + 12);
    ctx.stroke();
  }

  // Primary Cantilever Roof Geometry
  ctx.strokeStyle = "#111827";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(120, elevY + 58);
  ctx.lineTo(width * 0.5, elevY + 26);
  ctx.lineTo(width - 120, elevY + 68);
  ctx.lineTo(width - 120, elevY + 88);
  ctx.lineTo(width * 0.5, elevY + 44);
  ctx.lineTo(120, elevY + 76);
  ctx.closePath();
  ctx.fillStyle = "#faf9f6";
  ctx.fill();
  ctx.stroke();

  // Highlight line in Champagne Gold along roof edge
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(120, elevY + 58);
  ctx.lineTo(width * 0.5, elevY + 26);
  ctx.lineTo(width - 120, elevY + 68);
  ctx.stroke();

  // Vertical Structural Columns
  const numCols = 9;
  for (let i = 0; i < numCols; i++) {
    const colX = 160 + i * ((width - 320) / (numCols - 1));
    ctx.fillStyle = i % 2 === 0 ? "#111827" : "#1f2937";
    ctx.fillRect(colX - 4, elevY + 44, 8, groundY - (elevY + 44));
  }

  // Drafting Structural Grid (Subtle gray lines)
  ctx.strokeStyle = "#e5e7eb";
  ctx.lineWidth = 1;
  for (let my = elevY + 75; my < groundY; my += 26) {
    ctx.beginPath();
    ctx.moveTo(130, my);
    ctx.lineTo(width - 130, my);
    ctx.stroke();
  }
  for (let mx = 130; mx < width - 130; mx += 36) {
    ctx.beginPath();
    ctx.moveTo(mx, elevY + 75);
    ctx.lineTo(mx, groundY);
    ctx.stroke();
  }

  // Dimension Line Helper
  function drawDimensionLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    label: string
  ) {
    if (!ctx) return;
    ctx.save();
    ctx.strokeStyle = "#4b5563";
    ctx.fillStyle = "#4b5563";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // End ticks
    ctx.strokeStyle = "#c85a32"; // Terracotta dimension tick
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x1 - 4, y1 - 4);
    ctx.lineTo(x1 + 4, y1 + 4);
    ctx.moveTo(x2 - 4, y2 - 4);
    ctx.lineTo(x2 + 4, y2 + 4);
    ctx.stroke();

    ctx.font = '600 11px "Space Mono", monospace';
    ctx.textAlign = "center";
    ctx.fillText(label, (x1 + x2) * 0.5, (y1 + y2) * 0.5 - 5);
    ctx.restore();
  }

  drawDimensionLine(
    120,
    elevY + 14,
    width - 120,
    elevY + 14,
    "48,000 MM STRUCTURAL CANTILEVER SPAN"
  );
  drawDimensionLine(
    width - 60,
    elevY + 26,
    width - 60,
    groundY,
    "12,400 MM"
  );

  /* ==========================================================================
     FIGURE 2.0 : LEVEL 01 SANCTUARY & ROTUNDA ATRIUM GEOMETRY
     ========================================================================== */
  const planY = groundY + Math.round(45 * sY);
  ctx.textAlign = "left";

  ctx.fillStyle = "#c85a32"; // Terracotta
  ctx.font = '700 13px "Space Mono", monospace';
  ctx.fillText("FIGURE 2.0 :", 80, planY);

  ctx.fillStyle = "#111827";
  ctx.font = '700 13px "Space Mono", monospace';
  ctx.fillText(
    "LEVEL 01 SANCTUARY & ROTUNDA ATRIUM GEOMETRY",
    185,
    planY
  );

  const planBoxH = Math.round(210 * sY);
  ctx.strokeStyle = "#111827";
  ctx.lineWidth = 2;
  ctx.strokeRect(180, planY + 20, width - 360, planBoxH);

  ctx.strokeStyle = "#64748b";
  ctx.lineWidth = 1.2;
  ctx.strokeRect(230, planY + 48, width - 460, planBoxH - 56);

  // Central Rotunda Geometry
  const rotundaRadius = Math.min(68, Math.round(68 * sY));
  ctx.strokeStyle = "#111827";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(width * 0.5, planY + 20 + planBoxH * 0.5, rotundaRadius, 0, Math.PI * 2);
  ctx.stroke();

  // Dashed Atrium Kinetic Ring
  ctx.strokeStyle = "#c85a32"; // Terracotta dashed ring
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.arc(
    width * 0.5,
    planY + 20 + planBoxH * 0.5,
    rotundaRadius + 22,
    0,
    Math.PI * 2
  );
  ctx.stroke();
  ctx.setLineDash([]);

  // Gallery Text
  ctx.fillStyle = "#111827";
  ctx.font = '700 12px "Space Mono", monospace';
  ctx.textAlign = "center";
  ctx.fillText(
    "CENTRAL GALLERY ROTUNDA",
    width * 0.5,
    planY + 16 + planBoxH * 0.5
  );

  ctx.font = '500 11px "Inter", sans-serif';
  ctx.fillStyle = "#6b7280";
  ctx.fillText(
    "HONED TERRAZZO FLOORING",
    width * 0.5,
    planY + 32 + planBoxH * 0.5
  );

  ctx.fillText(
    "WEST PAVILION · COMMERCIAL ATELIER",
    270,
    planY + 20 + planBoxH * 0.5
  );
  ctx.fillText(
    "EAST ARCHIVE · STRUCTURAL VAULT",
    width - 270,
    planY + 20 + planBoxH * 0.5
  );

  /* ==========================================================================
     SECTION I : STRUCTURAL COMPONENT SCHEDULE
     ========================================================================== */
  const tableY = planY + planBoxH + Math.round(42 * sY);
  ctx.textAlign = "left";

  // Section Header in Syne Typography with Terracotta accent
  ctx.fillStyle = "#c85a32";
  ctx.font = '800 20px "Syne", "Montserrat", sans-serif';
  ctx.fillText("I.", 80, tableY);

  ctx.fillStyle = "#111827";
  ctx.font = '800 20px "Syne", "Montserrat", sans-serif';
  ctx.fillText("STRUCTURAL COMPONENT SCHEDULE", 108, tableY);

  const tableH = Math.round(180 * sY);
  ctx.strokeStyle = "#111827";
  ctx.lineWidth = 2;
  ctx.strokeRect(80, tableY + 16, width - 160, tableH);

  // Table Header Bar
  ctx.fillStyle = "#f8fafc";
  ctx.fillRect(81, tableY + 17, width - 162, 34);

  ctx.fillStyle = "#111827";
  ctx.font = '700 12px "Space Mono", monospace';
  ctx.fillText("ID", 100, tableY + 39);
  ctx.fillText("CLASSIFICATION", 200, tableY + 39);
  ctx.fillText("MATERIAL SPECIFICATION", 500, tableY + 39);
  ctx.fillText("FIRE RATING", width - 360, tableY + 39);
  ctx.fillText("STATUS", width - 180, tableY + 39);

  const rows = [
    [
      "01",
      "PRIMARY STRUCTURE",
      "Hot-Rolled S355 Architectural Steel",
      "REI 120",
      "APPROVED",
    ],
    [
      "02",
      "FACADE CURTAIN",
      "Triple-Glazed Low-E Structural Glass",
      "Class A1",
      "SPECIFIED",
    ],
    [
      "03",
      "ROOFING DIAPHRAGM",
      "Zinc Standing Seam · Charcoal Finish",
      "Broof(t1)",
      "CERTIFIED",
    ],
    [
      "04",
      "BOQ SPECIFICATION",
      "+254 722 112 807 · asterisk.construction.1@gmail.com",
      "ISO 9001",
      "ACTIVE",
    ],
  ];

  ctx.font = '400 12px "Space Mono", monospace';
  const rowStep = Math.min(34, Math.round(tableH / 5.2));
  rows.forEach((r, idx) => {
    const ry = tableY + 76 + idx * rowStep;
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(80, ry - 16);
    ctx.lineTo(width - 80, ry - 16);
    ctx.stroke();

    const [col0 = "", col1 = "", col2 = "", col3 = "", col4 = ""] = r;
    ctx.fillStyle = idx === 0 ? "#111827" : "#4b5563";
    ctx.fillText(col0, 100, ry);
    ctx.fillText(col1, 200, ry);
    ctx.fillText(col2, 500, ry);
    ctx.fillText(col3, width - 360, ry);

    // Status Badge in Terracotta or Champagne Gold
    if (col4 === "APPROVED" || col4 === "ACTIVE") {
      ctx.fillStyle = "#c85a32"; // Warm Terracotta
    } else if (col4 === "SPECIFIED" || col4 === "CERTIFIED") {
      ctx.fillStyle = "#d4af37"; // Champagne Gold
    } else {
      ctx.fillStyle = "#111827";
    }
    ctx.font = '700 11px "Space Mono", monospace';
    ctx.fillText(`[${col4}]`, width - 180, ry);
    ctx.font = '400 12px "Space Mono", monospace';
  });

  /* ==========================================================================
     AUTHENTICATION SEAL & CREDENTIALS
     ========================================================================== */
  const sealY = tableY + tableH + Math.round(90 * sY);
  const sealX = width * 0.5;

  ctx.strokeStyle = "#111827";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(sealX, sealY, 56, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "#d4af37"; // Champagne Gold inner circle
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(sealX, sealY, 48, 0, Math.PI * 2);
  ctx.stroke();

  // 8-Point Compass Rays
  ctx.save();
  ctx.translate(sealX, sealY);
  ctx.strokeStyle = "#111827";
  ctx.lineWidth = 2.2;
  for (let a = 0; a < 8; a++) {
    ctx.rotate(Math.PI / 4);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 28);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 32, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = a % 2 === 0 ? "#c85a32" : "#d4af37";
    ctx.fill();
  }
  ctx.restore();

  // Seal Subtext
  ctx.font = '700 11px "Space Mono", monospace';
  ctx.fillStyle = "#111827";
  ctx.textAlign = "center";
  ctx.letterSpacing = "2px";
  ctx.fillText(
    "AUTHENTICATED · ASTERISK CONSTRUCTION · ARCHITECTURAL REGISTRY · 2026",
    sealX,
    sealY + 76
  );

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}
