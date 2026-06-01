import { motion } from "framer-motion";
import { Heart, Users, Clock } from "lucide-react";
function UberUns() {
  return <div>{
    /* Hero */
  }<section className="bg-gradient-to-b from-olive-light to-cream py-12 md:py-20"><div className="container-max px-4"><motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-center"
  ><h1 className="font-serif text-5xl md:text-6xl font-bold text-stone mb-4">
              Über uns
            </h1><p className="text-lg text-stone-light">
              Unsere Geschichte und unsere Leidenschaft für italienische Küche
            </p></motion.div></div></section>{
    /* Story Section */
  }<section className="section-padding"><div className="container-max max-w-3xl mx-auto"><motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  ><h2 className="font-serif text-4xl font-bold text-stone mb-6">
              Willkommen bei Sapore Mediterraneo
            </h2><div className="space-y-6 text-stone-light leading-relaxed"><p>
                Sapore Mediterraneo steht für Authentizität, Leidenschaft und die wahre Essenz der italienischen Kulinarik. 
                In unserem Restaurant in Brunnthal erleben Sie nicht nur Essen – Sie erleben eine Geschichte.
              </p><p>
                Unsere Küche verbindet Tradition mit modernem Flair. Jedes Gericht wird nach überlieferten Rezepten zubereitet, 
                mit Zutaten von höchster Qualität und mit der Sorgfalt, die Sie verdienen.
              </p><p>
                Wir glauben daran, dass gutes Essen Menschen zusammenbringt. Ob Familie, Freunde oder geschäftliche Treffen – 
                bei uns schaffen Sie Momente, die bleiben.
              </p></div></motion.div></div></section>{
    /* Three Pillars */
  }<section className="section-padding bg-gray-50"><div className="container-max"><motion.h2
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="font-serif text-4xl font-bold text-stone text-center mb-12"
  >
            Das macht uns aus
          </motion.h2><div className="grid grid-cols-1 md:grid-cols-3 gap-8">{[
    {
      icon: <Heart size={40} />,
      title: "Leidenschaft",
      desc: "Wir lieben, was wir tun. In jedem Gericht steckt unsere Hingabe zur italienischen Kulinarik."
    },
    {
      icon: <Users size={40} />,
      title: "Gemeinschaft",
      desc: "Familie und Freunde sind das Herz unseres Restaurants. Hier werden G\xE4ste zu Freunden."
    },
    {
      icon: <Clock size={40} />,
      title: "Tradition",
      desc: "Rezepte, die Generationen \xFCberdauert haben. Qualit\xE4t \xFCber Zeit bew\xE4hrt und verfeinert."
    }
  ].map((pillar, idx) => <motion.div
    key={idx}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: idx * 0.1 }}
    viewport={{ once: true }}
    className="bg-white rounded-lg p-8 text-center shadow-md hover:shadow-lg transition-shadow"
  ><div className="text-terracotta mb-4 flex justify-center">{pillar.icon}</div><h3 className="font-serif text-2xl font-bold text-stone mb-3">{pillar.title}</h3><p className="text-stone-light">{pillar.desc}</p></motion.div>)}</div></div></section>{
    /* Team */
  }<section className="section-padding"><div className="container-max max-w-3xl mx-auto"><motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  ><h2 className="font-serif text-4xl font-bold text-stone mb-6">
              Unser Team
            </h2><p className="text-lg text-stone-light leading-relaxed mb-6">
              Sapore Mediterraneo wird von einem engagierten Team geleitet, das eine gemeinsame Leidenschaft teilt: 
              authentische italienische Kulinarik mit Liebe zum Detail.
            </p><p className="text-lg text-stone-light leading-relaxed">
              Von der Küche bis zum Service – jeder arbeitet daran, dass Sie ein unvergessliches Erlebnis haben. 
              Ihre Zufriedenheit ist unsere Erfolgsmesure.
            </p></motion.div></div></section>{
    /* Quality Commitment */
  }<section className="section-padding bg-gradient-to-r from-terracotta-light to-olive-light"><div className="container-max max-w-3xl mx-auto"><motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="bg-white rounded-lg p-8 shadow-lg"
  ><h2 className="font-serif text-3xl font-bold text-stone mb-6">
              Unser Qualitätsversprechen
            </h2><ul className="space-y-4">{[
    "Frische Zutaten von ausgew\xE4hlten Lieferanten",
    "Traditionelle Rezepte, handwerklich zubereitet",
    "Kundenfreundlichkeit an erster Stelle",
    "Sauberes und einladendes Restaurant",
    "Respekt vor alten Traditionen und modernen Standards"
  ].map((item, idx) => <motion.li
    key={idx}
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4, delay: idx * 0.05 }}
    viewport={{ once: true }}
    className="flex gap-3 items-start"
  ><span className="text-terracotta font-bold mt-1">✓</span><span className="text-stone">{item}</span></motion.li>)}</ul></motion.div></div></section>{
    /* CTA */
  }<section className="section-padding"><div className="container-max text-center"><motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  ><h2 className="font-serif text-3xl font-bold text-stone mb-6">
              Erleben Sie es selbst
            </h2><p className="text-lg text-stone-light mb-8 max-w-2xl mx-auto">
              Besuchen Sie uns und erleben Sie die Leidenschaft, die in jedem Gericht steckt.
            </p><a href="tel:+498104889110" className="btn-primary">
              Tisch reservieren
            </a></motion.div></div></section></div>;
}
export {
  UberUns as default
};
