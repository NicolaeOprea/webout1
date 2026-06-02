import {
  clearStoredBusinessSlug,
  clearStoredToken,
  clearStoredUser,
  getStoredBusinessSlug,
  getStoredToken
} from "../utils/tokenStorage";

let unauthorizedHandler = null;

export const setUnauthorizedHandler = (handler) => {
  unauthorizedHandler = handler;
};

function getApiUrl(endpoint) {
  const baseUrl = process.env.REACT_APP_API_URL || "";
  return `${baseUrl.replace(/\/$/u, "")}${endpoint}`;
}

async function readResponse(response) {
  const text = await response.text();
  let body = null;

  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = { message: text };
  }

  if (!response.ok) {
    if (response.status === 401) {
      clearStoredToken();
      clearStoredBusinessSlug();
      clearStoredUser();
      unauthorizedHandler?.();
    }

    throw new Error(body?.message || body?.error || `Request failed with status ${response.status}`);
  }

  return body;
}

export async function apiRequest(endpoint, { method = "GET", body, auth = true, businessSlug, headers = {} } = {}) {
  const token = getStoredToken();
  const resolvedBusinessSlug = businessSlug || getStoredBusinessSlug() || process.env.REACT_APP_BUSINESS_SLUG || "sapore-mediterraneo";
  const requestHeaders = {
    "Content-Type": "application/json",
    ...headers
  };

  if (auth && token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  if (resolvedBusinessSlug) {
    requestHeaders["x-business-slug"] = resolvedBusinessSlug;
  }

  const response = await fetch(getApiUrl(endpoint), {
    method,
    headers: requestHeaders,
    body: body ? JSON.stringify(body) : undefined
  });

  return readResponse(response);
}
