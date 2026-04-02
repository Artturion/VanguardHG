// ============================================================
//  VANGUARD — Figma Components Builder
//  Creates: Nav, Cards, Stats, Image Placeholder, CTA Banner, Footer
//
//  How to run:
//  1. In Figma: Plugins > Development > Open Console
//  2. Paste this entire script and press Enter
// ============================================================

async function buildVanguardComponents() {

  // ── Load all fonts first ───────────────────────────────────
  await Promise.all([
    figma.loadFontAsync({ family: "Inter", style: "Regular" }),
    figma.loadFontAsync({ family: "Inter", style: "Medium" }),
    figma.loadFontAsync({ family: "Inter", style: "Semi Bold" }),
    figma.loadFontAsync({ family: "Inter", style: "Bold" }),
    figma.loadFontAsync({ family: "Inter", style: "Extra Bold" }),
  ]);

  // ── Color palette ──────────────────────────────────────────
  const C = {
    greenMain:  { r: 79/255,  g: 164/255, b: 45/255  },
    greenDark:  { r: 0,       g: 110/255, b: 15/255  },
    greenBg:    { r: 240/255, g: 249/255, b: 235/255 },
    white:      { r: 1,       g: 1,       b: 1       },
    gray100:    { r: 243/255, g: 244/255, b: 246/255 },
    gray200:    { r: 229/255, g: 231/255, b: 235/255 },
    gray400:    { r: 156/255, g: 163/255, b: 175/255 },
    gray700:    { r: 55/255,  g: 65/255,  b: 81/255  },
    gray900:    { r: 17/255,  g: 24/255,  b: 39/255  },
    textLight:  { r: 107/255, g: 114/255, b: 128/255 },
  };

  const solid = (color, opacity = 1) => [{ type: "SOLID", color, opacity }];

  // Create a text node — append to parent BEFORE setting layoutSizing
  function txt(chars, size, weight, color, opacity = 1) {
    const t = figma.createText();
    t.fontName = { family: "Inter", style: weight };
    t.fontSize = size;
    t.characters = chars;
    t.fills = [{ type: "SOLID", color, opacity }];
    return t;
  }

  // Append text to parent, then set FILL width
  function addText(parent, chars, size, weight, color, opacity = 1, fillWidth = false) {
    const t = txt(chars, size, weight, color, opacity);
    parent.appendChild(t);
    if (fillWidth) t.layoutSizingHorizontal = "FILL";
    return t;
  }

  function iconRect(size = 48, color = C.greenBg, radius = 10) {
    const r = figma.createRectangle();
    r.resize(size, size);
    r.cornerRadius = radius;
    r.fills = solid(color);
    return r;
  }

  const GAP = 40;
  let col = 0;
  let row = 0;
  const components = [];

  function place(comp, w) {
    comp.x = col;
    comp.y = row;
    components.push(comp);
    col += w + GAP;
  }

  // ── 1. Commitment Card ─────────────────────────────────────
  const commitCard = figma.createComponent();
  commitCard.name = "Card/Commitment";
  commitCard.layoutMode = "VERTICAL";
  commitCard.itemSpacing = 16;
  commitCard.paddingTop = 32;  commitCard.paddingBottom = 32;
  commitCard.paddingLeft = 28; commitCard.paddingRight = 28;
  commitCard.cornerRadius = 10;
  commitCard.fills = solid(C.white);
  commitCard.strokes = [{ type: "SOLID", color: C.gray200 }];
  commitCard.strokeWeight = 1;
  commitCard.primaryAxisSizingMode = "AUTO";
  commitCard.counterAxisSizingMode = "FIXED";
  commitCard.resize(300, 10);

  commitCard.appendChild(iconRect(48, C.greenBg));

  addText(commitCard, "Commitment Title", 18, "Bold", C.gray900, 1, true);

  const ccBody = addText(commitCard, "A short description of this commitment or value proposition goes here.", 15, "Regular", C.textLight, 1, true);
  ccBody.textAutoResize = "HEIGHT";

  place(commitCard, 300);

  // ── 2. Service Preview Card ────────────────────────────────
  const serviceCard = figma.createComponent();
  serviceCard.name = "Card/Service";
  serviceCard.layoutMode = "VERTICAL";
  serviceCard.itemSpacing = 14;
  serviceCard.paddingTop = 32;  serviceCard.paddingBottom = 32;
  serviceCard.paddingLeft = 28; serviceCard.paddingRight = 28;
  serviceCard.cornerRadius = 10;
  serviceCard.fills = solid(C.white);
  serviceCard.strokes = [{ type: "SOLID", color: C.gray200 }];
  serviceCard.strokeWeight = 1;
  serviceCard.primaryAxisSizingMode = "AUTO";
  serviceCard.counterAxisSizingMode = "FIXED";
  serviceCard.resize(360, 10);

  serviceCard.appendChild(iconRect(48, C.greenBg));

  addText(serviceCard, "Service Name", 20, "Bold", C.gray900, 1, true);

  const scBody = addText(serviceCard, "Brief description of what this service delivers to clients in the healthcare space.", 15, "Regular", C.textLight, 1, true);
  scBody.textAutoResize = "HEIGHT";

  addText(serviceCard, "Learn more →", 14, "Semi Bold", C.greenMain);

  place(serviceCard, 360);

  // ── 3. Stat Item ───────────────────────────────────────────
  const statComp = figma.createComponent();
  statComp.name = "Stats/Stat Item";
  statComp.layoutMode = "VERTICAL";
  statComp.itemSpacing = 8;
  statComp.paddingTop = 24;  statComp.paddingBottom = 24;
  statComp.paddingLeft = 24; statComp.paddingRight = 24;
  statComp.primaryAxisSizingMode = "AUTO";
  statComp.counterAxisSizingMode = "AUTO";
  statComp.fills = [];

  statComp.appendChild(iconRect(36, C.greenBg, 8));
  addText(statComp, "1,200+", 32, "Extra Bold", C.gray900);
  addText(statComp, "Patients Served", 14, "Regular", C.textLight);

  place(statComp, 200);

  // ── 4. Image Placeholder ───────────────────────────────────
  col = 0; row = 400;

  const imgComp = figma.createComponent();
  imgComp.name = "Placeholder/Image";
  imgComp.layoutMode = "VERTICAL";
  imgComp.primaryAxisAlignItems = "CENTER";
  imgComp.counterAxisAlignItems = "CENTER";
  imgComp.primaryAxisSizingMode = "FIXED";
  imgComp.counterAxisSizingMode = "FIXED";
  imgComp.resize(560, 400);
  imgComp.cornerRadius = 10;
  imgComp.fills = solid(C.gray100);

  addText(imgComp, "Image / Photo", 14, "Regular", C.gray400);

  place(imgComp, 560);

  // ── 5. CTA Banner ─────────────────────────────────────────
  col = 0; row = 860;

  const ctaComp = figma.createComponent();
  ctaComp.name = "Section/CTA Banner";
  ctaComp.layoutMode = "VERTICAL";
  ctaComp.itemSpacing = 20;
  ctaComp.paddingTop = 80;  ctaComp.paddingBottom = 80;
  ctaComp.paddingLeft = 80; ctaComp.paddingRight = 80;
  ctaComp.primaryAxisSizingMode = "AUTO";
  ctaComp.counterAxisSizingMode = "FIXED";
  ctaComp.primaryAxisAlignItems = "CENTER";
  ctaComp.counterAxisAlignItems = "CENTER";
  ctaComp.resize(1280, 10);
  ctaComp.cornerRadius = 16;
  ctaComp.fills = solid(C.greenDark);

  const ctaH = addText(ctaComp, "Ready to Work With Us?", 40, "Extra Bold", C.white, 1, true);
  ctaH.textAlignHorizontal = "CENTER";

  const ctaB = addText(ctaComp, "Take the first step toward better health outcomes for your organisation.", 18, "Regular", C.white, 0.82, true);
  ctaB.textAlignHorizontal = "CENTER";

  const btnRow = figma.createFrame();
  btnRow.layoutMode = "HORIZONTAL";
  btnRow.itemSpacing = 16;
  btnRow.fills = [];
  btnRow.primaryAxisSizingMode = "AUTO";
  btnRow.counterAxisSizingMode = "AUTO";
  ctaComp.appendChild(btnRow);

  const btnPrimary = figma.createFrame();
  btnPrimary.layoutMode = "HORIZONTAL";
  btnPrimary.primaryAxisAlignItems = "CENTER";
  btnPrimary.counterAxisAlignItems = "CENTER";
  btnPrimary.resize(220, 48);
  btnPrimary.cornerRadius = 100;
  btnPrimary.fills = solid(C.white);
  btnRow.appendChild(btnPrimary);
  addText(btnPrimary, "Request a Service", 15, "Semi Bold", C.greenDark);

  const btnOutline = figma.createFrame();
  btnOutline.layoutMode = "HORIZONTAL";
  btnOutline.primaryAxisAlignItems = "CENTER";
  btnOutline.counterAxisAlignItems = "CENTER";
  btnOutline.resize(180, 48);
  btnOutline.cornerRadius = 100;
  btnOutline.fills = [{ type: "SOLID", color: C.white, opacity: 0 }];
  btnOutline.strokes = [{ type: "SOLID", color: C.white, opacity: 0.5 }];
  btnOutline.strokeWeight = 2;
  btnRow.appendChild(btnOutline);
  addText(btnOutline, "Learn About Us", 15, "Semi Bold", C.white);

  place(ctaComp, 1280);

  // ── 6. Navigation Bar ─────────────────────────────────────
  col = 0; row = 1260;

  const navComp = figma.createComponent();
  navComp.name = "Navigation/Nav Bar";
  navComp.layoutMode = "HORIZONTAL";
  navComp.counterAxisAlignItems = "CENTER";
  navComp.primaryAxisAlignItems = "SPACE_BETWEEN";
  navComp.paddingLeft = 48; navComp.paddingRight = 48;
  navComp.primaryAxisSizingMode = "FIXED";
  navComp.counterAxisSizingMode = "FIXED";
  navComp.resize(1440, 72);
  navComp.fills = solid(C.white);
  navComp.strokes = [{ type: "SOLID", color: C.gray200 }];
  navComp.strokeWeight = 1;

  const logoRect = figma.createRectangle();
  logoRect.resize(140, 40);
  logoRect.cornerRadius = 6;
  logoRect.fills = solid(C.greenBg);
  navComp.appendChild(logoRect);

  const linksGroup = figma.createFrame();
  linksGroup.layoutMode = "HORIZONTAL";
  linksGroup.itemSpacing = 32;
  linksGroup.fills = [];
  linksGroup.primaryAxisSizingMode = "AUTO";
  linksGroup.counterAxisSizingMode = "AUTO";
  navComp.appendChild(linksGroup);

  for (const link of ["About Us", "Our Services", "Industries", "Work With Us"]) {
    addText(linksGroup, link, 15, "Semi Bold", C.gray700);
  }

  const navBtn = figma.createFrame();
  navBtn.layoutMode = "HORIZONTAL";
  navBtn.primaryAxisAlignItems = "CENTER";
  navBtn.counterAxisAlignItems = "CENTER";
  navBtn.resize(190, 44);
  navBtn.cornerRadius = 100;
  navBtn.fills = solid(C.greenDark);
  navComp.appendChild(navBtn);
  addText(navBtn, "Request a Service", 14, "Semi Bold", C.white);

  place(navComp, 1440);

  // ── 7. Footer ─────────────────────────────────────────────
  col = 0; row = 1400;

  const footerComp = figma.createComponent();
  footerComp.name = "Section/Footer";
  footerComp.layoutMode = "VERTICAL";
  footerComp.itemSpacing = 48;
  footerComp.paddingTop = 64;  footerComp.paddingBottom = 40;
  footerComp.paddingLeft = 80; footerComp.paddingRight = 80;
  footerComp.primaryAxisSizingMode = "AUTO";
  footerComp.counterAxisSizingMode = "FIXED";
  footerComp.resize(1440, 10);
  footerComp.fills = solid(C.gray900);

  const footerGrid = figma.createFrame();
  footerGrid.layoutMode = "HORIZONTAL";
  footerGrid.itemSpacing = 48;
  footerGrid.fills = [];
  footerGrid.primaryAxisSizingMode = "AUTO";
  footerGrid.counterAxisSizingMode = "AUTO";
  footerComp.appendChild(footerGrid);
  footerGrid.layoutSizingHorizontal = "FILL";

  // Brand column
  const brandCol = figma.createFrame();
  brandCol.layoutMode = "VERTICAL";
  brandCol.itemSpacing = 16;
  brandCol.fills = [];
  brandCol.primaryAxisSizingMode = "AUTO";
  brandCol.counterAxisSizingMode = "AUTO";
  footerGrid.appendChild(brandCol);
  brandCol.layoutSizingHorizontal = "FILL";

  const footerLogo = figma.createRectangle();
  footerLogo.resize(120, 36);
  footerLogo.cornerRadius = 4;
  footerLogo.fills = solid(C.greenDark);
  brandCol.appendChild(footerLogo);

  const brandDesc = addText(brandCol, "Supporting health providers with expert operational and clinical support.", 14, "Regular", C.white, 0.55, true);
  brandDesc.textAutoResize = "HEIGHT";

  // Generic footer column helper — appendChild before layoutSizing
  function footerCol(title, items) {
    const frame = figma.createFrame();
    frame.layoutMode = "VERTICAL";
    frame.itemSpacing = 12;
    frame.fills = [];
    frame.primaryAxisSizingMode = "AUTO";
    frame.counterAxisSizingMode = "AUTO";
    footerGrid.appendChild(frame);
    frame.layoutSizingHorizontal = "FILL";

    addText(frame, title, 12, "Bold", C.white, 0.45);

    for (const item of items) {
      const t = addText(frame, item, 14, "Regular", C.white, 0.7, true);
      t.textAutoResize = "HEIGHT";
    }
  }

  footerCol("COMPANY",  ["About Us", "Our Services", "Industries", "Work With Us"]);
  footerCol("SERVICES", ["Clinical Support", "Operational Support", "HR & Staffing", "Compliance"]);
  footerCol("CONTACT",  ["contact@vanguardhealth.com", "+1 (555) 000-0000", "Australia"]);

  // Footer bottom bar
  const footerBottom = figma.createFrame();
  footerBottom.layoutMode = "HORIZONTAL";
  footerBottom.primaryAxisAlignItems = "SPACE_BETWEEN";
  footerBottom.counterAxisAlignItems = "CENTER";
  footerBottom.fills = [];
  footerBottom.primaryAxisSizingMode = "FIXED";
  footerBottom.counterAxisSizingMode = "AUTO";
  footerComp.appendChild(footerBottom);
  footerBottom.layoutSizingHorizontal = "FILL";

  addText(footerBottom, "© 2026 Vanguard Health Group. All rights reserved.", 13, "Regular", C.white, 0.35);
  addText(footerBottom, "Privacy Policy  ·  Terms of Service", 13, "Regular", C.white, 0.35);

  place(footerComp, 1440);

  // ── Done ───────────────────────────────────────────────────
  figma.viewport.scrollAndZoomIntoView(components);
  figma.notify("✅ Vanguard components created: Nav, Cards, Stats, Image, CTA Banner, Footer");
  console.log("✅ All components done.");
}

buildVanguardComponents();
