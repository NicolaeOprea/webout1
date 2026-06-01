import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer.jsx";
import FloatingButton from "./components/FloatingButton.jsx";
import Home from "./pages/Home.jsx";
import Speisekarte from "./pages/Speisekarte.jsx";
import UberUns from "./pages/UberUns.jsx";
import Kontakt from "./pages/Kontakt.jsx";
import Impressum from "./pages/Impressum.jsx";
import Datenschutz from "./pages/Datenschutz.jsx";
import ReservationOrder from "./pages/ReservationOrder.jsx";
import Reservierung from "./pages/Reservierung.jsx";
function App() {
  return <Router><div className="flex flex-col min-h-screen"><Navbar /><main className="flex-grow"><Routes><Route path="/" element={<Home />} /><Route path="/speisekarte" element={<Speisekarte />} /><Route path="/bestellung" element={<ReservationOrder />} /><Route path="/reservierung" element={<Reservierung />} /><Route path="/reservation-order" element={<ReservationOrder />} /><Route path="/uber-uns" element={<UberUns />} /><Route path="/kontakt" element={<Kontakt />} /><Route path="/impressum" element={<Impressum />} /><Route path="/datenschutz" element={<Datenschutz />} /></Routes></main><Footer /><FloatingButton /></div></Router>;
}
var stdin_default = App;
export {
  stdin_default as default
};
