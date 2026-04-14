import "./styles/main.scss";
import { renderCars } from "./scripts/components/renderCars";
import { initHeader } from "./scripts/modules/header";
import { initReveal } from "./scripts/modules/reveal";
import { syncYear } from "./scripts/modules/year";

document.addEventListener("DOMContentLoaded", () => {
  renderCars();
  initHeader();
  initReveal();
  syncYear();
});

