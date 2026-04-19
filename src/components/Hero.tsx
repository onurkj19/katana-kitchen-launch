import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Flame, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/lang-context";

const Embers = () => {
  const embers = Array.from({ length: 18 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {embers.map((_, i) => (
        <span
          key={i}
          className="absolute bottom-0 block w-1 h-1 rounded-full bg-primary/70 animate-ember"
          style={{
            left: `${(i * 5.7) % 100}%`,
            animationDelay: `${(i * 0.4) % 8}s`,
            animationDuration: `${6 + (i % 5)}s`,
          }}
        />
      ))}
    </div>
  );
};

export const Hero = () => {
  const { t } = useLang();
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-hero noise-overlay overflow-hidden">
      {/* Glow blobs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-primary/15 blur-[100px] rounded-full" />
      <Embers />

      <div className="container relative z-10 text-center py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex justify-center mb-8"
        >
          <img
            src="/arlindlogo.png"
            alt="Katana Kebab & Burger Logo"
            className="h-44 sm:h-56 md:h-72 w-auto flame-flicker drop-shadow-[0_0_40px_hsl(var(--primary)/0.6)]"
            width={400}
            height={400}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase leading-none mb-4"
        >
          <span className="block">Fresh. Bold.</span>
          <span className="block text-gradient-fire">Legendary.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 mt-6"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            onClick={() => go("order")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-wider text-base px-8 py-6 shadow-glow hover:shadow-glow-strong transition-all group"
          >
            <Flame className="mr-2 h-5 w-5" />
            {t.hero.orderNow}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => go("menu")}
            className="border-2 border-foreground/30 hover:border-primary hover:text-primary bg-transparent font-bold uppercase tracking-wider text-base px-8 py-6"
          >
            {t.hero.viewMenu}
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground text-xs uppercase tracking-[0.3em]"
      >
        ↓ Scroll
      </motion.div>
    </section>
  );
};
