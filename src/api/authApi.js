import { apiRequest } from "./client";

export const loginRequest = (payload) => apiRequest("/api/auth/login", {
  method: "POST",
  body: payload,
  auth: false,
  businessSlug: payload.businessSlug
});

export const getCurrentUserRequest = () => apiRequest("/api/auth/me");
