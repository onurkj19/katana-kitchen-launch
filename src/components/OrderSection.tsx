import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Truck, Send } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { toast } from "sonner";
import { BUSINESS } from "@/lib/i18n";

export const OrderSection = () => {
  const { t } = useLang();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast.success(t.order.success);
    }, 600);
  };

  return (
    <section id="order" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="container relative">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <p className="text-primary font-bold uppercase tracking-[0.3em] text-sm mb-4">// Delivery</p>
            <h2 className="font-display text-5xl md:text-6xl uppercase leading-none mb-6">{t.order.title}</h2>
            <p className="text-muted-foreground mb-8">{t.order.subtitle}</p>

            <div className="bg-card-elevated border border-primary/30 rounded p-5 flex items-start gap-4">
              <div className="h-10 w-10 rounded bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Truck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-bold uppercase tracking-wider text-sm mb-1">{t.order.delivery}</p>
                <p className="text-xs text-muted-foreground">5020 Salzburg & Umgebung</p>
                <a href={`tel:${BUSINESS.phoneRaw}`} className="text-primary font-bold text-sm hover:underline mt-2 inline-block">
                  📞 {BUSINESS.phone}
                </a>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={onSubmit}
            className="lg:col-span-3 bg-card-elevated border border-border rounded-md p-6 md:p-8 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="o-name" className="uppercase text-xs tracking-wider">{t.order.name}</Label>
                <Input id="o-name" required className="bg-background border-border focus-visible:ring-primary" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="o-phone" className="uppercase text-xs tracking-wider">{t.order.phone}</Label>
                <Input id="o-phone" type="tel" required className="bg-background border-border focus-visible:ring-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="o-addr" className="uppercase text-xs tracking-wider">{t.order.address}</Label>
              <Input id="o-addr" required className="bg-background border-border focus-visible:ring-primary" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="o-details" className="uppercase text-xs tracking-wider">{t.order.details}</Label>
              <Textarea id="o-details" required rows={4} className="bg-background border-border focus-visible:ring-primary resize-none" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="o-notes" className="uppercase text-xs tracking-wider">{t.order.notes}</Label>
              <Textarea id="o-notes" rows={2} className="bg-background border-border focus-visible:ring-primary resize-none" />
            </div>
            <Button
              type="submit"
              disabled={submitting}
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-wider shadow-glow hover:shadow-glow-strong"
            >
              <Send className="mr-2 h-4 w-4" />
              {t.order.submit}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};
