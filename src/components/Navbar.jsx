import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="text-slate-50 md:w-[65%] mx-auto mb-4 md:py-5 flex items-center justify-between">
      <span
        onClick={() => navigate("/")}
        className="cursor-pointer font-bangers z-10 text-purple-900 md:text-4xl hover:opacity-80"
      >
        Stream Fellas
      </span>
    </nav>
  );
};

export default Navbar;
