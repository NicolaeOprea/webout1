const statusClassNames = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-olive-light/40 text-olive-dark",
  completed: "bg-stone/10 text-stone",
  cancelled: "bg-red-100 text-red-700",
  product: "bg-terracotta-light/30 text-terracotta",
  service: "bg-stone/10 text-stone",
  active: "bg-olive-light/40 text-olive-dark",
  inactive: "bg-red-100 text-red-700"
};

function StatusBadge({ status }) {
  const value = status || "pending";
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClassNames[value] || "bg-stone/10 text-stone"}`}>{value}</span>;
}

export default StatusBadge;
