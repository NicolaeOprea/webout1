function MenuCategoryTabs({
  categories,
  activeCategory,
  onSelectCategory
}) {
  return <div className="flex gap-3 overflow-x-auto pb-2">{categories.map((category) => {
    const isActive = category === activeCategory;
    return <button
      key={category}
      type="button"
      onClick={() => onSelectCategory(category)}
      className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium transition ${isActive ? "bg-olive-dark text-cream shadow-lg shadow-olive-dark/20" : "bg-white text-stone hover:bg-terracotta-light hover:text-stone"}`}
    >{category}</button>;
  })}</div>;
}
export {
  MenuCategoryTabs as default
};
