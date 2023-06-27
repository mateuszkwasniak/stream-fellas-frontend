import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="text-slate-50 flex items-center justify-center">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
