function AlertMessage({ type = "info", children }) {
  if (!children) return null;

  const tone = type === "error"
    ? "border-red-200 bg-red-50 text-red-700"
    : type === "success"
      ? "border-olive/30 bg-olive-light/20 text-olive-dark"
      : "border-stone/10 bg-white text-stone";

  return <div className={`rounded-2xl border px-4 py-3 text-sm ${tone}`}>{children}</div>;
}

export default AlertMessage;
