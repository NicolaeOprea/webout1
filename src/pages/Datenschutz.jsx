import { motion } from "framer-motion";
function Datenschutz() {
  return <div>{
    /* Hero */
  }<section className="bg-gradient-to-b from-terracotta-light to-cream py-12 md:py-20"><div className="container-max px-4"><motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-center"
  ><h1 className="font-serif text-5xl md:text-6xl font-bold text-stone mb-4">
              Datenschutz
            </h1><p className="text-lg text-stone-light">
              Datenschutzerklärung (DSGVO)
            </p></motion.div></div></section>{
    /* Content */
  }<section className="section-padding"><div className="container-max max-w-3xl mx-auto"><motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 20 }}
    transition={{ duration: 0.6 }}
    className="prose prose-sm max-w-none text-stone-light space-y-8"
  ><div><h2 className="font-serif text-3xl font-bold text-stone mb-4">
                1. Verantwortlicher
              </h2><p><strong>Sapore Mediterraneo</strong><br />
                Fichtenstraße 33<br />
                85649 Brunnthal<br />
                Deutschland<br /><strong>Telefon:</strong> <a href="tel:+498104889110" className="text-terracotta hover:text-terracotta-light">+49 8104 8891110</a><br /><strong>E-Mail:</strong> <a href="mailto:info@sapore-med.de" className="text-terracotta hover:text-terracotta-light">info@sapore-med.de</a></p></div><div><h2 className="font-serif text-3xl font-bold text-stone mb-4">
                2. Zweck der Datenverarbeitung
              </h2><p>
                Die Erhebung und Verarbeitung Ihrer personenbezogenen Daten erfolgt zum Zwecke der:
              </p><ul className="space-y-2 ml-4"><li>• Erbringung unserer Dienstleistungen (Restaurantbetrieb, Reservierungen)</li><li>• Beantwortung von Kundenanfragen</li><li>• Erfüllung gesetzlicher Verpflichtungen</li><li>• Verbesserung unseres Services</li></ul></div><div><h2 className="font-serif text-3xl font-bold text-stone mb-4">
                3. Welche Daten werden erfasst?
              </h2><p>
                Bei Nutzung unserer Website können folgende Daten erfasst werden:
              </p><ul className="space-y-2 ml-4"><li>• Kontaktformulare: Name, E-Mail, Telefon, Nachricht</li><li>• Server-Logs: IP-Adresse, Zugriffsdatum und -uhrzeit, Browser-Informationen</li><li>• Reservierungen: Name, E-Mail, Telefon, Anzahl Personen, Zeitpunkt</li></ul></div><div><h2 className="font-serif text-3xl font-bold text-stone mb-4">
                4. Rechtsgrundlage
              </h2><p>
                Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 DSGVO auf Grundlage:
              </p><ul className="space-y-2 ml-4"><li>• Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO)</li><li>• Erfüllung eines Vertrags (Art. 6 Abs. 1 lit. b DSGVO)</li><li>• Erfüllung von Rechtsverpflichtungen (Art. 6 Abs. 1 lit. c DSGVO)</li><li>• Berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO)</li></ul></div><div><h2 className="font-serif text-3xl font-bold text-stone mb-4">
                5. Speicherdauer
              </h2><p>
                Ihre Daten werden nur so lange gespeichert, wie dies erforderlich ist. 
                Nach Abschluss des jeweiligen Zwecks werden Ihre Daten gelöscht, sofern 
                es keine gesetzlichen Aufbewahrungspflichten gibt.
              </p></div><div><h2 className="font-serif text-3xl font-bold text-stone mb-4">
                6. Ihre Rechte
              </h2><p>
                Sie haben gegenüber uns folgende Rechte:
              </p><ul className="space-y-2 ml-4"><li>• Auskunft: Art. 15 DSGVO</li><li>• Berichtigung: Art. 16 DSGVO</li><li>• Löschung: Art. 17 DSGVO</li><li>• Einschränkung: Art. 18 DSGVO</li><li>• Datenportabilität: Art. 20 DSGVO</li><li>• Widerspruch: Art. 21 DSGVO</li></ul></div><div><h2 className="font-serif text-3xl font-bold text-stone mb-4">
                7. Kontaktieren Sie uns
              </h2><p>
                Wenn Sie Fragen zum Datenschutz haben oder eines Ihrer Rechte geltend machen möchten, 
                kontaktieren Sie uns bitte unter:
              </p><p><strong>E-Mail:</strong> <a href="mailto:info@sapore-med.de" className="text-terracotta hover:text-terracotta-light">info@sapore-med.de</a><br /><strong>Telefon:</strong> <a href="tel:+498104889110" className="text-terracotta hover:text-terracotta-light">+49 8104 8891110</a></p></div><div><h2 className="font-serif text-3xl font-bold text-stone mb-4">
                8. Beschwerderecht
              </h2><p>
                Sie haben das Recht, sich bei einer Datenschutzbehörde zu beschweren, 
                wenn Sie der Meinung sind, dass die Verarbeitung Ihrer Daten gegen geltendes Recht verstößt.
              </p></div><div className="bg-gray-50 p-6 rounded-lg border-l-4 border-olive"><p className="text-sm text-stone"><strong>Hinweis:</strong> Diese Datenschutzerklärung kann jederzeit geändert werden. 
                Wir empfehlen Ihnen, diese Seite regelmäßig zu überprüfen, um über eventuelle Änderungen informiert zu sein.
              </p></div></motion.div></div></section></div>;
}
export {
  Datenschutz as default
};
