import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUserRequest, loginRequest } from "../api/authApi";
import { setUnauthorizedHandler } from "../api/client";
import { getApiErrorMessage } from "../utils/apiError";
import { getBusinessSlug } from "../utils/businessScope";
import {
  clearStoredBusinessSlug,
  clearStoredToken,
  clearStoredUser,
  getStoredBusinessSlug,
  getStoredToken,
  getStoredUser,
  setStoredBusinessSlug,
  setStoredToken,
  setStoredUser
} from "../utils/tokenStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(getStoredUser());
  const [token, setToken] = useState(getStoredToken());
  const [businessSlug, setBusinessSlug] = useState(getStoredBusinessSlug());
  const [loading, setLoading] = useState(true);

  const logout = useCallback((redirectPath = "/login") => {
    clearStoredToken();
    clearStoredBusinessSlug();
    clearStoredUser();
    setToken("");
    setBusinessSlug("");
    setCurrentUser(null);
    navigate(redirectPath, { replace: true });
  }, [navigate]);

  const loadCurrentUser = useCallback(async () => {
    if (!getStoredToken()) {
      setLoading(false);
      return;
    }

    try {
      const body = await getCurrentUserRequest();
      const user = body?.data || body?.user || body;
      const nextBusinessSlug = getBusinessSlug(user);
      setCurrentUser(user);
      setStoredUser(user);

      if (nextBusinessSlug) {
        setBusinessSlug(nextBusinessSlug);
        setStoredBusinessSlug(nextBusinessSlug);
      }
    } catch {
      clearStoredToken();
      clearStoredBusinessSlug();
      clearStoredUser();
      setToken("");
      setBusinessSlug("");
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(() => logout("/login"));
    loadCurrentUser();
  }, [loadCurrentUser, logout]);

  const login = useCallback(async (credentials) => {
    const loginBody = await loginRequest(credentials);
    const payload = loginBody?.data || loginBody;
    const nextToken = payload?.token || payload?.accessToken || payload?.jwt || "";

    if (!nextToken) {
      throw new Error("Kein Token vom Server erhalten.");
    }

    setStoredToken(nextToken);
    setToken(nextToken);

    if (credentials.businessSlug) {
      setStoredBusinessSlug(credentials.businessSlug);
      setBusinessSlug(credentials.businessSlug);
    }

    const userBody = await getCurrentUserRequest();
    const user = userBody?.data || userBody?.user || userBody;
    const nextBusinessSlug = getBusinessSlug(user) || credentials.businessSlug;
    setCurrentUser(user);
    setStoredUser(user);

    if (nextBusinessSlug) {
      setBusinessSlug(nextBusinessSlug);
      setStoredBusinessSlug(nextBusinessSlug);
    }

    navigate("/admin", { replace: true });
    return user;
  }, [navigate]);

  const value = useMemo(() => ({
    currentUser,
    token,
    businessSlug,
    loading,
    isAuthenticated: Boolean(token && currentUser),
    login,
    logout,
    getAuthError: getApiErrorMessage
  }), [businessSlug, currentUser, loading, login, logout, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
