import { cars } from "../data/cars";
import strings from "../../i18n/strings";

// Injected at build time from site.config.js (see webpack DefinePlugin).
const CONTACT_EMAIL = __SITE__.email;

const lang = document.documentElement.lang === "en" ? "en" : "es";
const t = strings[lang];

const money = new Intl.NumberFormat(t.locale, {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0
});

const number = new Intl.NumberFormat(t.locale, { useGrouping: "always" });

const STATUS_LABELS = {
  reserved: t.statusReserved,
  sold: t.statusSold
};

const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]
  );

// Fields can be plain text or { es, en }.
const local = (value) => (value && typeof value === "object" ? value[lang] ?? value.es : value);

const formatPrice = (price) => (typeof price === "number" ? money.format(price) : t.priceOnRequest);

const enquiryHref = (car) => {
  const name = `${car.brand} ${car.model} (${car.year})`;
  const subject = encodeURIComponent(t.enquirySubject.replace("{car}", name));
  const body = encodeURIComponent(t.enquiryBody.replace("{car}", name));
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
};

const renderCard = (car, index) => {
  const status = car.status || "available";
  const isSold = status === "sold";

  return `
    <article class="car-card car-card--${status}" data-reveal style="--card-index:${index % 3}">
      <div class="car-card__media">
        <img src="${car.image}" alt="${escapeHtml(local(car.alt))}" loading="lazy" decoding="async" width="960" height="688" />
        <span class="car-card__tag">${escapeHtml(local(car.category))}</span>
        ${
          STATUS_LABELS[status]
            ? `<span class="car-card__status">${STATUS_LABELS[status]}</span>`
            : ""
        }
      </div>
      <div class="car-card__body">
        <div class="car-card__headline">
          <p>${escapeHtml(car.brand)}</p>
          <h3>${escapeHtml(car.model)}</h3>
        </div>
        <ul class="car-card__specs" aria-label="${t.specsLabel}">
          <li><span>${t.specYear}</span>${car.year}</li>
          <li><span>${t.specMileage}</span>${number.format(car.mileage)}</li>
          <li><span>${t.specPower}</span>${car.power} ${t.powerUnit}</li>
          <li><span>${t.specGearbox}</span>${escapeHtml(local(car.transmission))}</li>
        </ul>
        <div class="car-card__footer">
          <strong class="car-card__price">${escapeHtml(formatPrice(car.price))}</strong>
          ${
            isSold
              ? `<span class="car-card__link is-disabled">${t.soldOut}</span>`
              : `<a class="car-card__link" href="${enquiryHref(car)}">${t.enquire}<span aria-hidden="true">→</span></a>`
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
