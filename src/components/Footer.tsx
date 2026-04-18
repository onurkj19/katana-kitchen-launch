import { useLang } from "@/lib/lang-context";
import { BUSINESS } from "@/lib/i18n";

const sections = ["home", "menu", "order", "gallery", "contact"] as const;

export const Footer = () => {
  const { t } = useLang();
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="bg-black border-t border-border pt-16 pb-8">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/arlindlogo.jpeg" alt="Katana Kebab & Burger" className="h-14 w-auto" width={56} height={56} loading="lazy" />
              <div>
                <p className="font-display text-2xl tracking-wider">KATANA</p>
                <p className="text-[10px] text-primary font-bold tracking-[0.25em]">KEBAB & BURGER</p>
              </div>
            </div>
            <p className="text-gradient-fire font-display text-2xl uppercase tracking-wide mb-3">{t.footer.tagline}</p>
            <p className="text-sm text-muted-foreground max-w-sm">
              {BUSINESS.address} — {BUSINESS.addressNote}
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg uppercase tracking-wider mb-4 text-primary">{t.footer.quickLinks}</h4>
            <ul className="space-y-2 text-sm">
              {sections.map((s) => (
                <li key={s}>
                  <button onClick={() => go(s)} className="text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider text-xs">
                    {t.nav[s as keyof typeof t.nav]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg uppercase tracking-wider mb-4 text-primary">{t.footer.hours}</h4>
            <p className="text-sm text-muted-foreground">{t.about.hoursValue}</p>
            <p className="text-sm font-semibold mb-2">{t.about.time}</p>
            <p className="text-xs text-muted-foreground">{t.about.closed}</p>
            <a href={`tel:${BUSINESS.phoneRaw}`} className="block mt-4 text-primary font-bold text-sm hover:underline">
              {BUSINESS.phone}
            </a>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row gap-3 justify-between items-center text-xs text-muted-foreground">
          <p>© 2025 {BUSINESS.name}. {t.footer.rights}</p>
          <p>{BUSINESS.owner} · {BUSINESS.email}</p>
        </div>
      </div>
    </footer>
  );
};
