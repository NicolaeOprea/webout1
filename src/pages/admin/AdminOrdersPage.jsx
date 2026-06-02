import { useEffect, useMemo, useState } from "react";
import AlertMessage from "../../components/admin/AlertMessage";
import DataTable from "../../components/admin/DataTable";
import PageIntro from "../../components/admin/PageIntro";
import StatusBadge from "../../components/admin/StatusBadge";
import { getAppointments, updateAppointmentStatus } from "../../api/adminApi";
import { useAuth } from "../../context/AuthContext";
import { extractApiList } from "../../utils/apiData";
import { getApiErrorMessage } from "../../utils/apiError";
import { getBusinessSlug } from "../../utils/businessScope";
import { formatDateTime, formatPrice } from "../../utils/date";

const statuses = ["all", "pending", "confirmed", "completed", "cancelled"];

function getOrderTotal(row) {
  return (row.items || []).reduce((sum, item) => sum + Number(item.unitPrice || 0) * Number(item.quantity || 1), 0);
}

function AdminOrdersPage() {
  const { currentUser } = useAuth();
  const businessSlug = getBusinessSlug(currentUser);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAppointments() {
      setLoading(true);
      setError("");

      try {
        const body = await getAppointments(businessSlug);
        setAppointments(extractApiList(body));
      } catch (caughtError) {
        setError(getApiErrorMessage(caughtError));
      } finally {
        setLoading(false);
      }
    }

    loadAppointments();
  }, [businessSlug]);

  const handleStatusUpdate = async (appointmentId, status) => {
    setFeedback("");
    setError("");

    try {
      await updateAppointmentStatus(appointmentId, { status }, businessSlug);
      setAppointments((current) => current.map((item) => (item._id || item.id) === appointmentId ? { ...item, status } : item));
      setFeedback("Status wurde aktualisiert.");
    } catch (caughtError) {
      setError(getApiErrorMessage(caughtError));
    }
  };

  const filteredAppointments = useMemo(() => {
    if (filter === "all") return appointments;
    return appointments.filter((item) => item.status === filter);
  }, [appointments, filter]);

  const columns = [
    { key: "customer", label: "Gast", render: (row) => <div><strong>{row.customerName || "Gast"}</strong><div className="mt-1 text-xs text-stone-light">{row.customerEmail || row.customerPhone || "Keine Kontaktdaten"}</div></div> },
    { key: "date", label: "Zeit", render: (row) => formatDateTime(row.startsAt) },
    { key: "items", label: "Inhalt", render: (row) => <div className="max-w-sm space-y-1">{(row.items || []).map((item) => <div key={item._id || item.title} className="text-sm"><strong>{item.quantity || 1}x {item.title}</strong>{item.notes ? <span className="block text-xs text-stone-light">{item.notes}</span> : null}</div>)}</div> },
    { key: "total", label: "Total", render: (row) => formatPrice(getOrderTotal(row)) },
    { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status || "pending"} /> },
    { key: "actions", label: "Aktionen", render: (row) => <div className="flex flex-wrap gap-2">{statuses.filter((status) => status !== "all").map((status) => <button key={status} type="button" className="rounded-full border border-stone/10 px-3 py-1 text-xs font-semibold transition hover:border-terracotta hover:text-terracotta" onClick={() => handleStatusUpdate(row._id || row.id, status)}>{status}</button>)}</div> }
  ];

  return <div className="space-y-6"><PageIntro eyebrow="Bestellungen" title="Reservierungen & Vorbestellungen" description="Alle eingehenden Restaurant-Anfragen aus dem Center verwalten und Status aktualisieren." /> <div className="flex flex-wrap gap-2">{statuses.map((status) => <button key={status} type="button" className={`rounded-full px-4 py-2 text-sm font-semibold transition ${filter === status ? "bg-terracotta text-cream" : "bg-white text-stone hover:text-terracotta"}`} onClick={() => setFilter(status)}>{status}</button>)}</div><AlertMessage type="success">{feedback}</AlertMessage><AlertMessage type="error">{error}</AlertMessage><DataTable columns={columns} rows={filteredAppointments} loading={loading} emptyTitle="Keine Anfragen" emptyDescription="Für diesen Filter gibt es noch keine Einträge." /></div>;
}

export default AdminOrdersPage;
