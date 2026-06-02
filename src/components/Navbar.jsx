import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import BrandLogo from "./BrandLogo";

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
    { href: "/uber-uns", label: "Über uns" },
    { href: "/kontakt", label: "Kontakt" }
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-cream shadow-md" : "bg-cream"}`}>
      <div className="container-max px-4 py-4 md:py-6">
        <div className="flex items-center justify-between">
          <BrandLogo to="/" className="text-stone" />

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-medium transition-colors duration-300 ${
                  location.pathname === link.href
                    ? "border-b-2 border-terracotta text-terracotta"
                    : "text-stone hover:text-terracotta"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a href="tel:+498104889110" className="btn-primary">
              Anrufen
            </a>
            <Link to="/bestellung" className="btn-secondary px-4 py-2">
              Essen vorbestellen
            </Link>
          </div>

          <button
            className="p-2 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            type="button"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen ? (
          <div className="mt-4 border-t border-stone-light pb-4 md:hidden">
            <div className="mt-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`rounded px-2 py-2 transition-colors ${
                    location.pathname === link.href
                      ? "bg-terracotta-light font-medium text-stone"
                      : "text-stone hover:bg-stone-light"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a href="tel:+498104889110" className="btn-primary text-center">
                Anrufen
              </a>
              <Link to="/bestellung" className="btn-secondary text-center" onClick={() => setIsOpen(false)}>
                Essen vorbestellen
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}

export default Navbar;
