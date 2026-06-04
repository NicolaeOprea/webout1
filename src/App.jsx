import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import PublicLayout from "./layouts/PublicLayout.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import RoleRoute from "./routes/RoleRoute.jsx";
import Home from "./pages/Home.jsx";
import Speisekarte from "./pages/Speisekarte.jsx";
import UberUns from "./pages/UberUns.jsx";
import Kontakt from "./pages/Kontakt.jsx";
import Impressum from "./pages/Impressum.jsx";
import Datenschutz from "./pages/Datenschutz.jsx";
import ReservationOrder from "./pages/ReservationOrder.jsx";
import Reservierung from "./pages/Reservierung.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage.jsx";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage.jsx";
import AdminMenuPage from "./pages/admin/AdminMenuPage.jsx";
import AdminRestaurantPage from "./pages/admin/AdminRestaurantPage.jsx";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/speisekarte" element={<Speisekarte />} />
            <Route path="/bestellung" element={<ReservationOrder />} />
            <Route path="/reservierung" element={<Reservierung />} />
            <Route path="/reservation-order" element={<ReservationOrder />} />
            <Route path="/uber-uns" element={<UberUns />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<RoleRoute allowedRoles={["business_admin", "staff"]} />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="/admin/bestellungen" element={<AdminOrdersPage />} />
                <Route path="/admin/speisekarte" element={<AdminMenuPage />} />
                <Route path="/admin/restaurant" element={<AdminRestaurantPage />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
