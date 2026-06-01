import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { inputClassName } from "../components/reservation/CustomerForm";
import { submitSimpleReservation } from "../services/reservationOrderApi";
const defaultValues = {
  customerName: "",
  phone: "",
  email: "",
  reservationDate: "",
  reservationTime: "",
  persons: 2,
  notes: ""
};
function getDefaultDate() {
  const now = /* @__PURE__ */ new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 6e4);
  return local.toISOString().slice(0, 10);
}
function getDefaultTime() {
  const now = /* @__PURE__ */ new Date();
  now.setMinutes(Math.ceil(now.getMinutes() / 15) * 15);
  return now.toTimeString().slice(0, 5);
}
function Reservierung() {
  const [values, setValues] = useState({
    ...defaultValues,
    reservationDate: getDefaultDate(),
    reservationTime: getDefaultTime()
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const updateValue = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
    setError(null);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!values.customerName.trim() || !values.phone.trim() || !values.reservationDate || !values.reservationTime || values.persons < 1) {
      setError("Bitte f\xFCllen Sie alle Pflichtfelder aus.");
      return;
    }
    if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      setError("Bitte eine g\xFCltige E-Mail-Adresse eingeben.");
      return;
    }
    const payload = {
      businessSlug: "italian-restaurant",
      customerName: values.customerName.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      reservationDate: values.reservationDate,
      reservationTime: values.reservationTime,
      persons: values.persons,
      notes: values.notes.trim(),
      status: "pending",
      source: "website"
    };
    setIsSubmitting(true);
    setSuccess(null);
    try {
      const response = await submitSimpleReservation(payload);
      if (response.success) {
        setSuccess("Vielen Dank! Ihre Reservierungsanfrage wurde gesendet. Das Restaurant wird Ihre Reservierung best\xE4tigen.");
        setValues({
          ...defaultValues,
          reservationDate: getDefaultDate(),
          reservationTime: getDefaultTime()
        });
      } else {
        setError("Beim Senden ist ein Problem aufgetreten. Bitte erneut versuchen.");
      }
    } catch {
      setError("Beim Senden ist ein Problem aufgetreten. Bitte erneut versuchen.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="bg-cream"><section className="relative overflow-hidden bg-gradient-to-br from-cream via-white to-terracotta-light/40"><div className="container-max relative px-4 pb-12 pt-8 md:px-8 md:pb-20 md:pt-16"><motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="max-w-3xl"
  ><div className="mb-4 inline-flex rounded-full border border-terracotta/20 bg-white/80 px-4 py-2 text-sm font-medium uppercase tracking-[0.25em] text-terracotta">
              Reservierung
            </div><h1 className="font-serif text-5xl leading-tight text-stone md:text-6xl">
              Tisch reservieren
            </h1><p className="mt-6 max-w-2xl text-lg leading-8 text-stone-light">
              Senden Sie uns Ihre Anfrage. Das Restaurant bestätigt die Reservierung direkt.
            </p></motion.div></div></section><section className="section-padding"><div className="container-max max-w-4xl">{success ? <div className="mb-8 rounded-[1.75rem] border border-olive/30 bg-olive-light/20 p-5 text-stone shadow-lg shadow-olive/10"><div className="font-serif text-2xl text-olive-dark">Anfrage gesendet</div><p className="mt-2 text-stone">{success}</p></div> : null}<form
    onSubmit={handleSubmit}
    className="rounded-[2rem] border border-stone/10 bg-white/90 p-6 shadow-xl shadow-stone/5"
  ><div className="grid gap-5 md:grid-cols-2"><label className="flex flex-col gap-2"><span className="text-sm font-medium text-stone">Name *</span><input className={inputClassName} value={values.customerName} onChange={(event) => updateValue("customerName", event.target.value)} /></label><label className="flex flex-col gap-2"><span className="text-sm font-medium text-stone">Telefon *</span><input className={inputClassName} value={values.phone} onChange={(event) => updateValue("phone", event.target.value)} /></label><label className="flex flex-col gap-2"><span className="text-sm font-medium text-stone">Email</span><input className={inputClassName} type="email" value={values.email} onChange={(event) => updateValue("email", event.target.value)} /></label><label className="flex flex-col gap-2"><span className="text-sm font-medium text-stone">Datum *</span><input className={inputClassName} type="date" value={values.reservationDate} onChange={(event) => updateValue("reservationDate", event.target.value)} /></label><label className="flex flex-col gap-2"><span className="text-sm font-medium text-stone">Uhrzeit *</span><input className={inputClassName} type="time" value={values.reservationTime} onChange={(event) => updateValue("reservationTime", event.target.value)} /></label><label className="flex flex-col gap-2"><span className="text-sm font-medium text-stone">Personen *</span><input className={inputClassName} type="number" min={1} value={values.persons} onChange={(event) => updateValue("persons", Number(event.target.value || 0))} /></label><label className="flex flex-col gap-2 md:col-span-2"><span className="text-sm font-medium text-stone">Notizen</span><textarea className={`${inputClassName} min-h-[120px] resize-y`} value={values.notes} onChange={(event) => updateValue("notes", event.target.value)} /></label></div><p className="mt-5 text-sm leading-6 text-stone-light">
              Mit dem Absenden dieses Formulars stimmen Sie zu, dass Ihre Angaben zur Bearbeitung Ihrer Anfrage verarbeitet werden. Weitere Informationen finden Sie in unserer{" "}<Link to="/datenschutz" className="font-medium text-terracotta hover:text-terracotta-light">
                Datenschutzerklärung
              </Link>
              .
            </p>{error ? <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}<button type="submit" disabled={isSubmitting} className="btn-primary mt-6 disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? "Wird gesendet..." : "Reservierung absenden"}</button></form></div></section></div>;
}
export {
  Reservierung as default
};
