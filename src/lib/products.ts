import superToophanSilver from "@/assets/super-toophan-silver.png.asset.json";
import superToophanChocolate from "@/assets/super-toophan-chocolate.png.asset.json";

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

const m = (
  model: Omit<Model, "slug" | "voltage" | "frequency"> &
    Partial<Pick<Model, "voltage" | "frequency">>
): Model => ({
  voltage: "230 V",
  frequency: "50 Hz",
  ...model,
  slug: slugify(model.modelNo),
});

export const categories: Category[] = [
  {
    slug: "ceiling-fans",
    name: "Ceiling Fans",
    tagline: "Powerful airflow overhead",
    description:
      "Premium 1200mm ceiling fans engineered for the best performance even in low voltage — featuring the flagship Super TOOPHAN series.",
    image: superToophanSilver.url,
    models: [
      m({
        modelNo: "CSI-ST-SILVER-1200",
        name: "Super Toophan Silver 1200mm",
        price: 3299,
        sweep: "1200 mm (48 inch)",
        rpm: "360–400 RPM",
        airDelivery: "220–235 CMM",
        warranty: "3 Years",
        power: "70–80 W",
        voltage: "220–240 V AC",
        frequency: "50 Hz",
        blades: "3 Aerodynamic",
        bladeMaterial: "Aluminium (Silver/White-Silver)",
        motor: "100% Copper Winding · Double Ball Bearing",
        colors: ["Silver", "White-Silver"],
        image: superToophanSilver.url,
        images: [superToophanSilver.url],
        highlights: [
          "Best performance in low voltage",
          "Decorative integrated light",
          "100% copper · double ball bearing",
        ],
        features: [
          "Best performance in low voltage",
          "Decorative integrated light fitting",
          "100% copper winding motor",
          "Double ball bearing for long life",
          "1200 mm (48\") aerodynamic 3-blade sweep",
          "ISO 9001:2015 certified manufacturing",
          "Downrod ceiling mount",
        ],
        description:
          "The Super Toophan Silver is engineered for the best performance in low voltage conditions. A 3-blade 1200mm ceiling fan with decorative integrated light fitting, 100% copper winding motor, double ball bearing and a class-leading 3-year warranty.",
        tags: ["New Arrival", "Best Seller"],
      }),
      m({
        modelNo: "CSI-ST-CHOCOLATE-1200",
        name: "Super Toophan Chocolate 1200mm",
        price: 3299,
        sweep: "1200 mm (48 inch)",
        rpm: "380–400 RPM",
        airDelivery: "220–240 CMM",
        warranty: "3 Years",
        power: "70–75 W",
        voltage: "220–240 V AC (operates 140–240 V)",
        frequency: "50 Hz",
        blades: "3 Aerodynamic",
        bladeMaterial: "Aluminium (Chocolate)",
        motor: "Copper-wound induction · Double Ball Bearing",
        colors: ["Chocolate"],
        image: superToophanChocolate.url,
        images: [superToophanChocolate.url],
        highlights: [
          "Rich chocolate premium finish",
          "Wide voltage operation (140–240 V)",
          "Service value ~3.1–3.3 CMM/W",
        ],
        features: [
          "Best performance even in low voltage (140–240 V)",
          "Copper-wound induction motor",
          "Double ball bearing for long life",
          "1200 mm (48\") aerodynamic 3-blade sweep",
          "Service value ~3.1–3.3 CMM/W",
          "Standard downrod 225–260 mm",
          "ISO 9001:2015 certified manufacturing",
        ],
        description:
          "The Super Toophan Chocolate is a premium 1200mm 3-blade ceiling fan in a rich chocolate finish. Built with a copper-wound induction motor and double ball bearings, it delivers 220–240 CMM of air at just 70–75 W and runs reliably across a wide 140–240 V range — backed by a 3-year warranty.",
        tags: ["New Arrival"],
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
