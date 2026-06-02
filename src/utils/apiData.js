export function extractApiData(body) {
  return body?.data ?? body ?? null;
}

export function extractApiList(body) {
  const data = extractApiData(body);
  return Array.isArray(data) ? data : [];
}

export function extractApiItem(body) {
  const data = extractApiData(body);
  return Array.isArray(data) ? data[0] || null : data;
}
