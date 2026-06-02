import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingButton from "../components/FloatingButton";

function PublicLayout() {
  return <div className="flex min-h-screen flex-col"><Navbar /><main className="flex-grow"><Outlet /></main><Footer /><FloatingButton /></div>;
}

export default PublicLayout;
