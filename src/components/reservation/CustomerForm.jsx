function FormField({
  label,
  required,
  error,
  children
}) {
  return <label className="flex flex-col gap-2"><span className="text-sm font-medium text-stone">{label}{required ? " *" : ""}</span>{children}{error ? <span className="text-sm text-red-600">{error}</span> : null}</label>;
}
const inputClassName = "w-full rounded-2xl border border-stone/20 bg-white px-4 py-3 text-stone outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/10";
function normalizeNumericInput(value) {
  if (value === "") return "";
  const nextValue = Number.parseInt(value, 10);
  return Number.isNaN(nextValue) ? "" : Math.max(1, nextValue);
}
function CustomerForm({
  formValues,
  errors,
  onChange
}) {
  const handleInput = (field) => (event) => {
    const value = field === "persons" ? normalizeNumericInput(event.target.value) : event.target.value;
    onChange(field, value);
  };
  return <div className="rounded-[2rem] border border-stone/10 bg-white/90 p-6 shadow-xl shadow-stone/5 backdrop-blur"><div className="mb-6"><h2 className="font-serif text-3xl text-stone">Date client</h2><p className="mt-2 text-stone-light">
          Kontaktdaten und Hinweise fur das Restaurant eintragen.
        </p></div><div className="grid gap-5 md:grid-cols-2"><FormField label="Name" required error={errors.name}><input
    className={inputClassName}
    value={formValues.name}
    onChange={handleInput("name")}
    placeholder="Z. B. Max Mustermann"
  /></FormField><FormField label="Telefon" required error={errors.phone}><input
    className={inputClassName}
    value={formValues.phone}
    onChange={handleInput("phone")}
    placeholder="Z. B. +49 1xx xxx xxxx"
  /></FormField><FormField label="Email" error={errors.email}><input
    className={inputClassName}
    type="email"
    value={formValues.email}
    onChange={handleInput("email")}
    placeholder="Z. B. gast@email.de"
  /></FormField><div className="md:col-span-2"><FormField label="Notizen / Hinweise"><textarea
    className={`${inputClassName} min-h-[120px] resize-y`}
    value={formValues.notes}
    onChange={handleInput("notes")}
    placeholder="Z. B. Allergien, schnelle Abholung, Tisch am Fenster..."
  /></FormField></div></div><p className="mt-5 text-sm leading-6 text-stone-light">
        Mit dem Absenden dieses Formulars stimmen Sie zu, dass Ihre Angaben zur Bearbeitung Ihrer Anfrage verarbeitet werden. Weitere Informationen finden Sie in unserer{" "}<a href="/datenschutz" className="font-medium text-terracotta hover:text-terracotta-light">
          Datenschutzerklärung
        </a>
        .
      </p></div>;
}
export {
  CustomerForm as default,
  inputClassName
};
