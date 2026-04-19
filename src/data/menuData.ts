export type MenuCategory = "kebab" | "burger" | "sides" | "drinks" | "extras";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
}

export const menuItems: MenuItem[] = [
  // ── Kebab ──────────────────────────────────────────────────────────────
  {
    id: "kebab-1",
    name: "Kebab",
    description: "Klassischer Döner im Fladenbrot",
    price: 7.0,
    category: "kebab",
    image: "/placeholder.svg",
  },
  {
    id: "kebab-2",
    name: "Kebab Puten",
    description: "Döner mit Putenfleisch im Fladenbrot",
    price: 8.0,
    category: "kebab",
    image: "/placeholder.svg",
  },
  {
    id: "kebab-3",
    name: "Dürüm",
    description: "Im Fladenbrot gerollt",
    price: 9.5,
    category: "kebab",
    image: "/placeholder.svg",
  },
  {
    id: "kebab-4",
    name: "Kebab Box mit Pommes",
    description: "Kebab-Teller mit knusprigen Pommes",
    price: 13.5,
    category: "kebab",
    image: "/placeholder.svg",
  },
  {
    id: "kebab-5",
    name: "Kebabteller mit Pommes",
    description: "Fleisch vom Spieß mit Pommes & Beilagen",
    price: 4.0,
    category: "kebab",
    image: "/placeholder.svg",
  },
  {
    id: "kebab-6",
    name: "Pommes",
    description: "Knusprig & golden",
    price: 8.0,
    category: "kebab",
    image: "/placeholder.svg",
  },
  {
    id: "kebab-7",
    name: "Chicken Stripes (mit Sauce)",
    description: "Knusprige Hähnchenstreifen mit Sauce",
    price: 8.0,
    category: "kebab",
    image: "/placeholder.svg",
  },

  // ── Burger ─────────────────────────────────────────────────────────────
  {
    id: "burger-1",
    name: "Hamburger",
    description: "150g Rindfleisch, Salat, Ketchup, Mayo",
    price: 7.6,
    category: "burger",
    image: "/placeholder.svg",
  },
  {
    id: "burger-2",
    name: "Cheeseburger",
    description: "150g Rindfleisch, Salat, Ketchup, Mayo, Käse",
    price: 8.2,
    category: "burger",
    image: "/placeholder.svg",
  },
  {
    id: "burger-3",
    name: "Extra Burger",
    description: "150g Rindfleisch, Salat, Ketchup, Mayo, Gurke, Käse, Speck",
    price: 9.0,
    category: "burger",
    image: "/placeholder.svg",
  },
  {
    id: "burger-4",
    name: "Extra Burger + Pommes",
    description: "150g Rindfleisch, Salat, Ketchup, Mayo, Gurke, Käse, Speck",
    price: 12.2,
    category: "burger",
    image: "/placeholder.svg",
  },
  {
    id: "burger-5",
    name: "Doppel Burger",
    description: "300g Rindfleisch, Salat, Ketchup, Mayo, Gurke, 2× Käse",
    price: 17.2,
    category: "burger",
    image: "/placeholder.svg",
  },
  {
    id: "burger-6",
    name: "Katana Doppel Burger + Pommes",
    description: "300g Rindfleisch, Salat, Ketchup, Mayo, Gurke, 2× Käse, Speck, Eier",
    price: 22.5,
    category: "burger",
    image: "/placeholder.svg",
  },

  // ── Getränke ───────────────────────────────────────────────────────────
  {
    id: "drinks-1",
    name: "Wasser 0,33l",
    description: "Still oder Prickelnd",
    price: 2.5,
    category: "drinks",
    image: "/placeholder.svg",
  },
  {
    id: "drinks-2",
    name: "Coca Cola 0,33l",
    description: "Kalt & erfrischend",
    price: 2.9,
    category: "drinks",
    image: "/placeholder.svg",
  },
  {
    id: "drinks-3",
    name: "Fanta 0,33l",
    description: "Orange",
    price: 2.9,
    category: "drinks",
    image: "/placeholder.svg",
  },
  {
    id: "drinks-4",
    name: "Energy Drink 0,33l",
    description: "Erfrischend & energiegeladen",
    price: 3.0,
    category: "drinks",
    image: "/placeholder.svg",
  },
  {
    id: "drinks-5",
    name: "Ayran",
    description: "Türkisches Joghurtgetränk",
    price: 2.6,
    category: "drinks",
    image: "/placeholder.svg",
  },

  // ── Extras / Saucen ────────────────────────────────────────────────────
  {
    id: "extras-1",
    name: "Kebab Sauce",
    description: "Chili oder Süß",
    price: 1.0,
    category: "extras",
    image: "/placeholder.svg",
  },
  {
    id: "extras-2",
    name: "Ketchup",
    description: "",
    price: 1.0,
    category: "extras",
    image: "/placeholder.svg",
  },
  {
    id: "extras-3",
    name: "Katana Mayonnaise",
    description: "",
    price: 1.0,
    category: "extras",
    image: "/placeholder.svg",
  },
  {
    id: "extras-4",
    name: "Paprika Sauce",
    description: "Scharf mit Knoblauch",
    price: 1.2,
    category: "extras",
    image: "/placeholder.svg",
  },
];

export const menuCategories: MenuCategory[] = ["kebab", "burger", "drinks", "extras"];

export function getItemsByCategory(category: MenuCategory): MenuItem[] {
  return menuItems.filter((item) => item.category === category);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("de-AT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(price);
}
