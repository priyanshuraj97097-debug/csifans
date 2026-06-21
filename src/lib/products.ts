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

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  models: Model[];
};

export type Model = {
  modelNo: string;
  name: string;
  price: number;
  sweep?: string;
  rpm?: string;
  airDelivery?: string;
  warranty?: string;
  power?: string;
  blades?: string;
  motor?: string;
  colors?: string[];
  features?: string[];
  image: string;
  highlights: string[];
  description?: string;
};

export const categories: Category[] = [
  {
    slug: "ceiling-fans",
    name: "Ceiling Fans",
    tagline: "Effortless airflow for every room",
    description:
      "High-efficiency ceiling fans engineered with aerodynamic blades, copper motors and silent operation for homes, offices and showrooms.",
    image: csiCeilingPremium,
    models: [
      { modelNo: "CSI-CF-1200", name: "Super Toophan Classic 1200mm", price: 2499, sweep: "1200 mm", rpm: "380 RPM", airDelivery: "230 CMM", warranty: "2 Years", power: "70 W", blades: "3 Aerodynamic", motor: "Pure Copper", colors: ["White", "Brown", "Ivory"], image: csiCeilingPremium, highlights: ["High air delivery", "Copper winding motor", "Aerodynamic blades"], features: ["Dust-resistant coating", "100% copper winding", "Low noise operation", "Anti-rust body"], description: "The Classic 1200mm Super Toophan delivers powerful, silent airflow with a fully copper-wound motor and aerodynamic blade pitch. Built for medium to large rooms." },
      { modelNo: "CSI-CF-1400", name: "Super Toophan Pro 1400mm", price: 3199, sweep: "1400 mm", rpm: "350 RPM", airDelivery: "265 CMM", warranty: "2 Years", power: "75 W", blades: "3 Wide Sweep", motor: "Heavy Duty Copper", colors: ["White", "Bronze"], image: csiCeilingPremium, highlights: ["Wider sweep", "Silent operation", "Energy efficient"], features: ["1400mm extended sweep", "Premium gloss finish", "Reinforced ball bearings", "Wobble-free design"], description: "Designed for halls and large rooms, the Pro 1400mm covers wider areas with high CMM rating and silent operation." },
      { modelNo: "CSI-CF-900", name: "Super Toophan Mini 900mm", price: 1899, sweep: "900 mm", rpm: "420 RPM", airDelivery: "180 CMM", warranty: "2 Years", power: "55 W", blades: "3 Compact", motor: "Copper", colors: ["White", "Ivory"], image: ceiling, highlights: ["Compact rooms", "Low power", "Durable build"], features: ["Ideal for kitchens & cabins", "Lightweight", "Quiet motor"], description: "Compact 900mm ceiling fan perfect for kitchens, small bedrooms and cabins." },
      { modelNo: "CSI-CF-BLDC-1200", name: "Super Toophan Eco BLDC 1200mm", price: 4299, sweep: "1200 mm", rpm: "360 RPM", airDelivery: "235 CMM", warranty: "3 Years", power: "28 W", blades: "3 Aero-Blade", motor: "BLDC", colors: ["Pearl White", "Matte Black"], image: csiBldcBlack, highlights: ["28W BLDC motor", "Remote control", "5-speed levels"], features: ["Saves up to 65% power", "Sleep mode & timer", "Soft on/off", "Long-life BLDC motor"], description: "The Eco BLDC consumes just 28W while delivering full ceiling-fan performance — with a remote, timer and 5 speed levels." },
    ],
  },
  {
    slug: "high-speed-fans",
    name: "High-Speed Fans",
    tagline: "Power-packed performance",
    description:
      "Heavy-duty high-speed fans built for shops, warehouses and industrial spaces with massive air thrust and rugged construction.",
    image: csiPedestal,
    models: [
      { modelNo: "CSI-HS-450", name: "Super Toophan Stand 450mm", price: 3499, sweep: "450 mm", rpm: "1350 RPM", airDelivery: "100 CMM", warranty: "2 Years", power: "180 W", blades: "3 Metal", motor: "Heavy Duty", colors: ["Blue & White"], image: csiPedestal, highlights: ["100 CMM air delivery", "1350 RPM motor", "Adjustable height"], features: ["Heavy metal grill", "Stable round base", "Wide oscillation", "Thermal overload protection"], description: "The 450mm Super Toophan stand fan delivers massive air thrust for shops, garages and warehouses." },
      { modelNo: "CSI-HS-500", name: "Super Toophan Stand 500mm", price: 3999, sweep: "500 mm", rpm: "1400 RPM", airDelivery: "120 CMM", warranty: "2 Years", power: "210 W", blades: "3 Metal", motor: "Industrial", colors: ["Blue & White"], image: toophanFeat.url, highlights: ["Wide oscillation", "High thrust", "Heavy-duty base"], features: ["120 CMM massive air delivery", "Cast-iron base", "100% copper motor", "Industrial-grade build"], description: "500mm flagship high-speed stand fan for industrial spaces and large halls." },
      { modelNo: "CSI-HS-400", name: "Toophan Table 400mm", price: 2299, sweep: "400 mm", rpm: "1320 RPM", airDelivery: "85 CMM", warranty: "1 Year", power: "120 W", blades: "3 Metal", motor: "Copper", colors: ["White", "Blue"], image: highspeed, highlights: ["Portable", "3-speed control", "Metal grill"], features: ["Tabletop design", "3-speed rotary control", "Sturdy base"], description: "Portable 400mm table fan with 3-speed control and rugged construction." },
      { modelNo: "CSI-HS-PD-500", name: "Super Toophan Pedestal Pro 500mm", price: 4499, sweep: "500 mm", rpm: "1400 RPM", airDelivery: "125 CMM", warranty: "2 Years", power: "200 W", blades: "3 Metal", motor: "Heavy Duty Copper", colors: ["Blue & White"], image: csiPedestal, highlights: ["Industrial grade", "All-metal body", "Adjustable height"], features: ["Cast-iron base", "Wide oscillation 90°", "Variable height adjustment", "Heavy duty motor"], description: "Pedestal Pro is built for the toughest commercial environments — all-metal construction, adjustable height and powerful air delivery." },
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
      { modelNo: "CSI-EX-150", name: "Toophan Exhaust 150mm", price: 1199, sweep: "150 mm", rpm: "2200 RPM", airDelivery: "12 CMM", warranty: "1 Year", power: "30 W", blades: "5 ABS", motor: "Copper", colors: ["White"], image: csiExhaustPremium, highlights: ["Quiet motor", "Easy clean", "Rust-proof"], features: ["Compact bathroom size", "Low noise", "Rust-proof body"], description: "Compact 150mm exhaust fan for small bathrooms and kitchens." },
      { modelNo: "CSI-EX-200", name: "Toophan Exhaust 200mm", price: 1499, sweep: "200 mm", rpm: "1800 RPM", airDelivery: "18 CMM", warranty: "1 Year", power: "40 W", blades: "5 Metal", motor: "Copper", colors: ["White"], image: csiExhaustPremium, highlights: ["High extraction", "Auto shutters", "Low noise"], features: ["Auto-louver shutters", "High extraction", "Low noise motor"], description: "200mm exhaust with auto-shutters for kitchens and medium rooms." },
      { modelNo: "CSI-EX-250", name: "Toophan Heavy Exhaust 250mm", price: 1899, sweep: "250 mm", rpm: "1600 RPM", airDelivery: "24 CMM", warranty: "2 Years", power: "55 W", blades: "5 Metal", motor: "Heavy Duty", colors: ["White", "Metallic"], image: exhaust, highlights: ["Heavy duty", "Metal blades", "Commercial use"], features: ["Commercial-grade build", "Metal blades", "Long-life motor"], description: "Heavy-duty 250mm exhaust fan for commercial kitchens and large bathrooms." },
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
      { modelNo: "CSI-WF-400", name: "Toophan Wall Mount 400mm", price: 2799, sweep: "400 mm", rpm: "1350 RPM", airDelivery: "90 CMM", warranty: "2 Years", power: "140 W", blades: "3 ABS", motor: "Copper", colors: ["White & Blue"], image: csiWallFan, highlights: ["Wall mounted", "Wide oscillation", "Pull-cord controls"], features: ["Easy wall mount", "90° oscillation", "3-speed pull-cord", "Compact footprint"], description: "Wall-mounted oscillating fan ideal for shops, salons and offices where floor space matters." },
      { modelNo: "CSI-WF-300", name: "Toophan Cabin 300mm", price: 1999, sweep: "300 mm", rpm: "1400 RPM", airDelivery: "65 CMM", warranty: "2 Years", power: "90 W", blades: "3 ABS", motor: "Copper", colors: ["White"], image: csiWallFan, highlights: ["Compact cabin size", "Oscillating", "Energy efficient"], features: ["Perfect for cabins", "3-speed control", "Silent operation"], description: "Compact cabin fan for small offices and study rooms with focused airflow." },
      { modelNo: "CSI-WF-450", name: "Toophan Wall Pro 450mm", price: 3399, sweep: "450 mm", rpm: "1350 RPM", airDelivery: "110 CMM", warranty: "2 Years", power: "170 W", blades: "3 Metal", motor: "Heavy Duty Copper", colors: ["White & Blue"], image: csiWallFan, highlights: ["Industrial use", "Heavy duty motor", "All-metal grill"], features: ["Metal grill", "Heavy duty motor", "90° wide oscillation"], description: "Wall Pro is built for godowns, warehouses and large shops requiring continuous heavy-duty operation." },
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
      { modelNo: "CSI-DC-1200", name: "Toophan Luxe Wood 1200mm", price: 4499, sweep: "1200 mm", rpm: "350 RPM", airDelivery: "220 CMM", warranty: "2 Years", power: "72 W", blades: "3 Wood-finish", motor: "Copper", colors: ["Walnut", "Oak"], image: csiDecorativePremium, highlights: ["Wood-finish blades", "LED light", "Remote control"], features: ["Integrated LED light", "Wood-finish blades", "Remote control", "Premium gold accents"], description: "The Luxe Wood combines designer aesthetics with serious airflow — featuring an LED light kit and remote control." },
      { modelNo: "CSI-DC-1320", name: "Toophan Royal 1320mm", price: 5299, sweep: "1320 mm", rpm: "340 RPM", airDelivery: "240 CMM", warranty: "2 Years", power: "70 W", blades: "3 Premium", motor: "Silent BLDC", colors: ["Antique Gold", "Bronze"], image: decorative, highlights: ["Antique gold body", "Warm LED", "Silent BLDC"], features: ["BLDC silent motor", "Warm LED kit", "Antique gold finish", "Remote + timer"], description: "Royal series with antique gold finish, BLDC silent operation and warm integrated lighting." },
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
      { modelNo: "CSI-PR-1400", name: "Super Toophan BLDC 1400mm", price: 6499, sweep: "1400 mm", rpm: "330 RPM", airDelivery: "280 CMM", warranty: "5 Years", power: "28 W", blades: "3 Premium Aero", motor: "BLDC", colors: ["Pearl White", "Matte Black", "Champagne"], image: csiBldcBlack, highlights: ["BLDC motor", "28W only", "Remote + timer"], features: ["280 CMM class-leading air delivery", "28W BLDC efficiency", "5-year warranty", "Remote + timer + sleep mode"], description: "Flagship 1400mm BLDC fan delivering 280 CMM of airflow with just 28W of power consumption." },
      { modelNo: "CSI-PR-1200", name: "Super Toophan BLDC 1200mm", price: 5799, sweep: "1200 mm", rpm: "360 RPM", airDelivery: "245 CMM", warranty: "5 Years", power: "26 W", blades: "3 Premium Aero", motor: "BLDC", colors: ["Pearl White", "Matte Black"], image: toophanFeat.url, highlights: ["Energy saving", "Smart remote", "Premium finish"], features: ["Energy Star efficiency", "Smart remote", "Premium gloss finish", "5-year warranty"], description: "1200mm BLDC premium series with smart remote and premium finish." },
      { modelNo: "CSI-PR-BLK-1200", name: "Super Toophan Onyx BLDC 1200mm", price: 6199, sweep: "1200 mm", rpm: "360 RPM", airDelivery: "240 CMM", warranty: "5 Years", power: "26 W", blades: "3 Matte Aero", motor: "BLDC", colors: ["Matte Black"], image: csiBldcBlack, highlights: ["Matte black premium", "Silver CSI hub", "Ultra-silent"], features: ["Designer matte black finish", "Silver embossed CSI hub", "Ultra-silent BLDC", "Smart remote"], description: "Onyx edition with designer matte black finish and silver embossed CSI nameplate hub." },
    ],
  },
];

export const findCategory = (slug: string) => categories.find((c) => c.slug === slug);

export const allModels = categories.flatMap((c) =>
  c.models.map((m) => ({ ...m, categorySlug: c.slug, categoryName: c.name }))
);

export const searchModels = (query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return [] as typeof allModels;
  return allModels.filter((m) =>
    [m.name, m.modelNo, m.categoryName, m.description ?? "", ...(m.highlights ?? [])]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );
};
