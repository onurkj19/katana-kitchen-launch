import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, User } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { BUSINESS } from "@/lib/i18n";

const Card = ({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5 }}
    className="bg-card-elevated border border-border p-6 rounded-md hover:border-primary/60 transition-colors group"
  >
    <div className="flex items-center gap-3 mb-3">
      <div className="h-10 w-10 rounded bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <h3 className="font-display text-xl uppercase tracking-wider">{title}</h3>
    </div>
    <div className="text-muted-foreground text-sm leading-relaxed">{children}</div>
  </motion.div>
);

export const About = () => {
  const { t } = useLang();
  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-16"
        >
          <p className="text-primary font-bold uppercase tracking-[0.3em] text-sm mb-4">// {BUSINESS.name}</p>
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-none mb-6">{t.about.title}</h2>
          <p className="text-lg text-muted-foreground">{t.about.lead}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card icon={MapPin} title={t.about.address}>
            Meierhofweg 28<br />5020 Salzburg<br />
            <span className="text-xs text-primary/80 mt-1 inline-block">{BUSINESS.addressNote}</span>
          </Card>
          <Card icon={Clock} title={t.about.hours}>
            {t.about.hoursValue}<br />
            <span className="text-foreground font-semibold">{t.about.time}</span><br />
            <span className="text-xs">{t.about.closed}</span>
          </Card>
          <Card icon={Phone} title={t.about.contact}>
            <a href={`tel:${BUSINESS.phoneRaw}`} className="hover:text-primary transition-colors block">{BUSINESS.phone}</a>
            <a href={`mailto:${BUSINESS.email}`} className="hover:text-primary transition-colors break-all flex items-center gap-1 mt-1">
              <Mail className="h-3 w-3" />{BUSINESS.email}
            </a>
          </Card>
          <Card icon={User} title={t.about.owner}>
            {BUSINESS.owner}<br />
            <span className="text-xs">Inhaber / Owner</span>
          </Card>
        </div>
      </div>
    </section>
  );
};
