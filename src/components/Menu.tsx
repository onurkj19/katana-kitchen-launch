import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Plus, Check } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { useCart } from "@/lib/cart-context";
import { menuItems, menuCategories, formatPrice, type MenuCategory } from "@/data/menuData";
import { FoodImage } from "@/components/FoodImage";
import { cn } from "@/lib/utils";

export const Menu = () => {
  const { t } = useLang();
  const { addItem } = useCart();
  const [active, setActive] = useState<MenuCategory>("kebab");
  const [recentlyAdded, setRecentlyAdded] = useState<Set<string>>(new Set());

  const visibleItems = menuItems.filter((item) => item.category === active);

  const handleAdd = (item: (typeof menuItems)[number]) => {
    addItem({ id: item.id, name: item.name, price: item.price });
    setRecentlyAdded((prev) => new Set(prev).add(item.id));
    setTimeout(() => {
      setRecentlyAdded((prev) => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
    }, 1500);
  };

  return (
    <section id="menu" className="py-24 md:py-32 bg-secondary/30 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary font-bold uppercase tracking-[0.3em] text-sm mb-4">// Menu</p>
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-none mb-4">{t.menu.title}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t.menu.subtitle}</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
          {menuCategories.map((c) => (
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {visibleItems.map((item, i) => {
            const added = recentlyAdded.has(item.id);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card-elevated border border-border rounded-md overflow-hidden hover:border-primary/60 hover:-translate-y-1 transition-all group flex flex-col"
              >
                <FoodImage src={item.image} alt={item.name} />
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3 className="font-display text-lg uppercase tracking-wide group-hover:text-primary transition-colors leading-tight">
                      {item.name}
                    </h3>
                    <span className="text-primary font-bold whitespace-nowrap tabular-nums">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4 flex-1">{item.description}</p>
                  <button
                    onClick={() => handleAdd(item)}
                    className={cn(
                      "mt-auto w-full flex items-center justify-center gap-2 py-2.5 rounded text-sm font-bold uppercase tracking-wider transition-all border-2",
                      added
                        ? "bg-primary/20 border-primary text-primary"
                        : "bg-transparent border-border hover:border-primary hover:bg-primary/10 hover:text-primary text-foreground/70"
                    )}
                  >
                    {added ? (
                      <>
                        <Check className="h-4 w-4" />
                        {t.menu.added}
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        {t.menu.addToCart}
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
