import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StreamersProvider } from "./context/StreamersProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StreamersProvider>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </StreamersProvider>
  </BrowserRouter>
);
