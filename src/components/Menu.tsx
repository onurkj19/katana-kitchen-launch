import { useState } from "react";
import { motion } from "framer-motion";
import { ImageIcon, Flame } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { cn } from "@/lib/utils";

const items = {
  kebab: [
    { name: "Klassik Döner", desc: "Brot, Fleisch, Salat, Sauce", price: "—" },
    { name: "Dürüm", desc: "Im Fladenbrot gerollt", price: "—" },
    { name: "Kebab Teller", desc: "Mit Reis & Salat", price: "—" },
    { name: "Yufka", desc: "Knusprig gerollt", price: "—" },
  ],
  burger: [
    { name: "Katana Burger", desc: "Signature Beef, Cheddar, Sauce", price: "—" },
    { name: "Cheeseburger", desc: "Klassiker neu interpretiert", price: "—" },
    { name: "Spicy Burger", desc: "Mit Jalapeños & Hot Sauce", price: "—" },
    { name: "Chicken Burger", desc: "Knusprige Hähnchenbrust", price: "—" },
  ],
  sides: [
    { name: "Pommes", desc: "Knusprig & golden", price: "—" },
    { name: "Süßkartoffel Pommes", desc: "Mit Dip", price: "—" },
    { name: "Onion Rings", desc: "Hausgemacht", price: "—" },
    { name: "Salat Bowl", desc: "Frisch & knackig", price: "—" },
  ],
  drinks: [
    { name: "Ayran", desc: "Türkisches Joghurtgetränk", price: "—" },
    { name: "Coca-Cola", desc: "0,33L", price: "—" },
    { name: "Fanta", desc: "0,33L", price: "—" },
    { name: "Wasser", desc: "Still / Sprudel", price: "—" },
  ],
};

type CatKey = keyof typeof items;

export const Menu = () => {
  const { t } = useLang();
  const [active, setActive] = useState<CatKey>("kebab");
  const cats: CatKey[] = ["kebab", "burger", "sides", "drinks"];

  return (
    <section id="menu" className="py-24 md:py-32 bg-secondary/30 relative">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-primary font-bold uppercase tracking-[0.3em] text-sm mb-4">// Menu</p>
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-none mb-4">{t.menu.title}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t.menu.subtitle}</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "px-5 py-2.5 rounded font-bold uppercase tracking-wider text-sm transition-all border-2",
                active === c
                  ? "bg-primary border-primary text-primary-foreground shadow-glow"
                  : "bg-transparent border-border hover:border-primary/60 text-foreground/80 hover:text-foreground"
              )}
            >
              {t.menu.categories[c]}
            </button>
          ))}
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {items[active].map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card-elevated border border-border rounded-md overflow-hidden hover:border-primary/60 hover:-translate-y-1 transition-all group"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-secondary to-background flex flex-col items-center justify-center relative border-b border-border">
                <ImageIcon className="h-10 w-10 text-muted-foreground/40 mb-2" />
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60 px-2 text-center">
                  {t.menu.notice}
                </span>
                <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded flex items-center gap-1">
                  <Flame className="h-3 w-3" /> Soon
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h3 className="font-display text-lg uppercase tracking-wide group-hover:text-primary transition-colors">{item.name}</h3>
                  <span className="text-primary font-bold whitespace-nowrap">{item.price}</span>
                </div>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
