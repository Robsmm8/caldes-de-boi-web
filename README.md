# Caldes de Boí — Prototipo web

Prototipo estático (HTML/CSS/JS sin dependencias ni build) que replica la
estructura de la web mostrada en la maqueta: home, hoteles, balneario,
restauración y entorno. **Disponible en 4 idiomas**: català (por defecto),
español, inglés y francés.

## Cómo verlo
Al ser HTML estático, basta con abrir `index.html` en un navegador o
servirlo con cualquier servidor estático (`npx serve .`, `python -m http.server`, etc.).

## Estructura
```
caldes-de-boi/
  index.html                Home
  hotel-manantial.html      Ficha Hotel Manantial (plantilla común)
  hotel-caldas.html         Ficha Hotel Caldas   (misma plantilla)
  balneario.html            Wellness & Spa — acordeón de servicios + programas
  restauracion.html         Listado de restaurantes del complejo
  restaurantes/
    restaurante.html        Plantilla de carta (?r=<slug>), una sola página
                             sirve para todos los restaurantes
  entorno.html              Puntos de interés del Valle de Boí
  ofertas.html              Placeholder de ofertas
  css/style.css             Estilos (variables de color/tipografía arriba)
  js/config.js              *** ÚNICO archivo de contenido/datos (en 4 idiomas) ***
  js/i18n.js                Textos de interfaz (4 idiomas) + funciones tr()/setLang()
  js/icons.js               Sprite SVG único (sustituye a los emojis)
  js/booking-widget.js      Buscador: pestañas Alojamiento / Circuito termal, fechas, temporada
  js/main.js                Header/footer, selector de idioma, imágenes, marcadores PENDIENTE, modal
  js/guest-picker.js        Desplegable de huéspedes (adultos/niños/habitaciones/mascotas)
  js/hotel-page.js          Rellena hotel-manantial.html / hotel-caldas.html
```

## 0a. Datos pendientes: marcadores `[[PENDIENTE: ...]]`
Todo dato que falta por aportar (teléfono, tarifas, fechas de temporada,
dirección, contenido de paquetes...) se escribe con la forma
`[[PENDIENTE: descripción]]` y la web lo pinta **resaltado en amarillo**
(`markPending` en `js/main.js`). Buscar `PENDIENTE` en el proyecto da la lista
completa. Dónde se rellenan, todo en `js/config.js`:

| Dato | Variable |
|---|---|
| Teléfono de reservas | `SITE_INFO.phone` / `phoneDisplay` |
| Tarifa "des de" por hotel | `HOTELS.<hotel>.priceFrom` |
| Fechas de apertura de cada hotel | `SEASONS.<hotel>` (activa también el aviso de "fuera de temporada") |
| Franjas horarias del circuito termal | `THERMAL_SLOTS` |
| Motor de reservas de cada hotel / del circuito | `BOOKING_ENGINES.<hotel>`, `THERMAL_BOOKING` (poner `live: true` para redirigir de verdad) |
| Paquetes (contenido y precio) | `PACKAGES` |
| Titular de la portada | `HERO_VARIANT` = `"mountain"` (activo) o `"water"` (anterior) |

## 0b. Buscador de disponibilidad (`js/booking-widget.js`)
Cada página solo lleva un contenedor `<div data-booking-widget data-mode="...">`
y el script genera el buscador: `home` e `spa` muestran dos pestañas
(**Allotjament** y **Circuit termal**; en `balneario.html` abre la termal) y
`hotel` solo el alojamiento con el hotel fijado. Las fechas tienen `min`
dinámico (llegada ≥ hoy, salida ≥ llegada + 1) y se validan al enviar con
mensajes traducidos. Cuando `SEASONS` tenga datos, las fechas fuera de
temporada muestran un aviso claro en vez de abrir un resultado vacío.

## 0c. Selector de huéspedes (adultos / niños / habitaciones / mascotas)
El campo "Huéspedes" del buscador es un desplegable con contadores +/-, no un
`<select>` de opciones fijas. Límites por búsqueda (ajustables en
`GUEST_LIMITS`, `js/guest-picker.js`):

- Adultos (13 años o más): 1–6 · Niños (0–12 años): 0–4 · Habitaciones: 1–4 · Mascotas: 0–2

## 0d. Iconos y SEO
- **Iconos**: sprite SVG propio (`js/icons.js`), mismo trazo en toda la web.
  Para añadir uno, nueva entrada en `ICON_PATHS` y `icon("nombre")` en JS o
  `<svg class="icon"><use href="#i-nombre"/></svg>` en HTML.
- **SEO**: cada página tiene `meta description`, Open Graph, canonical y
  favicon; la portada incluye JSON-LD (`Resort` + 2 `Hotel` + `DaySpa`). Las
  descripciones están en catalán en el HTML y se traducen en cliente
  (`meta_desc_*` en `js/i18n.js`). Canonical/og:url apuntan hoy a GitHub Pages
  (`[[PENDIENTE: dominio definitivo]]`).

Al enviar el formulario, cada valor viaja como parámetro independiente
(`adults`, `children`, `rooms`, `pets`) a `buildBookingUrl()`
(`js/main.js`), listo para pasarlo tal cual al motor de reservas real.

## 0. Idiomas (català / español / inglés / francés)
Todo el sitio es multi-idioma **sin recargar la página**: el selector
CA/ES/EN/FR del header (`js/main.js`) llama a `setLang()` (`js/i18n.js`),
que guarda el idioma en `localStorage` y vuelve a pintar tanto los textos
fijos como las listas dinámicas al instante.

- **Textos de interfaz** (menú, botones, títulos de sección...) viven en
  `UI_STRINGS` (`js/i18n.js`), un objeto por idioma. Cualquier elemento
  HTML con `data-i18n="clave"` se traduce solo.
- **Contenido** (hoteles, servicios, restaurantes, entorno, programas —
  todo en `js/config.js`) usa campos `{ca, es, en, fr}` en vez de texto
  plano. Para leerlos en el idioma activo se usa `tr(campo)`.
- Cada página con listas dinámicas expone `window.rerenderDynamicContent`
  para que, al cambiar de idioma, esas listas se regeneren igual que el
  resto de la página.
- **Para añadir contenido nuevo**: rellena siempre los 4 idiomas en el
  objeto correspondiente de `config.js`. Si falta alguno, `tr()` cae a
  español como respaldo (para no dejar huecos en pantalla).
- Las traducciones actuales están hechas por IA a partir del contenido en
  español; antes de publicar el sitio de verdad conviene que las revise
  alguien nativo de cada idioma (especialmente catalán y francés).

## 1. Cambiar imágenes
Todas las fotos del sitio están centralizadas en el objeto `IMAGES` de
`js/config.js`. Para sustituir una foto solo hay que cambiar su URL (o
apuntar a un archivo local, p. ej. `assets/img/hero-home.jpg`) — no hay
ninguna ruta de imagen "quemada" en el HTML.

Las fotos actuales **no son de banco genérico**: la aérea del Hotel
Manantial, el patio del Hotel Caldas y el logo son fotos propias
facilitadas directamente (en `assets/img/`); la habitación, los
tratamientos de spa y la foto de senderismo son reales de caldesdeboi.com;
y el Parque Nacional, la iglesia de Taüll, la estación de esquí y los
platos típicos vienen de Wikimedia Commons con licencia libre. Ver
[CREDITS.md](CREDITS.md) para el detalle de cada una y la atribución
obligatoria de las de Commons.

## 2. Conectar los motores de reserva
Todavía no sabéis qué motor usará cada hotel, así que queda parametrizado
en `BOOKING_ENGINES` (`js/config.js`): un bloque de configuración por
hotel (`manantial` / `caldas`) con `provider`, `baseUrl` y `hotelCode`.

El selector de hotel del buscador ("Cualquiera" / "Hotel Manantial" /
"Hotel Caldas") ya enruta la búsqueda al motor correspondiente a través de
`buildBookingUrl()` en `js/main.js`. Ahora mismo, en lugar de redirigir a
una URL real (que no existe todavía), se abre un modal de simulación que
muestra qué motor se usaría y con qué URL/parámetros — así se puede
demostrar el flujo sin tener aún el motor contratado.

Cuando se elija el motor definitivo:
1. Rellenar `baseUrl`, `hotelCode` y `provider` en `BOOKING_ENGINES`.
2. Si el motor necesita un formato de URL distinto al genérico, añadir un
   `case` propio dentro del `switch` de `buildBookingUrl()`.
3. Cambiar `showBookingModal(...)` por `window.location.href = url` (o
   abrir el motor en un iframe/modal, según lo que exija el proveedor).

Pista real encontrada: el Hotel Manantial ya usa un motor en
`hotelmanantial.backhotelite.com` — por el patrón de dominio
(`back<hotel>.com`) todo apunta a **Roiback** como proveedor real. Merece
la pena confirmarlo con el hotel.

## 2b. Habitaciones — modalidades por hotel
Cada página de hotel muestra, bajo la descripción del hotel, una
cuadrícula con sus modalidades de habitación reales (`ROOM_TYPES` en
`config.js`, separado por `manantial`/`caldas`): 6 tipos en el Manantial
(Doble Estándar, Doble Superior, Familiar Superior, Junior Suite, Suite y
Suite Adaptada) y 3 en el Caldas (Doble Estándar, Doble Superior e
Individual), tomados de caldesdeboi.com/es/hotel-manatial/ y
/es/hotel-caldas/. Los textos son propios (reformulados para vender mejor
la experiencia), no una copia literal de la web; las fotos sí son reales.
Añadir una modalidad nueva es solo añadir un objeto al array del hotel
correspondiente (con sus 4 idiomas) — la cuadrícula se regenera sola.

## 3. Balneario — servicios termales y programas de salud
`balneario.html` tiene dos bloques de contenido dinámico:

- **Carta de servicios termales** (`#servicios`): un acordeón por
  categorías (`SPA_CATEGORIES` en `config.js`), calcado de las 17
  categorías reales de caldesdeboi.com/es/carta-de-servicios-termales/.
  Los 9 precios de "Servicios de agua termal" son reales; el resto de
  categorías llevan servicios representativos con `priceApprox: true`
  (precio orientativo) pendientes de confirmar con el balneario — lo
  ideal es sustituirlos por su lista de precios real completa.
- **Programas de salud y bienestar** (`#programas`): tarjetas con los 8
  programas reales de caldesdeboi.com/es/programas-de-salud-y-bienestar/
  (`HEALTH_PROGRAMS` en `config.js`), cada una con su botón "Descargar
  programa (PDF)" enlazando al PDF real ya publicado en caldesdeboi.com.

La tarjeta "Bienestar & Spa" de la home y el botón "Descubrir balneario"
enlazan directamente a `balneario.html#servicios`, así que aterrizan ya
en esta sección en vez de solo en la cabecera de la página.

Añadir una categoría, un servicio o un programa nuevo es solo añadir un
objeto a `SPA_CATEGORIES` o `HEALTH_PROGRAMS` (con sus 4 idiomas) — el
acordeón y la cuadrícula de programas se regeneran solos.

## 4. Restauración — restaurantes y cartas
`restauracion.html` lista los restaurantes desde `RESTAURANTS`
(`config.js`), en este orden: Restaurante Manantial, Bar del Manantial,
Restaurante Caldas, Restaurante Club Piscina. Cada tarjeta enlaza a
`restaurantes/restaurante.html?r=<slug>`, que renderiza la carta completa
(secciones + platos + precio) de ese restaurante. Añadir un restaurante
nuevo (con su carta) es solo añadir un objeto al array, respetando el
orden deseado — no hace falta crear ningún HTML nuevo.

## 5. Entorno
`entorno.html` lista los puntos de interés desde `ENTORNO_ITEMS`. Cada uno
tiene un `externalLink` a su web oficial real y un `linkLabel` (texto del
botón) en los 4 idiomas.

## Pendiente de decidir con el cliente
- Todos los `[[PENDIENTE]]` de la tabla 0a (teléfono, tarifas, temporada, franjas, paquetes, dirección, dominio).
- Verificar la fuente de «Més de 2.000 anys de tradició» y confirmar los dos diferenciadores
  preparados (récord Guinness de mantials, fangs propis), comentados en `index.html`.
- Foto real de familias para la tarjeta «Escapades en família» (hoy: patio del Hotel Caldas).
- Motor(es) de reserva reales para Manantial y Caldas (ver pista Roiback arriba).
- Lista de precios real y completa de la carta de servicios termales
  (hoy solo "Servicios de agua termal" tiene precios 100% reales).
- Categorización exacta (Salud/Bienestar/Belleza) de los programas de
  salud — la actual es una asignación razonable, no confirmada.
- Revisión profesional de las traducciones en català, inglés y francés.
- Banco de fotos definitivo (sustituir `IMAGES`), especialmente
  habitaciones y platos reales de cada carta.
