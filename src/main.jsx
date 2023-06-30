import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StreamersProvider } from "./context/StreamersProvider.jsx";
import { FormProvider } from "./context/FormProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StreamersProvider>
      <FormProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </FormProvider>
    </StreamersProvider>
  </BrowserRouter>
);
