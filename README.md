# Spain Motorcars

Web oficial de **Spain Motorcars**, una casa que selecciona uno a uno coches premium de uso diario y algún clásico con historia.

**Web publicada:** https://spainmotorcars.vercel.app/

La web es una landing de una sola página, rápida y sin backend. Presenta la marca, el inventario disponible, los servicios y el proceso de compra, y dirige al visitante hacia el contacto directo.

---

## Contenido

- [Stack](#stack)
- [Puesta en marcha](#puesta-en-marcha)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Datos de la marca](#datos-de-la-marca)
- [Idiomas](#idiomas)
- [Modo oscuro](#modo-oscuro)
- [Gestionar el inventario](#gestionar-el-inventario)
- [Identidad visual](#identidad-visual)
- [Accesibilidad y rendimiento](#accesibilidad-y-rendimiento)
- [Despliegue](#despliegue)
- [Antes de publicar](#antes-de-publicar)

---

## Stack

| Capa        | Tecnología                                    |
| ----------- | --------------------------------------------- |
| Marcado     | HTML5 semántico                               |
| Estilos     | SCSS con tokens en variables CSS              |
| Lógica      | JavaScript vanilla con módulos ES             |
| Bundler     | Webpack 5                                     |
| Tipografía  | Cormorant Garamond y Manrope, alojadas en local |
| Hosting     | Vercel                                        |

No hay dependencias de ejecución. Todo lo que se instala es para desarrollo y compilación.

Las fuentes se sirven desde el propio dominio. El aviso de cookies es visual: guarda la elección del visitante, pero no carga ni bloquea ningún script. Si se añade analítica, hay que conectarlo a un gestor de consentimiento real.

## Puesta en marcha

Requiere Node.js 18 o superior.

```bash
npm install       # instala dependencias
npm run dev       # servidor local en http://localhost:3000
npm run build     # compila la versión de producción en dist/
npm run preview   # sirve dist/ en local para revisarla
```

## Estructura del proyecto

```text
site.config.js                 # Datos de la marca: contacto, redes y datos legales
public/                        # Se copia tal cual a dist/: og-image, robots, sitemap
src/
├── index.html                 # Página principal
├── aviso-legal.html           # Páginas legales
├── privacidad.html
├── cookies.html
├── 404.html                   # Página de error
├── en/                        # Versión en inglés: index, legal-notice, privacy, cookies
├── i18n/strings.js            # Textos compartidos en ES y EN
├── index.js                   # Punto de entrada: fuentes, estilos y módulos
├── partials/                  # Piezas compartidas entre páginas
│   ├── head.html              # Metadatos comunes e iconos
│   ├── header.html
│   ├── footer.html
│   └── cookie-banner.html
├── assets/images/             # Logotipos, fotos de coches (cars/) y de ambiente (photos/)
├── scripts/
│   ├── components/
│   │   └── renderCars.js      # Pinta las fichas del inventario
│   ├── data/
│   │   └── cars.js            # Inventario (fuente única de datos)
│   └── modules/
│       ├── header.js          # Menú móvil y contraste del header
│       ├── cookieBanner.js    # Aviso de cookies
│       ├── heroMedia.js       # Vídeo de fondo del hero
│       ├── reveal.js          # Animación de entrada al hacer scroll
│       ├── theme.js           # Modo claro y oscuro
│       └── year.js            # Año del copyright
└── styles/
    ├── main.scss              # Orden de carga
    ├── base/                  # Tokens, reset y tipografía
    ├── components/            # Header, hero, about, inventario, contacto y footer
    └── pages/                 # Servicios, proceso, páginas legales y 404
```

### Secciones de la página

1. **Hero:** vídeo de fondo, propuesta de valor y llamadas a la acción.
2. **La casa:** quiénes somos y qué nos diferencia.
3. **Vehículos:** inventario generado desde `cars.js`.
4. **Servicios:** venta, búsqueda bajo pedido, gestión y entrega.
5. **Proceso:** los cuatro pasos de la compra.
6. **Contacto:** email, teléfono, ubicación, horario e Instagram.

## Datos de la marca

El teléfono, el email, WhatsApp, Instagram, el horario y los datos fiscales están en [`site.config.js`](site.config.js). Se cambian ahí una sola vez y se aplican a todas las páginas al compilar.

En cualquier HTML se pueden usar con dobles llaves:

```html
<a href="tel:{{phoneHref}}">{{phone}}</a>
```

Las piezas compartidas de `src/partials/` se insertan con `{{> header}}`, `{{> footer}}` o `{{> head}}`. Si se usa una clave que no existe, la compilación muestra un aviso.

## Idiomas

La web está en español en `/` y en inglés en `/en/`. El selector ES/EN del header enlaza cada página con su equivalente.

- **Textos compartidos** del header, el footer, el aviso de cookies y las fichas: están en [`src/i18n/strings.js`](src/i18n/strings.js) y se usan en el HTML con `{{t.clave}}`.
- **Contenido de cada página:** tiene una plantilla por idioma, `src/*.html` para español y `src/en/*.html` para inglés.
- **Páginas y sus traducciones:** están listadas en `webpack.config.js`. Para añadir una página nueva, crea las dos plantillas y añade una entrada a esa lista.
- **Datos de los coches:** `category`, `transmission` y `alt` aceptan un texto o un objeto `{ es, en }`.

Los textos legales en inglés indican que prevalece la versión española.

## Modo oscuro

El botón del header cambia entre modo claro y oscuro y guarda la elección en el navegador. Si el visitante no ha elegido, se sigue la preferencia del sistema.

Los colores del modo oscuro se definen en [`src/styles/base/_variables.scss`](src/styles/base/_variables.scss), en el bloque `dark-tokens`. Los componentes solo usan variables, así que un color nuevo debe definirse en los dos modos.

## Gestionar el inventario

Todo el inventario vive en [`src/scripts/data/cars.js`](src/scripts/data/cars.js). Para añadir un coche:

1. Guarda la imagen en `src/assets/images/cars/`. Usa formato WebP de 960 × 688 px.
2. Impórtala al principio de `cars.js`.
3. Añade un objeto al array `cars`:

```js
{
  brand: "Porsche",
  model: "911 GT3 Touring",
  year: 2024,
  price: 239000,          // número en euros, o null para "Consultar"
  mileage: 4200,          // kilómetros
  power: 510,             // CV
  transmission: "PDK",
  category: { es: "Coupé", en: "Coupé" },
  status: "available",    // "available" | "reserved" | "sold"
  image: porscheGt3,
  alt: "Porsche 911 GT3 Touring en color plata"
}
```

El enlace **Solicitar información** de cada ficha abre un email con el asunto y el modelo ya rellenados. Las unidades marcadas como `reserved` o `sold` muestran su estado sobre la imagen.

## Identidad visual

Los tokens de diseño están en [`src/styles/base/_variables.scss`](src/styles/base/_variables.scss). Cualquier cambio de marca debe hacerse ahí, no en los componentes.

| Token                 | Valor     | Uso                                  |
| --------------------- | --------- | ------------------------------------ |
| `--color-ink`         | `#0e0e0e` | Fondos oscuros, botones principales  |
| `--color-surface`     | `#f7f5f1` | Fondos marfil de sección             |
| `--color-accent`      | `#d8c6b2` | Acento champán sobre fondo oscuro    |
| `--color-accent-deep` | `#8f6b47` | Acento bronce sobre fondo claro      |

**Tipografía.** Cormorant Garamond se usa para titulares y nombres de modelo. Manrope se usa para el texto, las etiquetas y los datos.

**Tono.** El texto habla de tú, con frases cortas, sin superlativos vacíos y con datos concretos.

## Accesibilidad y rendimiento

- **Enlace "Saltar al contenido"** y foco visible en todos los elementos interactivos.
- **Menú móvil** con `aria-expanded` y cierre con la tecla Escape.
- **Movimiento reducido:** si el visitante lo pide, se desactivan las animaciones y el vídeo del hero.
- **Vídeo del hero** alojado en la propia web, en versión ligera para móvil y en pausa cuando sale de pantalla. No se carga con movimiento reducido o ahorro de datos.
- **Imágenes** con carga diferida y dimensiones reservadas para evitar saltos de maquetación.
- **Assets con hash** en el nombre para que la caché sea segura en producción.

## Despliegue

El proyecto está configurado para Vercel en [`vercel.json`](vercel.json). Cada push a `main` compila con `npm run build` y publica la carpeta `dist/`.

## Antes de publicar

Las fotos actuales son imágenes de ejemplo con licencia libre, acreditadas en el aviso legal. Sustitúyelas por fotos propias de cada unidad. Al hacerlo, quita los créditos que ya no apliquen.

Rellena en [`site.config.js`](site.config.js) los valores marcados como `EJEMPLO`:

- [ ] Teléfono y número de WhatsApp reales.
- [ ] URL y usuario del perfil de Instagram.
- [ ] Razón social, NIF o CIF, domicilio social y datos registrales para el aviso legal y la privacidad.

Revisa también:

- [ ] Kilometrajes, precios y fotos reales de cada vehículo en `cars.js`.
- [ ] Vídeo del hero propio. El actual es un clip libre de Mixkit (`src/assets/videos/`), en versiones de 720p para escritorio y 360p para móvil. Al sustituirlo, actualiza también `photos/hero-poster.webp` con su primer fotograma.
- [ ] Horario y ubicaciones, si no coinciden con los actuales.
- [ ] Que el dominio de `siteUrl` sea el definitivo. Si cambia, actualiza también `public/robots.txt` y `public/sitemap.xml`.
- [ ] Que un profesional revise los textos legales. Son una base adaptada al funcionamiento real de la web, no asesoramiento jurídico.
