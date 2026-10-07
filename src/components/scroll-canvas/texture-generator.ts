import * as THREE from "three";

export type ImageAssets = {
  hero?: HTMLImageElement | null;
  towers?: HTMLImageElement | null;
  resort?: HTMLImageElement | null;
  bustani?: HTMLImageElement | null;
  villa?: HTMLImageElement | null;
};

/**
 * Creates the high-resolution architectural folio canvas texture directly reproducing
 * the page contents, typography, and visual appearance of pixel-perfect-view-8642.
 *
 * Typography: "Syne", "Montserrat" (Headlines/Display), "Inter" (Body/Subtitles), "Space Mono" (Badges/Technical)
 * Colors: Charcoal Slate (#17191d, #111827), Warm Terracotta (#c85a32), Champagne Gold (#d4af37),
 *         Off-white surface (#faf9f6), Concrete gray (#4b5563, #64748b), Border line (#e5e7eb, #2e333d)
 * Margins: 120px lateral margins from canvas edges; 140px vertical padding between sections.
 */
export function createPixelPerfectFolioCanvas(
  width: number,
  height: number,
  images?: ImageAssets
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  // Pure off-white solid paper canvas background (frames all sections)
  ctx.fillStyle = "#faf9f6";
  ctx.fillRect(0, 0, width, height);

  // Technical Drafting Borders
  ctx.strokeStyle = "#111827"; // Charcoal slate
  ctx.lineWidth = 3.5;
  ctx.strokeRect(36, 36, width - 72, height - 72);

  ctx.strokeStyle = "#e5e7eb";
  ctx.lineWidth = 1;
  ctx.strokeRect(46, 46, width - 92, height - 92);

  // Corner Drafting Crosshairs
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

  // Margin and Content Width (120px padding from the canvas edges)
  const padX = 120;
  const contentW = width - padX * 2; // 1808px

  // Rounded rectangle helper
  function fillRoundRect(
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
    fill: string,
    stroke?: string,
    strokeWidth = 1
  ) {
    if (!ctx) return;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = strokeWidth;
      ctx.stroke();
    }
    ctx.restore();
  }

  /* ==========================================================================
     1. NAVIGATION HEADER BAR (Y: 70 - 150)
     ========================================================================== */
  const navY = 70;
  ctx.textAlign = "left";

  // Brand Wordmark
  ctx.fillStyle = "#111827";
  ctx.font = '800 24px "Syne", "Montserrat", sans-serif';
  ctx.letterSpacing = "2px";
  ctx.fillText("ASTERISK CONSTRUCTION", padX, navY + 36);

  // Navigation Links
  const navLinks = [
    "ABOUT",
    "SERVICES",
    "PROJECTS",
    "BENCHMARKS",
    "LEADERSHIP",
  ];
  ctx.font = '600 13px "Inter", sans-serif';
  ctx.fillStyle = "#4b5563";
  ctx.letterSpacing = "1.5px";
  navLinks.forEach((link, idx) => {
    ctx.fillText(link, padX + 540 + idx * 160, navY + 36);
  });

  // CTA Button: "REQUEST QUOTE"
  fillRoundRect(
    width - padX - 220,
    navY + 10,
    220,
    44,
    4,
    "#c85a32" // Warm Terracotta
  );
  ctx.fillStyle = "#ffffff";
  ctx.font = '700 13px "Inter", sans-serif';
  ctx.textAlign = "center";
  ctx.letterSpacing = "1px";
  ctx.fillText("REQUEST QUOTE", width - padX - 110, navY + 37);

  // Divider Rule under header
  ctx.strokeStyle = "#e5e7eb";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padX, navY + 70);
  ctx.lineTo(width - padX, navY + 70);
  ctx.stroke();

  /* ==========================================================================
     2. HERO SECTION (Y: 220 - 1050)
     ========================================================================== */
  const heroY = 220;
  const heroH = 780;

  // Background Hero Container
  fillRoundRect(padX, heroY, contentW, heroH, 8, "#17191d");

  // Render hero photo if loaded
  if (images?.hero && images.hero.complete && images.hero.naturalWidth > 0) {
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(padX, heroY, contentW, heroH, 8);
    ctx.clip();
    ctx.drawImage(images.hero, padX, heroY, contentW, heroH);

    // Gradient Overlay for contrast and readability
    const heroGrad = ctx.createLinearGradient(
      padX,
      heroY,
      padX,
      heroY + heroH
    );
    heroGrad.addColorStop(0, "rgba(23, 25, 29, 0.45)");
    heroGrad.addColorStop(0.55, "rgba(23, 25, 29, 0.82)");
    heroGrad.addColorStop(1, "rgba(23, 25, 29, 0.98)");
    ctx.fillStyle = heroGrad;
    ctx.fillRect(padX, heroY, contentW, heroH);
    ctx.restore();
  }

  // Hero Content Inside Container
  const hTextX = padX + 80;
  ctx.textAlign = "left";

  // Eyebrow
  ctx.fillStyle = "#c85a32"; // Warm Terracotta
  ctx.font = '700 14px "Space Mono", monospace';
  ctx.letterSpacing = "2px";
  ctx.fillText("DESIGN & BUILD · NAIROBI, KENYA", hTextX, heroY + 110);

  // Main H1 Title in Syne Display Typography
  ctx.fillStyle = "#ffffff";
  ctx.font = '800 58px "Syne", "Montserrat", sans-serif';
  ctx.letterSpacing = "-0.5px";
  ctx.fillText("Building Africa's Future, Today.", hTextX, heroY + 190);

  // Description in Inter Typography
  ctx.fillStyle = "#d1d5db";
  ctx.font = '400 20px "Inter", sans-serif';
  ctx.fillText(
    "Sustainable, high-end infrastructure, residential, and commercial developments across",
    hTextX,
    heroY + 245
  );
  ctx.fillText("Kenya and Pan-Africa.", hTextX, heroY + 275);

  // Action Buttons
  // 1. WhatsApp Button
  fillRoundRect(hTextX, heroY + 330, 290, 52, 4, "#c85a32");
  ctx.fillStyle = "#ffffff";
  ctx.font = '700 15px "Inter", sans-serif';
  ctx.textAlign = "center";
  ctx.fillText("Request Quote via WhatsApp", hTextX + 145, heroY + 362);

  // 2. View Projects Outline Button
  fillRoundRect(
    hTextX + 310,
    heroY + 330,
    180,
    52,
    4,
    "transparent",
    "#ffffff",
    1.5
  );
  ctx.fillStyle = "#ffffff";
  ctx.fillText("View Projects", hTextX + 400, heroY + 362);

  // 3-Column Metrics Counter Grid (Bottom of Hero)
  const metricY = heroY + 520;
  const metricW = contentW - 160;
  const colW = metricW / 3;

  ctx.strokeStyle = "#374151";
  ctx.lineWidth = 1;
  ctx.strokeRect(hTextX, metricY, metricW, 140);
  ctx.beginPath();
  ctx.moveTo(hTextX + colW, metricY);
  ctx.lineTo(hTextX + colW, metricY + 140);
  ctx.moveTo(hTextX + colW * 2, metricY);
  ctx.lineTo(hTextX + colW * 2, metricY + 140);
  ctx.stroke();

  const metricsData = [
    { val: "100+", label: "COMPLETED PROJECTS" },
    { val: "6-Year", label: "AVG ROI FOR INVESTORS" },
    { val: "Pan-Africa", label: "OPERATIONS & CAPACITY" },
  ];

  metricsData.forEach((m, idx) => {
    const mx = hTextX + idx * colW + 40;
    ctx.textAlign = "left";
    ctx.fillStyle = "#d4af37"; // Champagne Gold
    ctx.font = '800 44px "Syne", "Montserrat", sans-serif';
    ctx.fillText(m.val, mx, metricY + 68);

    ctx.fillStyle = "#9ca3af";
    ctx.font = '600 12px "Space Mono", monospace';
    ctx.letterSpacing = "2px";
    ctx.fillText(m.label, mx, metricY + 106);
  });

  /* ==========================================================================
     3. ABOUT SECTION (Y: 1180 - 2000)
     ========================================================================== */
  const aboutY = 1180;
  const aboutH = 820;

  fillRoundRect(padX, aboutY, contentW, aboutH, 8, "#ffffff", "#e5e7eb", 1.5);

  const abX = padX + 80;
  ctx.textAlign = "left";

  // Eyebrow
  ctx.fillStyle = "#c85a32";
  ctx.font = '700 13px "Space Mono", monospace';
  ctx.fillText("ESTABLISHED 2025", abX, aboutY + 80);

  // H2 Headline
  ctx.fillStyle = "#111827";
  ctx.font = '800 38px "Syne", "Montserrat", sans-serif';
  ctx.fillText(
    "A design-and-build firm engineered around efficiency.",
    abX,
    aboutY + 135
  );

  // Narrative Paragraphs (Left Column)
  const paraW = 820;
  ctx.fillStyle = "#374151";
  ctx.font = '400 17px "Inter", sans-serif';
  ctx.fillText(
    "Asterisk Construction is a limited liability company designing and constructing infrastructure",
    abX,
    aboutY + 195
  );
  ctx.fillText(
    "projects, residential and commercial buildings. We are based in Nairobi, Kenya and undertake works across Africa.",
    abX,
    aboutY + 225
  );

  ctx.fillText(
    "Our designs are optimised for operational efficiency while providing adequate space for current and future needs.",
    abX,
    aboutY + 275
  );
  ctx.fillText(
    "Construction is delivered on schedule and on budget, largely with local labour, full PPE provision, onsite health officers,",
    abX,
    aboutY + 305
  );
  ctx.fillText(
    "safety training and insurance cover for every worker and visitor.",
    abX,
    aboutY + 335
  );

  ctx.fillText(
    "Green building elements reduce the energy each structure needs to operate, and we partner with NGOs and CBOs",
    abX,
    aboutY + 385
  );
  ctx.fillText(
    "working on environmental sustainability.",
    abX,
    aboutY + 415
  );

  // 2 Pillar Cards (Right Column: Vision & Mission)
  const pillarX = abX + paraW + 80;
  const pillarW = contentW - paraW - 240;

  // Vision Card
  fillRoundRect(pillarX, aboutY + 160, pillarW, 160, 4, "#faf9f6", "#e5e7eb");
  ctx.fillStyle = "#c85a32"; // Terracotta Left Border Indicator
  ctx.fillRect(pillarX, aboutY + 160, 6, 160);

  ctx.fillStyle = "#111827";
  ctx.font = '800 20px "Syne", "Montserrat", sans-serif';
  ctx.fillText("Vision", pillarX + 28, aboutY + 200);

  ctx.fillStyle = "#4b5563";
  ctx.font = '400 14px "Inter", sans-serif';
  ctx.fillText(
    "To be the trusted leader in shaping Africa's built environment",
    pillarX + 28,
    aboutY + 235
  );
  ctx.fillText(
    "through efficient, innovative and sustainable development that",
    pillarX + 28,
    aboutY + 260
  );
  ctx.fillText(
    "exists in balance with nature and local communities.",
    pillarX + 28,
    aboutY + 285
  );

  // Mission Card
  fillRoundRect(pillarX, aboutY + 350, pillarW, 160, 4, "#faf9f6", "#e5e7eb");
  ctx.fillStyle = "#c85a32";
  ctx.fillRect(pillarX, aboutY + 350, 6, 160);

  ctx.fillStyle = "#111827";
  ctx.font = '800 20px "Syne", "Montserrat", sans-serif';
  ctx.fillText("Mission", pillarX + 28, aboutY + 390);

  ctx.fillStyle = "#4b5563";
  ctx.font = '400 14px "Inter", sans-serif';
  ctx.fillText(
    "To deliver high quality, reliable and value driven construction",
    pillarX + 28,
    aboutY + 425
  );
  ctx.fillText(
    "solutions that exceed client expectations, while fostering the",
    pillarX + 28,
    aboutY + 450
  );
  ctx.fillText(
    "wellbeing and long-term careers of our people.",
    pillarX + 28,
    aboutY + 475
  );

  // Values Pills (Across bottom of about container)
  const valY = aboutY + 580;
  ctx.fillStyle = "#111827";
  ctx.font = '700 14px "Space Mono", monospace';
  ctx.fillText("CORE VALUES:", abX, valY + 32);

  const valuesList = [
    "Innovation",
    "Integrity",
    "Quality Assurance",
    "Timely Delivery",
    "Social Responsibility",
  ];
  let curValX = abX + 160;
  valuesList.forEach((val) => {
    const vWidth = ctx.measureText(val).width + 40;
    fillRoundRect(curValX, valY + 12, vWidth, 36, 18, "#faf9f6", "#d1d5db");
    ctx.fillStyle = "#c85a32";
    ctx.beginPath();
    ctx.arc(curValX + 16, valY + 30, 3.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#111827";
    ctx.font = '600 13px "Inter", sans-serif';
    ctx.fillText(val, curValX + 28, valY + 35);
    curValX += vWidth + 16;
  });

  /* ==========================================================================
     4. SERVICES MATRIX SECTION (Y: 2140 - 2960)
     ========================================================================== */
  const srvY = 2140;
  const srvH = 820;

  fillRoundRect(padX, srvY, contentW, srvH, 8, "#17191d");

  const sX = padX + 80;
  ctx.textAlign = "left";

  // Eyebrow
  ctx.fillStyle = "#c85a32";
  ctx.font = '700 13px "Space Mono", monospace';
  ctx.fillText("SERVICES MATRIX", sX, srvY + 80);

  // H2 Headline
  ctx.fillStyle = "#ffffff";
  ctx.font = '800 38px "Syne", "Montserrat", sans-serif';
  ctx.fillText("One accountable team, end to end.", sX, srvY + 135);

  // 6 Service Cards in a 3x2 Grid
  const srvCards = [
    {
      num: "01",
      title: "Architectural & Interior Design",
      desc: "Concept through construction drawings, optimised for efficiency, daylight and future expansion.",
    },
    {
      num: "02",
      title: "Structural, Mechanical & Electrical Engineering",
      desc: "Integrated engineering design coordinated across disciplines before a single block is laid.",
    },
    {
      num: "03",
      title: "Construction & Demolition Workflows",
      desc: "Full build delivery on schedule and on budget, with local labour and enforced site safety.",
    },
    {
      num: "04",
      title: "Landscaping & Land Surveying",
      desc: "Topographic and boundary surveys, site planning and manicured external works.",
    },
    {
      num: "05",
      title: "Project Valuation & Quantity Surveying",
      desc: "Bills of quantities, cost planning, valuations and transparent payment certification.",
    },
    {
      num: "06",
      title: "Waste Management & Green Building",
      desc: "Sorting, reuse and compliant disposal that keeps sites clean and projects certifiable.",
    },
  ];

  const sCardW = (contentW - 160 - 40) / 3;
  const sCardH = 240;

  srvCards.forEach((c, idx) => {
    const colIdx = idx % 3;
    const rowIdx = Math.floor(idx / 3);
    const cx = sX + colIdx * (sCardW + 20);
    const cy = srvY + 180 + rowIdx * (sCardH + 20);

    fillRoundRect(cx, cy, sCardW, sCardH, 4, "#1f242d", "#2d333f");

    // Index number in Terracotta
    ctx.fillStyle = "#c85a32";
    ctx.font = '800 16px "Syne", sans-serif';
    ctx.fillText(`${c.num}.`, cx + 28, cy + 42);

    // Title
    ctx.fillStyle = "#ffffff";
    ctx.font = '700 18px "Syne", "Montserrat", sans-serif';
    ctx.fillText(c.title, cx + 28, cy + 85);

    // Description
    ctx.fillStyle = "#9ca3af";
    ctx.font = '400 14px "Inter", sans-serif';
    ctx.fillText(c.desc, cx + 28, cy + 130);
  });

  /* ==========================================================================
     5. FEATURED PROJECTS SECTION (Y: 3100 - 4500)
     ========================================================================== */
  const prjY = 3100;
  const prjH = 1400;

  fillRoundRect(padX, prjY, contentW, prjH, 8, "#ffffff", "#e5e7eb", 1.5);

  const pX = padX + 80;
  ctx.textAlign = "left";

  // Eyebrow
  ctx.fillStyle = "#c85a32";
  ctx.font = '700 13px "Space Mono", monospace';
  ctx.fillText("PORTFOLIO", pX, prjY + 80);

  // H2 Headline
  ctx.fillStyle = "#111827";
  ctx.font = '800 38px "Syne", "Montserrat", sans-serif';
  ctx.fillText("Selected Landmark Works", pX, prjY + 135);

  // 4 Project Cards (2x2 Grid)
  const projectList = [
    {
      name: "Joy Ville Towers",
      loc: "Juja Farm, Kiambu",
      tag: "High-Rise Residential",
      summary: "15-floor high-rise residential apartment block.",
      img: images?.towers,
    },
    {
      name: "Mr. & Mrs. Mohammed Family Home",
      loc: "Kilifi, Kenya",
      tag: "Luxury Residential",
      summary: "12-bedroom luxury villa on 5 acres with Swahili coastal architecture.",
      img: images?.villa,
    },
    {
      name: "Bustani Apartments",
      loc: "Donholm, Nairobi",
      tag: "Investor ROI",
      summary: "4-floor multi-unit residential complex optimized for tenant yield.",
      img: images?.bustani,
    },
    {
      name: "Kilifi Waterfront Resort",
      loc: "Kilifi Coast, Kenya",
      tag: "Hospitality & Leisure",
      summary: "Eco-luxury oceanfront villas with sustainable solar microgrid.",
      img: images?.resort,
    },
  ];

  const pCardW = (contentW - 160 - 30) / 2;
  const pCardH = 540;

  projectList.forEach((p, idx) => {
    const colIdx = idx % 2;
    const rowIdx = Math.floor(idx / 2);
    const px = pX + colIdx * (pCardW + 30);
    const py = prjY + 180 + rowIdx * (pCardH + 30);

    fillRoundRect(px, py, pCardW, pCardH, 6, "#faf9f6", "#e5e7eb");

    // Project Photo Container (340px tall)
    const imgH = 340;
    if (p.img && p.img.complete && p.img.naturalWidth > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(px, py, pCardW, imgH, [6, 6, 0, 0]);
      ctx.clip();
      ctx.drawImage(p.img, px, py, pCardW, imgH);
      ctx.restore();
    } else {
      fillRoundRect(px, py, pCardW, imgH, 6, "#17191d");
      ctx.fillStyle = "#9ca3af";
      ctx.font = '600 14px "Space Mono", monospace';
      ctx.textAlign = "center";
      ctx.fillText("ARCHITECTURAL RENDERING", px + pCardW * 0.5, py + imgH * 0.5);
    }

    // Category Tag Pill
    fillRoundRect(px + 24, py + 24, 160, 32, 16, "rgba(23, 25, 29, 0.85)");
    ctx.fillStyle = "#d4af37"; // Champagne Gold
    ctx.font = '700 11px "Space Mono", monospace';
    ctx.textAlign = "center";
    ctx.fillText(p.tag.toUpperCase(), px + 104, py + 45);

    // Card Details Below Photo
    ctx.textAlign = "left";
    ctx.fillStyle = "#c85a32";
    ctx.font = '700 12px "Space Mono", monospace';
    ctx.fillText(p.loc.toUpperCase(), px + 28, py + imgH + 40);

    ctx.fillStyle = "#111827";
    ctx.font = '800 22px "Syne", "Montserrat", sans-serif';
    ctx.fillText(p.name, px + 28, py + imgH + 75);

    ctx.fillStyle = "#4b5563";
    ctx.font = '400 15px "Inter", sans-serif';
    ctx.fillText(p.summary, px + 28, py + imgH + 115);
  });

  /* ==========================================================================
     6. INDUSTRY BENCHMARKS SECTION (Y: 4640 - 5340)
     ========================================================================== */
  const bmkY = 4640;
  const bmkH = 700;

  fillRoundRect(padX, bmkY, contentW, bmkH, 8, "#17191d");

  const bX = padX + 80;
  ctx.textAlign = "left";

  // Eyebrow
  ctx.fillStyle = "#c85a32";
  ctx.font = '700 13px "Space Mono", monospace';
  ctx.fillText("INDUSTRY BENCHMARKS", bX, bmkY + 80);

  // H2 Headline
  ctx.fillStyle = "#ffffff";
  ctx.font = '800 38px "Syne", "Montserrat", sans-serif';
  ctx.fillText(
    "We hold our work to Kenya's leading consultancy standards.",
    bX,
    bmkY + 135
  );

  // 2 Consultancy Reference Cards
  const refW = (contentW - 160 - 30) / 2;
  const refH = 260;

  // Card 1: Integrum
  fillRoundRect(bX, bmkY + 180, refW, refH, 6, "#1f242d", "#2d333f");
  ctx.fillStyle = "#ffffff";
  ctx.font = '800 22px "Syne", "Montserrat", sans-serif';
  ctx.fillText("Integrum Construction Consultancy", bX + 32, bmkY + 235);

  ctx.fillStyle = "#9ca3af";
  ctx.font = '400 15px "Inter", sans-serif';
  ctx.fillText(
    "Referenced for consultancy-grade engineering standards and project",
    bX + 32,
    bmkY + 280
  );
  ctx.fillText(
    "documentation practice in Kenya.",
    bX + 32,
    bmkY + 310
  );

  ctx.fillStyle = "#c85a32";
  ctx.font = '700 14px "Space Mono", monospace';
  ctx.fillText("www.integrum.co.ke →", bX + 32, bmkY + 380);

  // Card 2: Rickfes
  fillRoundRect(bX + refW + 30, bmkY + 180, refW, refH, 6, "#1f242d", "#2d333f");
  ctx.fillStyle = "#ffffff";
  ctx.font = '800 22px "Syne", "Montserrat", sans-serif';
  ctx.fillText("Rickfes Construction", bX + refW + 62, bmkY + 235);

  ctx.fillStyle = "#9ca3af";
  ctx.font = '400 15px "Inter", sans-serif';
  ctx.fillText(
    "Referenced for local construction execution benchmarks and quality-",
    bX + refW + 62,
    bmkY + 280
  );
  ctx.fillText(
    "assurance workflows.",
    bX + refW + 62,
    bmkY + 310
  );

  ctx.fillStyle = "#c85a32";
  ctx.font = '700 14px "Space Mono", monospace';
  ctx.fillText("www.rickfes.co.ke →", bX + refW + 62, bmkY + 380);

  // Quantitative Metrics Strip Across Bottom
  const statY = bmkY + 490;
  fillRoundRect(bX, statY, contentW - 160, 120, 4, "#13161c", "#2d333f");

  const statItems = [
    { title: "100%", sub: "On-Site PPE & Safety Audits" },
    { title: "ISO 9001", sub: "Standard Quality Assurance" },
    { title: "0 Incidents", sub: "Lost-Time Safety Record" },
  ];
  const sItemW = (contentW - 160) / 3;
  statItems.forEach((st, i) => {
    ctx.textAlign = "center";
    ctx.fillStyle = "#d4af37";
    ctx.font = '800 32px "Syne", sans-serif';
    ctx.fillText(st.title, bX + i * sItemW + sItemW * 0.5, statY + 52);

    ctx.fillStyle = "#9ca3af";
    ctx.font = '600 12px "Space Mono", monospace';
    ctx.fillText(st.sub, bX + i * sItemW + sItemW * 0.5, statY + 86);
  });

  /* ==========================================================================
     7. EXECUTIVE LEADERSHIP SECTION (Y: 5480 - 6380)
     ========================================================================== */
  const teamY = 5480;
  const teamH = 900;

  fillRoundRect(padX, teamY, contentW, teamH, 8, "#ffffff", "#e5e7eb", 1.5);

  const tX = padX + 80;
  ctx.textAlign = "left";

  // Eyebrow
  ctx.fillStyle = "#c85a32";
  ctx.font = '700 13px "Space Mono", monospace';
  ctx.fillText("LEADERSHIP", tX, teamY + 80);

  // H2 Headline
  ctx.fillStyle = "#111827";
  ctx.font = '800 38px "Syne", "Montserrat", sans-serif';
  ctx.fillText("The executive team behind every build.", tX, teamY + 135);

  const teamMembers = [
    { name: "Noel Kamau", role: "Project Manager & Managing Director" },
    { name: "Lilian Maruti", role: "Civil Engineer — H.O.D Civil & Structural Design" },
    { name: "G.N Kamau", role: "Architect — H.O.D Architectural & Interior Design" },
    { name: "Lui Bahati", role: "Quantity Surveyor — H.O.D Valuation & Costing" },
    { name: "Jeremy Kiprotich", role: "Legal & Statutory Lead" },
    { name: "Dennis Kimani", role: "Sustainability & Environmental Lead" },
  ];

  const tCardW = (contentW - 160 - 40) / 3;
  const tCardH = 260;

  teamMembers.forEach((m, idx) => {
    const colIdx = idx % 3;
    const rowIdx = Math.floor(idx / 3);
    const tx = tX + colIdx * (tCardW + 20);
    const ty = teamY + 180 + rowIdx * (tCardH + 20);

    fillRoundRect(tx, ty, tCardW, tCardH, 4, "#faf9f6", "#e5e7eb");

    // Initials Circular Badge in Champagne Gold
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(tx + 56, ty + 60, 28, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = "#d4af37";
    ctx.font = '800 16px "Syne", sans-serif';
    ctx.textAlign = "center";
    const initials = m.name
      .split(" ")
      .map((p) => p[0])
      .join("");
    ctx.fillText(initials, tx + 56, ty + 66);

    // Name & Role
    ctx.textAlign = "left";
    ctx.fillStyle = "#111827";
    ctx.font = '800 20px "Syne", "Montserrat", sans-serif';
    ctx.fillText(m.name, tx + 28, ty + 135);

    ctx.fillStyle = "#4b5563";
    ctx.font = '400 14px "Inter", sans-serif';
    ctx.fillText(m.role, tx + 28, ty + 175);
  });

  /* ==========================================================================
     8. QUOTATION CALCULATOR & BOQ-01 SECTION (Y: 6520 - 7520)
     ========================================================================== */
  const quoteY = 6520;
  const quoteH = 1000;

  fillRoundRect(padX, quoteY, contentW, quoteH, 8, "#17191d");

  const qX = padX + 80;
  ctx.textAlign = "left";

  // Eyebrow
  ctx.fillStyle = "#c85a32";
  ctx.font = '700 13px "Space Mono", monospace';
  ctx.fillText("QUOTATION CALCULATOR", qX, quoteY + 80);

  // H2 Headline
  ctx.fillStyle = "#ffffff";
  ctx.font = '800 38px "Syne", "Montserrat", sans-serif';
  ctx.fillText("Get a costed starting point today.", qX, quoteY + 135);

  ctx.fillStyle = "#9ca3af";
  ctx.font = '400 17px "Inter", sans-serif';
  ctx.fillText(
    "Fill in three details and we will open WhatsApp with your brief already drafted. No forms lost in an inbox.",
    qX,
    quoteY + 185
  );

  // Left Column: 4 Steps
  const qLeftW = 740;
  const steps = [
    "Share your project type, budget range and site location.",
    "We reply on WhatsApp with a preliminary cost band and required drawings.",
    "Site visit, measured survey and a full bill of quantities.",
    "Signed contract, programme of works and construction start.",
  ];

  steps.forEach((step, sIdx) => {
    const sy = quoteY + 260 + sIdx * 90;
    ctx.strokeStyle = "#2d333f";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(qX, sy);
    ctx.lineTo(qX + qLeftW, sy);
    ctx.stroke();

    ctx.fillStyle = "#d4af37"; // Champagne Gold
    ctx.font = '800 16px "Syne", sans-serif';
    ctx.fillText(String(sIdx + 1).padStart(2, "0"), qX, sy + 38);

    ctx.fillStyle = "#d1d5db";
    ctx.font = '400 16px "Inter", sans-serif';
    ctx.fillText(step, qX + 50, sy + 38);
  });

  // Direct Contact Info
  ctx.fillStyle = "#9ca3af";
  ctx.font = '400 15px "Inter", sans-serif';
  ctx.fillText(
    "Prefer to talk? Tel: +254 722 112 807 · Email: asterisk.construction.1@gmail.com",
    qX,
    quoteY + 680
  );

  // Right Column: FORM BOQ-01 Specification Box
  const formBoxX = qX + qLeftW + 80;
  const formBoxW = contentW - qLeftW - 240;
  const formBoxH = 680;

  fillRoundRect(
    formBoxX,
    quoteY + 230,
    formBoxW,
    formBoxH,
    6,
    "#1f242d",
    "#2d333f"
  );

  // Form Header Banner in Warm Terracotta
  fillRoundRect(
    formBoxX,
    quoteY + 230,
    formBoxW,
    50,
    6,
    "#c85a32"
  );
  ctx.fillStyle = "#ffffff";
  ctx.font = '700 13px "Space Mono", monospace';
  ctx.letterSpacing = "2px";
  ctx.fillText(
    "FORM BOQ-01: PROJECT PARAMETERS",
    formBoxX + 24,
    quoteY + 262
  );

  const formFields = [
    {
      label: "PROJECT TYPE",
      val: "[X] Commercial Office   [ ] Residential   [ ] Infrastructure",
    },
    {
      label: "ESTIMATED BUDGET",
      val: "[ ] Under KES 20M     [X] KES 20M - 100M  [ ] KES 100M+",
    },
    {
      label: "PROJECT LOCATION",
      val: "Nairobi County, Kiambu, Mombasa, or Pan-Africa",
    },
    {
      label: "DIRECT INQUIRY",
      val: "+254 722 112 807  ·  WhatsApp Instant Quote",
    },
    {
      label: "PRIMARY TENDER INBOX",
      val: "asterisk.construction.1@gmail.com  ·  The Oval, Nairobi",
    },
  ];

  formFields.forEach((f, idx) => {
    const fy = quoteY + 310 + idx * 80;
    ctx.strokeStyle = "#2d333f";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(formBoxX + 24, fy + 58);
    ctx.lineTo(formBoxX + formBoxW - 24, fy + 58);
    ctx.stroke();

    ctx.fillStyle = "#9ca3af";
    ctx.font = '700 11px "Space Mono", monospace';
    ctx.fillText(f.label, formBoxX + 24, fy + 24);

    ctx.fillStyle = "#ffffff";
    ctx.font = '600 13px "Space Mono", monospace';
    ctx.fillText(f.val, formBoxX + 24, fy + 48);
  });

  // Big WhatsApp Quote CTA Button inside form
  fillRoundRect(
    formBoxX + 24,
    quoteY + 770,
    formBoxW - 48,
    60,
    4,
    "#c85a32"
  );
  ctx.fillStyle = "#ffffff";
  ctx.font = '800 15px "Inter", sans-serif';
  ctx.textAlign = "center";
  ctx.fillText(
    "REQUEST QUOTE ON WHATSAPP →",
    formBoxX + formBoxW * 0.5,
    quoteY + 807
  );

  /* ==========================================================================
     9. FOOTER & CREDENTIALS SECTION (Y: 7660 - 8460)
     ========================================================================== */
  const footerY = 7660;
  const footerH = 800;

  fillRoundRect(padX, footerY, contentW, footerH, 8, "#13161c");

  const ftX = padX + 80;
  ctx.textAlign = "left";

  // Footer Brand Wordmark
  ctx.fillStyle = "#ffffff";
  ctx.font = '800 26px "Syne", "Montserrat", sans-serif';
  ctx.letterSpacing = "2px";
  ctx.fillText("ASTERISK CONSTRUCTION", ftX, footerY + 80);

  ctx.fillStyle = "#d4af37";
  ctx.font = '600 15px "Inter", sans-serif';
  ctx.fillText("Building Africa's Future, Today.", ftX, footerY + 115);

  ctx.fillStyle = "#9ca3af";
  ctx.font = '400 15px "Inter", sans-serif';
  ctx.fillText("The Oval, Ring Road Parklands, Westlands, Nairobi, Kenya", ftX, footerY + 160);
  ctx.fillText("Email: asterisk.construction.1@gmail.com", ftX, footerY + 190);
  ctx.fillText("Direct: +254 722 112 807", ftX, footerY + 220);

  // Authentication Registry Seal (Center Bottom)
  const sealX = width * 0.5;
  const sealY = footerY + 480;

  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(sealX, sealY, 68, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(sealX, sealY, 58, 0, Math.PI * 2);
  ctx.stroke();

  ctx.save();
  ctx.translate(sealX, sealY);
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2.2;
  for (let a = 0; a < 8; a++) {
    ctx.rotate(Math.PI / 4);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 32);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 36, 3, 0, Math.PI * 2);
    ctx.fillStyle = a % 2 === 0 ? "#c85a32" : "#d4af37";
    ctx.fill();
  }
  ctx.restore();

  // Seal Subtext
  ctx.font = '700 11px "Space Mono", monospace';
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.letterSpacing = "2px";
  ctx.fillText(
    "AUTHENTICATED · ASTERISK CONSTRUCTION · ARCHITECTURAL REGISTRY · 2026",
    sealX,
    sealY + 92
  );

  // Copyright Line
  ctx.fillStyle = "#6b7280";
  ctx.font = '400 13px "Inter", sans-serif';
  ctx.fillText(
    "© 2026 Asterisk Construction Limited. All rights reserved.",
    sealX,
    sealY + 130
  );

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}
