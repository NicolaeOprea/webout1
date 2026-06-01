async function submitReservationOrder(payload) {
  return postWithFallback("/api/orders", payload, "submitReservationOrder payload");
}
async function submitSimpleReservation(payload) {
  return postWithFallback("/api/reservations", payload, "submitSimpleReservation payload");
}
async function postWithFallback(endpoint, payload, logLabel) {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    if (response.ok) {
      return { success: true };
    }
    if (response.status !== 404) {
      return { success: false };
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
