import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Background from "./Background";
import Cover from "./Cover";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col md:flex-row items-center md:items-start justify-between w-[95%] md:w-[90%] lg:w-[55%] mx-auto pt-24 text-slate-50">
        <Outlet />
      </main>
      <Background />
      <Cover />
    </>
  );
};

export default Layout;
