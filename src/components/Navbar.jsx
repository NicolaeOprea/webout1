import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/speisekarte", label: "Speisekarte" },
    { href: "/reservierung", label: "Reservierung" },
    { href: "/bestellung", label: "Vorbestellen" },
    { href: "/uber-uns", label: "\xDCber uns" },
    { href: "/kontakt", label: "Kontakt" }
  ];
  return <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-cream shadow-md" : "bg-cream"}`}><div className="container-max px-4 py-4 md:py-6"><div className="flex justify-between items-center">{
    /* Logo */
  }<Link
    to="/"
    className="flex flex-col items-center"
    onClick={() => setIsOpen(false)}
  ><div className="font-serif text-2xl md:text-3xl font-bold text-terracotta">
              Sapore
            </div><div className="font-serif text-sm md:text-base text-olive-dark">
              Mediterraneo
            </div></Link>{
    /* Desktop Navigation */
  }<div className="hidden md:flex gap-8 items-center">{navLinks.map((link) => <Link
    key={link.href}
    to={link.href}
    className={`font-medium transition-colors duration-300 ${location.pathname === link.href ? "text-terracotta border-b-2 border-terracotta" : "text-stone hover:text-terracotta"}`}
  >{link.label}</Link>)}<a
    href="tel:+498104889110"
    className="btn-primary"
  >
              Anrufen
            </a><Link to="/bestellung" className="btn-secondary px-4 py-2">
              Essen vorbestellen
            </Link></div>{
    /* Mobile menu button */
  }<button
    className="md:hidden p-2"
    onClick={() => setIsOpen(!isOpen)}
    aria-label="Toggle menu"
  >{isOpen ? <X size={24} /> : <Menu size={24} />}</button></div>{
    /* Mobile Navigation */
  }{isOpen && <div className="md:hidden mt-4 pb-4 border-t border-stone-light"><div className="flex flex-col gap-3 mt-4">{navLinks.map((link) => <Link
    key={link.href}
    to={link.href}
    className={`py-2 px-2 rounded transition-colors ${location.pathname === link.href ? "bg-terracotta-light text-stone font-medium" : "text-stone hover:bg-stone-light"}`}
    onClick={() => setIsOpen(false)}
  >{link.label}</Link>)}<a
    href="tel:+498104889110"
    className="btn-primary text-center"
  >
                Anrufen
              </a><Link
    to="/bestellung"
    className="btn-secondary text-center"
    onClick={() => setIsOpen(false)}
  >
                Essen vorbestellen
              </Link></div></div>}</div></nav>;
}
export {
  Navbar as default
};
