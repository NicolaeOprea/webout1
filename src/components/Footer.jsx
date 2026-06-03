import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
function Footer() {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return <footer className="bg-stone text-cream"><div className="container-max section-padding"><div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">{
    /* About */
  }<motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  ><h3 className="font-serif text-xl font-bold mb-4 text-terracotta-light">
              Sapore Mediterraneo
            </h3><p className="text-sm leading-relaxed text-gray-300">
              Authentische italienische Küche mit Liebe zum Detail. Entdecken Sie die Geschmäcke Süditaliens in Brunnthal.
            </p></motion.div>{
    /* Contact */
  }<motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.1 }}
    viewport={{ once: true }}
  ><h3 className="font-serif text-xl font-bold mb-4 text-terracotta-light">
              Kontakt
            </h3><div className="space-y-3 text-sm"><div className="flex gap-3 items-start"><MapPin size={16} className="mt-1 flex-shrink-0" /><p>Fichtenstraße 33<br />85649 Brunnthal, Germany</p></div><div className="flex gap-3 items-center"><Phone size={16} /><a href="tel:+498104889110" className="hover:text-terracotta-light transition">
                  +49 8104 8891110
                </a></div><div className="flex gap-3 items-center"><Mail size={16} /><a href="mailto:info@sapore-mediterraneo.de" className="hover:text-terracotta-light transition">
                  info@sapore-med.de
                </a></div></div></motion.div>{
    /* Hours */
  }<motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    viewport={{ once: true }}
  ><h3 className="font-serif text-xl font-bold mb-4 text-terracotta-light">
              Öffnungszeiten
            </h3><div className="space-y-2 text-sm"><div className="flex gap-2"><span className="w-20">Mo - Do:</span><span>11:30 - 22:00</span></div><div className="flex gap-2"><span className="w-20">Fr - Sa:</span><span>11:30 - 23:00</span></div><div className="flex gap-2"><span className="w-20">Sonntag:</span><span>11:30 - 22:00</span></div></div></motion.div>{
    /* Legal Links */
  }<motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.3 }}
    viewport={{ once: true }}
  ><h3 className="font-serif text-xl font-bold mb-4 text-terracotta-light">
              Information
            </h3><div className="space-y-2 text-sm"><Link
    to="/impressum"
    className="block hover:text-terracotta-light transition"
  >
                Impressum
              </Link><Link
    to="/datenschutz"
    className="block hover:text-terracotta-light transition"
  >
                Datenschutz
              </Link><a
    href="#"
    className="block hover:text-terracotta-light transition"
  >
                AGB
              </a></div></motion.div></div>{
    /* Bottom Bar */
  }<div className="flex flex-col items-center justify-between gap-4 border-t border-gray-600 pt-6 text-center text-sm text-gray-400 md:flex-row md:text-left"><p>&copy; {currentYear} Sapore Mediterraneo. Alle Rechte vorbehalten.</p><div className="flex flex-wrap items-center justify-center gap-4"><Link to="/impressum" className="hover:text-terracotta-light transition">Impressum</Link><Link to="/datenschutz" className="hover:text-terracotta-light transition">Datenschutz</Link></div></div></div></footer>;
}
export {
  Footer as default
};
