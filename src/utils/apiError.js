export function getApiErrorMessage(error) {
  return error?.message || "Die Anfrage konnte nicht verarbeitet werden.";
}
