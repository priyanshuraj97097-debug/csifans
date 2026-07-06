import tableFan400 from "@/assets/csi-super-toophan-table-fan-400.png";
import pedestalFan400 from "@/assets/csi-super-toophan-pedestal-fan-400.png";
import tableFan300 from "@/assets/csi-super-toophan-table-fan-300.png";
import ceilingChocolate from "@/assets/csi-super-toophan-ceiling-classic.png";
import ceilingSilver from "@/assets/csi-super-toophan-silver-uploaded.png";
import bldcBrown from "@/assets/csi-super-toophan-bldc-brown.png";
import bldcWhite from "@/assets/csi-super-toophan-bldc-white.png";
import tableRed400Asset from "@/assets/csi-toophan-table-red-400.png.asset.json";
import wallTeal400Asset from "@/assets/csi-toophan-wall-teal-400.png.asset.json";
import tableTeal400Asset from "@/assets/csi-toophan-table-teal-400.png.asset.json";

const tableRed400 = tableRed400Asset.url;
const wallTeal400 = wallTeal400Asset.url;
const tableTeal400 = tableTeal400Asset.url;

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  models: Model[];
};

export type ProductTag = "New Arrival" | "Best Seller" | "Energy Efficient" | "Premium";

export type Specification = {
  label: string;
  value?: string;
};

export type Model = {
  modelNo: string;
  name: string;
  slug: string;
  price: number;
  fanType?: string;
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
  specifications?: Specification[];
  image: string;
  images?: string[];
  highlights: string[];
  description?: string;
  tags?: ProductTag[];
};

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const m = (
  model: Omit<Model, "slug" | "voltage" | "frequency"> &
    Partial<Pick<Model, "voltage" | "frequency">>
): Model => ({
  voltage: "220–240 V AC",
  frequency: "50 Hz",
  ...model,
  slug: slugify(model.modelNo),
});

const spec = (label: string, value?: string): Specification => ({ label, value });

export const categories: Category[] = [
  {
    slug: "ceiling-fans",
    name: "Ceiling Fans",
    tagline: "Reliable everyday performance",
    description:
      "CSI ceiling fans for homes and offices with copper-wound motors, strong air delivery, and dependable low-voltage operation.",
    image: ceilingSilver,
    models: [
      m({
        modelNo: "CSI-ST-CHOCOLATE-1200",
        name: "Super Toophan Chocolate 1200mm",
        price: 3299,
        fanType: "Ceiling Fan",
        sweep: "1200 mm (48 inch)",
        rpm: "380–400 RPM",
        airDelivery: "220–240 CMM",
        warranty: "3 Years",
        power: "70–75 W",
        voltage: "220–240 V AC",
        frequency: "50 Hz",
        blades: "3",
        bladeMaterial: "Metal blades · Chocolate finish",
        motor: "Copper-wound induction motor",
        colors: ["Chocolate"],
        image: ceilingChocolate,
        images: [ceilingChocolate],
        highlights: [
          "Best performance in low voltage",
          "Double ball bearing",
          "3-year warranty",
        ],
        features: [
          "Copper-wound induction motor",
          "Approx. 140–240 V operating range",
          "Double ball bearing for long life",
          "Standard downrod mounting",
        ],
        specifications: [
          spec("Brand", "CSI"),
          spec("Model No.", "CSI-ST-CHOCOLATE-1200"),
          spec("Model", "Super Toophan"),
          spec("Fan Type", "Ceiling Fan"),
          spec("Color", "Chocolate"),
          spec("Sweep", "1200 mm (48 inch)"),
          spec("Blades", "3"),
          spec("Bearing Type", "Double Ball Bearing"),
          spec("Motor", "Copper-wound induction motor"),
          spec("Rated Voltage", "220–240 V AC, 50 Hz"),
          spec("Operating Voltage", "Approximately 140–240 V"),
          spec("Speed", "380–400 RPM"),
          spec("Air Delivery", "220–240 CMM"),
          spec("Power Consumption", "70–75 W"),
          spec("Downrod Length", "225–260 mm (standard)"),
          spec("Warranty", "3 Years"),
          spec("Features", "Low-voltage performance, copper motor, double ball bearing"),
        ],
        description:
          "A 1200 mm Super Toophan ceiling fan in chocolate finish built for dependable airflow, smooth running, and reliable performance in low-voltage conditions.",
        tags: ["Best Seller"],
      }),
      m({
        modelNo: "CSI-ST-SILVER-1200",
        name: "Super Toophan Silver 1200mm",
        price: 3299,
        fanType: "Ceiling Fan",
        sweep: "1200 mm (48 inch)",
        rpm: "360–400 RPM",
        airDelivery: "220–235 CMM",
        warranty: "3 Years",
        power: "70–80 W",
        voltage: "220–240 V AC",
        frequency: "50 Hz",
        blades: "3",
        bladeMaterial: "Metal blades · Silver / White-Silver finish",
        motor: "100% Copper Winding",
        colors: ["Silver", "White-Silver"],
        image: ceilingSilver,
        images: [ceilingSilver],
        highlights: [
          "Best performance in low voltage",
          "100% copper winding",
          "Double ball bearing",
        ],
        features: [
          "3-blade ceiling fan",
          "Downrod ceiling mount",
          "Strong airflow for daily use",
          "3-year warranty",
        ],
        specifications: [
          spec("Brand", "CSI"),
          spec("Model No.", "CSI-ST-SILVER-1200"),
          spec("Model", "Super Toophan Silver"),
          spec("Fan Type", "Ceiling Fan"),
          spec("Sweep Size", "1200 mm (48 inch)"),
          spec("Number of Blades", "3"),
          spec("Rated Voltage", "220–240 V AC, 50 Hz"),
          spec("Motor Winding", "100% Copper"),
          spec("Bearing Type", "Double Ball Bearing"),
          spec("Speed", "360–400 RPM"),
          spec("Air Delivery", "220–235 CMM"),
          spec("Power Consumption", "70–80 W"),
          spec("Warranty", "3 Years"),
          spec("Color", "Silver / White-Silver"),
          spec("Mounting", "Downrod Ceiling Mount"),
          spec("Features", "Low-voltage performance, copper winding, double ball bearing"),
        ],
        description:
          "The Super Toophan Silver 1200 mm ceiling fan pairs an elegant silver finish with dependable airflow and low-voltage performance for bedrooms, halls, and living spaces.",
        tags: ["New Arrival"],
      }),
    ],
  },
  {
    slug: "pedestal-fans",
    name: "Pedestal Fans",
    tagline: "Portable airflow with height adjustment",
    description:
      "Pedestal fans with strong copper motors, metal safety grills, oscillation control, and sturdy round bases for home, office, shop, and classroom use.",
    image: pedestalFan400,
    models: [
      m({
        modelNo: "CSI-ST-PED-400",
        name: "Super Toophan Pedestal Fan 400mm",
        price: 0,
        fanType: "Pedestal / Stand Fan",
        sweep: "400 mm (16 inch)",
        rpm: "1300–1400 RPM",
        airDelivery: "75–90 CMM",
        power: "55–60 W",
        voltage: "220–240 V AC",
        frequency: "50 Hz",
        blades: "3",
        bladeMaterial: "High-grade PP Plastic",
        motor: "Copper-wound AC induction motor",
        image: pedestalFan400,
        images: [pedestalFan400],
        highlights: [
          "Height adjustment",
          "Tilt adjustment",
          "Heavy-duty round base",
        ],
        features: [
          "Copper-wound AC induction motor",
          "Powder-coated metal safety grill",
          "Suitable for home, office, shop, and classroom",
          "3 speed settings",
        ],
        specifications: [
          spec("Brand", "CSI"),
          spec("Model No.", "CSI-ST-PED-400"),
          spec("Model", "Super Toophan Pedestal Fan"),
          spec("Fan Type", "Pedestal / Stand Fan"),
          spec("Sweep Size", "400 mm (16 inch)"),
          spec("Blade Count", "3"),
          spec("Blade Material", "High-grade PP Plastic"),
          spec("Motor Type", "Copper-wound AC Induction Motor"),
          spec("Rated Voltage", "220–240 V AC"),
          spec("Frequency", "50 Hz"),
          spec("Power Consumption", "55–60 W"),
          spec("Maximum Speed", "1300–1400 RPM"),
          spec("Air Delivery", "75–90 CMM"),
          spec("Speed Settings", "3"),
          spec("Tilt Adjustment", "Yes"),
          spec("Height Adjustment", "Yes"),
          spec("Guard", "Powder-coated Metal Safety Grill"),
          spec("Base Type", "Heavy-duty Round Base"),
          spec("Suitable For", "Home, Office, Shop, Classroom"),
        ],
        description:
          "A full-size Super Toophan pedestal fan with adjustable height, tilt control, and strong airflow for larger rooms and workspaces.",
        tags: ["New Arrival"],
      }),
    ],
  },
  {
    slug: "table-fans",
    name: "Table Fans",
    tagline: "Compact cooling for desks and counters",
    description:
      "Table and mini pedestal fans for desks, bedside tables, shops, and workstations with lightweight placement and quick focused airflow.",
    image: tableFan400,
    models: [
      m({
        modelNo: "CSI-ST-TABLE-400",
        name: "Super Toophan Table Fan 400mm",
        price: 0,
        fanType: "Table Fan",
        sweep: "400 mm (16 inch)",
        rpm: "1300–1400 RPM",
        airDelivery: "70–75 CMM",
        power: "50–60 W",
        voltage: "220–240 V AC",
        frequency: "50 Hz",
        blades: "3",
        bladeMaterial: "PP (Polypropylene) Plastic",
        motor: "Copper-wound AC induction motor",
        image: tableFan400,
        images: [tableFan400],
        highlights: [
          "Large 400 mm sweep",
          "Powder-coated steel safety grill",
          "Table-top convenience",
        ],
        features: [
          "Ideal for home, office, and shop",
          "Copper-wound AC induction motor",
          "3 speed settings",
          "Stable table-top base",
        ],
        specifications: [
          spec("Brand", "CSI"),
          spec("Model No.", "CSI-ST-TABLE-400"),
          spec("Model", "Super Toophan Table Fan"),
          spec("Fan Type", "Table Fan"),
          spec("Sweep Size", "400 mm (16 inch)"),
          spec("Blade Material", "PP (Polypropylene) Plastic"),
          spec("Number of Blades", "3"),
          spec("Motor Type", "Copper-wound AC induction motor"),
          spec("Rated Voltage", "220–240 V AC"),
          spec("Frequency", "50 Hz"),
          spec("Power Consumption", "50–60 W"),
          spec("Speed", "1300–1400 RPM"),
          spec("Air Delivery", "70–75 CMM"),
          spec("Speed Settings", "3"),
          spec("Guard", "Powder-coated steel safety grill"),
          spec("Mounting", "Table-top"),
          spec("Suitable Use", "Home, Office, Shop"),
        ],
        description:
          "A 16-inch Super Toophan table fan designed for desks and counter spaces with practical airflow and dependable everyday performance.",
        tags: ["New Arrival"],
      }),
      m({
        modelNo: "CSI-ST-TABLE-300",
        name: "Super Toophan Mini Table Fan 300mm",
        price: 0,
        fanType: "Table Fan",
        sweep: "300 mm (12 inch)",
        rpm: "2200–2400 RPM",
        airDelivery: "45–60 CMM",
        power: "40–50 W",
        voltage: "220–240 V AC",
        frequency: "50 Hz",
        blades: "3",
        bladeMaterial: "High-grade PP Plastic",
        motor: "Copper-wound AC induction motor",
        image: tableFan300,
        images: [tableFan300],
        highlights: [
          "Compact 12-inch size",
          "High-speed performance",
          "Desk-friendly footprint",
        ],
        features: [
          "High-strength steel safety grill",
          "Ideal for bedroom, office desk, study table, and kitchen",
          "3 speed settings",
          "Quick focused airflow for compact spaces",
        ],
        specifications: [
          spec("Brand", "CSI"),
          spec("Model No.", "CSI-ST-TABLE-300"),
          spec("Model", "Super Toophan Table Fan"),
          spec("Fan Type", "Table Fan"),
          spec("Sweep Size", "300 mm (12 inch)"),
          spec("Guard", "High-strength steel safety grill"),
          spec("Blade Count", "3"),
          spec("Blade Material", "High-grade PP Plastic"),
          spec("Motor Type", "Copper-wound AC induction motor"),
          spec("Rated Voltage", "220–240 V AC"),
          spec("Frequency", "50 Hz"),
          spec("Power Consumption", "40–50 W"),
          spec("Maximum Speed", "2200–2400 RPM"),
          spec("Air Delivery", "45–60 CMM"),
          spec("Speed Settings", "3"),
          spec("Suitable Use", "Bedroom, Office Desk, Study Table, Kitchen"),
        ],
        description:
          "A compact Super Toophan mini table fan with high speed, low footprint, and practical desk-side cooling for personal spaces.",
        tags: ["New Arrival"],
      }),
      m({
        modelNo: "CSI-ST-TABLE-RED-400",
        name: "Super Toophan Table Fan 400mm (Red)",
        price: 0,
        fanType: "Table Fan",
        sweep: "400 mm",
        rpm: "1300 RPM",
        airDelivery: "75–80 CMM",
        power: "60 W",
        blades: "3",
        bladeMaterial: "High-grade PP Plastic",
        motor: "AC Induction Motor · 100% Copper Winding",
        colors: ["Red"],
        image: tableRed400,
        images: [tableRed400],
        highlights: [
          "Bold red finish",
          "Thermal overload protection",
          "Powder-coated metal safety grill",
        ],
        features: [
          "3 speed settings",
          "Tilt adjustment",
          "Suitable for home, office, shop, and study room",
          "Stable table-top / mini pedestal base",
        ],
        specifications: [
          spec("Brand", "CSI"),
          spec("Model", "Super Toophan Table Fan"),
          spec("Fan Type", "Table Fan"),
          spec("Sweep Size", "400 mm"),
          spec("Blade Count", "3"),
          spec("Blade Material", "High-grade PP Plastic"),
          spec("Motor Type", "AC Induction Motor"),
          spec("Motor Winding", "100% Copper"),
          spec("Rated Voltage", "220–240 V AC"),
          spec("Frequency", "50 Hz"),
          spec("Power Consumption", "60 W"),
          spec("Maximum Speed", "1300 RPM"),
          spec("Air Delivery", "75–80 CMM"),
          spec("Speed Settings", "3"),
          spec("Tilt Adjustment", "Yes"),
          spec("Safety Grill", "Powder-coated Metal"),
          spec("Thermal Overload Protection", "Yes"),
          spec("Suitable For", "Home, Office, Shop, Study Room"),
          spec("Color", "Red"),
        ],
        description:
          "A striking red 400 mm Super Toophan table fan with copper-wound AC induction motor, thermal overload protection, and dependable everyday airflow for home, office, or shop use.",
        tags: ["New Arrival"],
      }),
      m({
        modelNo: "CSI-ST-TABLE-TEAL-400",
        name: "Super Toophan Table Fan 400mm (Teal & White)",
        price: 0,
        fanType: "Table Fan",
        sweep: "400 mm (16 inch)",
        rpm: "1300–1400 RPM",
        airDelivery: "70–75 CMM",
        power: "55–60 W",
        blades: "3",
        bladeMaterial: "Aerodynamic PP (Polypropylene)",
        motor: "AC Induction Motor · 100% Copper Winding",
        colors: ["Teal", "White"],
        image: tableTeal400,
        images: [tableTeal400],
        highlights: [
          "Aerodynamic PP blades",
          "Push-button speed control",
          "Thermal overload protection",
        ],
        features: [
          "3 push-button speed settings",
          "Tilt adjustment",
          "Powder-coated metal safety grill",
          "Ideal for home, office, bedroom, and study room",
        ],
        specifications: [
          spec("Brand", "CSI"),
          spec("Model", "Super Toophan Table Fan"),
          spec("Fan Type", "Table Fan"),
          spec("Sweep Size", "400 mm (16 inch)"),
          spec("Blade Count", "3"),
          spec("Blade Material", "Aerodynamic PP (Polypropylene)"),
          spec("Motor Type", "AC Induction Motor"),
          spec("Motor Winding", "100% Copper"),
          spec("Rated Voltage", "220–240 V AC"),
          spec("Frequency", "50 Hz"),
          spec("Power Consumption", "55–60 W"),
          spec("Maximum Speed", "1300–1400 RPM"),
          spec("Air Delivery", "70–75 CMM"),
          spec("Speed Settings", "3 (Push-button control)"),
          spec("Tilt Adjustment", "Yes"),
          spec("Safety Grill", "Powder-coated metal"),
          spec("Thermal Overload Protection", "Yes"),
          spec("Suitable For", "Home, Office, Bedroom, Study Room"),
          spec("Color", "Teal / White"),
        ],
        description:
          "A 16-inch Super Toophan table fan in teal and white, with aerodynamic PP blades, push-button controls, and reliable copper-wound performance for home, office, or study.",
        tags: ["New Arrival"],
      }),
    ],
  },
  {
    slug: "wall-fans",
    name: "Wall Fans",
    tagline: "Space-saving wall-mounted airflow",
    description:
      "Wall-mounted CSI fans with 90° automatic oscillation, powder-coated metal grills, and strong copper-wound motors for homes, offices, shops, and kitchens.",
    image: wallTeal400,
    models: [
      m({
        modelNo: "CSI-ST-WALL-400",
        name: "Super Toophan Wall Fan 400mm",
        price: 0,
        fanType: "Wall Fan",
        sweep: "400 mm",
        rpm: "1250–1350 RPM",
        power: "55–70 W",
        blades: "3",
        bladeMaterial: "High-grade PP (Polypropylene)",
        motor: "AC Induction Motor · 100% Copper Winding",
        colors: ["Teal", "White"],
        image: wallTeal400,
        images: [wallTeal400],
        highlights: [
          "90° automatic oscillation",
          "Wall-mount space saver",
          "Thermal overload protection",
        ],
        features: [
          "3 speed settings",
          "Tilt adjustment",
          "Pull cord / rotary switch control",
          "Suitable for home, office, shop, and kitchen",
        ],
        specifications: [
          spec("Brand", "CSI"),
          spec("Model", "Super Toophan Wall Fan"),
          spec("Fan Type", "Wall Fan"),
          spec("Sweep Size", "400 mm"),
          spec("Blade Count", "3"),
          spec("Blade Material", "High-grade PP (Polypropylene)"),
          spec("Motor Type", "AC Induction Motor"),
          spec("Motor Winding", "100% Copper"),
          spec("Rated Voltage", "220–240 V AC"),
          spec("Frequency", "50 Hz"),
          spec("Power Consumption", "55–70 W"),
          spec("Maximum Speed", "1250–1350 RPM"),
          spec("Speed Settings", "3"),
          spec("Oscillation", "90° Automatic"),
          spec("Tilt Adjustment", "Yes"),
          spec("Safety Grill", "Powder-coated Metal"),
          spec("Thermal Overload Protection", "Yes"),
          spec("Mounting Type", "Wall Mount"),
          spec("Control", "Pull cord / Rotary switch"),
          spec("Suitable For", "Home, Office, Shop, Kitchen"),
        ],
        description:
          "A 400 mm Super Toophan wall-mounted fan with 90° automatic oscillation, copper-wound AC induction motor, and thermal overload protection — ideal for spaces where floor room is limited.",
        tags: ["New Arrival"],
      }),
    ],
  },
  {
    slug: "exhaust-fans",
    name: "Exhaust Fans",
    tagline: "Fresh air for kitchens and washrooms",
    description:
      "Dedicated exhaust fan models will appear here as you add more CSI ventilation products to the catalog.",
    image: tableFan400,
    models: [],
  },
  {
    slug: "special-fans",
    name: "Special Fans",
    tagline: "Application-specific cooling solutions",
    description:
      "Special-purpose fan models will appear here as you add more CSI specialty products to the catalog.",
    image: ceilingSilver,
    models: [],
  },
  {
    slug: "premium-fans",
    name: "Premium Fans",
    tagline: "BLDC technology with remote convenience",
    description:
      "Premium CSI BLDC fans with remote control, low power draw, high speed, and energy-efficient performance for modern homes.",
    image: bldcBrown,
    models: [
      m({
        modelNo: "CSI-ST-BLDC-BROWN-1200",
        name: "Super Toophan BLDC Brown 1200mm",
        price: 0,
        fanType: "BLDC Ceiling Fan",
        sweep: "1200 mm (48 inch)",
        rpm: "650 RPM ±",
        warranty: "To be updated",
        power: "35 W ± 5 W",
        voltage: "220–240 V AC",
        frequency: "50 Hz",
        blades: "3",
        bladeMaterial: "Premium finish blades",
        motor: "Brushless DC (BLDC) · 100% Copper",
        colors: ["Chocolate Brown"],
        image: bldcBrown,
        images: [bldcBrown],
        highlights: [
          "5-star energy efficient",
          "Remote control",
          "Memory function",
        ],
        features: [
          "BLDC motor for low power consumption",
          "Double ball bearing",
          "Low noise operation",
          "Starts at approximately 90–140 V",
        ],
        specifications: [
          spec("Brand", "CSI"),
          spec("Model No.", "CSI-ST-BLDC-BROWN-1200"),
          spec("Model", "Super Toophan BLDC"),
          spec("Fan Type", "BLDC Ceiling Fan"),
          spec("Sweep Size", "1200 mm (48 inch)"),
          spec("Blade Count", "3"),
          spec("Motor Type", "Brushless DC (BLDC)"),
          spec("Rated Voltage", "220–240 V AC"),
          spec("Frequency", "50 Hz"),
          spec("Rated Power", "35 W ± 5 W"),
          spec("Maximum Speed", "650 RPM"),
          spec("Memory Function", "Yes"),
          spec("Bearing Type", "Double Ball Bearing"),
          spec("Motor Winding", "100% Copper"),
          spec("Noise Level", "Low (<45 dB, typical)"),
          spec("Starting Voltage", "Approximately 90–140 V"),
          spec("Star Rating", "5-Star Energy Efficient"),
          spec("Color", "Chocolate Brown"),
          spec("Speed Control", "Remote"),
        ],
        description:
          "A premium BLDC Super Toophan fan with low power draw, remote convenience, and fast airflow for modern living rooms and bedrooms.",
        tags: ["Premium", "Energy Efficient"],
      }),
      m({
        modelNo: "CSI-ST-BLDC-WHITE-1200",
        name: "Super Toophan BLDC White 1200mm",
        price: 0,
        fanType: "Ceiling Fan",
        sweep: "1200 mm (48 inch)",
        rpm: "650 RPM ±",
        airDelivery: "240–260 CMM",
        warranty: "To be updated",
        power: "35 W ± 5 W",
        voltage: "220–240 V AC",
        frequency: "50 Hz",
        blades: "3",
        bladeMaterial: "Aluminium",
        motor: "Brushless DC (BLDC) · 100% Copper",
        colors: ["White"],
        image: bldcWhite,
        images: [bldcWhite],
        highlights: [
          "RF remote control",
          "High air delivery",
          "5-star energy efficient",
        ],
        features: [
          "BLDC motor with low noise",
          "Double ball bearing",
          "Starts at 90–140 V",
          "Suitable for modern bedrooms and living spaces",
        ],
        specifications: [
          spec("Brand", "CSI"),
          spec("Model No.", "CSI-ST-BLDC-WHITE-1200"),
          spec("Model", "Super Toophan BLDC"),
          spec("Fan Type", "Ceiling Fan"),
          spec("Sweep Size", "1200 mm (48 inch)"),
          spec("Blade Count", "3"),
          spec("Blade Material", "Aluminium"),
          spec("Motor Type", "Brushless DC (BLDC)"),
          spec("Rated Voltage", "220–240 V AC"),
          spec("Frequency", "50 Hz"),
          spec("Rated Power", "35 W ± 5 W"),
          spec("Maximum Speed", "650 RPM ±"),
          spec("Air Delivery", "240–260 CMM"),
          spec("Star Rating", "5-Star Energy Efficient"),
          spec("Speed Control", "RF Remote Control"),
          spec("Bearing Type", "Double Ball Bearing"),
          spec("Motor Winding", "100% Copper"),
          spec("Starting Voltage", "90–140 V"),
          spec("Power Factor", ">0.95"),
          spec("Color", "White"),
          spec("Noise Level", "Low (<45 dB, typical)"),
        ],
        description:
          "A premium white BLDC Super Toophan fan with remote control, strong air delivery, and high-speed energy-efficient operation.",
        tags: ["Premium", "Energy Efficient", "New Arrival"],
      }),
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

export const allImages = allModels.flatMap((mm) =>
  mm.images && mm.images.length ? mm.images : [mm.image]
);

export const searchModels = (query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return [] as typeof allModels;
  return allModels.filter((mm) =>
    [
      mm.name,
      mm.modelNo,
      mm.categoryName,
      mm.fanType ?? "",
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
      ...((mm.specifications ?? []).map((item) => `${item.label} ${item.value ?? ""}`)),
    ]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );
};

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
