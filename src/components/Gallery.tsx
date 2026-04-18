import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { useLang } from "@/lib/lang-context";

export const Gallery = () => {
  const { t } = useLang();
  const tiles = Array.from({ length: 8 });
  return (
    <section id="gallery" className="py-24 md:py-32 bg-secondary/30">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-primary font-bold uppercase tracking-[0.3em] text-sm mb-4">// Gallery</p>
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-none mb-4">{t.gallery.title}</h2>
          <p className="text-muted-foreground">{t.gallery.caption}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {tiles.map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="aspect-square bg-gradient-to-br from-secondary to-background border border-border rounded-md relative overflow-hidden group hover:border-primary/60 transition-colors"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/50 group-hover:text-primary/70 transition-colors">
                <Camera className="h-8 w-8 mb-2" />
                <span className="text-[10px] uppercase tracking-widest font-bold">{t.gallery.soon}</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
