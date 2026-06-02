import { motion } from "framer-motion";
import { Pizza, Leaf, Wine, Users } from "lucide-react";
import SpecialtyCard from "../components/SpecialtyCard";
import ReviewCard from "../components/ReviewCard";
import { Link } from "react-router-dom";
function Home() {
  const specialties = [
    {
      title: "Steinofen Pizza",
      description: "Knusprig, authentisch und mit sorgsam ausgew\xE4hlten Zutaten. Unsere Pizzen werden t\xE4glich frisch zubereitet.",
      icon: <Pizza size={40} />
    },
    {
      title: "Handgemachte Pasta",
      description: "Traditionelle italienische Rezepte mit Liebe zubereitet. Jeder Bissen schmeckt nach Authentizit\xE4t.",
      icon: <Users size={40} />
    },
    {
      title: "Frische Salate",
      description: "Saisonale Zutaten, mediterrane Aromen. Perfekt als Vorspeise oder leichte Hauptmahlzeit.",
      icon: <Leaf size={40} />
    },
    {
      title: "Regionale Weine",
      description: "Sorgf\xE4ltig ausgew\xE4hlte italienische und deutsche Weine zu jedem Gericht.",
      icon: <Wine size={40} />
    }
  ];
  const reviews = [
    {
      name: "Maria Schmidt",
      text: "Absolute Empfehlung! Das Essen ist k\xF6stlich und die Atmosph\xE4re sehr einladend. Wir werden definitiv wiederkommen.",
      rating: 5
    },
    {
      name: "Hans Meyer",
      text: "Die beste Pizza in der Region! Authentisch, frisch und liebevoll zubereitet. Service ist hervorragend.",
      rating: 5
    },
    {
      name: "Anna Bauer",
      text: "Wir waren mehrmals hier und jedes Mal aufs Neue begeistert. Echtes italienisches Flair in Brunnthal.",
      rating: 5
    },
    {
      name: "Thomas Weber",
      text: "Freundliches Personal, gro\xDFartige Preise f\xFCr die Qualit\xE4t. Unsere Familie liebt es hier zu essen.",
      rating: 5
    }
  ];
  return <div>{
    /* Hero Section */
  }<section className="relative -mt-[68px] flex h-screen items-center justify-center overflow-hidden md:-mt-[100px]">{
    /* Background */
  }<div className="absolute inset-0 bg-gradient-to-b from-terracotta-light to-cream opacity-60" /><div
    className="absolute inset-0"
    style={{
      backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="60" height="60"%3E%3Cpath d="M0 0h60v60H0z" fill="none"/%3E%3Cpath d="M30 0L30 60M0 30L60 30" stroke="%23D97760" stroke-width="0.5" opacity="0.1"/%3E%3C/svg%3E')`
    }}
  /><div className="relative z-10 container-max px-4 text-center"><motion.div
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="mb-6"
  ><div className="text-sm md:text-base font-medium text-terracotta tracking-widest uppercase mb-4">
              Willkommen zu
            </div><h1 className="font-serif text-5xl md:text-7xl font-bold text-stone mb-4 leading-tight">
              Sapore<br />Mediterraneo
            </h1><Link to="/login" className="italian-flag-accent mx-auto mb-6 flex h-8 w-40 overflow-hidden rounded shadow-md ring-1 ring-stone/10 md:h-10 md:w-56" aria-label="Italienische Flagge">
              <span className="flex-1 bg-[#008C45]" />
              <span className="flex-1 bg-white" />
              <span className="flex-1 bg-[#CD212A]" />
            </Link><p className="text-lg md:text-2xl text-stone-light mb-4">
              Authentische italienische Küche in Brunnthal
            </p><p className="text-sm md:text-base text-stone max-w-2xl mx-auto mb-8">
              Entdecken Sie die Geschmäcke Süditaliens mit Familie, Freunden und Liebe zum Detail
            </p></motion.div><motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="flex flex-col md:flex-row gap-4 justify-center items-center"
  ><Link to="/speisekarte" className="btn-primary">
              Speisekarte anschauen
            </Link><Link to="/reservierung" className="btn-secondary">
              Tisch reservieren
            </Link><Link to="/bestellung" className="btn-secondary">
              Essen vorbestellen
            </Link><a href="tel:+498104889110" className="btn-secondary">
              Jetzt anrufen
            </a></motion.div></div>{
    /* Scroll indicator */
  }</section>{
    /* Intro Section */
  }<section className="section-padding"><div className="container-max"><motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="max-w-3xl mx-auto text-center"
  ><h2 className="font-serif text-4xl md:text-5xl font-bold text-stone mb-6">
              Italienische Authentizität<br />trifft auf Gastfreundschaft
            </h2><p className="text-lg text-stone-light leading-relaxed mb-6">
              Bei Sapore Mediterraneo bringen wir die Essenz der italienischen Küche direkt auf Ihren Tisch. 
              Mit Rezepten, die über Generationen weitergegeben wurden, und Zutaten von höchster Qualität, 
              schaffen wir ein kulinarisches Erlebnis, das Sie in die Wärme Süditaliens versetzt.
            </p><p className="text-base text-stone">
              Mehr als ein Restaurant – ein Ort für Familie, Freunde und wunderbare Momente.
            </p></motion.div></div></section>{
    /* Specialties Section */
  }<section className="section-padding bg-gray-50"><div className="container-max"><motion.h2
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="font-serif text-4xl md:text-5xl font-bold text-stone text-center mb-12"
  >
            Unsere Spezialitäten
          </motion.h2><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{specialties.map((specialty, index) => <SpecialtyCard
    key={index}
    {...specialty}
    delay={index * 0.1}
  />)}</div></div></section>{
    /* Why Choose Us */
  }<section className="section-padding"><div className="container-max"><div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"><motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.7 }}
    viewport={{ once: true }}
  ><h2 className="font-serif text-4xl md:text-4xl font-bold text-stone mb-6">
                Warum Sapore<br />Mediterraneo?
              </h2><div className="space-y-6">{[
    { title: "Authentische Rezepte", desc: "Traditionelle Methoden, die seit Generationen erprobt sind" },
    { title: "Hochwertige Zutaten", desc: "Sorgf\xE4ltig ausgew\xE4hlte Produkte f\xFCr unvergleichlichen Geschmack" },
    { title: "Familienatmosph\xE4re", desc: "Willkommen wie bei Familie \u2013 das ist unser Anspruch" },
    { title: "Leidenschaft in jedem Essen", desc: "Jedes Gericht wird mit Sorgfalt und Liebe zubereitet" }
  ].map((item, index) => <motion.div
    key={index}
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
  ><h3 className="font-serif text-xl font-bold text-terracotta mb-2">{item.title}</h3><p className="text-stone-light">{item.desc}</p></motion.div>)}</div></motion.div><motion.div
    initial={{ opacity: 0, x: 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.7 }}
    viewport={{ once: true }}
    className="bg-gradient-to-br from-terracotta-light to-olive-light rounded-lg p-8 h-96 flex items-center justify-center"
  ><div className="text-center text-cream"><Pizza size={64} className="mx-auto mb-4 opacity-80" /><p className="text-lg font-serif">
                  Leidenschaft für<br />italienische Kulinarik
                </p></div></motion.div></div></div></section>{
    /* Reviews Section */
  }<section className="section-padding bg-gray-50"><div className="container-max"><motion.h2
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="font-serif text-4xl md:text-5xl font-bold text-stone text-center mb-12"
  >
            Das sagen unsere Gäste
          </motion.h2><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{reviews.map((review, index) => <ReviewCard
    key={index}
    {...review}
    delay={index * 0.1}
  />)}</div></div></section>{
    /* Location & Contact Section */
  }<section className="section-padding"><div className="container-max"><div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"><motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  ><h2 className="font-serif text-4xl font-bold text-stone mb-6">
                Besuchen Sie uns
              </h2><div className="space-y-6"><div><h3 className="font-serif text-lg font-bold text-terracotta mb-2">
                    Adresse
                  </h3><p className="text-stone-light">
                    Fichtenstraße 33<br />
                    85649 Brunnthal, Germany
                  </p></div><div><h3 className="font-serif text-lg font-bold text-terracotta mb-2">
                    Telefon
                  </h3><a
    href="tel:+498104889110"
    className="text-terracotta hover:text-terracotta-light transition"
  >
                    +49 8104 8891110
                  </a></div><div><h3 className="font-serif text-lg font-bold text-terracotta mb-2">
                    Öffnungszeiten
                  </h3><div className="text-stone-light space-y-1 text-sm"><p><span className="font-medium text-stone">Mo - Do:</span> 11:30 - 22:00</p><p><span className="font-medium text-stone">Fr - Sa:</span> 11:30 - 23:00</p><p><span className="font-medium text-stone">Sonntag:</span> 11:30 - 22:00</p></div></div><Link to="/kontakt" className="btn-primary inline-block">
                  Nachricht senden
                </Link></div></motion.div><motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="rounded-lg overflow-hidden shadow-lg h-96"
  ><iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2607.8929746391157!2d11.583300!3d48.003000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479dd1e8e8e8e8e9%3A0x0!2sSapore%20Mediterraneo!5e0!3m2!1sde!2sde!4v1234567890"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  /></motion.div></div></div></section>{
    /* CTA Section */
  }<section className="section-padding bg-gradient-to-r from-terracotta to-terracotta-light"><div className="container-max text-center"><motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  ><h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mb-6">
              Erleben Sie italienische Genusskultur
            </h2><p className="text-lg text-cream-light mb-8 max-w-2xl mx-auto opacity-90">
              Machen Sie jetzt einen Tisch- reservierung oder besuchen Sie uns spontan. 
              Wir freuen uns auf Ihren Besuch!
            </p><div className="flex flex-col md:flex-row gap-4 justify-center"><Link to="/reservierung" className="btn-secondary bg-cream text-terracotta border-cream hover:bg-opacity-90">
                Tisch reservieren
              </Link><Link to="/bestellung" className="btn-secondary border-cream text-cream hover:bg-cream hover:text-terracotta">
                Essen vorbestellen
              </Link><Link to="/speisekarte" className="btn-secondary border-cream text-cream hover:bg-cream hover:text-terracotta">
                Speisekarte ansehen
              </Link></div></motion.div></div></section></div>;
}
export {
  Home as default
};
