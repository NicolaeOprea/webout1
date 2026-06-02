import { apiRequest } from "./client";

export const getAdminDashboard = (businessSlug) => apiRequest("/api/dashboard/admin", { businessSlug });

export const getSuperAdminDashboard = () => apiRequest("/api/dashboard/superadmin");

export const getAppointments = (businessSlug) => apiRequest("/api/appointments", { businessSlug });

export const updateAppointmentStatus = (appointmentId, payload, businessSlug) =>
  apiRequest(`/api/appointments/${appointmentId}/status`, {
    method: "PATCH",
    body: payload,
    businessSlug
  });

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

export const getBusinesses = () => apiRequest("/api/businesses");

export const createBusiness = (payload) =>
  apiRequest("/api/businesses", {
    method: "POST",
    body: payload
  });

export const updateBusiness = (businessId, payload) =>
  apiRequest(`/api/businesses/${businessId}`, {
    method: "PATCH",
    body: payload
  });

export const deleteBusiness = (businessId) =>
  apiRequest(`/api/businesses/${businessId}`, {
    method: "DELETE"
  });

export const permanentDeleteBusiness = (businessId) =>
  apiRequest(`/api/businesses/${businessId}/permanent`, {
    method: "DELETE"
  });

export const registerBusinessAdmin = (payload) =>
  apiRequest("/api/auth/register-business-admin", {
    method: "POST",
    body: payload
  });

export const getBusinessUsers = (businessId) => apiRequest(`/api/businesses/${businessId}/users`);
