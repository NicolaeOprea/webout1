import { Minus, Plus } from "lucide-react";
function formatPrice(price) {
  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "EUR"
  }).format(price);
}
function MenuItemCard({
  item,
  quantity,
  onDecrease,
  onIncrease
}) {
  return <article className="group overflow-hidden rounded-[1.75rem] border border-stone/10 bg-white shadow-lg shadow-stone/5 transition hover:-translate-y-1 hover:shadow-xl"><div className="h-40 bg-gradient-to-br from-terracotta-light via-cream to-olive-light p-5"><div className="flex h-full flex-col justify-between rounded-[1.25rem] border border-white/50 bg-white/20 p-4 backdrop-blur-sm"><span className="inline-flex w-fit rounded-full bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone">{item.category}</span>{!item.available ? <span className="inline-flex w-fit rounded-full bg-stone px-3 py-1 text-xs font-medium text-cream">
              Nicht verfügbar
            </span> : null}</div></div><div className="space-y-4 p-5"><div><div className="mb-2 flex items-start justify-between gap-4"><h3 className="font-serif text-2xl text-stone">{item.name}</h3><span className="text-lg font-semibold text-terracotta">{formatPrice(item.price)}</span></div><p className="text-sm leading-6 text-stone-light">{item.description}</p></div><div className="flex items-center justify-between"><div className="text-sm text-stone-light">{quantity > 0 ? `${quantity} ausgew\xE4hlt` : "In den Warenkorb"}</div><div className="flex items-center gap-3"><button
    type="button"
    className="flex h-10 w-10 items-center justify-center rounded-full border border-stone/20 text-stone transition hover:border-terracotta hover:text-terracotta disabled:cursor-not-allowed disabled:opacity-40"
    onClick={() => onDecrease(item.id)}
    disabled={quantity === 0}
    aria-label={`Menge fur ${item.name} verringern`}
  ><Minus size={18} /></button><span className="w-6 text-center font-semibold text-stone">{quantity}</span><button
    type="button"
    className="flex h-10 w-10 items-center justify-center rounded-full bg-terracotta text-cream transition hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-stone-light"
    onClick={() => onIncrease(item.id)}
    disabled={!item.available}
    aria-label={`Menge fur ${item.name} erhohen`}
  ><Plus size={18} /></button></div></div></div></article>;
}
export {
  MenuItemCard as default
};
