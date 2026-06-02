import { useMemo, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { CalendarDays, LayoutDashboard, LogOut, Menu, Store, UtensilsCrossed, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const adminNavigation = [
  { to: "/admin", label: "Dashboard", caption: "Überblick", icon: LayoutDashboard, end: true },
  { to: "/admin/bestellungen", label: "Bestellungen", caption: "Anfragen & Status", icon: CalendarDays },
  { to: "/admin/speisekarte", label: "Speisekarte", caption: "Produkte & Preise", icon: UtensilsCrossed },
  { to: "/admin/restaurant", label: "Restaurant", caption: "Profil", icon: Store }
];

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  const initials = useMemo(() => {
    const name = currentUser?.name || currentUser?.email || "SM";
    return name.split(" ").map((part) => part.charAt(0)).join("").slice(0, 2).toUpperCase();
  }, [currentUser]);

  return <div className="min-h-screen bg-cream text-stone lg:grid lg:grid-cols-[290px_1fr]"><aside className={`fixed inset-y-0 left-0 z-40 w-[290px] border-r border-stone/10 bg-stone p-5 text-cream transition-transform duration-300 lg:static lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}><div className="flex items-center justify-between"><Link to="/" className="font-serif text-2xl text-cream">Sapore<span className="text-terracotta-light"> Admin</span></Link><button type="button" className="rounded-full p-2 hover:bg-white/10 lg:hidden" onClick={() => setIsSidebarOpen(false)} aria-label="Menu schließen"><X size={20} /></button></div><div className="mt-8 flex items-center gap-3 rounded-2xl bg-white/10 p-4"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-terracotta font-semibold">{initials}</span><div className="min-w-0"><div className="truncate font-semibold">{currentUser?.name || "Restaurant Admin"}</div><div className="truncate text-sm text-cream/65">{currentUser?.email}</div></div></div><nav className="mt-8 space-y-2">{adminNavigation.map((item) => { const Icon = item.icon; return <NavLink key={item.to} to={item.to} end={item.end} onClick={() => setIsSidebarOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-4 py-3 transition ${isActive ? "bg-cream text-stone" : "text-cream/75 hover:bg-white/10 hover:text-cream"}`}><Icon size={19} /><span><span className="block font-medium">{item.label}</span><small className="block text-xs opacity-70">{item.caption}</small></span></NavLink>; })}</nav></aside><div className="min-w-0"><header className="sticky top-0 z-30 border-b border-stone/10 bg-cream/90 px-4 py-4 backdrop-blur md:px-8"><div className="flex items-center justify-between gap-4"><div className="flex items-center gap-3"><button type="button" className="rounded-full border border-stone/10 bg-white p-2 lg:hidden" onClick={() => setIsSidebarOpen(true)} aria-label="Menu öffnen"><Menu size={20} /></button><div><span className="text-xs font-semibold uppercase tracking-[0.24em] text-terracotta">Restaurant Verwaltung</span><h1 className="font-serif text-2xl text-stone">Sapore Mediterraneo</h1></div></div><button type="button" className="inline-flex items-center gap-2 rounded-full border border-stone/10 bg-white px-4 py-2 text-sm font-semibold text-stone transition hover:border-terracotta hover:text-terracotta" onClick={() => logout()}><LogOut size={16} />Logout</button></div></header><main className="px-4 py-8 md:px-8"><Outlet /></main></div></div>;
}

export default AdminLayout;
