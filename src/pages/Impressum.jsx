import { motion } from "framer-motion";
function Impressum() {
  return <div>{
    /* Hero */
  }<section className="bg-gradient-to-b from-olive-light to-cream py-12 md:py-20"><div className="container-max px-4"><motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-center"
  ><h1 className="font-serif text-5xl md:text-6xl font-bold text-stone mb-4">
              Impressum
            </h1></motion.div></div></section>{
    /* Content */
  }<section className="section-padding"><div className="container-max max-w-3xl mx-auto"><motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 20 }}
    transition={{ duration: 0.6 }}
    className="prose prose-sm max-w-none text-stone-light space-y-8"
  ><div><h2 className="font-serif text-3xl font-bold text-stone mb-4">
                Anbieter
              </h2><p className="space-y-2"><div className="font-medium text-stone">Sapore Mediterraneo</div><div>Fichtenstraße 33</div><div>85649 Brunnthal</div><div>Deutschland</div></p></div><div><h2 className="font-serif text-3xl font-bold text-stone mb-4">
                Kontaktinformationen
              </h2><p><strong>Telefon:</strong> <a href="tel:+498104889110" className="text-terracotta hover:text-terracotta-light">+49 8104 8891110</a><br /><strong>E-Mail:</strong> <a href="mailto:info@sapore-med.de" className="text-terracotta hover:text-terracotta-light">info@sapore-med.de</a></p></div><div><h2 className="font-serif text-3xl font-bold text-stone mb-4">
                Betriebskommentar
              </h2><p>
                Diese Website wird von Sapore Mediterraneo, einem Restaurant in Brunnthal, Deutschland, betrieben.
                Alle Informationen auf dieser Website sind auf Englisch und Deutsch verfügbar.
              </p></div><div><h2 className="font-serif text-3xl font-bold text-stone mb-4">
                Haftungsausschluss
              </h2><p>
                Der Autor übernimmt keine Gewähr für die Aktualität, Korrektheit, Vollständigkeit oder Qualität 
                der bereitgestellten Informationen. Haftungsansprüche gegen den Autor, die sich auf Schäden 
                materieller oder ideeller Art beziehen, welche durch die Nutzung oder Nichtnutzung der dargebotenen 
                Informationen bzw. durch die Nutzung fehlerhafter und unvollständiger Informationen verursacht wurden, 
                sind grundsätzlich ausgeschlossen, sofern seitens des Autors kein nachweislich vorsätzliches oder 
                grob fahrlässiges Verschulden vorliegt.
              </p></div><div><h2 className="font-serif text-3xl font-bold text-stone mb-4">
                Urheberrecht
              </h2><p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem 
                deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung 
                außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des Autors bzw. Schöpfers. 
                Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. 
                Solange die Inhalte auf dieser Seite nicht von Sapore Mediterraneo schwarz als urheberrechtsverletzend 
                gekennzeichnet worden sind, gelten die Inhalte als nicht von Urheberrechten Dritter verletzt.
              </p></div><div><h2 className="font-serif text-3xl font-bold text-stone mb-4">
                Datenschutz
              </h2><p>
                Für weitere Informationen zum Datenschutz siehe unsere <a href="/datenschutz" className="text-terracotta hover:text-terracotta-light">Datenschutzerklärung</a>.
              </p></div><div><h2 className="font-serif text-3xl font-bold text-stone mb-4">
                Haftung für Links
              </h2><p>
                Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss 
                haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte 
                der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. 
                Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. 
                Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
              </p></div><div><h2 className="font-serif text-3xl font-bold text-stone mb-4">
                Besitztitel und Namensrechte
              </h2><p>
                Sapore Mediterraneo® ist eine eingetragene Marke. Alle anderen Namen oder Marken können Marken 
                eines Anderen sein.
              </p></div></motion.div></div></section></div>;
}
export {
  Impressum as default
};
