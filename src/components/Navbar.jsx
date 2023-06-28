import { useNavigate } from "react-router-dom";
import { useScroll } from "../hooks/useScroll";

const Navbar = () => {
  const navigate = useNavigate();
  const scrolled = useScroll(50);

  return (
    <nav
      className={`w-full z-50 fixed top-0 block transition duration-300 ${
        scrolled && "bg-fuchsia-100 shadow-xl"
      }`}
    >
      <div className="text-slate-50 md:w-[65%] mx-auto md:py-5 flex items-center justify-between">
        <span
          onClick={() => navigate("/")}
          className="cursor-pointer font-bangers z-10 text-purple-900 md:text-4xl transition duration-300 hover:opacity-80"
        >
          Stream Fellas
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
