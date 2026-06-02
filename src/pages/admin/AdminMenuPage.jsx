import { useEffect, useState } from "react";
import AlertMessage from "../../components/admin/AlertMessage";
import DataTable from "../../components/admin/DataTable";
import PageIntro from "../../components/admin/PageIntro";
import StatusBadge from "../../components/admin/StatusBadge";
import { createListing, getListings, updateListing } from "../../api/adminApi";
import { useAuth } from "../../context/AuthContext";
import { extractApiItem, extractApiList } from "../../utils/apiData";
import { getApiErrorMessage } from "../../utils/apiError";
import { getBusinessSlug } from "../../utils/businessScope";
import { formatPrice } from "../../utils/date";

const initialForm = {
  type: "product",
  name: "",
  description: "",
  price: "",
  currency: "EUR",
  category: "Pizza",
  order: 0,
  isActive: true
};

const categories = ["Pizza", "Pasta", "Salate", "Dessert", "Getränke"];

function AdminMenuPage() {
  const { currentUser } = useAuth();
  const businessSlug = getBusinessSlug(currentUser);
  const [items, setItems] = useState([]);
  const [formValues, setFormValues] = useState(initialForm);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadItems() {
      setLoading(true);
      setError("");

      try {
        const body = await getListings(businessSlug);
        setItems(extractApiList(body).filter((item) => item.type === "product"));
      } catch (caughtError) {
        setError(getApiErrorMessage(caughtError));
      } finally {
        setLoading(false);
      }
    }

    loadItems();
  }, [businessSlug]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormValues((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormValues(initialForm);
  };

  const toPayload = (values) => ({
    type: "product",
    name: values.name.trim(),
    description: values.description.trim() || undefined,
    price: values.price !== "" ? Number(values.price) : undefined,
    currency: values.currency || "EUR",
    category: values.category || undefined,
    order: values.order !== "" ? Number(values.order) : 0,
    isActive: values.isActive
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setFeedback("");
    setError("");

    try {
      const payload = toPayload(formValues);
      if (editingItem) {
        const body = await updateListing(editingItem._id || editingItem.id, payload, businessSlug);
        const updated = extractApiItem(body);
        setItems((current) => current.map((item) => (item._id || item.id) === (updated._id || updated.id) ? updated : item));
        setFeedback("Produkt wurde aktualisiert.");
      } else {
        const body = await createListing(payload, businessSlug);
        const created = extractApiItem(body);
        setItems((current) => created ? [created, ...current] : current);
        setFeedback("Produkt wurde erstellt.");
      }
      resetForm();
    } catch (caughtError) {
      setError(getApiErrorMessage(caughtError));
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormValues({
      type: "product",
      name: item.name || "",
      description: item.description || "",
      price: item.price ?? "",
      currency: item.currency || "EUR",
      category: item.category || "Pizza",
      order: item.order ?? 0,
      isActive: item.isActive !== false
    });
  };

  const handleDeactivate = async (item) => {
    setError("");
    setFeedback("");
    try {
      const body = await updateListing(item._id || item.id, { isActive: false }, businessSlug);
      const updated = extractApiItem(body) || { ...item, isActive: false };
      setItems((current) => current.map((entry) => (entry._id || entry.id) === (item._id || item.id) ? updated : entry));
      setFeedback("Produkt wurde deaktiviert.");
    } catch (caughtError) {
      setError(getApiErrorMessage(caughtError));
    }
  };

  const columns = [
    { key: "name", label: "Produkt", render: (row) => <div><strong>{row.name}</strong><div className="mt-1 max-w-sm text-xs text-stone-light">{row.description || "-"}</div></div> },
    { key: "category", label: "Kategorie" },
    { key: "price", label: "Preis", render: (row) => formatPrice(row.price, row.currency || "EUR") },
    { key: "state", label: "Status", render: (row) => <StatusBadge status={row.isActive === false ? "inactive" : "active"} /> },
    { key: "actions", label: "Aktionen", render: (row) => <div className="flex flex-wrap gap-2"><button type="button" className="rounded-full border border-stone/10 px-3 py-1 text-xs font-semibold hover:border-terracotta hover:text-terracotta" onClick={() => handleEdit(row)}>Edit</button><button type="button" className="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-50" onClick={() => handleDeactivate(row)}>Deaktivieren</button></div> }
  ];

  return <div className="space-y-6"><PageIntro eyebrow="Speisekarte" title="Menüprodukte verwalten" description="Produkte, Kategorien und Preise für die Restaurant-Speisekarte im Center pflegen." /><AlertMessage type="success">{feedback}</AlertMessage><AlertMessage type="error">{error}</AlertMessage><div className="grid gap-6 xl:grid-cols-[420px_1fr]"><form onSubmit={handleSubmit} className="rounded-[1.5rem] border border-stone/10 bg-white p-5 shadow-lg shadow-stone/5"><h3 className="font-serif text-2xl text-stone">{editingItem ? "Produkt bearbeiten" : "Produkt hinzufügen"}</h3><div className="mt-5 space-y-4"><label className="block"><span className="text-sm font-medium">Name</span><input className="mt-2 w-full rounded-2xl border border-stone/20 px-4 py-3 outline-none focus:border-terracotta" name="name" value={formValues.name} onChange={handleChange} required /></label><label className="block"><span className="text-sm font-medium">Beschreibung</span><textarea className="mt-2 min-h-[110px] w-full rounded-2xl border border-stone/20 px-4 py-3 outline-none focus:border-terracotta" name="description" value={formValues.description} onChange={handleChange} /></label><div className="grid grid-cols-2 gap-4"><label className="block"><span className="text-sm font-medium">Preis</span><input className="mt-2 w-full rounded-2xl border border-stone/20 px-4 py-3 outline-none focus:border-terracotta" type="number" step="0.01" name="price" value={formValues.price} onChange={handleChange} required /></label><label className="block"><span className="text-sm font-medium">Kategorie</span><select className="mt-2 w-full rounded-2xl border border-stone/20 px-4 py-3 outline-none focus:border-terracotta" name="category" value={formValues.category} onChange={handleChange}>{categories.map((category) => <option key={category} value={category}>{category}</option>)}</select></label></div><label className="flex items-center gap-3 rounded-2xl bg-cream/70 p-4"><input type="checkbox" name="isActive" checked={formValues.isActive} onChange={handleChange} className="accent-terracotta" />Aktiv</label></div><div className="mt-6 flex gap-3"><button type="submit" className="btn-primary disabled:opacity-60" disabled={submitting}>{submitting ? "Speichern..." : editingItem ? "Aktualisieren" : "Erstellen"}</button>{editingItem ? <button type="button" className="btn-secondary" onClick={resetForm}>Abbrechen</button> : null}</div></form><DataTable columns={columns} rows={items} loading={loading} emptyTitle="Keine Produkte" emptyDescription="Noch keine Menüprodukte im Center vorhanden." /></div></div>;
}

export default AdminMenuPage;
