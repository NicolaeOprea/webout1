const DEFAULT_BUSINESS_SLUG = process.env.REACT_APP_BUSINESS_SLUG || "sapore-mediterraneo";
const RESERVATION_DURATION_MINUTES = 90;
const TAKEAWAY_DURATION_MINUTES = 15;

const bootstrapCache = new Map();

async function submitReservationOrder(payload) {
  const centerPayload = await buildOrderBookingPayload(payload);
  return postToApi(
    "/api/public/booking-request",
    centerPayload,
    "submitReservationOrder payload",
    getBusinessSlug(payload)
  );
}

async function submitSimpleReservation(payload) {
  const centerPayload = await buildSimpleReservationPayload(payload);
  return postToApi(
    "/api/public/booking-request",
    centerPayload,
    "submitSimpleReservation payload",
    getBusinessSlug(payload)
  );
}

function getApiUrl(endpoint) {
  const baseUrl = process.env.REACT_APP_API_URL || "";
  return `${baseUrl.replace(/\/$/u, "")}${endpoint}`;
}

function getBusinessSlug(payload) {
  return payload.businessSlug || DEFAULT_BUSINESS_SLUG;
}

function toIsoDateTime(date, time) {
  return new Date(`${date}T${time}:00`).toISOString();
}

function addMinutes(isoDateTime, minutes) {
  return new Date(new Date(isoDateTime).getTime() + minutes * 60 * 1000).toISOString();
}

async function getBusinessBootstrap(businessSlug) {
  if (bootstrapCache.has(businessSlug)) {
    return bootstrapCache.get(businessSlug);
  }

  const response = await fetch(getApiUrl(`/api/public/bootstrap/${businessSlug}`), {
    headers: {
      "x-business-slug": businessSlug
    }
  });

  if (!response.ok) {
    throw new Error(await readApiError(response, "Business konnte nicht geladen werden."));
  }

  const body = await response.json();
  const data = body.data || body;
  bootstrapCache.set(businessSlug, data);
  return data;
}

async function getBusinessLocations(businessSlug = DEFAULT_BUSINESS_SLUG) {
  const bootstrap = await getBusinessBootstrap(businessSlug);
  return bootstrap.locations || [];
}

async function resolveLocationId(payload) {
  if (payload.locationId) return payload.locationId;

  const bootstrap = await getBusinessBootstrap(getBusinessSlug(payload));
  const locationId = bootstrap.locations?.[0]?._id;
  if (!locationId) {
    throw new Error("Keine aktive Restaurant-Location im Backend gefunden.");
  }
  return locationId;
}

function buildProductItems(items) {
  return items.map((item) => ({
    type: "product",
    title: item.name,
    referenceType: "custom",
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    currency: "EUR",
    notes: item.notes || undefined,
    metadata: {
      menuItemId: item.menuItemId,
      totalPrice: item.totalPrice
    }
  }));
}

function buildReservationItem({ startsAt, endsAt, persons }) {
  return {
    type: "reservation",
    title: "Tischreservierung",
    referenceType: "custom",
    quantity: 1,
    startsAt,
    endsAt,
    durationMinutes: RESERVATION_DURATION_MINUTES,
    metadata: {
      persons
    }
  };
}

async function buildOrderBookingPayload(payload) {
  const isReservation = payload.orderType === "reservation";
  const startsAt = isReservation
    ? toIsoDateTime(payload.reservationDate, payload.reservationTime)
    : toIsoDateTime(payload.pickupDate, payload.pickupTime);
  const endsAt = addMinutes(
    startsAt,
    isReservation ? RESERVATION_DURATION_MINUTES : TAKEAWAY_DURATION_MINUTES
  );
  const productItems = buildProductItems(payload.items || []);
  const items = isReservation
    ? [buildReservationItem({ startsAt, endsAt, persons: payload.persons }), ...productItems]
    : productItems;

  return {
    locationId: await resolveLocationId(payload),
    customerName: payload.customerName,
    customerPhone: payload.phone,
    customerEmail: payload.email || undefined,
    partySize: isReservation ? payload.persons : undefined,
    startsAt,
    endsAt,
    items,
    notes: [
      isReservation ? "Vorbestellung mit Tischreservierung" : "Take Away",
      `Gesamtpreis: ${payload.totalPrice.toFixed(2)} EUR`,
      payload.notes
    ].filter(Boolean).join("\n")
  };
}

async function buildSimpleReservationPayload(payload) {
  const startsAt = toIsoDateTime(payload.reservationDate, payload.reservationTime);
  const endsAt = addMinutes(startsAt, RESERVATION_DURATION_MINUTES);

  return {
    locationId: await resolveLocationId(payload),
    customerName: payload.customerName,
    customerPhone: payload.phone,
    customerEmail: payload.email || undefined,
    partySize: payload.persons,
    startsAt,
    endsAt,
    items: [buildReservationItem({ startsAt, endsAt, persons: payload.persons })],
    notes: payload.notes || undefined
  };
}

async function readApiError(response, fallbackMessage) {
  try {
    const errorBody = await response.json();
    return errorBody.message || fallbackMessage;
  } catch {
    return `${fallbackMessage} Status: ${response.status}`;
  }
}

async function postToApi(endpoint, payload, logLabel, businessSlug) {
  try {
    const response = await fetch(getApiUrl(endpoint), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-business-slug": businessSlug
      },
      body: JSON.stringify(payload)
    });
    if (response.ok) {
      return { success: true };
    }
    const message = await readApiError(response, "Backend request failed.");
    throw new Error(message);
  } catch (error) {
    console.error(logLabel, error, payload);
    throw error;
  }
}
export {
  getBusinessLocations,
  submitReservationOrder,
  submitSimpleReservation
};
