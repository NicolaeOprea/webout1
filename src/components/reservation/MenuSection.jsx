import MenuCategoryTabs from "./MenuCategoryTabs";
import MenuItemCard from "./MenuItemCard";
function MenuSection({
  categories,
  activeCategory,
  menuItems,
  quantities,
  onSelectCategory,
  onDecreaseItem,
  onIncreaseItem
}) {
  return <section className="rounded-[2rem] bg-gradient-to-br from-stone/5 via-white to-cream p-6 shadow-xl shadow-stone/5"><div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><h2 className="font-serif text-3xl text-stone">Meniu produse</h2><p className="mt-2 max-w-2xl text-stone-light">
            Wählen Sie Ihre Gerichte nach Kategorien aus und legen Sie sie in den Warenkorb.
          </p></div><div className="text-sm text-stone-light">
          Nicht verfügbare Produkte bleiben sichtbar, können aber nicht hinzugefügt werden.
        </div></div><MenuCategoryTabs
    categories={categories}
    activeCategory={activeCategory}
    onSelectCategory={onSelectCategory}
  /><div className="mt-6 grid gap-6 lg:grid-cols-2">{menuItems.map((item) => <MenuItemCard
    key={item.id}
    item={item}
    quantity={quantities[item.id] ?? 0}
    onDecrease={onDecreaseItem}
    onIncrease={onIncreaseItem}
  />)}</div></section>;
}
export {
  MenuSection as default
};
