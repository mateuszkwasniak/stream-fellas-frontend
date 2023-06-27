import { useNavigate } from "react-router-dom";

export default function NotFound() {
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
}
