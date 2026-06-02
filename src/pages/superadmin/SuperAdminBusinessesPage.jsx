import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AlertMessage from "../../components/admin/AlertMessage";
import DataTable from "../../components/admin/DataTable";
import PageIntro from "../../components/admin/PageIntro";
import StatusBadge from "../../components/admin/StatusBadge";
import { deleteBusiness, getBusinesses, permanentDeleteBusiness, updateBusiness } from "../../api/adminApi";
import { extractApiList } from "../../utils/apiData";
import { getApiErrorMessage } from "../../utils/apiError";

function SuperAdminBusinessesPage() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBusinesses() {
      setLoading(true);
      setError("");

      try {
        const body = await getBusinesses();
        setBusinesses(extractApiList(body));
      } catch (caughtError) {
        setError(getApiErrorMessage(caughtError));
      } finally {
        setLoading(false);
      }
    }

    loadBusinesses();
  }, []);

  const handleDeactivate = async (row) => {
    const id = row._id || row.id;
    setFeedback("");
    setError("");

    try {
      await deleteBusiness(id);
      setBusinesses((current) => current.map((item) => (item._id || item.id) === id ? { ...item, isActive: false, status: "inactive" } : item));
      setFeedback("Business wurde deaktiviert.");
    } catch (caughtError) {
      setError(getApiErrorMessage(caughtError));
    }
  };

  const handleReactivate = async (row) => {
    const id = row._id || row.id;
    setFeedback("");
    setError("");

    try {
      await updateBusiness(id, { isActive: true, status: "active" });
      setBusinesses((current) => current.map((item) => (item._id || item.id) === id ? { ...item, isActive: true, status: "active" } : item));
      setFeedback("Business wurde aktiviert.");
    } catch (caughtError) {
      setError(getApiErrorMessage(caughtError));
    }
  };

  const handlePermanentDelete = async (row) => {
    const id = row._id || row.id;
    if (!window.confirm(`Business "${row.name}" endgültig löschen?`)) return;
    setFeedback("");
    setError("");

    try {
      await permanentDeleteBusiness(id);
      setBusinesses((current) => current.filter((item) => (item._id || item.id) !== id));
      setFeedback("Business wurde gelöscht.");
    } catch (caughtError) {
      setError(getApiErrorMessage(caughtError));
    }
  };

  const filteredBusinesses = useMemo(() => businesses.filter((item) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = !term || item.name?.toLowerCase().includes(term) || item.slug?.toLowerCase().includes(term) || item.email?.toLowerCase().includes(term);
    const matchesFilter = filter === "all" || (filter === "active" && item.isActive !== false) || (filter === "inactive" && item.isActive === false);
    return matchesSearch && matchesFilter;
  }), [businesses, filter, searchTerm]);

  const columns = [
    { key: "name", label: "Business", render: (row) => <div><strong>{row.name}</strong><div className="mt-1 text-xs text-stone-light">{row.businessType || "business"}</div></div> },
    { key: "slug", label: "Slug" },
    { key: "email", label: "Email" },
    { key: "state", label: "Status", render: (row) => <StatusBadge status={row.isActive === false ? "inactive" : "active"} /> },
    { key: "actions", label: "Aktionen", render: (row) => <div className="flex flex-wrap gap-2"><Link className="rounded-full border border-stone/10 px-3 py-1 text-xs font-semibold hover:border-terracotta hover:text-terracotta" to={`/superadmin/businesses/${row._id || row.id}/users`}>Users</Link>{row.isActive === false ? <><button type="button" className="rounded-full border border-stone/10 px-3 py-1 text-xs font-semibold hover:border-terracotta hover:text-terracotta" onClick={() => handleReactivate(row)}>Aktivieren</button><button type="button" className="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-50" onClick={() => handlePermanentDelete(row)}>Löschen</button></> : <button type="button" className="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-50" onClick={() => handleDeactivate(row)}>Deaktivieren</button>}</div> }
  ];

  return <div className="space-y-6"><PageIntro eyebrow="Businesses" title="Alle Businesses" description="Tenants suchen, aktivieren, deaktivieren und Admin-Accounts verwalten." action={<Link className="btn-primary" to="/superadmin/businesses/create">Business erstellen</Link>} /><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><input className="rounded-2xl border border-stone/20 bg-white px-4 py-3 outline-none focus:border-terracotta md:w-96" type="search" placeholder="Suche nach Name, Slug oder Email" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} /><div className="flex gap-2">{["all", "active", "inactive"].map((status) => <button key={status} type="button" className={`rounded-full px-4 py-2 text-sm font-semibold ${filter === status ? "bg-terracotta text-cream" : "bg-white text-stone hover:text-terracotta"}`} onClick={() => setFilter(status)}>{status}</button>)}</div></div><AlertMessage type="success">{feedback}</AlertMessage><AlertMessage type="error">{error}</AlertMessage><DataTable columns={columns} rows={filteredBusinesses} loading={loading} emptyTitle="Keine Businesses" emptyDescription="Keine Einträge für den aktuellen Filter." /></div>;
}

export default SuperAdminBusinessesPage;
