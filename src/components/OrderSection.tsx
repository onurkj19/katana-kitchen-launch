import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Truck, Send, CheckCircle, ArrowLeft, ShoppingBag, AlertCircle } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { useCart } from "@/lib/cart-context";
import { BUSINESS } from "@/lib/i18n";
import { formatPrice } from "@/data/menuData";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3;

interface DeliveryForm {
  name: string;
  phone: string;
  address: string;
  notes: string;
}

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

export const OrderSection = () => {
  const { t } = useLang();
  const { items, total, totalFormatted, clearCart } = useCart();
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<DeliveryForm>({ name: "", phone: "", address: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [placed, setPlaced] = useState(false);

  const hasItems = items.length > 0;

  const stepLabels: Record<Step, string> = {
    1: t.order.step1,
    2: t.order.step2,
    3: t.order.step3,
  };

  const handleFormChange = (field: keyof DeliveryForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasItems) return;

    setSubmitting(true);

    const itemsList = items
      .map((i) => `${i.qty}x ${i.name} (${formatPrice(i.price * i.qty)})`)
      .join("\n");

    const templateParams = {
      customer_name: form.name,
      customer_phone: form.phone,
      delivery_address: form.address,
      order_items: itemsList,
      order_total: totalFormatted,
      notes: form.notes || "—",
      to_email: BUSINESS.email,
    };

    try {
      if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        console.warn("EmailJS environment variables not set. Order not sent.");
        throw new Error("EmailJS not configured");
      }
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
      clearCart();
      setPlaced(true);
      setStep(1);
      setForm({ name: "", phone: "", address: "", notes: "" });
    } catch {
      toast.error(t.order.orderError);
    } finally {
      setSubmitting(false);
    }
  };

  const resetOrder = () => {
    setPlaced(false);
    setStep(1);
  };

  return (
    <section id="order" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary font-bold uppercase tracking-[0.3em] text-sm mb-4">// Delivery</p>
          <h2 className="font-display text-5xl md:text-6xl uppercase leading-none mb-4">{t.order.title}</h2>
          <p className="text-muted-foreground">{t.order.subtitle}</p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Delivery info card */}
          <div className="bg-card-elevated border border-primary/30 rounded p-5 flex items-start gap-4 mb-8">
            <div className="h-10 w-10 rounded bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Truck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-bold uppercase tracking-wider text-sm mb-1">{t.order.delivery}</p>
              <p className="text-xs text-muted-foreground">5020 Salzburg & Umgebung</p>
              <a
                href={`tel:${BUSINESS.phoneRaw}`}
                className="text-primary font-bold text-sm hover:underline mt-2 inline-block"
              >
                {BUSINESS.phone}
              </a>
            </div>
          </div>

          {placed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card-elevated border border-primary/40 rounded-md p-8 md:p-12 text-center space-y-6"
            >
              <div className="flex justify-center">
                <CheckCircle className="h-16 w-16 text-primary" />
              </div>
              <h3 className="font-display text-3xl md:text-4xl uppercase tracking-wide">{t.order.orderPlaced}</h3>
              <p className="text-muted-foreground max-w-md mx-auto">{t.order.orderPlacedText}</p>
              <Button
                onClick={resetOrder}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground uppercase tracking-wider font-bold"
              >
                {t.order.newOrder}
              </Button>
            </motion.div>
          ) : (
            <>
              {/* Step indicator */}
              <div className="flex items-center justify-center gap-2 mb-8">
                {([1, 2, 3] as Step[]).map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all",
                        step === s
                          ? "bg-primary border-primary text-primary-foreground"
                          : step > s
                          ? "bg-primary/20 border-primary text-primary"
                          : "bg-transparent border-border text-muted-foreground"
                      )}
                    >
                      {s}
                    </div>
                    <span
                      className={cn(
                        "text-xs font-bold uppercase tracking-wider hidden sm:inline",
                        step === s ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {stepLabels[s]}
                    </span>
                    {s < 3 && <div className="w-8 h-px bg-border mx-1" />}
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {/* Step 1: Cart Summary */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-card-elevated border border-border rounded-md p-6 md:p-8"
                  >
                    <h3 className="font-display text-2xl uppercase tracking-wide mb-6 flex items-center gap-3">
                      <ShoppingBag className="h-5 w-5 text-primary" />
                      {t.order.orderSummary}
                    </h3>

                    {!hasItems ? (
                      <div className="text-center py-8 space-y-3">
                        <ShoppingBag className="h-10 w-10 text-muted-foreground/30 mx-auto" />
                        <p className="text-muted-foreground text-sm">{t.order.cartEmpty}</p>
                        <Button
                          variant="outline"
                          onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
                          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground uppercase tracking-wider text-xs font-bold"
                        >
                          {t.nav.menu}
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-3 mb-6">
                          {items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                              <div>
                                <p className="font-semibold text-sm uppercase tracking-wide">{item.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {item.qty} × {formatPrice(item.price)}
                                </p>
                              </div>
                              <span className="text-primary font-bold tabular-nums">{formatPrice(item.price * item.qty)}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-between pt-2 mb-6">
                          <span className="font-bold uppercase tracking-wider">{t.order.total}</span>
                          <span className="font-display text-2xl text-primary">{totalFormatted}</span>
                        </div>
                        <Button
                          onClick={() => setStep(2)}
                          size="lg"
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-wider shadow-glow"
                        >
                          {t.order.step2} →
                        </Button>
                      </>
                    )}
                  </motion.div>
                )}

                {/* Step 2: Delivery Details */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-card-elevated border border-border rounded-md p-6 md:p-8"
                  >
                    <h3 className="font-display text-2xl uppercase tracking-wide mb-6">{t.order.deliveryDetails}</h3>
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="o-name" className="uppercase text-xs tracking-wider">{t.order.name}</Label>
                          <Input
                            id="o-name"
                            required
                            value={form.name}
                            onChange={(e) => handleFormChange("name", e.target.value)}
                            className="bg-background border-border focus-visible:ring-primary"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="o-phone" className="uppercase text-xs tracking-wider">{t.order.phone}</Label>
                          <Input
                            id="o-phone"
                            type="tel"
                            required
                            value={form.phone}
                            onChange={(e) => handleFormChange("phone", e.target.value)}
                            className="bg-background border-border focus-visible:ring-primary"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="o-addr" className="uppercase text-xs tracking-wider">{t.order.address}</Label>
                        <Input
                          id="o-addr"
                          required
                          value={form.address}
                          onChange={(e) => handleFormChange("address", e.target.value)}
                          className="bg-background border-border focus-visible:ring-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="o-notes" className="uppercase text-xs tracking-wider">{t.order.notes}</Label>
                        <Textarea
                          id="o-notes"
                          rows={3}
                          value={form.notes}
                          onChange={(e) => handleFormChange("notes", e.target.value)}
                          className="bg-background border-border focus-visible:ring-primary resize-none"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <Button
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="border-border hover:border-primary hover:text-primary uppercase tracking-wider text-xs font-bold"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {t.order.step1}
                      </Button>
                      <Button
                        onClick={() => {
                          if (!form.name || !form.phone || !form.address) return;
                          setStep(3);
                        }}
                        disabled={!form.name || !form.phone || !form.address}
                        size="lg"
                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-wider shadow-glow disabled:opacity-50"
                      >
                        {t.order.step3} →
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Confirm & Send */}
                {step === 3 && (
                  <motion.form
                    key="step3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    onSubmit={handleSubmit}
                    className="bg-card-elevated border border-border rounded-md p-6 md:p-8 space-y-6"
                  >
                    <h3 className="font-display text-2xl uppercase tracking-wide">{t.order.step3}</h3>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">{t.order.orderSummary}</p>
                        <div className="space-y-2">
                          {items.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                              <span className="text-muted-foreground">{item.qty}× {item.name}</span>
                              <span className="font-bold tabular-nums">{formatPrice(item.price * item.qty)}</span>
                            </div>
                          ))}
                          <div className="flex justify-between pt-2 border-t border-border font-bold">
                            <span>{t.order.total}</span>
                            <span className="text-primary">{totalFormatted}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">{t.order.deliveryDetails}</p>
                        <div className="space-y-1.5 text-sm">
                          <p><span className="text-muted-foreground">{t.order.name}:</span> {form.name}</p>
                          <p><span className="text-muted-foreground">{t.order.phone}:</span> {form.phone}</p>
                          <p><span className="text-muted-foreground">{t.order.address}:</span> {form.address}</p>
                          {form.notes && (
                            <p><span className="text-muted-foreground">{t.order.notes}:</span> {form.notes}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {(!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) && (
                      <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/30 rounded p-4 text-sm">
                        <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        <p className="text-amber-400">
                          EmailJS not configured. Set <code className="text-xs bg-black/30 px-1 rounded">VITE_EMAILJS_*</code> env vars to enable email delivery. Order will not be sent until configured.
                        </p>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(2)}
                        className="border-border hover:border-primary hover:text-primary uppercase tracking-wider text-xs font-bold"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {t.order.step2}
                      </Button>
                      <Button
                        type="submit"
                        disabled={submitting}
                        size="lg"
                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-wider shadow-glow hover:shadow-glow-strong disabled:opacity-50"
                      >
                        <Send className="mr-2 h-4 w-4" />
                        {submitting ? "..." : t.order.confirmOrder}
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
