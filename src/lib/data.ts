// Seed data for OBA FARMS e-commerce site

export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  sortOrder: number;
};

export type Variant = {
  id: string;
  label: string;
  unit: 'kg' | 'litre' | 'crate' | 'bag' | 'piece' | 'carton' | 'bucket';
  unitValue: number;
  price: number;
  compareAtPrice?: number;
  stock: number;
  sku: string;
  weightKg: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  categoryId: string;
  images: string[];
  variants: Variant[];
  sourcing?: string;
  storage?: string;
  requiresColdChain: boolean;
  tags: string[];
  isActive: boolean;
};

export type DeliveryZone = {
  id: string;
  name: string;
  fee: number;
  codAllowed: boolean;
  etaHours: number;
};

// Categories
export const categories: Category[] = [
  {
    id: 'grains',
    slug: 'grains',
    name: 'Grains',
    description: 'Local and foreign rice, beans, garri, yam and more',
    image: '/images/categories/grains.svg',
    sortOrder: 1,
  },
  {
    id: 'oils',
    slug: 'oils',
    name: 'Cooking oils',
    description: 'Palm oil and groundnut oil in market kegs and bottles',
    image: '/images/categories/oils.svg',
    sortOrder: 2,
  },
  {
    id: 'eggs',
    slug: 'eggs',
    description: 'Fresh eggs in crates and half crates',
    image: '/images/categories/eggs.svg',
    name: 'Eggs',
    sortOrder: 3,
  },
  {
    id: 'fish-seafood',
    slug: 'fish-seafood',
    name: 'Fish & seafood',
    description: 'Smoked catfish, dried fish, crayfish and stockfish',
    image: '/images/categories/fish.svg',
    sortOrder: 4,
  },
  {
    id: 'frozen',
    slug: 'frozen',
    name: 'Frozen foods',
    description: 'Chicken, turkey, fish and more with cold-chain delivery',
    image: '/images/categories/frozen.svg',
    sortOrder: 5,
  },
  {
    id: 'deals',
    slug: 'deals',
    name: 'Deals',
    description: 'Special bundles and family packs at great prices',
    image: '/images/categories/deals.svg',
    sortOrder: 6,
  },
];

// Products
export const products: Product[] = [
  // Grains
  {
    id: 'rice-local-50kg',
    slug: 'local-rice-50kg',
    name: 'Local rice',
    shortDescription: 'Stone-free Nigerian rice, nutritious and filling',
    description: 'Our locally sourced rice is stone-free and properly processed. Rich in nutrients and perfect for jollof, fried rice, or regular white rice. Sourced directly from farms in northern Nigeria.',
    categoryId: 'grains',
    images: ['/images/products/rice-local.svg'],
    variants: [
      {
        id: 'rice-local-50kg',
        label: '50kg bag',
        unit: 'bag',
        unitValue: 50,
        price: 78000,
        stock: 25,
        sku: 'RICE-LOC-50',
        weightKg: 50,
      },
      {
        id: 'rice-local-25kg',
        label: '25kg bag',
        unit: 'bag',
        unitValue: 25,
        price: 42000,
        stock: 40,
        sku: 'RICE-LOC-25',
        weightKg: 25,
      },
      {
        id: 'rice-local-5kg',
        label: '5kg bag',
        unit: 'bag',
        unitValue: 5,
        price: 9500,
        stock: 100,
        sku: 'RICE-LOC-5',
        weightKg: 5,
      },
    ],
    sourcing: 'Sourced from farms in Kebbi and Kano states. We work directly with cooperatives to ensure fair prices and quality.',
    storage: 'Store in a cool, dry place in an airtight container. Best used within 12 months.',
    requiresColdChain: false,
    tags: ['bestseller'],
    isActive: true,
  },
  {
    id: 'rice-foreign-50kg',
    slug: 'foreign-rice-50kg',
    name: 'Foreign rice',
    shortDescription: 'Premium imported long-grain rice',
    description: 'Premium long-grain rice imported from Thailand. Known for its fluffy texture and excellent taste. Perfect for special occasions and everyday meals.',
    categoryId: 'grains',
    images: ['/images/products/rice-foreign.svg'],
    variants: [
      {
        id: 'rice-foreign-50kg',
        label: '50kg bag',
        unit: 'bag',
        unitValue: 50,
        price: 95000,
        stock: 15,
        sku: 'RICE-FOR-50',
        weightKg: 50,
      },
      {
        id: 'rice-foreign-25kg',
        label: '25kg bag',
        unit: 'bag',
        unitValue: 25,
        price: 52000,
        stock: 30,
        sku: 'RICE-FOR-25',
        weightKg: 25,
      },
    ],
    sourcing: 'Imported from trusted suppliers in Thailand. Quality tested for each shipment.',
    storage: 'Store in a cool, dry place. Best used within 18 months.',
    requiresColdChain: false,
    tags: [],
    isActive: true,
  },
  {
    id: 'beans-oloyin',
    slug: 'beans-oloyin',
    name: 'Oloyin beans',
    shortDescription: 'Sweet honey beans, perfect for porridge',
    description: 'Oloyin beans are known for their sweet taste and soft texture when cooked. Perfect for beans porridge, moi-moi, and other Nigerian delicacies.',
    categoryId: 'grains',
    images: ['/images/products/beans-oloyin.svg'],
    variants: [
      {
        id: 'beans-oloyin-paint',
        label: 'Paint bucket (4kg)',
        unit: 'bucket',
        unitValue: 4,
        price: 6000,
        stock: 50,
        sku: 'BEANS-OLY-4',
        weightKg: 4,
      },
      {
        id: 'beans-oloyin-10kg',
        label: '10kg bag',
        unit: 'bag',
        unitValue: 10,
        price: 14500,
        stock: 25,
        sku: 'BEANS-OLY-10',
        weightKg: 10,
      },
    ],
    sourcing: 'Sourced from bean farmers in Plateau and Borno states.',
    storage: 'Store in a cool, dry place. Best used within 6 months.',
    requiresColdChain: false,
    tags: ['bestseller'],
    isActive: true,
  },
  {
    id: 'garri-ijebu',
    slug: 'garri-ijebu',
    name: 'Ijebu garri',
    shortDescription: 'Crunchy, sour garri for eba and drinking',
    description: 'Authentic Ijebu garri with the characteristic sour taste and crunchy texture. Perfect for eba or soaked with cold water and milk.',
    categoryId: 'grains',
    images: ['/images/products/garri-ijebu.svg'],
    variants: [
      {
        id: 'garri-ijebu-paint',
        label: 'Paint bucket (5kg)',
        unit: 'bucket',
        unitValue: 5,
        price: 4500,
        stock: 60,
        sku: 'GARR-IJ-5',
        weightKg: 5,
      },
      {
        id: 'garri-ijebu-10kg',
        label: '10kg bag',
        unit: 'bag',
        unitValue: 10,
        price: 8500,
        stock: 35,
        sku: 'GARR-IJ-10',
        weightKg: 10,
      },
    ],
    sourcing: 'Processed in Ijebu-Ode using traditional methods.',
    storage: 'Store in an airtight container in a cool, dry place. Best used within 8 months.',
    requiresColdChain: false,
    tags: [],
    isActive: true,
  },
  {
    id: 'yam-tuber',
    slug: 'yam-tuber',
    name: 'Yam tubers',
    shortDescription: 'Fresh Nigerian yam, sweet and fluffy',
    description: 'Fresh yam tubers from Benue state. Known for their sweet taste and fluffy texture when cooked. Perfect for yam porridge, fried yam, or boiled yam.',
    categoryId: 'grains',
    images: ['/images/products/yam.svg'],
    variants: [
      {
        id: 'yam-tuber-medium',
        label: 'Medium tuber (2-3kg)',
        unit: 'piece',
        unitValue: 1,
        price: 3500,
        stock: 80,
        sku: 'YAM-MED',
        weightKg: 2.5,
      },
      {
        id: 'yam-tuber-large',
        label: 'Large tuber (4-5kg)',
        unit: 'piece',
        unitValue: 1,
        price: 5500,
        stock: 45,
        sku: 'YAM-LRG',
        weightKg: 4.5,
      },
    ],
    sourcing: 'Sourced from yam farmers in Benue state, the food basket of Nigeria.',
    storage: 'Store in a cool, well-ventilated area. Do not refrigerate. Best used within 2 weeks.',
    requiresColdChain: false,
    tags: [],
    isActive: true,
  },

  // Oils
  {
    id: 'palm-oil-25l',
    slug: 'palm-oil-25l',
    name: 'Palm oil',
    shortDescription: 'Red palm oil, rich and authentic',
    description: '100% pure red palm oil extracted from fresh palm fruits. Rich in vitamin E and perfect for Nigerian cooking. No additives or preservatives.',
    categoryId: 'oils',
    images: ['/images/products/palm-oil.svg'],
    variants: [
      {
        id: 'palm-oil-25l',
        label: '25 litre keg',
        unit: 'litre',
        unitValue: 25,
        price: 46000,
        stock: 20,
        sku: 'PALM-25',
        weightKg: 23,
      },
      {
        id: 'palm-oil-10l',
        label: '10 litre keg',
        unit: 'litre',
        unitValue: 10,
        price: 19500,
        stock: 35,
        sku: 'PALM-10',
        weightKg: 9.5,
      },
      {
        id: 'palm-oil-5l',
        label: '5 litre keg',
        unit: 'litre',
        unitValue: 5,
        price: 10500,
        stock: 50,
        sku: 'PALM-5',
        weightKg: 4.8,
      },
      {
        id: 'palm-oil-1l',
        label: '1 litre bottle',
        unit: 'litre',
        unitValue: 1,
        price: 2500,
        stock: 100,
        sku: 'PALM-1',
        weightKg: 1,
      },
    ],
    sourcing: 'Extracted from fresh palm fruits in Edo and Delta states. Traditional extraction methods.',
    storage: 'Store in a cool, dark place. Solidifies at room temperature - warm to liquefy. Best used within 12 months.',
    requiresColdChain: false,
    tags: ['bestseller'],
    isActive: true,
  },
  {
    id: 'groundnut-oil-25l',
    slug: 'groundnut-oil-25l',
    name: 'Groundnut oil',
    shortDescription: 'Pure groundnut oil, light and healthy',
    description: '100% pure groundnut oil with a light flavor and high smoke point. Perfect for frying and general cooking. Rich in healthy fats.',
    categoryId: 'oils',
    images: ['/images/products/groundnut-oil.svg'],
    variants: [
      {
        id: 'groundnut-oil-25l',
        label: '25 litre keg',
        unit: 'litre',
        unitValue: 25,
        price: 52000,
        stock: 15,
        sku: 'GNUT-25',
        weightKg: 22,
      },
      {
        id: 'groundnut-oil-5l',
        label: '5 litre keg',
        unit: 'litre',
        unitValue: 5,
        price: 12500,
        stock: 40,
        sku: 'GNUT-5',
        weightKg: 4.5,
      },
      {
        id: 'groundnut-oil-1l',
        label: '1 litre bottle',
        unit: 'litre',
        unitValue: 1,
        price: 3000,
        stock: 80,
        sku: 'GNUT-1',
        weightKg: 1,
      },
    ],
    sourcing: 'Cold-pressed from groundnuts sourced from Kano state.',
    storage: 'Store in a cool, dark place. Best used within 18 months.',
    requiresColdChain: false,
    tags: [],
    isActive: true,
  },

  // Eggs
  {
    id: 'eggs-crate',
    slug: 'eggs-crate',
    name: 'Eggs',
    shortDescription: 'Fresh farm eggs, rich and nutritious',
    description: 'Fresh eggs from free-range chickens. Rich in protein and essential nutrients. Perfect for breakfast, baking, and cooking.',
    categoryId: 'eggs',
    images: ['/images/products/eggs.svg'],
    variants: [
      {
        id: 'eggs-crate-30',
        label: 'Crate (30 pieces)',
        unit: 'crate',
        unitValue: 30,
        price: 5200,
        stock: 60,
        sku: 'EGG-CR-30',
        weightKg: 1.8,
      },
      {
        id: 'eggs-half-crate',
        label: 'Half crate (15 pieces)',
        unit: 'crate',
        unitValue: 15,
        price: 2800,
        stock: 80,
        sku: 'EGG-CR-15',
        weightKg: 0.9,
      },
      {
        id: 'eggs-jumbo',
        label: 'Jumbo crate (36 pieces)',
        unit: 'crate',
        unitValue: 36,
        price: 6500,
        stock: 25,
        sku: 'EGG-CR-36',
        weightKg: 2.2,
      },
    ],
    sourcing: 'Sourced from poultry farms in Ogun state. Chickens are free-range and fed organic feed.',
    storage: 'Refrigerate at or below 4°C. Best used within 3 weeks of purchase.',
    requiresColdChain: true,
    tags: ['bestseller'],
    isActive: true,
  },

  // Fish & Seafood
  {
    id: 'catfish-smoked',
    slug: 'smoked-catfish',
    name: 'Smoked catfish',
    shortDescription: 'Traditional smoked catfish, rich flavor',
    description: 'Traditionally smoked catfish with a rich, smoky flavor. Perfect for soups, stews, and pepper soup. Cleaned and ready to use.',
    categoryId: 'fish-seafood',
    images: ['/images/products/catfish-smoked.svg'],
    variants: [
      {
        id: 'catfish-smoked-small',
        label: 'Small size',
        unit: 'kg',
        unitValue: 1,
        price: 7500,
        stock: 40,
        sku: 'CAT-SM-S',
        weightKg: 1,
      },
      {
        id: 'catfish-smoked-medium',
        label: 'Medium size',
        unit: 'kg',
        unitValue: 1,
        price: 8500,
        stock: 35,
        sku: 'CAT-SM-M',
        weightKg: 1,
      },
      {
        id: 'catfish-smoked-large',
        label: 'Large size',
        unit: 'kg',
        unitValue: 1,
        price: 9500,
        stock: 20,
        sku: 'CAT-SM-L',
        weightKg: 1,
      },
    ],
    sourcing: 'Smoked using traditional methods by fish processors in Lagos and Delta states.',
    storage: 'Store in a cool, dry place or refrigerate. Can be frozen for up to 6 months. Best used within 3 months.',
    requiresColdChain: false,
    tags: ['bestseller'],
    isActive: true,
  },
  {
    id: 'dried-fish',
    slug: 'dried-fish',
    name: 'Dried fish',
    shortDescription: 'Stockfish and dried tilapia',
    description: 'Premium dried fish including stockfish and tilapia. Adds depth and flavor to traditional Nigerian soups and stews.',
    categoryId: 'fish-seafood',
    images: ['/images/products/dried-fish.svg'],
    variants: [
      {
        id: 'dried-fish-tilapia',
        label: 'Dried tilapia (per piece)',
        unit: 'piece',
        unitValue: 1,
        price: 2500,
        stock: 60,
        sku: 'DF-TIL',
        weightKg: 0.3,
      },
      {
        id: 'dried-fish-stock',
        label: 'Stockfish head (per piece)',
        unit: 'piece',
        unitValue: 1,
        price: 4000,
        stock: 45,
        sku: 'DF-STK',
        weightKg: 0.5,
      },
    ],
    sourcing: 'Imported stockfish from Norway and locally dried tilapia from coastal communities.',
    storage: 'Store in a cool, dry place. Can be frozen for extended storage. Best used within 6 months.',
    requiresColdChain: false,
    tags: [],
    isActive: true,
  },
  {
    id: 'crayfish',
    slug: 'crayfish',
    name: 'Crayfish',
    shortDescription: 'Ground crayfish for authentic flavor',
    description: 'Fresh ground crayfish for authentic Nigerian cooking. Adds umami flavor to soups, stews, and sauces.',
    categoryId: 'fish-seafood',
    images: ['/images/products/crayfish.svg'],
    variants: [
      {
        id: 'crayfish-250g',
        label: '250g',
        unit: 'piece',
        unitValue: 1,
        price: 1800,
        stock: 100,
        sku: 'CRAY-250',
        weightKg: 0.25,
      },
      {
        id: 'crayfish-500g',
        label: '500g',
        unit: 'piece',
        unitValue: 1,
        price: 3500,
        stock: 70,
        sku: 'CRAY-500',
        weightKg: 0.5,
      },
      {
        id: 'crayfish-1kg',
        label: '1kg',
        unit: 'piece',
        unitValue: 1,
        price: 6500,
        stock: 40,
        sku: 'CRAY-1K',
        weightKg: 1,
      },
    ],
    sourcing: 'Sourced from fishermen in Cross River state.',
    storage: 'Store in an airtight container in a cool, dry place. Best used within 6 months.',
    requiresColdChain: false,
    tags: [],
    isActive: true,
  },

  // Frozen Foods
  {
    id: 'chicken-whole',
    slug: 'frozen-chicken',
    name: 'Frozen chicken',
    shortDescription: 'Whole frozen chicken, cleaned and ready',
    description: 'Whole frozen chicken, cleaned and ready to cook. Farm-raised and processed under hygienic conditions. Delivered with cold chain.',
    categoryId: 'frozen',
    images: ['/images/products/chicken.svg'],
    variants: [
      {
        id: 'chicken-whole-piece',
        label: 'Whole chicken (per kg)',
        unit: 'kg',
        unitValue: 1,
        price: 4500,
        stock: 50,
        sku: 'CHK-WH-KG',
        weightKg: 1,
      },
      {
        id: 'chicken-laps',
        label: 'Chicken laps (per kg)',
        unit: 'kg',
        unitValue: 1,
        price: 5000,
        stock: 40,
        sku: 'CHK-LAP-KG',
        weightKg: 1,
      },
      {
        id: 'chicken-wings',
        label: 'Chicken wings (per kg)',
        unit: 'kg',
        unitValue: 1,
        price: 4800,
        stock: 35,
        sku: 'CHK-WIN-KG',
        weightKg: 1,
      },
    ],
    sourcing: 'Farm-raised in Ogun state. Processed and frozen within 24 hours of slaughter.',
    storage: 'Keep frozen at -18°C or below. Once thawed, do not refreeze. Best used within 6 months.',
    requiresColdChain: true,
    tags: ['bestseller'],
    isActive: true,
  },
  {
    id: 'turkey-whole',
    slug: 'frozen-turkey',
    name: 'Frozen turkey',
    shortDescription: 'Whole frozen turkey for special occasions',
    description: 'Whole frozen turkey, perfect for Christmas and special occasions. Farm-raised and processed under hygienic conditions.',
    categoryId: 'frozen',
    images: ['/images/products/turkey.svg'],
    variants: [
      {
        id: 'turkey-whole-kg',
        label: 'Whole turkey (per kg)',
        unit: 'kg',
        unitValue: 1,
        price: 5500,
        stock: 25,
        sku: 'TKY-WH-KG',
        weightKg: 1,
      },
    ],
    sourcing: 'Farm-raised in Ogun state. Processed and frozen within 24 hours of slaughter.',
    storage: 'Keep frozen at -18°C or below. Thaw in refrigerator before cooking. Best used within 6 months.',
    requiresColdChain: true,
    tags: [],
    isActive: true,
  },
  {
    id: 'titus-fish',
    slug: 'frozen-titus-fish',
    name: 'Frozen titus fish',
    shortDescription: 'Mackerel fish, cleaned and frozen',
    description: 'Frozen titus fish (mackerel), cleaned and ready to cook. Rich in omega-3 fatty acids. Perfect for frying, grilling, or adding to stews.',
    categoryId: 'frozen',
    images: ['/images/products/titus-fish.svg'],
    variants: [
      {
        id: 'titus-fish-kg',
        label: 'Per kg',
        unit: 'kg',
        unitValue: 1,
        price: 4200,
        stock: 60,
        sku: 'TIT-KG',
        weightKg: 1,
      },
    ],
    sourcing: 'Imported and frozen immediately to preserve freshness.',
    storage: 'Keep frozen at -18°C or below. Best used within 6 months.',
    requiresColdChain: true,
    tags: [],
    isActive: true,
  },

  // Deals
  {
    id: 'soup-starter-pack',
    slug: 'soup-starter-pack',
    name: 'Soup starter pack',
    shortDescription: 'Everything you need for authentic Nigerian soup',
    description: 'A complete pack with all essential ingredients for authentic Nigerian soup. Includes palm oil, crayfish, dried fish, and seasoning.',
    categoryId: 'deals',
    images: ['/images/products/soup-pack.svg'],
    variants: [
      {
        id: 'soup-starter-pack',
        label: 'Complete pack',
        unit: 'piece',
        unitValue: 1,
        price: 8500,
        compareAtPrice: 10000,
        stock: 30,
        sku: 'SOUP-START',
        weightKg: 5,
      },
    ],
    sourcing: 'Curated with the best ingredients from our selection.',
    storage: 'Individual components have different storage requirements. Pack contains storage instructions.',
    requiresColdChain: false,
    tags: ['new'],
    isActive: true,
  },
  {
    id: 'family-pack',
    slug: 'monthly-family-pack',
    name: 'Monthly family pack',
    shortDescription: 'Essential staples for a family of 4 for one month',
    description: 'A curated pack of essential staples to feed a family of 4 for one month. Includes rice, beans, oil, and other essentials at a special price.',
    categoryId: 'deals',
    images: ['/images/products/family-pack.svg'],
    variants: [
      {
        id: 'family-pack',
        label: 'Complete pack',
        unit: 'piece',
        unitValue: 1,
        price: 45000,
        compareAtPrice: 52000,
        stock: 15,
        sku: 'FAM-PACK',
        weightKg: 80,
      },
    ],
    sourcing: 'Curated with the best quality staples from our selection.',
    storage: 'Individual components have different storage requirements. Pack contains storage instructions.',
    requiresColdChain: false,
    tags: ['bulk'],
    isActive: true,
  },
];

// Delivery zones
export const deliveryZones: DeliveryZone[] = [
  {
    id: 'lagos-mainland',
    name: 'Lagos Mainland',
    fee: 2000,
    codAllowed: true,
    etaHours: 24,
  },
  {
    id: 'lagos-island',
    name: 'Lagos Island',
    fee: 2500,
    codAllowed: true,
    etaHours: 24,
  },
  {
    id: 'ikeja',
    name: 'Ikeja and environs',
    fee: 2000,
    codAllowed: true,
    etaHours: 24,
  },
  {
    id: 'lekki-ajah',
    name: 'Lekki/Ajah',
    fee: 3000,
    codAllowed: true,
    etaHours: 24,
  },
  {
    id: 'ogun',
    name: 'Ogun State border',
    fee: 4000,
    codAllowed: false,
    etaHours: 48,
  },
];

// Helper functions
export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  const category = categories.find(c => c.slug === categorySlug);
  if (!category) return [];
  return products.filter(p => p.categoryId === category.id && p.isActive);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}

export function formatPrice(price: number): string {
  return `₦${price.toLocaleString()}`;
}

export function getDeliveryZoneById(id: string): DeliveryZone | undefined {
  return deliveryZones.find(z => z.id === id);
}