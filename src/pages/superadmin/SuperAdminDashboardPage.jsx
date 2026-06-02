import { useEffect, useMemo, useState } from "react";
import AlertMessage from "../../components/admin/AlertMessage";
import PageIntro from "../../components/admin/PageIntro";
import StatCard from "../../components/admin/StatCard";
import StatusBadge from "../../components/admin/StatusBadge";
import { getSuperAdminDashboard } from "../../api/adminApi";
import { getApiErrorMessage } from "../../utils/apiError";
import { formatDateTime } from "../../utils/date";

function SuperAdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dashboardData, setDashboardData] = useState({
    businesses: [],
    appointments: [],
    contacts: [],
    totals: {}
  });

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true);
      setError("");

      try {
        const body = await getSuperAdminDashboard();
        const payload = body?.data || body || {};
        setDashboardData({
          businesses: payload.recentBusinesses || payload.businesses || [],
          appointments: payload.appointments || [],
          contacts: payload.contactRequests || payload.contacts || [],
          totals: payload.totals || {}
        });
      } catch (caughtError) {
        setError(getApiErrorMessage(caughtError));
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const recentBusinesses = useMemo(() => dashboardData.businesses.slice(0, 6), [dashboardData.businesses]);
  const activeBusinesses = dashboardData.totals.activeBusinesses || dashboardData.businesses.filter((item) => item.isActive !== false).length;

  return <div className="space-y-8"><PageIntro eyebrow="Superadmin" title="Platform Überblick" description="Alle Businesses, Termine und Aktivitäten zentral im Center sehen." />{error ? <AlertMessage type="error">{error}</AlertMessage> : null}{loading ? <div className="rounded-[1.5rem] bg-white p-6 text-stone-light">Daten werden geladen...</div> : <><div className="grid gap-4 md:grid-cols-4"><StatCard label="Businesses" value={dashboardData.totals.businesses || dashboardData.businesses.length} /><StatCard label="Aktiv" value={activeBusinesses} /><StatCard label="Appointments" value={dashboardData.totals.appointments || dashboardData.appointments.length} /><StatCard label="Contacts" value={dashboardData.totals.contactRequests || dashboardData.contacts.length} /></div><section className="rounded-[1.5rem] border border-stone/10 bg-white p-5 shadow-lg shadow-stone/5"><h3 className="font-serif text-2xl text-stone">Neue Businesses</h3><div className="mt-4 space-y-3">{recentBusinesses.length ? recentBusinesses.map((item) => <article key={item._id || item.id} className="flex flex-col gap-3 rounded-2xl bg-cream/70 p-4 md:flex-row md:items-center md:justify-between"><div><strong>{item.name || "Business"}</strong><div className="mt-1 text-sm text-stone-light">{item.slug || "no-slug"} · {item.email || "no email"}</div></div><div className="flex items-center gap-3 text-sm text-stone-light"><span>{formatDateTime(item.createdAt)}</span><StatusBadge status={item.isActive === false ? "inactive" : "active"} /></div></article>) : <p className="text-stone-light">Noch keine Businesses.</p>}</div></section></>}</div>;
}

export default SuperAdminDashboardPage;
