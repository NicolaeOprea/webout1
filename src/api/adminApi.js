import { apiRequest } from "./client";

export const getAdminDashboard = (businessSlug) => apiRequest("/api/dashboard/admin", { businessSlug });

export const getAppointments = (businessSlug) => apiRequest("/api/appointments", { businessSlug });

export const updateAppointmentStatus = (appointmentId, payload, businessSlug) =>
  apiRequest(`/api/appointments/${appointmentId}/status`, {
    method: "PATCH",
    body: payload,
    businessSlug
  });

export const getLocations = (businessSlug) => apiRequest("/api/locations", { businessSlug });

export const getListings = (businessSlug) => apiRequest("/api/listings", { businessSlug });

export const createListing = (payload, businessSlug) =>
  apiRequest("/api/listings", {
    method: "POST",
    body: payload,
    businessSlug
  });

export const updateListing = (listingId, payload, businessSlug) =>
  apiRequest(`/api/listings/${listingId}`, {
    method: "PATCH",
    body: payload,
    businessSlug
  });
