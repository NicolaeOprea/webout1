import BrandLogo from "../components/BrandLogo";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return <div className="min-h-screen bg-cream"><div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]"><section className="relative hidden overflow-hidden bg-stone p-10 text-cream lg:flex lg:flex-col lg:justify-between"><div><BrandLogo to="/" label="Sapore Mediterraneo" compact className="text-cream" /><p className="mt-4 max-w-lg text-cream/70">Admin- und Superadmin-Zugang für Businesses im Center.</p></div><div className="rounded-[2rem] border border-white/10 bg-white/10 p-6"><span className="text-sm uppercase tracking-[0.24em] text-terracotta-light">Restaurant Center</span><h1 className="mt-3 font-serif text-5xl leading-tight">Verwalten, bestätigen, vorbereiten.</h1></div></section><section className="flex min-w-0 flex-col px-4 py-6"><div className="mb-8 lg:hidden"><BrandLogo to="/" label="Sapore Mediterraneo" compact /></div><div className="flex flex-1 items-center justify-center"><Outlet /></div></section></div></div>;
}

export default AuthLayout;
