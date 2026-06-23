import ceiling from "@/assets/ceiling-fan.jpg";
import highspeed from "@/assets/highspeed-fan.jpg";
import exhaust from "@/assets/exhaust-fan.jpg";
import decorative from "@/assets/decorative-fan.jpg";
import toophan from "@/assets/toophan-stand.png.asset.json";
import toophanFeat from "@/assets/toophan-features.png.asset.json";
import csiCeilingPremium from "@/assets/csi-ceiling-premium.jpg";
import csiDecorativePremium from "@/assets/csi-decorative-premium.jpg";
import csiPedestal from "@/assets/csi-pedestal.jpg";
import csiWallFan from "@/assets/csi-wall-fan.jpg";
import csiExhaustPremium from "@/assets/csi-exhaust-premium.jpg";
import csiBldcBlack from "@/assets/csi-bldc-black.jpg";
import csiCeilingBronze from "@/assets/csi-ceiling-bronze.jpg";
import csiIndustrialPedestal from "@/assets/csi-industrial-pedestal.jpg";
import csiCabinWhite from "@/assets/csi-cabin-white.jpg";
import csiDecorativeGold from "@/assets/csi-decorative-gold.jpg";

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  models: Model[];
};

export type ProductTag = "New Arrival" | "Best Seller" | "Energy Efficient" | "Premium";

export type Model = {
  modelNo: string;
  name: string;
  slug: string;
  price: number;
  sweep?: string;
  rpm?: string;
  airDelivery?: string;
  warranty?: string;
  power?: string;
  voltage?: string;
  frequency?: string;
  blades?: string;
  bladeMaterial?: string;
  motor?: string;
  colors?: string[];
  features?: string[];
  image: string;
  images?: string[];
  highlights: string[];
  description?: string;
  tags?: ProductTag[];
};

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// Common defaults
const V230 = "230 V";
const F50 = "50 Hz";

// Helper to add slug + voltage/frequency defaults
const m = (model: Omit<Model, "slug" | "voltage" | "frequency"> & Partial<Pick<Model, "voltage" | "frequency">>): Model => ({
  voltage: V230,
  frequency: F50,
  ...model,
  slug: slugify(model.modelNo),
});

export const categories: Category[] = [
  {
    slug: "ceiling-fans",
    name: "Ceiling Fans",
    tagline: "Effortless airflow for every room",
    description:
      "High-efficiency ceiling fans engineered with aerodynamic blades, copper motors and silent operation for homes, offices and showrooms.",
    image: csiCeilingPremium,
    models: [
      m({ modelNo: "CSI-CF-1200", name: "Super Toophan Classic 1200mm", price: 2499, sweep: "1200 mm", rpm: "380 RPM", airDelivery: "230 CMM", warranty: "2 Years", power: "70 W", blades: "3 Aerodynamic", bladeMaterial: "Aluminium", motor: "Pure Copper Winding", colors: ["White", "Brown", "Ivory"], image: csiCeilingPremium, images: [csiCeilingPremium, csiCeilingBronze, ceiling], highlights: ["High air delivery", "Copper winding motor", "Aerodynamic blades"], features: ["Dust-resistant coating", "100% copper winding", "Low noise operation", "Anti-rust body"], description: "The Classic 1200mm Super Toophan delivers powerful, silent airflow with a fully copper-wound motor and aerodynamic blade pitch. Built for medium to large rooms.", tags: ["Best Seller"] }),
      m({ modelNo: "CSI-CF-1400", name: "Super Toophan Pro 1400mm", price: 3199, sweep: "1400 mm", rpm: "350 RPM", airDelivery: "265 CMM", warranty: "2 Years", power: "75 W", blades: "3 Wide Sweep", bladeMaterial: "Aluminium", motor: "Heavy Duty Copper", colors: ["White", "Bronze"], image: csiCeilingPremium, images: [csiCeilingPremium, csiCeilingBronze, ceiling], highlights: ["Wider sweep", "Silent operation", "Energy efficient"], features: ["1400mm extended sweep", "Premium gloss finish", "Reinforced ball bearings", "Wobble-free design"], description: "Designed for halls and large rooms, the Pro 1400mm covers wider areas with high CMM rating and silent operation." }),
      m({ modelNo: "CSI-CF-900", name: "Super Toophan Mini 900mm", price: 1899, sweep: "900 mm", rpm: "420 RPM", airDelivery: "180 CMM", warranty: "2 Years", power: "55 W", blades: "3 Compact", bladeMaterial: "Aluminium", motor: "Pure Copper", colors: ["White", "Ivory"], image: ceiling, images: [ceiling, csiCeilingPremium], highlights: ["Compact rooms", "Low power", "Durable build"], features: ["Ideal for kitchens & cabins", "Lightweight", "Quiet motor"], description: "Compact 900mm ceiling fan perfect for kitchens, small bedrooms and cabins." }),
      m({ modelNo: "CSI-CF-BLDC-1200", name: "Super Toophan Eco BLDC 1200mm", price: 4299, sweep: "1200 mm", rpm: "360 RPM", airDelivery: "235 CMM", warranty: "3 Years", power: "28 W", blades: "3 Aero-Blade", bladeMaterial: "Aluminium Alloy", motor: "BLDC", colors: ["Pearl White", "Matte Black"], image: csiBldcBlack, images: [csiBldcBlack, csiCeilingPremium, csiCeilingBronze], highlights: ["28W BLDC motor", "Remote control", "5-speed levels"], features: ["Saves up to 65% power", "Sleep mode & timer", "Soft on/off", "Long-life BLDC motor"], description: "The Eco BLDC consumes just 28W while delivering full ceiling-fan performance — with a remote, timer and 5 speed levels.", tags: ["Energy Efficient", "New Arrival"] }),
      m({ modelNo: "CSI-CF-BRZ-1200", name: "Super Toophan Bronze 1200mm", price: 3499, sweep: "1200 mm", rpm: "370 RPM", airDelivery: "240 CMM", warranty: "2 Years", power: "72 W", blades: "3 Brushed Bronze", bladeMaterial: "Aluminium", motor: "Pure Copper", colors: ["Antique Bronze"], image: csiCeilingBronze, images: [csiCeilingBronze, csiCeilingPremium, ceiling], highlights: ["Designer bronze finish", "Silent operation", "Premium hub"], features: ["Brushed bronze finish", "Embossed CSI hub", "Anti-dust coating", "Premium ball bearings"], description: "Designer brushed-bronze 1200mm ceiling fan with embossed CSI hub — combines aesthetics and performance.", tags: ["New Arrival"] }),
    ],
  },
  {
    slug: "high-speed-fans",
    name: "High-Speed Fans",
    tagline: "Power-packed performance",
    description:
      "Heavy-duty high-speed fans built for shops, warehouses and industrial spaces with massive air thrust and rugged construction.",
    image: csiIndustrialPedestal,
    models: [
      m({ modelNo: "CSI-HS-450", name: "Super Toophan Stand 450mm", price: 3499, sweep: "450 mm", rpm: "1350 RPM", airDelivery: "100 CMM", warranty: "2 Years", power: "180 W", blades: "3 Metal", bladeMaterial: "Aluminium", motor: "Heavy Duty Copper", colors: ["Blue & White"], image: csiPedestal, images: [csiPedestal, csiIndustrialPedestal, highspeed], highlights: ["100 CMM air delivery", "1350 RPM motor", "Adjustable height"], features: ["Heavy metal grill", "Stable round base", "Wide oscillation", "Thermal overload protection"], description: "The 450mm Super Toophan stand fan delivers massive air thrust for shops, garages and warehouses.", tags: ["Best Seller"] }),
      m({ modelNo: "CSI-HS-500", name: "Super Toophan Stand 500mm", price: 3999, sweep: "500 mm", rpm: "1400 RPM", airDelivery: "120 CMM", warranty: "2 Years", power: "210 W", blades: "3 Metal", bladeMaterial: "Aluminium", motor: "Industrial Copper", colors: ["Blue & White"], image: toophanFeat.url, images: [toophanFeat.url, csiPedestal, csiIndustrialPedestal], highlights: ["Wide oscillation", "High thrust", "Heavy-duty base"], features: ["120 CMM massive air delivery", "Cast-iron base", "100% copper motor", "Industrial-grade build"], description: "500mm flagship high-speed stand fan for industrial spaces and large halls." }),
      m({ modelNo: "CSI-HS-400", name: "Toophan Table 400mm", price: 2299, sweep: "400 mm", rpm: "1320 RPM", airDelivery: "85 CMM", warranty: "1 Year", power: "120 W", blades: "3 Metal", bladeMaterial: "Aluminium", motor: "Copper Winding", colors: ["White", "Blue"], image: highspeed, images: [highspeed, csiPedestal], highlights: ["Portable", "3-speed control", "Metal grill"], features: ["Tabletop design", "3-speed rotary control", "Sturdy base"], description: "Portable 400mm table fan with 3-speed control and rugged construction." }),
      m({ modelNo: "CSI-HS-PD-500", name: "Super Toophan Pedestal Pro 500mm", price: 4499, sweep: "500 mm", rpm: "1400 RPM", airDelivery: "125 CMM", warranty: "2 Years", power: "200 W", blades: "3 Metal", bladeMaterial: "Aluminium", motor: "Heavy Duty Copper", colors: ["Blue & White"], image: csiIndustrialPedestal, images: [csiIndustrialPedestal, csiPedestal, toophanFeat.url], highlights: ["Industrial grade", "All-metal body", "Adjustable height"], features: ["Cast-iron base", "Wide oscillation 90°", "Variable height adjustment", "Heavy duty motor"], description: "Pedestal Pro is built for the toughest commercial environments — all-metal construction, adjustable height and powerful air delivery.", tags: ["Premium"] }),
    ],
  },
  {
    slug: "exhaust-fans",
    name: "Exhaust Fans",
    tagline: "Fresh air, every minute",
    description:
      "Powerful exhaust fans that ventilate kitchens, bathrooms and commercial spaces while keeping noise to a minimum.",
    image: csiExhaustPremium,
    models: [
      m({ modelNo: "CSI-EX-150", name: "Toophan Exhaust 150mm", price: 1199, sweep: "150 mm", rpm: "2200 RPM", airDelivery: "12 CMM", warranty: "1 Year", power: "30 W", blades: "5 ABS", bladeMaterial: "ABS Plastic", motor: "Copper", colors: ["White"], image: csiExhaustPremium, images: [csiExhaustPremium, exhaust], highlights: ["Quiet motor", "Easy clean", "Rust-proof"], features: ["Compact bathroom size", "Low noise", "Rust-proof body"], description: "Compact 150mm exhaust fan for small bathrooms and kitchens." }),
      m({ modelNo: "CSI-EX-200", name: "Toophan Exhaust 200mm", price: 1499, sweep: "200 mm", rpm: "1800 RPM", airDelivery: "18 CMM", warranty: "1 Year", power: "40 W", blades: "5 Metal", bladeMaterial: "Aluminium", motor: "Copper", colors: ["White"], image: csiExhaustPremium, images: [csiExhaustPremium, exhaust], highlights: ["High extraction", "Auto shutters", "Low noise"], features: ["Auto-louver shutters", "High extraction", "Low noise motor"], description: "200mm exhaust with auto-shutters for kitchens and medium rooms.", tags: ["Best Seller"] }),
      m({ modelNo: "CSI-EX-250", name: "Toophan Heavy Exhaust 250mm", price: 1899, sweep: "250 mm", rpm: "1600 RPM", airDelivery: "24 CMM", warranty: "2 Years", power: "55 W", blades: "5 Metal", bladeMaterial: "Aluminium", motor: "Heavy Duty Copper", colors: ["White", "Metallic"], image: exhaust, images: [exhaust, csiExhaustPremium], highlights: ["Heavy duty", "Metal blades", "Commercial use"], features: ["Commercial-grade build", "Metal blades", "Long-life motor"], description: "Heavy-duty 250mm exhaust fan for commercial kitchens and large bathrooms." }),
      m({ modelNo: "CSI-EX-300", name: "Toophan Industrial Exhaust 300mm", price: 2399, sweep: "300 mm", rpm: "1500 RPM", airDelivery: "32 CMM", warranty: "2 Years", power: "75 W", blades: "5 Metal", bladeMaterial: "Aluminium", motor: "Industrial Copper", colors: ["Metallic"], image: csiExhaustPremium, images: [csiExhaustPremium, exhaust], highlights: ["Industrial use", "High extraction", "Rugged build"], features: ["Industrial-grade", "Heavy metal grill", "Continuous duty motor"], description: "Large 300mm industrial exhaust for warehouses, factories and commercial kitchens.", tags: ["New Arrival"] }),
    ],
  },
  {
    slug: "wall-cabin-fans",
    name: "Wall & Cabin Fans",
    tagline: "Powerful airflow, wall mounted",
    description:
      "Space-saving wall-mounted and cabin fans that deliver focused airflow for shops, offices, salons and compact rooms.",
    image: csiWallFan,
    models: [
      m({ modelNo: "CSI-WF-400", name: "Toophan Wall Mount 400mm", price: 2799, sweep: "400 mm", rpm: "1350 RPM", airDelivery: "90 CMM", warranty: "2 Years", power: "140 W", blades: "3 ABS", bladeMaterial: "ABS Plastic", motor: "Copper", colors: ["White & Blue"], image: csiWallFan, images: [csiWallFan, csiCabinWhite], highlights: ["Wall mounted", "Wide oscillation", "Pull-cord controls"], features: ["Easy wall mount", "90° oscillation", "3-speed pull-cord", "Compact footprint"], description: "Wall-mounted oscillating fan ideal for shops, salons and offices where floor space matters.", tags: ["Best Seller"] }),
      m({ modelNo: "CSI-WF-300", name: "Toophan Cabin 300mm", price: 1999, sweep: "300 mm", rpm: "1400 RPM", airDelivery: "65 CMM", warranty: "2 Years", power: "90 W", blades: "3 ABS", bladeMaterial: "ABS Plastic", motor: "Copper", colors: ["White"], image: csiCabinWhite, images: [csiCabinWhite, csiWallFan], highlights: ["Compact cabin size", "Oscillating", "Energy efficient"], features: ["Perfect for cabins", "3-speed control", "Silent operation"], description: "Compact cabin fan for small offices and study rooms with focused airflow." }),
      m({ modelNo: "CSI-WF-450", name: "Toophan Wall Pro 450mm", price: 3399, sweep: "450 mm", rpm: "1350 RPM", airDelivery: "110 CMM", warranty: "2 Years", power: "170 W", blades: "3 Metal", bladeMaterial: "Aluminium", motor: "Heavy Duty Copper", colors: ["White & Blue"], image: csiWallFan, images: [csiWallFan, csiCabinWhite], highlights: ["Industrial use", "Heavy duty motor", "All-metal grill"], features: ["Metal grill", "Heavy duty motor", "90° wide oscillation"], description: "Wall Pro is built for godowns, warehouses and large shops requiring continuous heavy-duty operation." }),
      m({ modelNo: "CSI-WF-CB-225", name: "Toophan Cabin Mini 225mm", price: 1499, sweep: "225 mm", rpm: "1500 RPM", airDelivery: "45 CMM", warranty: "1 Year", power: "55 W", blades: "3 ABS", bladeMaterial: "ABS Plastic", motor: "Copper", colors: ["White"], image: csiCabinWhite, images: [csiCabinWhite], highlights: ["Ultra-compact", "Silent", "Plug & play"], features: ["Wall hook mount", "Silent operation", "Compact 225mm"], description: "Ultra-compact 225mm cabin fan for study tables, small cabins and shop counters.", tags: ["New Arrival"] }),
    ],
  },
  {
    slug: "decorative-fans",
    name: "Decorative Fans",
    tagline: "Style meets cooling",
    description:
      "Designer ceiling fans with premium finishes, wooden-style blades and integrated lighting for elegant interiors.",
    image: csiDecorativePremium,
    models: [
      m({ modelNo: "CSI-DC-1200", name: "Toophan Luxe Wood 1200mm", price: 4499, sweep: "1200 mm", rpm: "350 RPM", airDelivery: "220 CMM", warranty: "2 Years", power: "72 W", blades: "3 Wood-finish", bladeMaterial: "Wood-finish MDF", motor: "Pure Copper", colors: ["Walnut", "Oak"], image: csiDecorativePremium, images: [csiDecorativePremium, csiDecorativeGold, decorative], highlights: ["Wood-finish blades", "LED light", "Remote control"], features: ["Integrated LED light", "Wood-finish blades", "Remote control", "Premium gold accents"], description: "The Luxe Wood combines designer aesthetics with serious airflow — featuring an LED light kit and remote control.", tags: ["Premium"] }),
      m({ modelNo: "CSI-DC-1320", name: "Toophan Royal 1320mm", price: 5299, sweep: "1320 mm", rpm: "340 RPM", airDelivery: "240 CMM", warranty: "2 Years", power: "70 W", blades: "3 Premium", bladeMaterial: "Aluminium Alloy", motor: "Silent BLDC", colors: ["Antique Gold", "Bronze"], image: decorative, images: [decorative, csiDecorativeGold, csiDecorativePremium], highlights: ["Antique gold body", "Warm LED", "Silent BLDC"], features: ["BLDC silent motor", "Warm LED kit", "Antique gold finish", "Remote + timer"], description: "Royal series with antique gold finish, BLDC silent operation and warm integrated lighting.", tags: ["Premium", "Energy Efficient"] }),
      m({ modelNo: "CSI-DC-GOLD-1200", name: "Toophan Heritage Gold 1200mm", price: 5799, sweep: "1200 mm", rpm: "340 RPM", airDelivery: "225 CMM", warranty: "2 Years", power: "70 W", blades: "3 Wood Premium", bladeMaterial: "Wood-finish MDF", motor: "Silent BLDC", colors: ["Antique Gold"], image: csiDecorativeGold, images: [csiDecorativeGold, csiDecorativePremium, decorative], highlights: ["Heritage gold finish", "Embossed CSI emblem", "Warm LED"], features: ["Heritage gold finish", "Embossed CSI emblem on hub", "Integrated warm LED dome", "BLDC silent operation"], description: "Heritage Gold edition with intricate antique-gold trim, embossed CSI emblem on the hub and integrated LED dome.", tags: ["New Arrival", "Premium"] }),
    ],
  },
  {
    slug: "premium-series",
    name: "Premium Series",
    tagline: "Flagship engineering",
    description:
      "The flagship Super TOOPHAN Premium Series — BLDC motors, ultra-silent operation and class-leading air delivery.",
    image: toophan.url,
    models: [
      m({ modelNo: "CSI-PR-1400", name: "Super Toophan BLDC 1400mm", price: 6499, sweep: "1400 mm", rpm: "330 RPM", airDelivery: "280 CMM", warranty: "5 Years", power: "28 W", blades: "3 Premium Aero", bladeMaterial: "Aluminium Alloy", motor: "BLDC", colors: ["Pearl White", "Matte Black", "Champagne"], image: csiBldcBlack, images: [csiBldcBlack, csiCeilingPremium, csiCeilingBronze, toophanFeat.url], highlights: ["BLDC motor", "28W only", "Remote + timer"], features: ["280 CMM class-leading air delivery", "28W BLDC efficiency", "5-year warranty", "Remote + timer + sleep mode"], description: "Flagship 1400mm BLDC fan delivering 280 CMM of airflow with just 28W of power consumption.", tags: ["Premium", "Energy Efficient", "Best Seller"] }),
      m({ modelNo: "CSI-PR-1200", name: "Super Toophan BLDC 1200mm", price: 5799, sweep: "1200 mm", rpm: "360 RPM", airDelivery: "245 CMM", warranty: "5 Years", power: "26 W", blades: "3 Premium Aero", bladeMaterial: "Aluminium Alloy", motor: "BLDC", colors: ["Pearl White", "Matte Black"], image: toophanFeat.url, images: [toophanFeat.url, csiBldcBlack, csiCeilingPremium], highlights: ["Energy saving", "Smart remote", "Premium finish"], features: ["Energy Star efficiency", "Smart remote", "Premium gloss finish", "5-year warranty"], description: "1200mm BLDC premium series with smart remote and premium finish.", tags: ["Premium", "Energy Efficient"] }),
      m({ modelNo: "CSI-PR-BLK-1200", name: "Super Toophan Onyx BLDC 1200mm", price: 6199, sweep: "1200 mm", rpm: "360 RPM", airDelivery: "240 CMM", warranty: "5 Years", power: "26 W", blades: "3 Matte Aero", bladeMaterial: "Aluminium Alloy", motor: "BLDC", colors: ["Matte Black"], image: csiBldcBlack, images: [csiBldcBlack, csiCeilingBronze, csiCeilingPremium], highlights: ["Matte black premium", "Silver CSI hub", "Ultra-silent"], features: ["Designer matte black finish", "Silver embossed CSI hub", "Ultra-silent BLDC", "Smart remote"], description: "Onyx edition with designer matte black finish and silver embossed CSI nameplate hub.", tags: ["Premium", "New Arrival"] }),
    ],
  },
];

export const findCategory = (slug: string) => categories.find((c) => c.slug === slug);

export const findModel = (categorySlug: string, modelSlug: string) => {
  const cat = findCategory(categorySlug);
  if (!cat) return undefined;
  const model = cat.models.find((mm) => mm.slug === modelSlug);
  if (!model) return undefined;
  return { category: cat, model };
};

export const allModels = categories.flatMap((c) =>
  c.models.map((mm) => ({ ...mm, categorySlug: c.slug, categoryName: c.name }))
);

export const allImages = allModels.flatMap((mm) => mm.images && mm.images.length ? mm.images : [mm.image]);

export const searchModels = (query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return [] as typeof allModels;
  return allModels.filter((mm) =>
    [
      mm.name,
      mm.modelNo,
      mm.categoryName,
      mm.description ?? "",
      mm.sweep ?? "",
      mm.power ?? "",
      mm.voltage ?? "",
      mm.rpm ?? "",
      mm.motor ?? "",
      mm.bladeMaterial ?? "",
      ...(mm.tags ?? []),
      ...(mm.highlights ?? []),
      ...(mm.features ?? []),
    ]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );
};

// Helpers for filters
export const parseSweep = (s?: string) => {
  if (!s) return 0;
  const match = s.match(/(\d+)/);
  return match ? parseInt(match[1]!, 10) : 0;
};
export const parsePower = (s?: string) => {
  if (!s) return 0;
  const match = s.match(/(\d+)/);
  return match ? parseInt(match[1]!, 10) : 0;
};
