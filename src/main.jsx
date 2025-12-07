import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import EventContextProvider from "./context/useEventContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <EventContextProvider>
        <App />
      </EventContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
