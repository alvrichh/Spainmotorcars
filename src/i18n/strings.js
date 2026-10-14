/**
 * Shared interface strings in Spanish and English.
 *
 * Used in two places:
 *  - At build time, any HTML template can print a string with {{t.key}}.
 *  - At runtime, scripts read the strings for the page language (<html lang>).
 *
 * Page-specific copy (hero, legal texts...) lives in each language's template:
 * src/*.html for Spanish and src/en/*.html for English.
 */
module.exports = {
  es: {
    // Routes
    home: "/",
    urlLegal: "/aviso-legal",
    urlPrivacy: "/privacidad",
    urlCookies: "/cookies",

    // Header
    skip: "Saltar al contenido",
    homeAria: "ir al inicio",
    navLabel: "Principal",
    navAbout: "La casa",
    navInventory: "Vehículos",
    navServices: "Servicios",
    navProcess: "Proceso",
    navCta: "Concertar cita",
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
    themeDark: "Activar modo oscuro",
    themeLight: "Activar modo claro",
    langLabel: "Idioma",

    // Contact details
    locations: "Madrid · Marbella · Atención a distancia",
    hours: "Lunes a viernes, 10:00 a 19:00 · Sábados con cita",

    // Footer
    footerTagline: "Coches premium y clásicos con historia, seleccionados uno a uno.",
    footerSections: "Secciones",
    footerExplore: "Explorar",
    footerContact: "Contacto",
    footerRights: "Todos los derechos reservados.",
    legalNotice: "Aviso legal",
    privacy: "Privacidad",
    cookies: "Cookies",

    // Cookie notice
    cookieAria: "Aviso de cookies",
    cookieText: "Usamos cookies técnicas para que la web funcione y recuerde tus preferencias.",
    cookieMore: "Más información",
    cookieReject: "Rechazar",
    cookieAccept: "Aceptar",

    // Inventory cards (runtime)
    locale: "es-ES",
    specsLabel: "Características",
    specYear: "Año",
    specMileage: "Km",
    specPower: "Potencia",
    specGearbox: "Cambio",
    powerUnit: "CV",
    enquire: "Solicitar información",
    soldOut: "Vendido",
    priceOnRequest: "Consultar",
    statusReserved: "Reservado",
    statusSold: "Vendido",
    enquirySubject: "Consulta: {car}",
    enquiryBody:
      "Hola,\n\nMe interesa el {car}. ¿Podríais darme más información y disponibilidad para verlo?\n\nGracias."
  },

  en: {
    home: "/en/",
    urlLegal: "/en/legal-notice",
    urlPrivacy: "/en/privacy",
    urlCookies: "/en/cookies",

    skip: "Skip to content",
    homeAria: "go to homepage",
    navLabel: "Main",
    navAbout: "About",
    navInventory: "Cars",
    navServices: "Services",
    navProcess: "Process",
    navCta: "Book a viewing",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    themeDark: "Switch to dark mode",
    themeLight: "Switch to light mode",
    langLabel: "Language",

    locations: "Madrid · Marbella · Remote service",
    hours: "Monday to Friday, 10:00 to 19:00 · Saturdays by appointment",

    footerTagline: "Premium cars and classics with a story, selected one by one.",
    footerSections: "Sections",
    footerExplore: "Explore",
    footerContact: "Contact",
    footerRights: "All rights reserved.",
    legalNotice: "Legal notice",
    privacy: "Privacy",
    cookies: "Cookies",

    cookieAria: "Cookie notice",
    cookieText: "We use technical cookies so the site works and remembers your preferences.",
    cookieMore: "Learn more",
    cookieReject: "Reject",
    cookieAccept: "Accept",

    locale: "en-GB",
    specsLabel: "Specifications",
    specYear: "Year",
    specMileage: "Km",
    specPower: "Power",
    specGearbox: "Gearbox",
    powerUnit: "PS",
    enquire: "Request details",
    soldOut: "Sold",
    priceOnRequest: "On request",
    statusReserved: "Reserved",
    statusSold: "Sold",
    enquirySubject: "Enquiry: {car}",
    enquiryBody:
      "Hello,\n\nI'm interested in the {car}. Could you send me more details and availability to view it?\n\nThank you."
  }
};
