const options = [
  {
    type: "takeaway",
    title: "Take Away",
    description: "Produkte ausw\xE4hlen, Datum und Abholzeit festlegen."
  },
  {
    type: "reservation",
    title: "Vorbestellung mit Tischreservierung",
    description: "Essen vorbestellen und optional direkt einen Tisch reservieren."
  }
];
function ReservationTypeSelector({
  selectedType,
  onSelect
}) {
  return <div className="grid gap-4 md:grid-cols-2">{options.map((option) => {
    const isActive = option.type === selectedType;
    return <button
      key={option.type}
      type="button"
      onClick={() => onSelect(option.type)}
      className={`rounded-3xl border p-5 text-left transition-all duration-300 ${isActive ? "border-terracotta bg-terracotta text-cream shadow-lg shadow-terracotta/20" : "border-stone/20 bg-white/80 text-stone hover:-translate-y-1 hover:border-terracotta-light hover:shadow-md"}`}
    ><div className="mb-2 font-serif text-2xl">{option.title}</div><p className={`${isActive ? "text-cream/85" : "text-stone-light"}`}>{option.description}</p></button>;
  })}</div>;
}
export {
  ReservationTypeSelector as default
};
