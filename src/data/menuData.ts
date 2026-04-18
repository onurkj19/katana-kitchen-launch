export type MenuCategory = "kebab" | "burger" | "sides" | "drinks";

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
    name: "Klassik Döner",
    description: "Dünnes Fladenbrot, Fleisch vom Spieß, Salat, Tomate, Sauce",
    price: 7.5,
    category: "kebab",
    image: "/placeholder.svg",
  },
  {
    id: "kebab-2",
    name: "Dürüm",
    description: "Im Fladenbrot gerollt mit Fleisch, Salat & Sauce",
    price: 7.9,
    category: "kebab",
    image: "/placeholder.svg",
  },
  {
    id: "kebab-3",
    name: "Kebab Teller",
    description: "Fleisch vom Spieß mit Reis, Salat & Brot",
    price: 10.9,
    category: "kebab",
    image: "/placeholder.svg",
  },
  {
    id: "kebab-4",
    name: "Yufka",
    description: "Knusprig gebackenes Fladenbrot mit Fleisch & Gemüse",
    price: 8.5,
    category: "kebab",
    image: "/placeholder.svg",
  },
  {
    id: "kebab-5",
    name: "Gemischter Teller",
    description: "Döner & Hähnchen vom Spieß, Reis, Salat & Sauce",
    price: 12.9,
    category: "kebab",
    image: "/placeholder.svg",
  },

  // ── Burger ─────────────────────────────────────────────────────────────
  {
    id: "burger-1",
    name: "Katana Burger",
    description: "Signature Beef Patty, Cheddar, Caramelized Onions, Katana Sauce",
    price: 10.9,
    category: "burger",
    image: "/placeholder.svg",
  },
  {
    id: "burger-2",
    name: "Cheeseburger",
    description: "Beef Patty, Doppel-Cheddar, Gurken, Senf, Ketchup",
    price: 8.9,
    category: "burger",
    image: "/placeholder.svg",
  },
  {
    id: "burger-3",
    name: "Spicy Burger",
    description: "Beef Patty, Jalapeños, Hot Sauce, Sriracha Mayo",
    price: 10.5,
    category: "burger",
    image: "/placeholder.svg",
  },
  {
    id: "burger-4",
    name: "Chicken Burger",
    description: "Knusprige Hähnchenbrust, Coleslaw, Honey Mustard",
    price: 9.9,
    category: "burger",
    image: "/placeholder.svg",
  },

  // ── Sides ──────────────────────────────────────────────────────────────
  {
    id: "sides-1",
    name: "Pommes",
    description: "Knusprig & golden, mit Ketchup oder Mayo",
    price: 3.9,
    category: "sides",
    image: "/placeholder.svg",
  },
  {
    id: "sides-2",
    name: "Süßkartoffel Pommes",
    description: "Mit hausgemachtem Dip",
    price: 4.5,
    category: "sides",
    image: "/placeholder.svg",
  },
  {
    id: "sides-3",
    name: "Onion Rings",
    description: "Knusprig frittiert, hausgemacht",
    price: 4.2,
    category: "sides",
    image: "/placeholder.svg",
  },
  {
    id: "sides-4",
    name: "Salat Bowl",
    description: "Frischer gemischter Salat mit Hausdressing",
    price: 4.9,
    category: "sides",
    image: "/placeholder.svg",
  },

  // ── Drinks ─────────────────────────────────────────────────────────────
  {
    id: "drinks-1",
    name: "Ayran",
    description: "Türkisches Joghurtgetränk, 0,33L",
    price: 2.5,
    category: "drinks",
    image: "/placeholder.svg",
  },
  {
    id: "drinks-2",
    name: "Coca-Cola",
    description: "Kalt & erfrischend, 0,33L",
    price: 2.5,
    category: "drinks",
    image: "/placeholder.svg",
  },
  {
    id: "drinks-3",
    name: "Fanta",
    description: "Orange, 0,33L",
    price: 2.5,
    category: "drinks",
    image: "/placeholder.svg",
  },
  {
    id: "drinks-4",
    name: "Wasser",
    description: "Still oder Sprudel, 0,5L",
    price: 1.9,
    category: "drinks",
    image: "/placeholder.svg",
  },
];

export const menuCategories: MenuCategory[] = ["kebab", "burger", "sides", "drinks"];

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
