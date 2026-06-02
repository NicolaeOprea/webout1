import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertMessage from "../../components/admin/AlertMessage";
import PageIntro from "../../components/admin/PageIntro";
import { createBusiness, registerBusinessAdmin } from "../../api/adminApi";
import { extractApiData } from "../../utils/apiData";
import { getApiErrorMessage } from "../../utils/apiError";

const businessTypes = [
  { value: "restaurant", label: "Restaurant / Cafe" },
  { value: "salon", label: "Salon / Beauty" },
  { value: "clinic", label: "Clinic / Health" },
  { value: "shop", label: "Shop / Retail" },
  { value: "other", label: "Other" }
];

const initialBusiness = {
  name: "",
  slug: "",
  businessType: "restaurant",
  email: "",
  phone: "",
  domain: ""
};

const initialAdmin = {
  name: "",
  email: "",
  password: ""
};

function slugify(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}

function SuperAdminCreateBusinessPage() {
  const navigate = useNavigate();
  const [business, setBusiness] = useState(initialBusiness);
  const [admin, setAdmin] = useState(initialAdmin);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleBusinessChange = (event) => {
    const { name, value } = event.target;
    setBusiness((current) => {
      const next = { ...current, [name]: value };
      if (name === "name" && !current.slug) {
        next.slug = slugify(value);
      }
      return next;
    });
  };

  const handleAdminChange = (event) => {
    const { name, value } = event.target;
    setAdmin((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const businessBody = await createBusiness({
        name: business.name.trim(),
        slug: business.slug.trim(),
        businessType: business.businessType,
        email: business.email.trim(),
        phone: business.phone.trim() || undefined,
        domain: business.domain.trim() || undefined,
        enabledFeatures: ["appointments", "booking", "contact", "locations", "listings", "notifications"],
        settings: {
          timezone: "Europe/Berlin",
          currency: "EUR",
          locale: "de"
        }
      });
      const createdBusiness = extractApiData(businessBody);
      const businessId = createdBusiness?._id || createdBusiness?.id;

      if (businessId && admin.name && admin.email && admin.password) {
        await registerBusinessAdmin({
          businessId,
          name: admin.name.trim(),
          email: admin.email.trim(),
          password: admin.password
        });
      }

      navigate("/superadmin/businesses", { replace: true });
    } catch (caughtError) {
      setError(getApiErrorMessage(caughtError));
    } finally {
      setSubmitting(false);
    }
  };

  return <div className="space-y-6"><PageIntro eyebrow="Create Business" title="Neuen Tenant anlegen" description="Business erstellen und optional direkt den ersten Business Admin mit Passwort anlegen." action={<Link className="btn-secondary" to="/superadmin/businesses">Zurück</Link>} /><AlertMessage type="error">{error}</AlertMessage><form onSubmit={handleSubmit} className="grid gap-6 xl:grid-cols-2"><section className="rounded-[1.5rem] border border-stone/10 bg-white p-5 shadow-lg shadow-stone/5"><h3 className="font-serif text-2xl text-stone">Business Daten</h3><div className="mt-5 space-y-4"><label className="block"><span className="text-sm font-medium">Name *</span><input className="mt-2 w-full rounded-2xl border border-stone/20 px-4 py-3 outline-none focus:border-terracotta" name="name" value={business.name} onChange={handleBusinessChange} required /></label><label className="block"><span className="text-sm font-medium">Slug *</span><input className="mt-2 w-full rounded-2xl border border-stone/20 px-4 py-3 outline-none focus:border-terracotta" name="slug" value={business.slug} onChange={handleBusinessChange} pattern="[a-z0-9-]+" required /></label><label className="block"><span className="text-sm font-medium">Typ</span><select className="mt-2 w-full rounded-2xl border border-stone/20 px-4 py-3 outline-none focus:border-terracotta" name="businessType" value={business.businessType} onChange={handleBusinessChange}>{businessTypes.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}</select></label><label className="block"><span className="text-sm font-medium">Email *</span><input className="mt-2 w-full rounded-2xl border border-stone/20 px-4 py-3 outline-none focus:border-terracotta" type="email" name="email" value={business.email} onChange={handleBusinessChange} required /></label><div className="grid gap-4 md:grid-cols-2"><label className="block"><span className="text-sm font-medium">Telefon</span><input className="mt-2 w-full rounded-2xl border border-stone/20 px-4 py-3 outline-none focus:border-terracotta" name="phone" value={business.phone} onChange={handleBusinessChange} /></label><label className="block"><span className="text-sm font-medium">Domain</span><input className="mt-2 w-full rounded-2xl border border-stone/20 px-4 py-3 outline-none focus:border-terracotta" name="domain" value={business.domain} onChange={handleBusinessChange} placeholder="restaurant.de" /></label></div></div></section><section className="rounded-[1.5rem] border border-stone/10 bg-white p-5 shadow-lg shadow-stone/5"><h3 className="font-serif text-2xl text-stone">Business Admin</h3><p className="mt-2 text-sm text-stone-light">Optional. Wenn ausgefüllt, wird direkt ein Login für diesen Tenant erstellt.</p><div className="mt-5 space-y-4"><label className="block"><span className="text-sm font-medium">Admin Name</span><input className="mt-2 w-full rounded-2xl border border-stone/20 px-4 py-3 outline-none focus:border-terracotta" name="name" value={admin.name} onChange={handleAdminChange} /></label><label className="block"><span className="text-sm font-medium">Admin Email / Username</span><input className="mt-2 w-full rounded-2xl border border-stone/20 px-4 py-3 outline-none focus:border-terracotta" type="email" name="email" value={admin.email} onChange={handleAdminChange} /></label><label className="block"><span className="text-sm font-medium">Passwort</span><input className="mt-2 w-full rounded-2xl border border-stone/20 px-4 py-3 outline-none focus:border-terracotta" type="password" name="password" value={admin.password} onChange={handleAdminChange} minLength={8} /></label></div><div className="mt-6 rounded-2xl bg-cream/70 p-4 text-sm text-stone-light">Für Superadmin selbst wird der User im Backend/Seed angelegt. Passwörter gehören nicht in den Frontend-Code.</div><button type="submit" className="btn-primary mt-6 disabled:cursor-not-allowed disabled:opacity-60" disabled={submitting}>{submitting ? "Wird erstellt..." : "Business erstellen"}</button></section></form></div>;
}

export default SuperAdminCreateBusinessPage;
