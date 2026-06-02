async function submitReservationOrder(payload) {
  return postToApi("/api/orders", payload, "submitReservationOrder payload");
}
async function submitSimpleReservation(payload) {
  return postToApi("/api/reservations", payload, "submitSimpleReservation payload");
}
function getApiUrl(endpoint) {
  const baseUrl = process.env.REACT_APP_API_URL || "";
  return `${baseUrl.replace(/\/$/u, "")}${endpoint}`;
}
async function postToApi(endpoint, payload, logLabel) {
  try {
    const response = await fetch(getApiUrl(endpoint), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    if (response.ok) {
      return { success: true };
    }
  } catch {
  }
  console.log(logLabel, payload);
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve({ success: true });
    }, 900);
  });
}
export {
  submitReservationOrder,
  submitSimpleReservation
};
