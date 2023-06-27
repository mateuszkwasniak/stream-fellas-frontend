import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center md:w-[65%] mx-auto text-slate-50">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
