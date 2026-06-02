import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import CustomerForm, { inputClassName } from "./CustomerForm";
import MenuSection from "./MenuSection";
import OrderSummary from "./OrderSummary";
import ReservationTypeSelector from "./ReservationTypeSelector";
import { menuCategories, mockMenu } from "../../data/mockMenu";
import { submitReservationOrder } from "../../services/reservationOrderApi";
const defaultFormValues = {
  name: "",
  phone: "",
  email: "",
  pickupDate: "",
  pickupTime: "",
  reservationDate: "",
  reservationTime: "",
  persons: 2,
  wantsReservation: true,
  notes: ""
};
function getDefaultTime() {
  const now = /* @__PURE__ */ new Date();
  now.setMinutes(Math.ceil(now.getMinutes() / 15) * 15);
  return now.toTimeString().slice(0, 5);
}
function getDefaultDate() {
  const now = /* @__PURE__ */ new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 6e4);
  return local.toISOString().slice(0, 10);
}
function ReservationOrderPage({
  businessSlug = process.env.REACT_APP_BUSINESS_SLUG || "sapore-mediterraneo",
  businessName = "Sapore Mediterraneo",
  menuItems = mockMenu
}) {
  const [reservationType, setReservationType] = useState("takeaway");
  const [formValues, setFormValues] = useState({
    ...defaultFormValues,
    pickupDate: getDefaultDate(),
    pickupTime: getDefaultTime(),
    reservationDate: getDefaultDate(),
    reservationTime: getDefaultTime()
  });
  const [quantities, setQuantities] = useState({});
  const [itemNotes, setItemNotes] = useState({});
  const [activeCategory, setActiveCategory] = useState(menuCategories[0]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const filteredMenuItems = useMemo(
    () => menuItems.filter((item) => item.category === activeCategory),
    [activeCategory, menuItems]
  );
  const selectedItems = useMemo(() => {
    return menuItems.filter((item) => (quantities[item.id] ?? 0) > 0).map((item) => {
      const quantity = quantities[item.id];
      return {
        menuItemId: item.id,
        name: item.name,
        quantity,
        unitPrice: item.price,
        totalPrice: item.price * quantity,
        notes: itemNotes[item.id]?.trim() ?? ""
      };
    });
  }, [itemNotes, menuItems, quantities]);
  const totalPrice = useMemo(
    () => selectedItems.reduce((sum, item) => sum + item.totalPrice, 0),
    [selectedItems]
  );
  const updateFormValue = (field, value) => {
    setFormValues((current) => ({
      ...current,
      [field]: value
    }));
    setErrors((current) => ({ ...current, [field]: void 0 }));
  };
  const changeItemQuantity = (itemId, nextQuantity) => {
    setQuantities((current) => {
      if (nextQuantity <= 0) {
        const updated = { ...current };
        delete updated[itemId];
        return updated;
      }
      return { ...current, [itemId]: nextQuantity };
    });
  };
  const handleRemoveItem = (itemId) => {
    changeItemQuantity(itemId, 0);
    setItemNotes((current) => {
      const updated = { ...current };
      delete updated[itemId];
      return updated;
    });
  };
  const handleChangeType = (nextType) => {
    setReservationType(nextType);
    setSuccessMessage(null);
    setSubmitError(null);
    setErrors({});
    setFormValues((current) => ({
      ...current,
      wantsReservation: nextType === "reservation",
      persons: nextType === "reservation" ? Math.max(current.persons, 1) : current.persons
    }));
  };
  const validate = () => {
    const nextErrors = {};
    if (selectedItems.length === 0) {
      setSubmitError("Bitte mindestens ein Produkt in den Warenkorb legen.");
      return false;
    }
    if (!formValues.name.trim()) {
      nextErrors.name = "Name ist erforderlich.";
    }
    if (!formValues.phone.trim()) {
      nextErrors.phone = "Telefon ist erforderlich.";
    }
    if (formValues.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      nextErrors.email = "Bitte eine g\xFCltige E-Mail-Adresse eingeben.";
    }
    if (reservationType === "takeaway") {
      if (!formValues.pickupDate) nextErrors.pickupDate = "Bitte ein Datum ausw\xE4hlen.";
      if (!formValues.pickupTime) nextErrors.pickupTime = "Bitte eine Uhrzeit ausw\xE4hlen.";
    }
    if (reservationType === "reservation") {
      if (!formValues.wantsReservation) {
        nextErrors.wantsReservation = "Bitte best\xE4tigen Sie die Tischreservierung.";
      }
      if (!formValues.reservationDate) nextErrors.reservationDate = "Bitte ein Datum ausw\xE4hlen.";
      if (!formValues.reservationTime) nextErrors.reservationTime = "Bitte eine Uhrzeit ausw\xE4hlen.";
      if (formValues.persons < 1) nextErrors.persons = "Die Personenzahl muss mindestens 1 sein.";
    }
    setErrors(nextErrors);
    setSubmitError(Object.keys(nextErrors).length ? "Bitte pr\xFCfen Sie die markierten Felder." : null);
    return Object.keys(nextErrors).length === 0;
  };
  const buildPayload = () => ({
    businessSlug,
    orderType: reservationType,
    pickupDate: reservationType === "takeaway" ? formValues.pickupDate : null,
    pickupTime: reservationType === "takeaway" ? formValues.pickupTime : null,
    reservationDate: reservationType === "reservation" ? formValues.reservationDate : null,
    reservationTime: reservationType === "reservation" ? formValues.reservationTime : null,
    persons: reservationType === "reservation" ? formValues.persons : null,
    customerName: formValues.name.trim(),
    phone: formValues.phone.trim(),
    email: formValues.email.trim(),
    notes: formValues.notes.trim(),
    items: selectedItems,
    totalPrice,
    status: "pending",
    source: "website"
  });
  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    setSuccessMessage(null);
    setSubmitError(null);
    try {
      const response = await submitReservationOrder(buildPayload());
      if (response.success) {
        setSuccessMessage(
          "Vielen Dank! Ihre Bestellung wurde gesendet. Das Restaurant wird Ihre Bestellung best\xE4tigen."
        );
        setQuantities({});
        setItemNotes({});
        setFormValues({
          ...defaultFormValues,
          pickupDate: getDefaultDate(),
          pickupTime: getDefaultTime(),
          reservationDate: getDefaultDate(),
          reservationTime: getDefaultTime()
        });
      } else {
        setSubmitError("Beim Senden ist ein Problem aufgetreten. Bitte erneut versuchen.");
      }
    } catch (submitError2) {
      setSubmitError(submitError2.message || "Beim Senden ist ein Problem aufgetreten. Bitte erneut versuchen.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="bg-cream"><section className="relative overflow-hidden bg-gradient-to-br from-cream via-white to-terracotta-light/40"><div className="reservation-orb absolute left-0 top-12 h-52 w-52 rounded-full bg-olive-light" /><div className="reservation-orb absolute right-0 top-0 h-72 w-72 rounded-full bg-terracotta-light" /><div className="container-max relative px-4 pb-12 pt-8 md:px-8 md:pb-20 md:pt-16"><motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="max-w-3xl"
  ><div className="mb-4 inline-flex rounded-full border border-terracotta/20 bg-white/80 px-4 py-2 text-sm font-medium uppercase tracking-[0.25em] text-terracotta">
              Bestellung
            </div><h1 className="font-serif text-5xl leading-tight text-stone md:text-6xl">
              Essen vorbestellen bei {businessName}.
            </h1><p className="mt-6 max-w-2xl text-lg leading-8 text-stone-light">
              Meniu produse → Warenkorb → Tip comandă → Date client → Confirmare
            </p></motion.div></div></section><section className="section-padding"><div className="container-max space-y-8">{successMessage ? <div className="rounded-[1.75rem] border border-olive/30 bg-olive-light/20 p-5 text-stone shadow-lg shadow-olive/10"><div className="font-serif text-2xl text-olive-dark">Confirmare</div><p className="mt-2 text-stone">{successMessage}</p></div> : null}<div className="reservation-grid grid gap-8"><div className="space-y-8"><MenuSection
    categories={menuCategories}
    activeCategory={activeCategory}
    menuItems={filteredMenuItems}
    quantities={quantities}
    onSelectCategory={setActiveCategory}
    onDecreaseItem={(itemId) => changeItemQuantity(itemId, (quantities[itemId] ?? 0) - 1)}
    onIncreaseItem={(itemId) => changeItemQuantity(itemId, (quantities[itemId] ?? 0) + 1)}
  /><section className="rounded-[2rem] border border-stone/10 bg-white/90 p-6 shadow-xl shadow-stone/5"><div className="mb-6"><h2 className="font-serif text-3xl text-stone">Tip comandă</h2><p className="mt-2 text-stone-light">
                    Wählen Sie Take Away oder eine Vorbestellung mit Tischreservierung.
                  </p></div><ReservationTypeSelector selectedType={reservationType} onSelect={handleChangeType} /><div className="mt-6 grid gap-5 md:grid-cols-2">{reservationType === "takeaway" ? <><label className="flex flex-col gap-2"><span className="text-sm font-medium text-stone">Datum *</span><input
    className={inputClassName}
    type="date"
    value={formValues.pickupDate}
    onChange={(event) => updateFormValue("pickupDate", event.target.value)}
  />{errors.pickupDate ? <span className="text-sm text-red-600">{errors.pickupDate}</span> : null}</label><label className="flex flex-col gap-2"><span className="text-sm font-medium text-stone">Abholzeit *</span><input
    className={inputClassName}
    type="time"
    value={formValues.pickupTime}
    onChange={(event) => updateFormValue("pickupTime", event.target.value)}
  />{errors.pickupTime ? <span className="text-sm text-red-600">{errors.pickupTime}</span> : null}</label></> : <><label className="flex items-start gap-3 rounded-2xl border border-stone/10 bg-cream/60 p-4 md:col-span-2"><input
    className="mt-1 h-4 w-4 accent-terracotta"
    type="checkbox"
    checked={formValues.wantsReservation}
    onChange={(event) => updateFormValue("wantsReservation", event.target.checked)}
  /><span className="text-stone">Ich möchte auch einen Tisch reservieren</span></label><label className="flex flex-col gap-2"><span className="text-sm font-medium text-stone">Datum *</span><input
    className={inputClassName}
    type="date"
    value={formValues.reservationDate}
    onChange={(event) => updateFormValue("reservationDate", event.target.value)}
  />{errors.reservationDate ? <span className="text-sm text-red-600">{errors.reservationDate}</span> : null}</label><label className="flex flex-col gap-2"><span className="text-sm font-medium text-stone">Uhrzeit der Ankunft *</span><input
    className={inputClassName}
    type="time"
    value={formValues.reservationTime}
    onChange={(event) => updateFormValue("reservationTime", event.target.value)}
  />{errors.reservationTime ? <span className="text-sm text-red-600">{errors.reservationTime}</span> : null}</label><label className="flex flex-col gap-2"><span className="text-sm font-medium text-stone">Personen *</span><input
    className={inputClassName}
    type="number"
    min={1}
    value={formValues.persons}
    onChange={(event) => updateFormValue("persons", Number(event.target.value || 0))}
  />{errors.persons ? <span className="text-sm text-red-600">{errors.persons}</span> : null}</label></>}</div></section><CustomerForm
    formValues={formValues}
    errors={errors}
    onChange={updateFormValue}
  /></div><OrderSummary
    items={selectedItems}
    totalPrice={totalPrice}
    onDecreaseItem={(itemId) => changeItemQuantity(itemId, (quantities[itemId] ?? 0) - 1)}
    onIncreaseItem={(itemId) => changeItemQuantity(itemId, (quantities[itemId] ?? 0) + 1)}
    onRemoveItem={handleRemoveItem}
    onChangeItemNotes={(itemId, notes) => setItemNotes((current) => ({ ...current, [itemId]: notes }))}
    onSubmit={handleSubmit}
    isSubmitting={isSubmitting}
    submitError={submitError}
  /></div></div></section></div>;
}
export {
  ReservationOrderPage as default
};
