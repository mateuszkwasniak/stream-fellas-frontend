import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
// import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="flex items-start justify-between md:w-[65%] mx-auto pt-24 text-slate-50">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
