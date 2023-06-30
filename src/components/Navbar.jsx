import { useContext, useEffect } from "react";
import FormContext from "../context/FormProvider";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useScroll } from "../hooks/useScroll";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrolled = useScroll(50);

  const { showForm, setShowForm } = useContext(FormContext);

  useEffect(() => {
    showForm && window.scrollTo({ top: 0, behavior: "smooth" });
  }, [showForm]);

  return (
    <nav
      className={`w-full z-50 fixed top-0 block transition duration-300 ${
        scrolled && "bg-purple-800 shadow-xl"
      }`}
    >
      <div className="text-slate-50 w-[90%] md:w-[80%] lg:w-[55%] mx-auto py-3 md:py-5 flex items-center justify-between">
        <span
          onClick={() => navigate("/")}
          className="cursor-pointer font-roboto font-bold text-slate-50 text-3xl md:text-5xl transition duration-300 hover:opacity-80  z-10"
        >
          Stream Fellas
        </span>
        {!location.pathname.includes("/streamer") && (
          <button
            className="md:absolute md:left-[-9999px]"
            onClick={() => setShowForm((prev) => !prev)}
          >
            {showForm ? (
              <MdOutlineClose className="w-10 h-10 text-white" />
            ) : (
              <GiHamburgerMenu className="w-10 h-10 text-white" />
            )}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
