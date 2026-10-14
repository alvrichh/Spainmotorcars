import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource/cormorant-garamond/latin-500-italic.css";
import "@fontsource/cormorant-garamond/latin-600.css";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/manrope/latin-700.css";
import "./styles/main.scss";
import { renderCars } from "./scripts/components/renderCars";
import { initCookieBanner } from "./scripts/modules/cookieBanner";
import { initHeader } from "./scripts/modules/header";
import { initHeroMedia } from "./scripts/modules/heroMedia";
import { initReveal } from "./scripts/modules/reveal";
import { initTheme } from "./scripts/modules/theme";
import { syncYear } from "./scripts/modules/year";

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderCars();
  initHeader();
  initHeroMedia();
  initReveal();
  syncYear();
  initCookieBanner();
});
