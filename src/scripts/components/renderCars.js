import { cars } from "../data/cars";

// Injected at build time from site.config.js (see webpack DefinePlugin).
const CONTACT_EMAIL = __SITE__.email;

const money = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0
});

const number = new Intl.NumberFormat("es-ES", { useGrouping: "always" });

const STATUS_LABELS = {
  available: "Disponible",
  reserved: "Reservado",
  sold: "Vendido"
};

const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]
  );

const formatPrice = (price) => (typeof price === "number" ? money.format(price) : price);

const enquiryHref = (car) => {
  const name = `${car.brand} ${car.model} (${car.year})`;
  const subject = encodeURIComponent(`Consulta: ${name}`);
  const body = encodeURIComponent(
    `Hola,\n\nMe interesa el ${name}. ¿Podríais darme más información y disponibilidad para verlo?\n\nGracias.`
  );
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
};

const renderCard = (car, index) => {
  const status = car.status || "available";
  const isSold = status === "sold";

  return `
    <article class="car-card car-card--${status}" data-reveal style="--card-index:${index % 3}">
      <div class="car-card__media">
        <img src="${car.image}" alt="${escapeHtml(car.alt)}" loading="lazy" decoding="async" width="960" height="688" />
        <span class="car-card__tag">${escapeHtml(car.category)}</span>
        ${
          status !== "available"
            ? `<span class="car-card__status">${STATUS_LABELS[status]}</span>`
            : ""
        }
      </div>
      <div class="car-card__body">
        <div class="car-card__headline">
          <p>${escapeHtml(car.brand)}</p>
          <h3>${escapeHtml(car.model)}</h3>
        </div>
        <ul class="car-card__specs" aria-label="Características">
          <li><span>Año</span>${car.year}</li>
          <li><span>Km</span>${number.format(car.mileage)}</li>
          <li><span>Potencia</span>${car.power} CV</li>
          <li><span>Cambio</span>${escapeHtml(car.transmission)}</li>
        </ul>
        <div class="car-card__footer">
          <strong class="car-card__price">${escapeHtml(formatPrice(car.price))}</strong>
          ${
            isSold
              ? `<span class="car-card__link is-disabled">Vendido</span>`
              : `<a class="car-card__link" href="${enquiryHref(car)}">Solicitar información<span aria-hidden="true">→</span></a>`
          }
        </div>
      </div>
    </article>
  `;
};

export const renderCars = () => {
  const grid = document.querySelector("[data-cars-grid]");

  if (!grid) {
    return;
  }

  grid.innerHTML = cars.map(renderCard).join("");
};
