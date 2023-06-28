import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>You seem to have drifted too far, streaming enthusiast...</h1>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Flow home
      </button>
    </>
  );
};

export default NotFoundPage;
