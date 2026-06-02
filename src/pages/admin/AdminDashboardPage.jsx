import { useEffect, useMemo, useState } from "react";
import AlertMessage from "../../components/admin/AlertMessage";
import PageIntro from "../../components/admin/PageIntro";
import StatCard from "../../components/admin/StatCard";
import StatusBadge from "../../components/admin/StatusBadge";
import { getAppointments, getListings } from "../../api/adminApi";
import { useAuth } from "../../context/AuthContext";
import { extractApiList } from "../../utils/apiData";
import { getApiErrorMessage } from "../../utils/apiError";
import { getBusinessSlug } from "../../utils/businessScope";
import { formatDateTime, formatPrice } from "../../utils/date";

function getOrderTotal(appointment) {
  return (appointment.items || []).reduce((sum, item) => sum + Number(item.unitPrice || 0) * Number(item.quantity || 1), 0);
}

function AdminDashboardPage() {
  const { currentUser } = useAuth();
  const businessSlug = getBusinessSlug(currentUser);
  const [appointments, setAppointments] = useState([]);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setLoading(true);
      setError("");

      try {
        const [appointmentsBody, listingsBody] = await Promise.all([
          getAppointments(businessSlug),
          getListings(businessSlug)
        ]);

        if (isMounted) {
          setAppointments(extractApiList(appointmentsBody));
          setListings(extractApiList(listingsBody));
        }
      } catch (caughtError) {
        if (isMounted) setError(getApiErrorMessage(caughtError));
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [businessSlug]);

  const recentAppointments = useMemo(() => appointments.slice(0, 5), [appointments]);
  const pendingCount = appointments.filter((item) => item.status === "pending").length;
  const productCount = listings.filter((item) => item.type === "product").length;
  const totalRevenue = appointments.reduce((sum, item) => sum + getOrderTotal(item), 0);

  return <div className="space-y-8"><PageIntro eyebrow="Admin Dashboard" title="Restaurant Überblick" description="Neue Bestellungen, Reservierungen und Speisekarte zentral im Center verwalten." />{error ? <AlertMessage type="error">{error}</AlertMessage> : null}{loading ? <div className="rounded-[1.5rem] bg-white p-6 text-stone-light">Daten werden geladen...</div> : <><div className="grid gap-4 md:grid-cols-4"><StatCard label="Anfragen" value={appointments.length} /><StatCard label="Offen" value={pendingCount} /><StatCard label="Menüprodukte" value={productCount || listings.length} /><StatCard label="Bestellwert" value={formatPrice(totalRevenue)} /></div><section className="rounded-[1.5rem] border border-stone/10 bg-white p-5 shadow-lg shadow-stone/5"><div className="mb-4 flex items-center justify-between"><h3 className="font-serif text-2xl text-stone">Letzte Anfragen</h3></div><div className="space-y-3">{recentAppointments.length ? recentAppointments.map((item) => <article key={item._id || item.id} className="flex flex-col gap-3 rounded-2xl bg-cream/70 p-4 md:flex-row md:items-center md:justify-between"><div><strong className="text-stone">{item.customerName || "Gast"}</strong><div className="mt-1 text-sm text-stone-light">{formatDateTime(item.startsAt)} · {(item.items || []).map((entry) => entry.title).join(", ") || "Reservierung"}</div></div><div className="flex items-center gap-3"><span className="font-semibold text-stone">{formatPrice(getOrderTotal(item))}</span><StatusBadge status={item.status} /></div></article>) : <p className="text-stone-light">Noch keine Anfragen.</p>}</div></section></>}</div>;
}

export default AdminDashboardPage;
