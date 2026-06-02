export function formatDateTime(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

export function formatPrice(value, currency = "EUR") {
  if (value == null || Number.isNaN(Number(value))) return "-";
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency
  }).format(Number(value));
}
