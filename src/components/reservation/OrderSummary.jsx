function formatPrice(price) {
  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "EUR"
  }).format(price);
}
function OrderSummary({
  items,
  totalPrice,
  onDecreaseItem,
  onIncreaseItem,
  onRemoveItem,
  onChangeItemNotes,
  onSubmit,
  isSubmitting,
  submitError
}) {
  const isOrderWithoutItems = items.length === 0;
  return <aside className="rounded-[2rem] border border-stone/10 bg-stone px-5 py-6 text-cream shadow-2xl shadow-stone/20 lg:sticky lg:top-28"><div className="mb-6"><h2 className="font-serif text-3xl">Warenkorb</h2><p className="mt-2 text-sm text-cream/70">
          Produkte prüfen, Mengen ändern und Hinweise pro Produkt ergänzen.
        </p></div><div className="space-y-4">{items.length === 0 ? <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-cream/70">
            Aktuell sind keine Produkte ausgewählt.
          </div> : items.map((item) => <div
    key={item.menuItemId}
    className="rounded-3xl border border-white/10 bg-white/5 p-4"
  ><div className="flex items-start justify-between gap-3"><div><h3 className="font-medium text-cream">{item.name}</h3><p className="mt-1 text-sm text-cream/70">{item.quantity} x {formatPrice(item.unitPrice)}</p></div><div className="text-right"><div className="font-semibold text-cream">{formatPrice(item.totalPrice)}</div><div className="mt-3 flex items-center justify-end gap-2"><button
    type="button"
    onClick={() => onDecreaseItem(item.menuItemId)}
    className="h-8 w-8 rounded-full border border-white/20 text-sm transition hover:bg-white/10"
    aria-label={`Menge fur ${item.name} verringern`}
  >
                      -
                    </button><span className="w-6 text-center text-sm">{item.quantity}</span><button
    type="button"
    onClick={() => onIncreaseItem(item.menuItemId)}
    className="h-8 w-8 rounded-full bg-terracotta text-sm transition hover:bg-opacity-90"
    aria-label={`Menge fur ${item.name} erhohen`}
  >
                      +
                    </button></div><button
    type="button"
    onClick={() => onRemoveItem(item.menuItemId)}
    className="mt-3 text-xs font-medium text-cream/70 underline-offset-4 hover:text-cream hover:underline"
  >
                    Entfernen
                  </button></div></div><label className="mt-4 block text-sm text-cream/80">
                Beobachtungen
                <input
    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-cream outline-none placeholder:text-cream/40 focus:border-terracotta"
    value={item.notes}
    onChange={(event) => onChangeItemNotes(item.menuItemId, event.target.value)}
    placeholder="z. B. ohne Zwiebeln, extra Käse"
  /></label></div>)}</div><div className="mt-6 rounded-3xl bg-white/10 p-4"><div className="flex items-center justify-between text-sm text-cream/70"><span>Subtotal</span><span>{formatPrice(totalPrice)}</span></div><div className="mt-3 flex items-center justify-between text-xl font-semibold"><span>Total</span><span>{formatPrice(totalPrice)}</span></div></div>{submitError ? <p className="mt-4 rounded-2xl border border-red-300/20 bg-red-500/10 p-3 text-sm text-red-100">{submitError}</p> : null}{isOrderWithoutItems ? <p className="mt-4 text-sm text-cream/70">
          Bitte Produkte hinzufügen, um die Bestellung senden zu können.
        </p> : null}<button
    type="button"
    onClick={onSubmit}
    disabled={isSubmitting || isOrderWithoutItems}
    className="mt-6 w-full rounded-full bg-cream px-5 py-4 font-semibold text-stone transition hover:bg-white disabled:cursor-not-allowed disabled:bg-cream/50 disabled:text-stone/60"
  >{isSubmitting ? "Wird gesendet..." : "Bestellung absenden"}</button></aside>;
}
export {
  OrderSummary as default
};
