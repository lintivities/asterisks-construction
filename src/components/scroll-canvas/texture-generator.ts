import * as THREE from "three";

/**
 * Procedural High-Definition Canvas Generator for Asterisks Construction.
 * Retrofits all website sections onto an architectural folio canvas texture.
 * Features crisp typography, CAD elevation drawings, project cards, and quotation specifications.
 */
export function createAsterisksFolioCanvas(
  width = 2048,
  height = 8192
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Unable to obtain 2D rendering context for canvas");
  }

  // Pure white base for multiply blend with paper texture
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  // Outer CAD Technical Border
  ctx.strokeStyle = "#111827";
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, width - 80, height - 80);

  ctx.strokeStyle = "#e5e7eb";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(52, 52, width - 104, height - 104);

  // Registration crosshairs
  function drawCrosshair(x: number, y: number) {
    if (!ctx) return;
    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - 16, y);
    ctx.lineTo(x + 16, y);
    ctx.moveTo(x, y - 16);
    ctx.lineTo(x, y + 16);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.stroke();
  }

  drawCrosshair(40, 40);
  drawCrosshair(width - 40, 40);
  drawCrosshair(40, height - 40);
  drawCrosshair(width - 40, height - 40);

  // Coordinate indicators along border margins
  ctx.fillStyle = "#6b7280";
  ctx.font = '600 13px "Space Mono", monospace';
  const gridTicks = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L"];
  gridTicks.forEach((tick, i) => {
    const x = 120 + i * ((width - 240) / (gridTicks.length - 1));
    ctx.fillText(tick, x - 5, 30);
    ctx.fillText(tick, x - 5, height - 20);
    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, 34);
    ctx.lineTo(x, 40);
    ctx.moveTo(x, height - 40);
    ctx.lineTo(x, height - 34);
    ctx.stroke();
  });

  // Dimension line utility
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
    ctx.beginPath();
    ctx.moveTo(x1 - 4, y1 - 4);
    ctx.lineTo(x1 + 4, y1 + 4);
    ctx.moveTo(x2 - 4, y2 - 4);
    ctx.lineTo(x2 + 4, y2 + 4);
    ctx.stroke();
    ctx.font = '600 12px "Space Mono", monospace';
    ctx.textAlign = "center";
    ctx.fillText(label, (x1 + x2) * 0.5, (y1 + y2) * 0.5 - 6);
    ctx.restore();
  }

  // Text wrapper utility
  function wrapText(
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ): number {
    if (!ctx) return y;
    const words = text.split(" ");
    let line = "";
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line, x, y);
        line = words[n] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);
    return y + lineHeight;
  }

  // Section heading utility
  function drawSectionHeader(
    numberStr: string,
    titleStr: string,
    subtitleStr: string,
    y: number
  ) {
    if (!ctx) return;
    ctx.fillStyle = "#111827";
    ctx.font = '700 13px "Space Mono", monospace';
    ctx.textAlign = "left";
    ctx.fillText(numberStr, 90, y);

    ctx.font = '800 36px "Cinzel", serif';
    ctx.fillText(titleStr, 90, y + 42);

    ctx.font = 'italic 16px "Playfair Display", serif';
    ctx.fillStyle = "#4b5563";
    ctx.fillText(subtitleStr, 90, y + 74);

    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(90, y + 92);
    ctx.lineTo(width - 90, y + 92);
    ctx.stroke();
  }

  /* ==========================================================================
     SECTION I: HERO & ARCHITECTURAL MASTHEAD (0 - 1,150px)
     ========================================================================== */
  ctx.fillStyle = "#111827";
  ctx.font = '700 14px "Space Mono", monospace';
  ctx.textAlign = "center";
  ctx.fillText(
    "ASTERISKS CONSTRUCTION · NAIROBI · PAN-AFRICAN ARCHIVE",
    width * 0.5,
    110
  );

  ctx.font = '800 54px "Cinzel", serif';
  ctx.letterSpacing = "2px";
  ctx.fillText("BUILDING AFRICA'S FUTURE, TODAY", width * 0.5, 185);

  ctx.font = 'italic 18px "Playfair Display", serif';
  ctx.fillStyle = "#4b5563";
  ctx.fillText(
    "Sustainable Residential, Commercial & Infrastructure Design-Build Excellence",
    width * 0.5,
    228
  );

  ctx.strokeStyle = "#111827";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(180, 260);
  ctx.lineTo(width - 180, 260);
  ctx.stroke();

  // Metrics Stat Box
  const metricY = 300;
  const metricWidth = (width - 240) / 4;
  const metrics = [
    { num: "50+", label: "PROJECTS DELIVERED", sub: "East & Central Africa" },
    { num: "15+", label: "YEARS MASTERY", sub: "Since 2011 Inception" },
    { num: "Ksh 12B+", label: "PROJECT PORTFOLIO", sub: "Total Asset Value" },
    { num: "98%", label: "ON-TIME COMPLETION", sub: "Precision Delivery" },
  ];

  metrics.forEach((m, idx) => {
    const mx = 120 + idx * metricWidth;
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    ctx.strokeRect(mx, metricY, metricWidth - 20, 110);

    ctx.fillStyle = "#111827";
    ctx.font = '800 34px "Space Mono", monospace';
    ctx.textAlign = "center";
    ctx.fillText(m.num, mx + (metricWidth - 20) * 0.5, metricY + 45);

    ctx.font = '700 12px "Space Mono", monospace';
    ctx.fillText(m.label, mx + (metricWidth - 20) * 0.5, metricY + 74);

    ctx.font = '400 11px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = "#6b7280";
    ctx.fillText(m.sub, mx + (metricWidth - 20) * 0.5, metricY + 95);
  });

  // Hero CAD Elevation Blueprint Drawing
  const heroCadY = 470;
  ctx.strokeStyle = "#111827";
  ctx.lineWidth = 2.5;

  // Modernist cantilever roof structure
  ctx.beginPath();
  ctx.moveTo(120, heroCadY + 70);
  ctx.lineTo(width * 0.5, heroCadY + 30);
  ctx.lineTo(width - 120, heroCadY + 80);
  ctx.lineTo(width - 120, heroCadY + 105);
  ctx.lineTo(width * 0.5, heroCadY + 55);
  ctx.lineTo(120, heroCadY + 95);
  ctx.closePath();
  ctx.fillStyle = "#f8fafc";
  ctx.fill();
  ctx.stroke();

  // Columns & mullion framing
  const groundDatumY = heroCadY + 360;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(90, groundDatumY);
  ctx.lineTo(width - 90, groundDatumY);
  ctx.stroke();

  for (let c = 0; c < 11; c++) {
    const colX = 160 + c * ((width - 320) / 10);
    ctx.fillStyle = "#111827";
    ctx.fillRect(colX - 4, heroCadY + 55, 8, groundDatumY - (heroCadY + 55));
  }

  // Curtain glass lines
  ctx.strokeStyle = "#cbd5e1";
  ctx.lineWidth = 1;
  for (let gy = heroCadY + 110; gy < groundDatumY; gy += 32) {
    ctx.beginPath();
    ctx.moveTo(140, gy);
    ctx.lineTo(width - 140, gy);
    ctx.stroke();
  }

  drawDimensionLine(
    120,
    heroCadY + 15,
    width - 120,
    heroCadY + 15,
    "64,000 MM MASTER STRUCTURAL SPAN"
  );
  drawDimensionLine(
    width - 70,
    heroCadY + 30,
    width - 70,
    groundDatumY,
    "15,200 MM CLEAR HEIGHT"
  );

  /* ==========================================================================
     SECTION II: ABOUT & DESIGN-BUILD PHILOSOPHY (1,200 - 2,100px)
     ========================================================================== */
  const aboutY = 1180;
  drawSectionHeader(
    "SECTION 01 // ARCHITECTURAL INTENT",
    "PIONEERING SUSTAINABLE DESIGN-BUILD EXCELLENCE",
    "Integrated Architecture, Engineering & Turnkey Project Delivery",
    aboutY
  );

  const aboutTextY = aboutY + 130;
  const colW = (width - 240) * 0.48;

  ctx.fillStyle = "#1f2937";
  ctx.font = '400 16px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = "left";

  const aboutP1 =
    "Asterisks Construction is a premier Nairobi-based design-and-build firm delivering landmark residential towers, bespoke commercial headquarters, and high-resilience infrastructure projects across Kenya and the wider Pan-African continent. Founded on principles of architectural integrity, structural honesty, and uncompromising safety, we unite architectural visionary concepts with rigorous ground execution.";
  const aboutP2 =
    "From site analysis and environmental impact assessments through architectural drafting, post-tensioned structural engineering, and procurement to final turnkey handover, our multidisciplinary team eliminates contractor fragmentation, guaranteeing on-time, on-budget delivery with zero compromise.";

  wrapText(aboutP1, 100, aboutTextY, colW, 26);
  wrapText(aboutP2, 100 + colW + 40, aboutTextY, colW, 26);

  // 4 Core Pillars Grid
  const pillarY = aboutTextY + 220;
  const pillars = [
    {
      num: "01",
      title: "INTEGRATED DELIVERY",
      desc: "Architects, engineers, and quantity surveyors operating under a single unified BIM protocol.",
    },
    {
      num: "02",
      title: "SUSTAINABILITY & ESG",
      desc: "Low-carbon concrete mixes, passive shading, greywater harvesting, and LEED Gold compliance.",
    },
    {
      num: "03",
      title: "PRECISION ENGINEERING",
      desc: "Laser-guided site levelling, post-tensioned floor plates, and certified structural steel fabrication.",
    },
    {
      num: "04",
      title: "LOCAL EMPOWERMENT",
      desc: "Over 85% regional material sourcing, vocational apprenticeship programs, and Kenyan artisan mastery.",
    },
  ];

  const pillarW = (width - 240) / 4;
  pillars.forEach((p, idx) => {
    const px = 100 + idx * pillarW;
    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(px, pillarY, pillarW - 20, 160);

    ctx.fillStyle = "#111827";
    ctx.font = '700 14px "Space Mono", monospace';
    ctx.fillText(p.num, px + 18, pillarY + 34);

    ctx.font = '800 14px "Cinzel", serif';
    ctx.fillText(p.title, px + 18, pillarY + 62);

    ctx.font = '400 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = "#4b5563";
    wrapText(p.desc, px + 18, pillarY + 90, pillarW - 56, 18);
  });

  /* ==========================================================================
     SECTION III: COMPREHENSIVE SERVICES (2,150 - 3,300px)
     ========================================================================== */
  const servicesY = 2150;
  drawSectionHeader(
    "SECTION 02 // PRACTICE DISCIPLINES",
    "END-TO-END CAPABILITIES & SPECIALIZATIONS",
    "From Master Planning to Turnkey Commissioning",
    servicesY
  );

  const services = [
    {
      id: "SPEC 2.1",
      title: "ARCHITECTURAL DESIGN & MASTER PLANNING",
      scope:
        "Comprehensive architectural schematics, photorealistic 3D visualization, municipal approvals, and BIM Level 2 documentation for complex urban developments.",
      specs: [
        "Revit / ArchiCAD BIM Collaboration",
        "Climatic & Solar Study Modeling",
        "Council NEMA & County Permitting",
      ],
    },
    {
      id: "SPEC 2.2",
      title: "CIVIL & STRUCTURAL ENGINEERING",
      scope:
        "Advanced structural analysis, seismic resistance engineering, deep pile foundation designs, and post-tensioned concrete solutions for high-load structures.",
      specs: [
        "Seismic Zone 2 Engineering Analysis",
        "Bored Piles & Retaining Basements",
        "Post-Tensioned Flat Slabs",
      ],
    },
    {
      id: "SPEC 2.3",
      title: "GENERAL CONSTRUCTION & PROJECT MANAGEMENT",
      scope:
        "Direct-hire site supervision, rigorous material testing, supply-chain logistics, and turnkey general contracting ensuring zero compromise on safety.",
      specs: [
        "ISO 9001 Quality Control Protocols",
        "Rigorous Milestone Tracking",
        "Turnkey Handover Warranties",
      ],
    },
    {
      id: "SPEC 2.4",
      title: "COMMERCIAL FITOUTS & INFRASTRUCTURE",
      scope:
        "Interior architectural fitouts, structural steel mezzanines, MEP mechanical/electrical design, and industrial logistics facilities across Kenya.",
      specs: [
        "Acoustic Ceiling & Wall Assemblies",
        "Industrial Hardened Flooring",
        "Renewable Rooftop Solar Integration",
      ],
    },
  ];

  const serviceBoxW = (width - 240) * 0.48;
  services.forEach((s, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const sx = 100 + col * (serviceBoxW + 40);
    const sy = servicesY + 130 + row * 270;

    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 2;
    ctx.strokeRect(sx, sy, serviceBoxW, 240);

    ctx.fillStyle = "#111827";
    ctx.font = '700 12px "Space Mono", monospace';
    ctx.fillText(s.id, sx + 24, sy + 34);

    ctx.font = '800 18px "Cinzel", serif';
    ctx.fillText(s.title, sx + 24, sy + 64);

    ctx.font = '400 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = "#374151";
    wrapText(s.scope, sx + 24, sy + 92, serviceBoxW - 48, 20);

    // Bullet points
    ctx.fillStyle = "#111827";
    ctx.font = '600 11px "Space Mono", monospace';
    s.specs.forEach((sp, i) => {
      ctx.fillText(`+ ${sp}`, sx + 24, sy + 175 + i * 20);
    });
  });

  /* ==========================================================================
     SECTION IV: FEATURED PROJECTS (3,350 - 4,800px)
     ========================================================================== */
  const projectsY = 3350;
  drawSectionHeader(
    "SECTION 03 // PORTFOLIO ARCHIVE",
    "LANDMARK RESIDENTIAL & COMMERCIAL MONOLITHS",
    "Selected Built Works across Nairobi & Kenya",
    projectsY
  );

  const projectWorks = [
    {
      code: "PRJ-01",
      name: "THE HORIZON COMMERCIAL TOWER",
      location: "Westlands, Nairobi",
      stats: "22 Floors · 34,000 sqm · Commercial Grade-A",
      desc: "Post-tensioned office tower featuring double-skin climatic glass facade and automated subterranean parking.",
      diagram: "elevation",
    },
    {
      code: "PRJ-02",
      name: "RIVERSIDE ECO-RESIDENCES",
      location: "Riverside Drive, Nairobi",
      stats: "48 Units · 4 Blocks · Biophilic Residential",
      desc: "Bespoke luxury residences incorporating passive cross-ventilation, rainwater reclamation, and local bamboo timber screens.",
      diagram: "section",
    },
    {
      code: "PRJ-03",
      name: "KAREN LOGISTICS & DISTRIBUTION HUB",
      location: "Karen / Southern Bypass",
      stats: "35,000 sqm · High-Bay Steel Warehouse",
      desc: "Heavy industrial facility built with 40m clear-span structural trusses and 12-ton laser-leveled floor slabs.",
      diagram: "plan",
    },
    {
      code: "PRJ-04",
      name: "MUTHAIGA CONTEMPORARY VILLA",
      location: "Muthaiga Estate, Nairobi",
      stats: "1,200 sqm · Private Sustainable Estate",
      desc: "Cantilevered board-formed architectural concrete residence with infinity water retention pond and solar micro-grid.",
      diagram: "isometric",
    },
  ];

  projectWorks.forEach((prj, idx) => {
    const py = projectsY + 130 + idx * 320;

    // Card frame
    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(100, py, width - 200, 280);

    // Left info block
    ctx.fillStyle = "#111827";
    ctx.font = '700 13px "Space Mono", monospace';
    ctx.fillText(
      `${prj.code} // ${prj.location.toUpperCase()}`,
      130,
      py + 40
    );

    ctx.font = '800 24px "Cinzel", serif';
    ctx.fillText(prj.name, 130, py + 78);

    ctx.font = '600 13px "Space Mono", monospace';
    ctx.fillStyle = "#4b5563";
    ctx.fillText(prj.stats, 130, py + 108);

    ctx.font = '400 14px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = "#374151";
    wrapText(prj.desc, 130, py + 140, (width - 260) * 0.52, 22);

    // Right CAD schematic diagram inside project card
    const diagX = width - 480;
    const diagY = py + 30;
    const diagW = 340;
    const diagH = 220;

    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1;
    ctx.strokeRect(diagX, diagY, diagW, diagH);

    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 1.8;

    if (idx === 0) {
      // Horizon Tower elevation sketch
      ctx.strokeRect(diagX + 110, diagY + 20, 120, 180);
      for (let f = diagY + 40; f < diagY + 200; f += 18) {
        ctx.beginPath();
        ctx.moveTo(diagX + 110, f);
        ctx.lineTo(diagX + 230, f);
        ctx.stroke();
      }
    } else if (idx === 1) {
      // Residential blocks
      ctx.strokeRect(diagX + 40, diagY + 60, 110, 130);
      ctx.strokeRect(diagX + 190, diagY + 40, 110, 150);
    } else if (idx === 2) {
      // Warehouse truss
      ctx.beginPath();
      ctx.moveTo(diagX + 20, diagY + 120);
      ctx.lineTo(diagX + 170, diagY + 40);
      ctx.lineTo(diagX + 320, diagY + 120);
      ctx.stroke();
      ctx.strokeRect(diagX + 40, diagY + 120, 260, 80);
    } else {
      // Cantilever villa
      ctx.strokeRect(diagX + 30, diagY + 90, 280, 50);
      ctx.strokeRect(diagX + 80, diagY + 40, 180, 50);
      ctx.fillStyle = "#111827";
      ctx.fillRect(diagX + 60, diagY + 140, 16, 60);
      ctx.fillRect(diagX + 260, diagY + 140, 16, 60);
    }

    ctx.fillStyle = "#6b7280";
    ctx.font = '600 10px "Space Mono", monospace';
    ctx.textAlign = "center";
    ctx.fillText("CAD SCHEMATIC REF", diagX + diagW * 0.5, diagY + diagH - 10);
    ctx.textAlign = "left";
  });

  /* ==========================================================================
     SECTION V: BENCHMARKS & TEAM SIGNATURES (4,850 - 6,000px)
     ========================================================================== */
  const benchY = 4850;
  drawSectionHeader(
    "SECTION 04 // ENGINEERING STANDARDS & LEADERSHIP",
    "TECHNICAL BENCHMARKS & MASTER BUILDERS",
    "Structural Quality Verification and Executive Governance",
    benchY
  );

  // Standards Table
  const tableY = benchY + 130;
  ctx.strokeStyle = "#111827";
  ctx.lineWidth = 2;
  ctx.strokeRect(100, tableY, width - 200, 210);

  ctx.fillStyle = "#f8fafc";
  ctx.fillRect(101, tableY + 1, width - 202, 42);

  ctx.fillStyle = "#111827";
  ctx.font = '700 13px "Space Mono", monospace';
  ctx.fillText("PARAMETER", 130, tableY + 28);
  ctx.fillText("TECHNICAL CRITERIA", 460, tableY + 28);
  ctx.fillText("CERTIFYING BODY", 1150, tableY + 28);
  ctx.fillText("COMPLIANCE", width - 260, tableY + 28);

  const benchmarkRows = [
    [
      "CONCRETE COMPRESSIVE STRENGTH",
      "C35/45 Ready-Mix Batch Testing",
      "KEBS / ACI 318-19",
      "100% PASSED",
    ],
    [
      "STRUCTURAL STEEL YIELD STRESS",
      "S355 JR Hot-Rolled Sections",
      "BS EN 10025-2",
      "CERTIFIED",
    ],
    [
      "OCCUPATIONAL HEALTH & SAFETY",
      "Zero Lost Time Injuries (1.8M Hours)",
      "OSHA / DOSHS Kenya",
      "GRADE AAA",
    ],
    [
      "SUSTAINABILITY & EFFICIENCY",
      "LEED Gold & EDGE Advanced Standards",
      "Kenya Green Building Society",
      "VERIFIED",
    ],
  ];

  ctx.font = '400 13px "Space Mono", monospace';
  benchmarkRows.forEach((row, idx) => {
    const ry = tableY + 76 + idx * 40;
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(100, ry - 18);
    ctx.lineTo(width - 100, ry - 18);
    ctx.stroke();

    const [col0 = "", col1 = "", col2 = "", col3 = ""] = row;
    ctx.fillStyle = idx === 0 ? "#111827" : "#374151";
    ctx.fillText(col0, 130, ry);
    ctx.fillText(col1, 460, ry);
    ctx.fillText(col2, 1150, ry);
    ctx.fillText(col3, width - 260, ry);
  });

  // Leadership Team Section
  const teamY = tableY + 280;
  ctx.font = '800 22px "Cinzel", serif';
  ctx.fillStyle = "#111827";
  ctx.fillText("EXECUTIVE DIRECTORS & CHIEF ENGINEERS", 100, teamY);

  const teamMembers = [
    {
      name: "ARCH. DAVID MWANGI",
      role: "Managing Director & Principal Architect",
      reg: "B.Arch (UoN), BORAQS Reg. A784",
    },
    {
      name: "ENG. SARAH ODHIAMBO",
      role: "Chief Structural Engineer",
      reg: "M.Sc Structural Eng, EBK Reg. E1240",
    },
    {
      name: "SAMUEL KIPRONO",
      role: "Project Director & BIM Lead",
      reg: "B.Sc Construction Mgmt, IQSK Reg.",
    },
    {
      name: "AMINA HASSAN",
      role: "Head of ESG & Sustainability",
      reg: "LEED AP BD+C, EDGE Expert",
    },
  ];

  const teamW = (width - 240) / 4;
  teamMembers.forEach((t, idx) => {
    const tx = 100 + idx * teamW;
    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(tx, teamY + 25, teamW - 20, 140);

    ctx.fillStyle = "#111827";
    ctx.font = '800 15px "Cinzel", serif';
    ctx.fillText(t.name, tx + 18, teamY + 60);

    ctx.font = '600 12px "Space Mono", monospace';
    ctx.fillStyle = "#4b5563";
    wrapText(t.role, tx + 18, teamY + 84, teamW - 56, 18);

    ctx.font = '400 11px "Space Mono", monospace';
    ctx.fillStyle = "#6b7280";
    ctx.fillText(t.reg, tx + 18, teamY + 140);
  });

  /* ==========================================================================
     SECTION VI: QUOTATION SPECIFICATION BLOCK (6,050 - 7,200px)
     ========================================================================== */
  const quoteY = 6050;
  drawSectionHeader(
    "SECTION 05 // PROJECT COMMISSIONING",
    "REQUEST A FORMAL PROJECT SPECIFICATION & QUOTE",
    "Submit Project Scope for Bill of Quantities & Structural Feasibility",
    quoteY
  );

  const quoteBoxY = quoteY + 130;
  const quoteBoxW = width - 200;
  const quoteBoxH = 460;

  ctx.strokeStyle = "#111827";
  ctx.lineWidth = 2.5;
  ctx.strokeRect(100, quoteBoxY, quoteBoxW, quoteBoxH);

  ctx.fillStyle = "#f8fafc";
  ctx.fillRect(101, quoteBoxY + 1, quoteBoxW - 2, 45);

  ctx.fillStyle = "#111827";
  ctx.font = '700 13px "Space Mono", monospace';
  ctx.fillText(
    "FORM BOQ-01: PROJECT PARAMETERS & INQUIRY SPECIFICATION",
    130,
    quoteBoxY + 30
  );

  // Form Fields rendered directly on paper canvas
  const formFields = [
    {
      label: "PROJECT CLASSIFICATION",
      val: "[X] Commercial Office  [ ] Multi-Family Residential  [ ] Industrial Hub  [ ] Private Estate",
    },
    {
      label: "TARGET GROSS FLOOR AREA",
      val: "[ ] Under 1,000 sqm    [X] 1,000 - 5,000 sqm        [ ] 5,000 - 20,000 sqm  [ ] 20,000+ sqm",
    },
    {
      label: "ENGAGEMENT SCOPE",
      val: "[X] Complete Design-Build  [ ] Structural Engineering Only  [ ] Turnkey Construction",
    },
    {
      label: "PROJECT LOCATION / COUNTY",
      val: "Nairobi County, Kiambu, Machakos, Mombasa, Coastal Region or Pan-Africa",
    },
    {
      label: "DIRECT INQUIRY & WHATSAPP",
      val: "Tel: +254 722 112 807  ·  WhatsApp Instant Quote: +254 722 112 807",
    },
    {
      label: "SUBMISSION DESTINATION",
      val: "Email: asterisk.construction.1@gmail.com  ·  The Oval, Westlands, Nairobi",
    },
  ];

  formFields.forEach((field, idx) => {
    const fy = quoteBoxY + 80 + idx * 60;
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(130, fy + 42);
    ctx.lineTo(width - 130, fy + 42);
    ctx.stroke();

    ctx.fillStyle = "#6b7280";
    ctx.font = '700 11px "Space Mono", monospace';
    ctx.fillText(field.label, 130, fy + 16);

    ctx.fillStyle = "#111827";
    ctx.font = '600 13px "Space Mono", monospace';
    ctx.fillText(field.val, 130, fy + 36);
  });

  /* ==========================================================================
     SECTION VII: FOOTER & AUTHENTICATION SEAL (7,250 - 8,100px)
     ========================================================================== */
  const footerY = 7280;

  // Concentric Authentication Registry Seal
  const sealX = width * 0.5;
  const sealY = footerY + 180;

  ctx.strokeStyle = "#111827";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(sealX, sealY, 110, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(sealX, sealY, 96, 0, Math.PI * 2);
  ctx.stroke();

  ctx.save();
  ctx.translate(sealX, sealY);
  ctx.strokeStyle = "#111827";
  ctx.lineWidth = 3.5;
  for (let a = 0; a < 8; a++) {
    ctx.rotate(Math.PI / 4);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 56);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 62, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#111827";
    ctx.fill();
  }
  ctx.restore();

  ctx.font = '700 13px "Space Mono", monospace';
  ctx.fillStyle = "#111827";
  ctx.textAlign = "center";
  ctx.fillText(
    "AUTHENTICATED ARCHIVAL REGISTRY · ASTERISKS CONSTRUCTION LTD",
    sealX,
    sealY + 155
  );

  ctx.font = '400 12px "Space Mono", monospace';
  ctx.fillStyle = "#4b5563";
  ctx.fillText(
    "The Oval, 5th Floor, Ring Road Parklands, Westlands · Nairobi, Kenya",
    sealX,
    sealY + 180
  );
  ctx.fillText(
    "Registered with NCA Category 1 (Building Works) · ISO 9001:2015 Accredited",
    sealX,
    sealY + 204
  );

  ctx.strokeStyle = "#111827";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(sealX - 200, sealY + 240);
  ctx.lineTo(sealX + 200, sealY + 240);
  ctx.stroke();

  ctx.font = '600 11px "Space Mono", monospace';
  ctx.fillStyle = "#6b7280";
  ctx.fillText(
    "© 2026 ASTERISKS CONSTRUCTION. ALL RIGHTS RESERVED · BUILDING AFRICA'S FUTURE",
    sealX,
    sealY + 268
  );

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}
