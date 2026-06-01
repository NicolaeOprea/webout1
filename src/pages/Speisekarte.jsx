import { motion } from "framer-motion";
function Speisekarte() {
  const menuSections = [
    {
      title: "Vorspeisen",
      items: [
        { name: "Bruschetta al Pomodoro", desc: "Ger\xF6stetes Brot mit Tomaten, Knoblauch und Basilikum", price: "\u20AC 6,50" },
        { name: "Arancini Siciliani", desc: "Sizilianische Reiskroketten mit Rag\xF9 und Erbsen", price: "\u20AC 7,50" },
        { name: "Calamari Fritti", desc: "Frittierte Tintenfische mit Zitrone", price: "\u20AC 8,50" },
        { name: "Caprese", desc: "Mozzarella, Tomaten, Basilikum und Oliven\xF6l", price: "\u20AC 7,00" },
        { name: "Focaccia al Rosmarino", desc: "Mediterranes Fladenbrot mit Rosmarin\xF6l und Salz", price: "\u20AC 5,00" }
      ]
    },
    {
      title: "Salate",
      items: [
        { name: "Insalata Verde", desc: "Gemischter Gr\xFCnsalat mit Haus-Vinaigrette", price: "\u20AC 6,50" },
        { name: "Insalata di Barbabietola", desc: "Rote Beete, Ziegenk\xE4se, Waln\xFCsse und Oliven\xF6l", price: "\u20AC 8,50" },
        { name: "Insalata di Mare", desc: "Frischer Fischsalat mit Meeresfr\xFCchten (saisonal)", price: "\u20AC 12,00" }
      ]
    },
    {
      title: "Pizza",
      items: [
        { name: "Margherita", desc: "Tomaten, Mozzarella, Basilikum \u2013 die Klassikerin", price: "\u20AC 9,50" },
        { name: "Quattro Formaggi", desc: "Mozzarella, Pecorino, Gorgonzola, Ricotta", price: "\u20AC 11,00" },
        { name: "Diavola", desc: "Tomaten, Mozzarella, Peperoni, scharf", price: "\u20AC 11,50" },
        { name: "Siciliana", desc: "Tomaten, Mozzarella, Sardinen, Zwiebeln, Oliven", price: "\u20AC 11,50" },
        { name: "Prosciutto e Rucola", desc: "Schinken und Rucola auf feiner Tomatenso\xDFe", price: "\u20AC 10,50" },
        { name: "Bianca", desc: "Ricotta, Mozzarella, Knoblauch, Kr\xE4uter", price: "\u20AC 9,00" }
      ]
    },
    {
      title: "Pasta & Risotto",
      items: [
        { name: "Spaghetti Aglio e Olio", desc: "Spaghetti mit Knoblauch, Chili und Oliven\xF6l", price: "\u20AC 8,50" },
        { name: "Spaghetti Carbonara", desc: "Mit Guanciale, Ei, Pecorino \u2013 traditionell", price: "\u20AC 9,50" },
        { name: "Penne alla Arrabbiata", desc: "Mit Tomaten und scharfen Peperoni", price: "\u20AC 9,00" },
        { name: "Rigatoni al Rag\xF9", desc: "Herzhafte Fleischso\xDFe nach Gro\xDFmutters Rezept", price: "\u20AC 10,00" },
        { name: "Lasagna della Nonna", desc: "Hausgemachte Lasagne mit Rag\xF9 und Bechamel", price: "\u20AC 10,50" },
        { name: "Risotto ai Funghi", desc: "Cremiges Pilzrisotto mit Parmesan", price: "\u20AC 10,00" }
      ]
    },
    {
      title: "Hauptg\xE4nge",
      items: [
        { name: "Grilled Branzino", desc: "Gegrillter Wolfsbarsch mit Zitrone und Kr\xE4utern", price: "\u20AC 16,00" },
        { name: "Saltimbocca alla Romana", desc: "Kalbfleisch mit Salbei und Schinken in Wei\xDFwein", price: "\u20AC 15,00" },
        { name: "Polpo alla Griglia", desc: "Gegrillte Krake mit Oliven\xF6l und Chili", price: "\u20AC 14,00" }
      ]
    },
    {
      title: "Dolci & Desserts",
      items: [
        { name: "Tiramisu", desc: "Klassisches italienisches Kaffee-Mascarpone-Dessert", price: "\u20AC 6,50" },
        { name: "Panna Cotta", desc: "Cremig, mit frischen Beeren", price: "\u20AC 6,00" },
        { name: "Gelato Artigianale", desc: "Hausgemachtes Gelato \u2013 Sorten nach Verf\xFCgbarkeit", price: "\u20AC 5,00" },
        { name: "Cannoli Siciliani", desc: "Frittierte R\xF6hrchen mit Ricotta und Schokolade", price: "\u20AC 6,50" }
      ]
    },
    {
      title: "Getr\xE4nke",
      items: [
        { name: "Espresso / Cappuccino", desc: "", price: "\u20AC 2,50" },
        { name: "Italienische Weine", desc: "Wei\xDF- und Rotweine nach Glas oder Flasche", price: "ab \u20AC 4,50" },
        { name: "Prosecco", desc: "", price: "\u20AC 5,00" },
        { name: "Wasser / Softgetr\xE4nke", desc: "", price: "ab \u20AC 2,00" }
      ]
    }
  ];
  return <div>{
    /* Hero */
  }<section className="bg-gradient-to-b from-terracotta-light to-cream py-12 md:py-20"><div className="container-max px-4"><motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-center"
  ><h1 className="font-serif text-5xl md:text-6xl font-bold text-stone mb-4">
              Speisekarte
            </h1><p className="text-lg text-stone-light">
              Entdecken Sie unsere autentischen italienischen Spezialitäten
            </p></motion.div></div></section>{
    /* Menu Items */
  }<section className="section-padding"><div className="container-max max-w-4xl mx-auto"><div className="space-y-12">{menuSections.map((section, sectionIdx) => <motion.div
    key={sectionIdx}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: sectionIdx * 0.05 }}
    viewport={{ once: true }}
  ><h2 className="font-serif text-3xl font-bold text-terracotta mb-6 pb-3 border-b-2 border-olive-light">{section.title}</h2><div className="space-y-5">{section.items.map((item, itemIdx) => <motion.div
    key={itemIdx}
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4, delay: itemIdx * 0.02 }}
    viewport={{ once: true }}
    className="flex justify-between items-start gap-4 pb-3 border-b border-gray-200"
  ><div className="flex-1"><h3 className="font-serif text-lg font-bold text-stone">{item.name}</h3>{item.desc && <p className="text-sm text-stone-light">{item.desc}</p>}</div><div className="font-serif font-bold text-terracotta text-lg whitespace-nowrap">{item.price}</div></motion.div>)}</div></motion.div>)}</div>{
    /* Note */
  }<motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.6, delay: 0.3 }}
    viewport={{ once: true }}
    className="mt-12 p-6 bg-gray-50 rounded-lg border-l-4 border-olive"
  ><p className="text-sm text-stone-light"><strong>Hinweis:</strong> Alle Preise inklusive Mehrwertsteuer. Allergene und Zusatzstoffe fragen Sie bitte beim Personal. Saisonale Änderungen vorbehalten.
            </p></motion.div></div></section>{
    /* CTA */
  }<section className="section-padding bg-gray-50"><div className="container-max text-center"><motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  ><h2 className="font-serif text-3xl font-bold text-stone mb-6">
              Guten Appetit!
            </h2><p className="text-lg text-stone-light mb-8 max-w-2xl mx-auto">
              Bei Fragen zu Zutaten oder Allergien kontaktieren Sie uns gerne. 
              Für Reservierungen rufen Sie uns an.
            </p><a href="tel:+498104889110" className="btn-primary">
              +49 8104 8891110
            </a></motion.div></div></section></div>;
}
export {
  Speisekarte as default
};
