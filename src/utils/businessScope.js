import { getStoredBusinessSlug } from "./tokenStorage";

export function getBusinessSlug(user) {
  return user?.business?.slug || user?.businessSlug || getStoredBusinessSlug() || process.env.REACT_APP_BUSINESS_SLUG || "sapore-mediterraneo";
}
