// ─────────────────────────────────────────────────────────────
//  Vanguard Health Group — Hamburger Side Drawer
//  Paste into: Figma › Plugins › Development › Open Console
// ─────────────────────────────────────────────────────────────

(async () => {

  // ── Fonts ──────────────────────────────────────────────────
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' });

  // ── Colour helper ──────────────────────────────────────────
  function rgb(hex, a = 1) {
    return [{
      type: 'SOLID',
      color: {
        r: parseInt(hex.slice(1,3), 16) / 255,
        g: parseInt(hex.slice(3,5), 16) / 255,
        b: parseInt(hex.slice(5,7), 16) / 255
      },
      opacity: a
    }];
  }

  // ── Tokens ─────────────────────────────────────────────────
  const T = {
    drawerW:    280,    // drawer width
    screenH:    812,    // full screen height (iPhone X)
    padH:       24,     // horizontal padding
    padTop:     56,     // top padding
    padBottom:  40,     // bottom padding
    itemPadV:   17,     // vertical padding per nav row
    iconSize:   20,     // icon box size
    iconGap:    16,     // gap between icon and label
    itemGap:    0,      // gap between rows (dividers handle it)
    linkFontSz: 16,     // nav link font size
    ctaFontSz:  15,     // CTA font size
    ctaPadV:    16,     // CTA vertical padding
    green:      '#4fa42d',
    greenDark:  '#006E0F',
    bg:         '#06200A',
    white:      '#ffffff',
    divider:    0.08,   // divider opacity
    linkAlpha:  0.88,   // nav link text opacity
    subAlpha:   0.45,   // secondary text opacity
  };

  const innerW = T.drawerW - T.padH * 2;

  // ── Nav items — each icon is an array of clean path strings ─
  const navItems = [
    {
      label: 'About Us',
      sub:   'Our story & values',
      paths: [
        'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2',
        'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
      ],
    },
    {
      label: 'Our Services',
      sub:   'Nursing, support & allied health',
      paths: [
        'M22 12h-4l-3 9L9 3l-3 9H2',
      ],
    },
    {
      label: 'Industries',
      sub:   'Sectors we support',
      paths: [
        'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
        'M9 22V12h6v10',
      ],
    },
    {
      label: 'Work With Us',
      sub:   'Join our team',
      paths: [
        'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2',
        'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
        'M23 21v-2a4 4 0 0 0-3-3.87',
        'M16 3.13a4 4 0 0 1 0 7.75',
      ],
    },
  ];

  // ── Helper: create icon via createNodeFromSvg ──────────────
  function makeIcon(paths, size, colour, alpha = 1) {
    const pathEls = paths.map(d => `<path d="${d}"/>`).join('');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colour}" stroke-opacity="${alpha}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${pathEls}</svg>`;
    const node = figma.createNodeFromSvg(svg);
    node.resize(size, size);
    return node;
  }

  // ── Helper: horizontal divider ─────────────────────────────
  function divider(w) {
    const d = figma.createRectangle();
    d.name = '─';
    d.resize(w, 1);
    d.fills = rgb(T.white, T.divider);
    return d;
  }

  // ══════════════════════════════════════════════════════════
  //  DRAWER FRAME
  // ══════════════════════════════════════════════════════════
  const drawer = figma.createFrame();
  drawer.name = '📱 Hamburger Drawer — Vanguard Health Group';
  drawer.resize(T.drawerW, T.screenH);
  drawer.fills = rgb(T.bg);
  drawer.layoutMode = 'VERTICAL';
  drawer.primaryAxisSizingMode = 'FIXED';
  drawer.counterAxisSizingMode = 'FIXED';
  drawer.paddingTop    = T.padTop;
  drawer.paddingBottom = T.padBottom;
  drawer.paddingLeft   = T.padH;
  drawer.paddingRight  = T.padH;
  drawer.itemSpacing   = 0;
  drawer.clipsContent  = true;

  // ── Logo ───────────────────────────────────────────────────
  const logoRow = figma.createFrame();
  logoRow.name = 'Logo';
  logoRow.fills = [];
  logoRow.layoutMode = 'HORIZONTAL';
  logoRow.counterAxisAlignItems = 'CENTER';
  logoRow.primaryAxisSizingMode = 'FIXED';
  logoRow.counterAxisSizingMode = 'AUTO';
  logoRow.resize(innerW, 10);
  logoRow.paddingBottom = 24;
  logoRow.itemSpacing = 0;

  const logoPH = figma.createRectangle();
  logoPH.name = '⟶ Replace with Logo-TopNav.svg';
  logoPH.resize(110, 26);
  logoPH.fills = rgb(T.green, 0.25);
  logoPH.cornerRadius = 4;
  logoRow.appendChild(logoPH);
  drawer.appendChild(logoRow);

  // Divider after logo
  drawer.appendChild(divider(innerW));

  // Spacer
  const sp1 = figma.createFrame();
  sp1.name = '_spacer';
  sp1.fills = [];
  sp1.resize(innerW, 20);
  drawer.appendChild(sp1);

  // ── Nav items ──────────────────────────────────────────────
  for (const item of navItems) {

    const row = figma.createFrame();
    row.name = item.label;
    row.fills = [];
    row.layoutMode = 'HORIZONTAL';
    row.counterAxisAlignItems = 'CENTER';
    row.primaryAxisSizingMode = 'FIXED';
    row.counterAxisSizingMode = 'AUTO';
    row.resize(innerW, 10);
    row.paddingTop    = T.itemPadV;
    row.paddingBottom = T.itemPadV;
    row.itemSpacing   = T.iconGap;

    // Icon
    const icon = makeIcon(item.paths, T.iconSize, T.green);
    icon.name = `icon`;
    row.appendChild(icon);

    // Text column
    const textCol = figma.createFrame();
    textCol.name = 'labels';
    textCol.fills = [];
    textCol.layoutMode = 'VERTICAL';
    textCol.primaryAxisSizingMode = 'AUTO';
    textCol.counterAxisSizingMode = 'AUTO';
    textCol.itemSpacing = 2;

    const labelText = figma.createText();
    labelText.characters = item.label;
    labelText.fontSize = T.linkFontSz;
    labelText.fontName = { family: 'Inter', style: 'Medium' };
    labelText.fills = rgb(T.white, T.linkAlpha);
    textCol.appendChild(labelText);

    const subText = figma.createText();
    subText.characters = item.sub;
    subText.fontSize = 11;
    subText.fontName = { family: 'Inter', style: 'Regular' };
    subText.fills = rgb(T.white, T.subAlpha);
    textCol.appendChild(subText);

    row.appendChild(textCol);
    drawer.appendChild(row);
    drawer.appendChild(divider(innerW));
  }

  // ── CTA button ─────────────────────────────────────────────
  const sp2 = figma.createFrame();
  sp2.name = '_spacer';
  sp2.fills = [];
  sp2.resize(innerW, 24);
  drawer.appendChild(sp2);

  const cta = figma.createFrame();
  cta.name = 'Request a Service';
  cta.fills = rgb(T.green);
  cta.cornerRadius = 100;
  cta.layoutMode = 'HORIZONTAL';
  cta.primaryAxisAlignItems = 'CENTER';
  cta.counterAxisAlignItems = 'CENTER';
  cta.primaryAxisSizingMode = 'FIXED';
  cta.counterAxisSizingMode = 'AUTO';
  cta.resize(innerW, 10);
  cta.paddingTop    = T.ctaPadV;
  cta.paddingBottom = T.ctaPadV;
  cta.paddingLeft   = 24;
  cta.paddingRight  = 24;

  const ctaT = figma.createText();
  ctaT.characters = 'Request a Service';
  ctaT.fontSize = T.ctaFontSz;
  ctaT.fontName = { family: 'Inter', style: 'Semi Bold' };
  ctaT.fills = rgb(T.white);
  cta.appendChild(ctaT);
  drawer.appendChild(cta);

  // ── Flexible spacer (pushes contact to bottom) ─────────────
  const flexSpacer = figma.createFrame();
  flexSpacer.name = '_flex-spacer';
  flexSpacer.fills = [];
  flexSpacer.resize(innerW, 1);
  drawer.appendChild(flexSpacer);
  flexSpacer.layoutSizingVertical = 'FILL';

  // ── Contact block (bottom) ─────────────────────────────────
  const contact = figma.createFrame();
  contact.name = 'Contact';
  contact.fills = [];
  contact.layoutMode = 'VERTICAL';
  contact.primaryAxisSizingMode = 'AUTO';
  contact.counterAxisSizingMode = 'FIXED';
  contact.resize(innerW, 10);
  contact.itemSpacing = 5;
  contact.paddingTop = 16;
  contact.strokes = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0.08 }];
  contact.strokeTopWeight = 1;
  contact.strokeBottomWeight = 0;
  contact.strokeLeftWeight = 0;
  contact.strokeRightWeight = 0;
  contact.strokeAlign = 'INSIDE';

  const contactLines = [
    { text: '+61 (0)00 000 0000',                    style: 'Medium',  size: 12, alpha: 0.7  },
    { text: 'info@vanguardhealthgroup.com.au',        style: 'Regular', size: 11, alpha: 0.5  },
    { text: 'Australia',                              style: 'Regular', size: 11, alpha: 0.35 },
  ];
  for (const l of contactLines) {
    const t = figma.createText();
    t.characters = l.text;
    t.fontSize = l.size;
    t.fontName = { family: 'Inter', style: l.style };
    t.fills = rgb(T.white, l.alpha);
    contact.appendChild(t);
  }
  drawer.appendChild(contact);

  // ══════════════════════════════════════════════════════════
  //  OVERLAY (dimmed background behind drawer)
  // ══════════════════════════════════════════════════════════
  const overlay = figma.createFrame();
  overlay.name = 'Overlay';
  overlay.resize(375, T.screenH);
  overlay.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 0.5 }];

  // Close button on overlay
  const closeBtn = figma.createFrame();
  closeBtn.name = '✕ Close';
  closeBtn.resize(36, 36);
  closeBtn.fills = rgb('#ffffff', 0.12);
  closeBtn.cornerRadius = 100;
  closeBtn.layoutMode = 'HORIZONTAL';
  closeBtn.primaryAxisAlignItems = 'CENTER';
  closeBtn.counterAxisAlignItems = 'CENTER';
  const closeIcon = makeIcon(['M18 6L6 18', 'M6 6l12 12'], 16, T.white, 0.9);
  closeIcon.resize(14, 14);
  closeBtn.appendChild(closeIcon);
  closeBtn.x = T.drawerW + 16;
  closeBtn.y = 56;
  overlay.appendChild(closeBtn);

  // ══════════════════════════════════════════════════════════
  //  SCREEN WRAPPER
  // ══════════════════════════════════════════════════════════
  const screen = figma.createFrame();
  screen.name = '📱 Mobile Screen — Ham Menu Open';
  screen.resize(375, T.screenH);
  screen.fills = rgb('#f0f9eb');
  screen.clipsContent = true;

  screen.appendChild(overlay);
  screen.appendChild(drawer);

  figma.currentPage.appendChild(screen);
  figma.viewport.scrollAndZoomIntoView([screen]);
  figma.notify('✅ Hamburger drawer created!');

})();
