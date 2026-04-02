// ============================================================
//  VANGUARD — Figma Design System Builder
//  How to run:
//  1. In Figma: Plugins > Development > Open Console
//  2. Paste this entire script and press Enter
// ============================================================

async function buildVanguardDesignSystem() {

  // ── Helpers ────────────────────────────────────────────────
  function hex(h) {
    return {
      r: parseInt(h.slice(1, 3), 16) / 255,
      g: parseInt(h.slice(3, 5), 16) / 255,
      b: parseInt(h.slice(5, 7), 16) / 255,
      a: 1,
    };
  }

  function paint(h) {
    const { r, g, b } = hex(h);
    return [{ type: "SOLID", color: { r, g, b }, opacity: 1 }];
  }

  // ── 1. Variables (Local Variables panel) ───────────────────
  const collection = figma.variables.createVariableCollection("Vanguard");
  const mode = collection.defaultModeId;

  function colorVar(name, h) {
    const v = figma.variables.createVariable(name, collection, "COLOR");
    v.setValueForMode(mode, hex(h));
  }

  function numVar(name, value) {
    const v = figma.variables.createVariable(name, collection, "FLOAT");
    v.setValueForMode(mode, value);
  }

  // Colour palette
  colorVar("green/main",      "#4fa42d");
  colorVar("green/dark",      "#006E0F");
  colorVar("green/light",     "#73c93f");
  colorVar("green/inactive",  "#bbe5a2");
  colorVar("green/bg",        "#f0f9eb");

  colorVar("gold/main",  "#BC9C22");
  colorVar("gold/dark",  "#9b7818");
  colorVar("gold/light", "#d0b427");

  colorVar("neutral/white",    "#ffffff");
  colorVar("neutral/gray-50",  "#f9fafb");
  colorVar("neutral/gray-100", "#f3f4f6");
  colorVar("neutral/gray-200", "#e5e7eb");
  colorVar("neutral/gray-300", "#d1d5db");
  colorVar("neutral/gray-400", "#9ca3af");
  colorVar("neutral/gray-600", "#4b5563");
  colorVar("neutral/gray-700", "#374151");
  colorVar("neutral/gray-800", "#1f2937");
  colorVar("neutral/gray-900", "#111827");

  colorVar("text/default", "#1f2937");
  colorVar("text/light",   "#6b7280");
  colorVar("text/muted",   "#9ca3af");

  // Button colours
  colorVar("button/primary-bg",            "#006E0F");
  colorVar("button/primary-bg-hover",      "#4fa42d");
  colorVar("button/primary-stroke-border", "#4fa42d");
  colorVar("button/secondary-bg-hover",    "#f0f9eb");
  colorVar("button/neutral-bg",            "#5c5c5c");
  colorVar("button/neutral-border",        "#ebebeb");

  // Spacing / sizing tokens
  numVar("radius/sm",   4);
  numVar("radius/base", 10);
  numVar("radius/pill", 100);

  numVar("button/height-default", 48);
  numVar("button/height-sm",      40);
  numVar("button/height-xs",      34);
  numVar("button/height-xxs",     28);

  numVar("button/padding-default", 28);
  numVar("button/padding-sm",      20);
  numVar("button/padding-xs",      16);
  numVar("button/padding-xxs",     12);

  // ── 2. Colour Styles (paint styles panel) ─────────────────
  const colorStyles = [
    ["Brand/Green Main",     "#4fa42d"],
    ["Brand/Green Dark",     "#006E0F"],
    ["Brand/Green Light",    "#73c93f"],
    ["Brand/Green Inactive", "#bbe5a2"],
    ["Brand/Green BG",       "#f0f9eb"],
    ["Brand/Gold Main",      "#BC9C22"],
    ["Brand/Gold Dark",      "#9b7818"],
    ["Brand/Gold Light",     "#d0b427"],
    ["Neutral/White",        "#ffffff"],
    ["Neutral/Gray 50",      "#f9fafb"],
    ["Neutral/Gray 100",     "#f3f4f6"],
    ["Neutral/Gray 200",     "#e5e7eb"],
    ["Neutral/Gray 300",     "#d1d5db"],
    ["Neutral/Gray 400",     "#9ca3af"],
    ["Neutral/Gray 600",     "#4b5563"],
    ["Neutral/Gray 700",     "#374151"],
    ["Neutral/Gray 800",     "#1f2937"],
    ["Neutral/Gray 900",     "#111827"],
    ["Text/Default",         "#1f2937"],
    ["Text/Light",           "#6b7280"],
    ["Text/Muted",           "#9ca3af"],
  ];

  for (const [name, h] of colorStyles) {
    const s = figma.createPaintStyle();
    s.name = name;
    s.paints = paint(h);
  }

  // ── 3. Text Styles ─────────────────────────────────────────
  // Inter font weight names as Figma expects them
  const textStyles = [
    { name: "Heading/H1 Desktop", size: 44, style: "Extra Bold", lh: 115 },
    { name: "Heading/H1 Mobile",  size: 28, style: "Extra Bold", lh: 115 },
    { name: "Heading/H2",         size: 32, style: "Extra Bold", lh: 120 },
    { name: "Heading/H3",         size: 24, style: "Bold",       lh: 130 },
    { name: "Body/Default",       size: 16, style: "Regular",    lh: 160 },
    { name: "Body/Intro",         size: 17, style: "Regular",    lh: 160 },
    { name: "Body/Small",         size: 14, style: "Regular",    lh: 160 },
    { name: "Label/Uppercase",    size: 12, style: "Bold",       lh: 160 },
    { name: "Button/Default",     size: 15, style: "Semi Bold",  lh: 125 },
    { name: "Button/Small",       size: 14, style: "Semi Bold",  lh: 125 },
    { name: "Button/XSmall",      size: 13, style: "Semi Bold",  lh: 125 },
  ];

  for (const def of textStyles) {
    try {
      await figma.loadFontAsync({ family: "Inter", style: def.style });
      const s = figma.createTextStyle();
      s.name = def.name;
      s.fontName = { family: "Inter", style: def.style };
      s.fontSize = def.size;
      s.lineHeight = { unit: "PERCENT", value: def.lh };
    } catch (e) {
      console.warn(`Skipped "${def.name}": ${e.message}`);
    }
  }

  figma.notify("✅ Vanguard design system created — colours, variables & type styles ready.");
  console.log("✅ Done.");
}

buildVanguardDesignSystem();
