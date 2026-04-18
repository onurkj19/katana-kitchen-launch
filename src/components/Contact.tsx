import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Instagram, Facebook, MapPin, Phone, Mail, Send } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { BUSINESS } from "@/lib/i18n";
import { toast } from "sonner";

export const Contact = () => {
  const { t } = useLang();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast.success(t.contact.success);
    }, 600);
  };

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-primary font-bold uppercase tracking-[0.3em] text-sm mb-4">// Contact</p>
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-none mb-4">{t.contact.title}</h2>
          <p className="text-muted-foreground">{t.contact.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={onSubmit}
            className="bg-card-elevated border border-border rounded-md p-6 md:p-8 space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="c-name" className="uppercase text-xs tracking-wider">{t.contact.name}</Label>
              <Input id="c-name" required className="bg-background border-border focus-visible:ring-primary" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="c-email" className="uppercase text-xs tracking-wider">{t.contact.email}</Label>
              <Input id="c-email" type="email" required className="bg-background border-border focus-visible:ring-primary" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="c-msg" className="uppercase text-xs tracking-wider">{t.contact.message}</Label>
              <Textarea id="c-msg" required rows={6} className="bg-background border-border focus-visible:ring-primary resize-none" />
            </div>
            <Button
              type="submit"
              disabled={submitting}
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-wider shadow-glow"
            >
              <Send className="mr-2 h-4 w-4" />
              {t.contact.send}
            </Button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-card-elevated border border-border rounded-md p-6 space-y-4">
              <h3 className="font-display text-2xl uppercase tracking-wider mb-2">{t.contact.findUs}</h3>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-semibold">{BUSINESS.name}</p>
                  <p className="text-muted-foreground">{BUSINESS.address}</p>
                  <p className="text-xs text-primary/80">{BUSINESS.addressNote}</p>
                </div>
              </div>
              <a href={`tel:${BUSINESS.phoneRaw}`} className="flex items-center gap-3 hover:text-primary transition-colors text-sm">
                <Phone className="h-5 w-5 text-primary" /> {BUSINESS.phone}
              </a>
              <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-3 hover:text-primary transition-colors text-sm">
                <Mail className="h-5 w-5 text-primary" /> {BUSINESS.email}
              </a>

              <div className="flex gap-3 pt-2 border-t border-border">
                <a href="#" aria-label="Instagram" className="h-10 w-10 rounded border border-border hover:border-primary hover:text-primary flex items-center justify-center transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" aria-label="Facebook" className="h-10 w-10 rounded border border-border hover:border-primary hover:text-primary flex items-center justify-center transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div className="rounded-md overflow-hidden border border-border h-64 bg-secondary">
              <iframe
                title="Katana Kebab & Burger Standort"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Meierhofweg+28,+5020+Salzburg&output=embed"
                style={{ border: 0, filter: "invert(0.92) hue-rotate(180deg) saturate(0.6)" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
