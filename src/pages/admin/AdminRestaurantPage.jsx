import PageIntro from "../../components/admin/PageIntro";

function AdminRestaurantPage() {
  return <div className="space-y-6"><PageIntro eyebrow="Restaurant" title="Restaurant Profil" description="Diese Seite ist vorbereitet für Stammdaten, Öffnungszeiten und Standortdaten aus dem Center." /><div className="rounded-[1.5rem] border border-stone/10 bg-white p-6 shadow-lg shadow-stone/5"><h3 className="font-serif text-2xl text-stone">Nächster sauberer Schritt</h3><p className="mt-2 max-w-2xl text-stone-light">Hier können wir später die Center-Endpunkte für Locations und Business Settings anbinden, ohne das öffentliche Design zu verändern.</p></div></div>;
}

export default AdminRestaurantPage;
