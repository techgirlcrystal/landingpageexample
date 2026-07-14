import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SassyHero from "./SassyHero";
import SassySignupForm from "./SassySignupForm";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SassyHero />
    <SassySignupForm />
  </StrictMode>
);