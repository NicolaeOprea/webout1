import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import AlertMessage from "../../components/admin/AlertMessage";
import { useAuth } from "../../context/AuthContext";
import { getStoredBusinessSlug } from "../../utils/tokenStorage";

const defaultBusinessSlug = process.env.REACT_APP_BUSINESS_SLUG || "sapore-mediterraneo";

function LoginPage() {
  const location = useLocation();
  const { login, loading, isAuthenticated, currentUser, getAuthError } = useAuth();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    businessSlug: getStoredBusinessSlug() || defaultBusinessSlug
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!loading && isAuthenticated) {
    const redirectPath = currentUser?.role === "superadmin" ? "/superadmin" : "/admin";
    return <Navigate to={location.state?.from?.pathname || redirectPath} replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await login(formValues);
    } catch (caughtError) {
      setError(getAuthError(caughtError));
    } finally {
      setSubmitting(false);
    }
  };

  return <div className="w-full max-w-md rounded-[2rem] border border-stone/10 bg-white p-6 shadow-2xl shadow-stone/10"><Link to="/" className="font-serif text-2xl text-stone">Sapore<span className="text-terracotta"> Center</span></Link><div className="mt-6"><span className="text-sm font-semibold uppercase tracking-[0.24em] text-terracotta">Secure Login</span><h1 className="mt-3 font-serif text-4xl text-stone">Admin anmelden</h1><p className="mt-3 text-stone-light">Un singur login pentru business admin și superadmin.</p></div><form className="mt-8 space-y-5" onSubmit={handleSubmit}><AlertMessage type="error">{error}</AlertMessage><label className="block"><span className="text-sm font-medium text-stone">Email / Username</span><input className="mt-2 w-full rounded-2xl border border-stone/20 px-4 py-3 outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/10" type="email" name="email" value={formValues.email} onChange={handleChange} required /></label><label className="block"><span className="text-sm font-medium text-stone">Passwort</span><input className="mt-2 w-full rounded-2xl border border-stone/20 px-4 py-3 outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/10" type="password" name="password" value={formValues.password} onChange={handleChange} required /></label><input type="hidden" name="businessSlug" value={formValues.businessSlug} readOnly /><button type="submit" className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60" disabled={submitting}>{submitting ? "Anmeldung..." : "Login"}</button></form></div>;
}

export default LoginPage;
