function StatCard({ label, value }) {
  return <article className="rounded-[1.5rem] border border-stone/10 bg-white p-5 shadow-lg shadow-stone/5"><span className="text-sm font-medium text-stone-light">{label}</span><strong className="mt-3 block font-serif text-4xl text-stone">{value}</strong></article>;
}

export default StatCard;
