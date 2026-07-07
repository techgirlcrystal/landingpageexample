import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SassyHero from "./SassyHero";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SassyHero />
  </StrictMode>
);
