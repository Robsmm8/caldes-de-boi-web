# Caldes de Boí — Prototipo web

Prototipo estático (HTML/CSS/JS sin dependencias ni build) que replica la
estructura de la web mostrada en la maqueta: home, hoteles, balneario,
restauración y entorno.

## Cómo verlo
Al ser HTML estático, basta con abrir `index.html` en un navegador o
servirlo con cualquier servidor estático (`npx serve .`, `python -m http.server`, etc.).

## Estructura
```
caldes-de-boi/
  index.html                Home
  hotel-manantial.html      Ficha Hotel Manantial (plantilla común)
  hotel-caldas.html         Ficha Hotel Caldas   (misma plantilla)
  balneario.html            Wellness & Spa — lista de servicios termales
  restauracion.html         Listado de restaurantes del complejo
  restaurantes/
    restaurante.html        Plantilla de carta (?r=<slug>), una sola página
                             sirve para todos los restaurantes
  entorno.html              Puntos de interés del Valle de Boí
  css/style.css             Estilos (variables de color/tipografía arriba)
  js/config.js              *** ÚNICO archivo de contenido/datos ***
  js/main.js                Header/footer, imágenes, motor de reservas
  js/hotel-page.js          Rellena hotel-manantial.html / hotel-caldas.html
```

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

## 3. Balneario — lista de servicios termales
`balneario.html` pinta la lista completa a partir del array
`SPA_SERVICES` de `config.js` (categoría, nombre, duración, descripción).
Añadir/editar un tratamiento es solo tocar ese array.

## 4. Restauración — restaurantes y cartas
`restauracion.html` lista los restaurantes desde `RESTAURANTS`
(`config.js`); cada tarjeta enlaza a `restaurantes/restaurante.html?r=<slug>`,
que renderiza la carta completa (secciones + platos + precio) de ese
restaurante. Añadir un restaurante nuevo (con su carta) es solo añadir un
objeto al array — no hace falta crear ningún HTML nuevo.

## 5. Entorno
`entorno.html` lista los puntos de interés desde `ENTORNO_ITEMS`. Cada uno
admite un `externalLink` a la web oficial (turismo, parque nacional,
etc.); mientras no exista ese enlace, la propia página muestra la
descripción larga como "web que lo explica".

## Pendiente de decidir con el cliente
- Motor(es) de reserva reales para Manantial y Caldas.
- Banco de fotos definitivo (sustituir `IMAGES`).
- Textos definitivos de cartas/tratamientos/entorno (los actuales son de
  ejemplo/placeholder).
