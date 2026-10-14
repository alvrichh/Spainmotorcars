/**
 * Datos de la marca y de la empresa.
 *
 * Es la única fuente de verdad para teléfono, email, redes y datos legales.
 * Cualquier página HTML puede usarlos escribiendo {{clave}}, por ejemplo {{phone}}.
 * Los textos que cambian con el idioma están en src/i18n/strings.js.
 * Se sustituyen al compilar, así que tras cambiar algo basta con volver a ejecutar
 * `npm run dev` o `npm run build`.
 *
 * Los valores marcados con "EJEMPLO" son ficticios y deben sustituirse por los
 * reales antes de publicar.
 */
module.exports = {
  // Marca
  brandName: "Spain Motorcars",
  siteUrl: "https://spainmotorcars.vercel.app", // Cambiar al dominio propio cuando exista

  // Contacto
  email: "hola@spainmotorscars.com",
  phone: "+34 600 000 000", // EJEMPLO: teléfono real
  phoneHref: "+34600000000", // EJEMPLO: mismo teléfono sin espacios
  whatsappHref: "34600000000", // EJEMPLO: número para WhatsApp, sin "+" ni espacios
  instagramUrl: "https://www.instagram.com/", // EJEMPLO: URL del perfil real
  instagramHandle: "Instagram", // EJEMPLO: usuario real, por ejemplo "@usuario"

  // Datos legales (Ley 34/2002, LSSI-CE, art. 10)
  legalName: "Spain Motorcars, S.L.", // EJEMPLO
  taxId: "B00000000", // EJEMPLO
  legalAddress: "Calle de Serrano 00, 28001 Madrid", // EJEMPLO
  registryData: "Registro Mercantil de Madrid, tomo 00000, folio 00, hoja M-000000", // EJEMPLO
  legalUpdated: "14 de octubre de 2026"
};
