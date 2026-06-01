import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";
function Kontakt() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 3e3);
  };
  return <div>{
    /* Hero */
  }<section className="bg-gradient-to-b from-terracotta-light to-cream py-12 md:py-20"><div className="container-max px-4"><motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-center"
  ><h1 className="font-serif text-5xl md:text-6xl font-bold text-stone mb-4">
              Kontakt
            </h1><p className="text-lg text-stone-light">
              Wir freuen uns, von Ihnen zu hören
            </p></motion.div></div></section>{
    /* Contact Info */
  }<section className="section-padding"><div className="container-max"><div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">{[
    {
      icon: <MapPin size={32} />,
      title: "Adresse",
      info: "Fichtenstra\xDFe 33\n85649 Brunnthal\nGermany"
    },
    {
      icon: <Phone size={32} />,
      title: "Telefon",
      info: "+49 8104 8891110",
      link: "tel:+498104889110"
    },
    {
      icon: <Mail size={32} />,
      title: "E-Mail",
      info: "info@sapore-med.de",
      link: "mailto:info@sapore-med.de"
    },
    {
      icon: <Clock size={32} />,
      title: "\xD6ffnungszeiten",
      info: "Mo - Do: 11:30 - 22:00\nFr - Sa: 11:30 - 23:00\nSo: 11:30 - 22:00"
    }
  ].map((item, idx) => <motion.div
    key={idx}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: idx * 0.1 }}
    viewport={{ once: true }}
    className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-md transition-shadow"
  ><div className="text-terracotta mb-4 flex justify-center">{item.icon}</div><h3 className="font-serif text-xl font-bold text-stone mb-3">{item.title}</h3><p className="text-stone-light text-sm whitespace-pre-line">{item.link ? <a href={item.link} className="hover:text-terracotta transition">{item.info}</a> : item.info}</p></motion.div>)}</div></div></section>{
    /* Contact Form & Map */
  }<section className="section-padding bg-gray-50"><div className="container-max"><div className="grid grid-cols-1 md:grid-cols-2 gap-8">{
    /* Form */
  }<motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  ><h2 className="font-serif text-3xl font-bold text-stone mb-6">
                Nachricht senden
              </h2>{submitted && <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700"
  >
                  ✓ Vielen Dank! Wir werden Sie bald kontaktieren.
                </motion.div>}<form onSubmit={handleSubmit} className="space-y-4"><div><label className="block text-sm font-medium text-stone mb-2">
                    Name *
                  </label><input
    type="text"
    name="name"
    value={formData.name}
    onChange={handleChange}
    required
    className="w-full px-4 py-2 border border-stone-light rounded-lg focus:outline-none focus:border-terracotta transition"
    placeholder="Ihr Name"
  /></div><div><label className="block text-sm font-medium text-stone mb-2">
                    E-Mail *
                  </label><input
    type="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    required
    className="w-full px-4 py-2 border border-stone-light rounded-lg focus:outline-none focus:border-terracotta transition"
    placeholder="ihre@email.de"
  /></div><div><label className="block text-sm font-medium text-stone mb-2">
                    Telefon
                  </label><input
    type="tel"
    name="phone"
    value={formData.phone}
    onChange={handleChange}
    className="w-full px-4 py-2 border border-stone-light rounded-lg focus:outline-none focus:border-terracotta transition"
    placeholder="+49 ..."
  /></div><div><label className="block text-sm font-medium text-stone mb-2">
                    Betreff *
                  </label><input
    type="text"
    name="subject"
    value={formData.subject}
    onChange={handleChange}
    required
    className="w-full px-4 py-2 border border-stone-light rounded-lg focus:outline-none focus:border-terracotta transition"
    placeholder="Worum geht es?"
  /></div><div><label className="block text-sm font-medium text-stone mb-2">
                    Nachricht *
                  </label><textarea
    name="message"
    value={formData.message}
    onChange={handleChange}
    required
    rows={5}
    className="w-full px-4 py-2 border border-stone-light rounded-lg focus:outline-none focus:border-terracotta transition resize-none"
    placeholder="Ihre Nachricht..."
  /></div><button type="submit" className="btn-primary w-full">
                  Senden
                </button></form></motion.div>{
    /* Map */
  }<motion.div
    initial={{ opacity: 0, x: 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="rounded-lg overflow-hidden shadow-lg h-96 md:h-auto"
  ><iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2607.8929746391157!2d11.583300!3d48.003000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479dd1e8e8e8e8e9%3A0x0!2sSapore%20Mediterraneo!5e0!3m2!1sde!2sde!4v1234567890"
    width="100%"
    height="100%"
    style={{ border: 0, minHeight: "400px" }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  /></motion.div></div></div></section>{
    /* Quick Actions */
  }<section className="section-padding"><div className="container-max"><motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="text-center"
  ><h2 className="font-serif text-3xl font-bold text-stone mb-8">
              Schneller Kontakt
            </h2><div className="flex flex-col md:flex-row gap-4 justify-center"><a href="tel:+498104889110" className="btn-primary">
                Anrufen
              </a><a href="https://wa.me/498104889110?text=Hallo%20Sapore%20Mediterraneo" className="btn-secondary" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a><a href="mailto:info@sapore-med.de" className="btn-outline">
                E-Mail schreiben
              </a></div></motion.div></div></section></div>;
}
export {
  Kontakt as default
};
