import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import IloveBalls from "./components/side-Items.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
