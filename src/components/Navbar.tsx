import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import logo from "@/assets/logo.png";
import { useLang } from "@/lib/lang-context";
import { cn } from "@/lib/utils";

const sections = ["home", "about", "menu", "order", "gallery", "contact"] as const;

export const Navbar = () => {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border/60" : "bg-transparent"
      )}
    >
      <nav className="container flex items-center justify-between h-16 md:h-20">
        <button onClick={() => go("home")} className="flex items-center gap-3 group">
          <img src={logo} alt="Katana Kebab & Burger Logo" className="h-10 md:h-12 w-auto drop-shadow-[0_0_12px_hsl(var(--primary)/0.5)]" width={48} height={48} />
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-display text-xl md:text-2xl tracking-wider">KATANA</span>
            <span className="text-[10px] md:text-xs text-primary font-semibold tracking-[0.25em]">KEBAB & BURGER</span>
          </div>
        </button>

        <div className="hidden lg:flex items-center gap-8">
          {sections.map((s) => (
            <button
              key={s}
              onClick={() => go(s)}
              className="text-sm font-semibold uppercase tracking-wider text-foreground/80 hover:text-primary transition-colors relative after:absolute after:left-0 after:bottom-[-6px] after:h-[2px] after:w-0 after:bg-primary hover:after:w-full after:transition-all"
            >
              {t.nav[s as keyof typeof t.nav]}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "de" ? "en" : "de")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-border hover:border-primary hover:text-primary transition-colors text-xs font-bold uppercase"
            aria-label="Toggle language"
          >
            <Globe className="h-3.5 w-3.5" />
            {lang.toUpperCase()}
          </button>
          <button
            className="lg:hidden p-2 hover:text-primary transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-background/95 backdrop-blur-md border-b border-border"
          >
            <div className="container py-6 flex flex-col gap-4">
              {sections.map((s) => (
                <button
                  key={s}
                  onClick={() => go(s)}
                  className="text-left text-lg font-semibold uppercase tracking-wider hover:text-primary transition-colors"
                >
                  {t.nav[s as keyof typeof t.nav]}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
