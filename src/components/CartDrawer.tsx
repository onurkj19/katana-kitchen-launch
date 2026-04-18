import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { useLang } from "@/lib/lang-context";
import { formatPrice } from "@/data/menuData";
import { cn } from "@/lib/utils";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, itemCount, total, totalFormatted, removeItem, updateQty } = useCart();
  const { t } = useLang();

  const goToOrder = () => {
    onOpenChange(false);
    setTimeout(() => {
      document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col bg-background border-l border-border p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
          <SheetTitle className="font-display text-2xl uppercase tracking-wider flex items-center gap-3">
            <ShoppingCart className="h-5 w-5 text-primary" />
            {t.cart.title}
            {itemCount > 0 && (
              <span className="ml-auto text-sm font-bold bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground px-6">
            <ShoppingCart className="h-12 w-12 opacity-20" />
            <p className="text-sm">{t.cart.empty}</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-secondary/30 rounded-md p-3 border border-border"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm uppercase tracking-wide truncate">{item.name}</p>
                    <p className="text-xs text-primary font-bold mt-0.5">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="h-7 w-7 rounded border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center text-sm font-bold tabular-nums">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="h-7 w-7 rounded border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="h-7 w-7 rounded border border-border flex items-center justify-center hover:border-destructive hover:text-destructive transition-colors ml-1"
                      aria-label={t.cart.remove}
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 pb-6 pt-4 border-t border-border space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold uppercase tracking-wider text-sm">{t.cart.total}</span>
                <span className="font-display text-2xl text-primary">{totalFormatted}</span>
              </div>
              <Button
                onClick={goToOrder}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-wider shadow-glow"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {t.cart.checkout}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export function CartButton({ onClick }: { onClick: () => void }) {
  const { itemCount } = useCart();

  return (
    <button
      onClick={onClick}
      className="relative p-2 hover:text-primary transition-colors"
      aria-label="Open cart"
    >
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 leading-none">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </button>
  );
}
