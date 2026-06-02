const TOKEN_KEY = "sapore_admin_token";
const BUSINESS_SLUG_KEY = "sapore_admin_business_slug";
const USER_KEY = "sapore_admin_user";

export const getStoredToken = () => localStorage.getItem(TOKEN_KEY) || "";
export const setStoredToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearStoredToken = () => localStorage.removeItem(TOKEN_KEY);

export const getStoredBusinessSlug = () => localStorage.getItem(BUSINESS_SLUG_KEY) || "";
export const setStoredBusinessSlug = (businessSlug) => localStorage.setItem(BUSINESS_SLUG_KEY, businessSlug);
export const clearStoredBusinessSlug = () => localStorage.removeItem(BUSINESS_SLUG_KEY);

export const getStoredUser = () => {
  const value = localStorage.getItem(USER_KEY);
  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

export const setStoredUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));
export const clearStoredUser = () => localStorage.removeItem(USER_KEY);
