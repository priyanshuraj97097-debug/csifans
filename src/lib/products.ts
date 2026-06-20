import ceiling from "@/assets/ceiling-fan.jpg";
import highspeed from "@/assets/highspeed-fan.jpg";
import exhaust from "@/assets/exhaust-fan.jpg";
import decorative from "@/assets/decorative-fan.jpg";
import toophan from "@/assets/toophan-stand.png.asset.json";
import toophanFeat from "@/assets/toophan-features.png.asset.json";

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
  image: string;
  highlights: string[];
};

export const categories: Category[] = [
  {
    slug: "ceiling-fans",
    name: "Ceiling Fans",
    tagline: "Effortless airflow for every room",
    description:
      "High-efficiency ceiling fans engineered with aerodynamic blades, copper motors and silent operation for homes, offices and showrooms.",
    image: ceiling,
    models: [
      { modelNo: "CSI-CF-1200", name: "Super Toophan Classic 1200mm", price: 2499, sweep: "1200 mm", rpm: "380 RPM", airDelivery: "230 CMM", warranty: "2 Years", image: ceiling, highlights: ["High air delivery", "Copper winding motor", "Aerodynamic blades"] },
      { modelNo: "CSI-CF-1400", name: "Super Toophan Pro 1400mm", price: 3199, sweep: "1400 mm", rpm: "350 RPM", airDelivery: "265 CMM", warranty: "2 Years", image: ceiling, highlights: ["Wider sweep", "Silent operation", "Energy efficient"] },
      { modelNo: "CSI-CF-900", name: "Super Toophan Mini 900mm", price: 1899, sweep: "900 mm", rpm: "420 RPM", airDelivery: "180 CMM", warranty: "2 Years", image: ceiling, highlights: ["Compact rooms", "Low power", "Durable build"] },
    ],
  },
  {
    slug: "high-speed-fans",
    name: "High-Speed Fans",
    tagline: "Power-packed performance",
    description:
      "Heavy-duty high-speed fans built for shops, warehouses and industrial spaces with massive air thrust and rugged construction.",
    image: highspeed,
    models: [
      { modelNo: "CSI-HS-450", name: "Super Toophan Stand 450mm", price: 3499, sweep: "450 mm", rpm: "1350 RPM", airDelivery: "100 CMM", warranty: "2 Years", image: toophan.url, highlights: ["100 CMM air delivery", "1350 RPM motor", "Adjustable height"] },
      { modelNo: "CSI-HS-500", name: "Super Toophan Stand 500mm", price: 3999, sweep: "500 mm", rpm: "1400 RPM", airDelivery: "120 CMM", warranty: "2 Years", image: toophanFeat.url, highlights: ["Wide oscillation", "High thrust", "Heavy-duty base"] },
      { modelNo: "CSI-HS-400", name: "Toophan Table 400mm", price: 2299, sweep: "400 mm", rpm: "1320 RPM", airDelivery: "85 CMM", warranty: "1 Year", image: highspeed, highlights: ["Portable", "3-speed control", "Metal grill"] },
    ],
  },
  {
    slug: "exhaust-fans",
    name: "Exhaust Fans",
    tagline: "Fresh air, every minute",
    description:
      "Powerful exhaust fans that ventilate kitchens, bathrooms and commercial spaces while keeping noise to a minimum.",
    image: exhaust,
    models: [
      { modelNo: "CSI-EX-150", name: "Toophan Exhaust 150mm", price: 1199, sweep: "150 mm", rpm: "2200 RPM", airDelivery: "12 CMM", warranty: "1 Year", image: exhaust, highlights: ["Quiet motor", "Easy clean", "Rust-proof"] },
      { modelNo: "CSI-EX-200", name: "Toophan Exhaust 200mm", price: 1499, sweep: "200 mm", rpm: "1800 RPM", airDelivery: "18 CMM", warranty: "1 Year", image: exhaust, highlights: ["High extraction", "Auto shutters", "Low noise"] },
      { modelNo: "CSI-EX-250", name: "Toophan Heavy Exhaust 250mm", price: 1899, sweep: "250 mm", rpm: "1600 RPM", airDelivery: "24 CMM", warranty: "2 Years", image: exhaust, highlights: ["Heavy duty", "Metal blades", "Commercial use"] },
    ],
  },
  {
    slug: "decorative-fans",
    name: "Decorative Fans",
    tagline: "Style meets cooling",
    description:
      "Designer ceiling fans with premium finishes, wooden-style blades and integrated lighting for elegant interiors.",
    image: decorative,
    models: [
      { modelNo: "CSI-DC-1200", name: "Toophan Luxe Wood 1200mm", price: 4499, sweep: "1200 mm", rpm: "350 RPM", airDelivery: "220 CMM", warranty: "2 Years", image: decorative, highlights: ["Wood-finish blades", "LED light", "Remote control"] },
      { modelNo: "CSI-DC-1320", name: "Toophan Royal 1320mm", price: 5299, sweep: "1320 mm", rpm: "340 RPM", airDelivery: "240 CMM", warranty: "2 Years", image: decorative, highlights: ["Antique gold body", "Warm LED", "Silent BLDC"] },
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
      { modelNo: "CSI-PR-1400", name: "Super Toophan BLDC 1400mm", price: 6499, sweep: "1400 mm", rpm: "330 RPM", airDelivery: "280 CMM", warranty: "5 Years", image: toophan.url, highlights: ["BLDC motor", "28W only", "Remote + timer"] },
      { modelNo: "CSI-PR-1200", name: "Super Toophan BLDC 1200mm", price: 5799, sweep: "1200 mm", rpm: "360 RPM", airDelivery: "245 CMM", warranty: "5 Years", image: toophanFeat.url, highlights: ["Energy saving", "Smart remote", "Premium finish"] },
    ],
  },
];

export const findCategory = (slug: string) => categories.find((c) => c.slug === slug);
