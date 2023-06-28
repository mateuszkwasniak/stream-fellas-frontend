import { useNavigate } from "react-router-dom";
import Background from "../components/Background";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="text-slate-800">
        You seem to have drifted too far, streaming enthusiast...
      </h1>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Flow home
      </button>
      <Background />
    </>
  );
};

export default NotFoundPage;
