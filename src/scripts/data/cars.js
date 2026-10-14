import mercedesSl from "../../assets/images/cars/mercedes-sl-r107.webp";
import bmwE30 from "../../assets/images/cars/bmw-e30-touring.webp";
import porscheMacan from "../../assets/images/cars/porsche-macan.webp";
import audiA5 from "../../assets/images/cars/audi-a5-sportback.webp";
import rangeRoverVelar from "../../assets/images/cars/range-rover-velar.webp";
import volvoXc60 from "../../assets/images/cars/volvo-xc60.webp";

/**
 * Inventario mostrado en la sección "Vehículos".
 *
 * Campos:
 * - price: número en euros, o null para "Consultar" / "On request".
 * - category, transmission, alt: texto, o { es, en } si cambia con el idioma.
 * - mileage: kilómetros.
 * - power: potencia en CV.
 * - status: "available" | "reserved" | "sold".
 *
 * Las fotos son imágenes de ejemplo con licencia libre (ver créditos en el aviso
 * legal). Kilometrajes y precios también son de ejemplo. Sustitúyelos por las fotos
 * y los datos reales de cada unidad antes de publicar.
 */
export const cars = [
  {
    brand: "Mercedes-Benz",
    model: "500 SL (R107)",
    year: 1986,
    price: 42900,
    mileage: 98400,
    power: 245,
    transmission: { es: "Automático", en: "Automatic" },
    category: { es: "Clásico", en: "Classic" },
    status: "available",
    image: mercedesSl,
    alt: {
      es: "Mercedes-Benz 500 SL R107 descapotable de color blanco",
      en: "White Mercedes-Benz 500 SL R107 convertible"
    }
  },
  {
    brand: "Porsche",
    model: "Macan Turbo",
    year: 2017,
    price: 52900,
    mileage: 64000,
    power: 400,
    transmission: "PDK",
    category: "SUV",
    status: "available",
    image: porscheMacan,
    alt: {
      es: "Porsche Macan Turbo de color negro en un showroom",
      en: "Black Porsche Macan Turbo in a showroom"
    }
  },
  {
    brand: "Audi",
    model: "A5 Sportback 40 TDI",
    year: 2018,
    price: 27900,
    mileage: 72000,
    power: 190,
    transmission: "S tronic",
    category: "Sportback",
    status: "available",
    image: audiA5,
    alt: {
      es: "Audi A5 Sportback de color marrón aparcado sobre adoquines",
      en: "Brown Audi A5 Sportback parked on cobblestones"
    }
  },
  {
    brand: "BMW",
    model: "325i Touring (E30)",
    year: 1990,
    price: 18900,
    mileage: 168000,
    power: 170,
    transmission: "Manual",
    category: { es: "Clásico", en: "Classic" },
    status: "available",
    image: bmwE30,
    alt: {
      es: "BMW Serie 3 Touring E30 de color azul oscuro",
      en: "Dark blue BMW 3 Series Touring E30"
    }
  },
  {
    brand: "Range Rover",
    model: "Velar R-Dynamic D300",
    year: 2018,
    price: 46500,
    mileage: 58000,
    power: 300,
    transmission: { es: "Automático", en: "Automatic" },
    category: "SUV",
    status: "reserved",
    image: rangeRoverVelar,
    alt: {
      es: "Range Rover Velar R-Dynamic de color gris en un concesionario",
      en: "Grey Range Rover Velar R-Dynamic in a dealership"
    }
  },
  {
    brand: "Volvo",
    model: "XC60 D5 AWD Summum",
    year: 2010,
    price: null,
    mileage: 142000,
    power: 205,
    transmission: "Geartronic",
    category: "SUV",
    status: "available",
    image: volvoXc60,
    alt: {
      es: "Volvo XC60 de primera generación en color negro",
      en: "Black first-generation Volvo XC60"
    }
  }
];
