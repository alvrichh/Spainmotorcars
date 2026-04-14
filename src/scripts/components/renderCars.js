import { cars } from "../data/cars";

const money = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0
});

const formatPrice = (price) => (typeof price === "number" ? money.format(price) : price);

export const renderCars = () => {
  const grid = document.querySelector("[data-cars-grid]");

  if (!grid) {
    return;
  }

  grid.innerHTML = cars
    .map(
      (car, index) => `
        <article class="car-card" data-reveal style="--card-index:${index}">
          <div class="car-card__media">
            <img src="${car.image}" alt="${car.alt}" loading="lazy" decoding="async" />
            <span class="car-card__tag">${car.tag}</span>
          </div>
          <div class="car-card__body">
            <div class="car-card__headline">
              <p>${car.brand}</p>
              <h3>${car.model}</h3>
            </div>
            <div class="car-card__meta">
              <span>${car.year}</span>
              <strong>${formatPrice(car.price)}</strong>
            </div>
            <a href="#contact">Consultar disponibilidad</a>
          </div>
        </article>
      `
    )
    .join("");
};

