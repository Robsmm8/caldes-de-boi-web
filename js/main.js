/* =========================================================================
   MAIN.JS — comportamiento común a todas las páginas
   Header/footer, aplicación de imágenes desde config.js, y el conector
   parametrizado hacia los dos motores de reserva.
   ========================================================================= */

/* ---- Header / Footer, inyectados una sola vez para no duplicar el marcado ----
   BASE se antepone a todos los enlaces internos para que el header/footer
   funcionen igual desde la raíz que desde subcarpetas (p. ej. restaurantes/).
   Cada página define window.SITE_BASE antes de cargar main.js si vive en
   una subcarpeta (ver restaurantes/restaurante.html); por defecto es "". */
const BASE = window.SITE_BASE || "";

function renderHeader(activePage) {
  const links = [
    { href: `${BASE}index.html`, label: "El Resort", key: "home" },
    { href: `${BASE}index.html#hoteles`, label: "Hoteles", key: "hoteles" },
    { href: `${BASE}balneario.html`, label: "Aguas Termales", key: "balneario" },
    { href: `${BASE}index.html#experiencias`, label: "Experiencias", key: "experiencias" },
    { href: `${BASE}entorno.html`, label: "Entorno", key: "entorno" },
    { href: `${BASE}restauracion.html`, label: "Restauración", key: "restauracion" },
    { href: `${BASE}ofertas.html`, label: "Ofertas", key: "ofertas" },
  ];
  const navHtml = links
    .map((l) => `<a href="${l.href}" style="${l.key === activePage ? "color:#c8935a;" : ""}">${l.label}</a>`)
    .join("");

  return `
    <div class="container">
      <a href="${BASE}index.html" class="brand">
        <img class="brand-logo" src="${BASE}assets/img/logo-resort.png" alt="Caldes de Boí — Balneari Thermal Resort" />
      </a>
      <nav class="main-nav" id="main-nav">${navHtml}</nav>
      <div class="header-actions">
        <span class="nav-lang">ES ▾</span>
        <button type="button" class="btn btn-primary btn-sm" data-scroll-booking>Reservar</button>
        <button type="button" class="nav-toggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="main-nav">☰</button>
      </div>
    </div>`;
}

function renderFooter() {
  return `
    <div class="container">
      <div class="footer-top">
        <div class="footer-newsletter">
          <h5 id="newsletter-heading">Suscríbete a nuestra newsletter</h5>
          <p style="color:#9aa79a;max-width:340px;">Recibe ofertas exclusivas y novedades de Caldes de Boí.</p>
          <form onsubmit="event.preventDefault(); alert('Gracias por suscribirte (demo).');">
            <label for="newsletter-email" class="sr-only">Correo electrónico</label>
            <input type="email" id="newsletter-email" placeholder="Tu email" aria-describedby="newsletter-heading" required />
            <button class="btn btn-primary btn-sm" type="submit">Suscribirme</button>
          </form>
        </div>
        <div>
          <h5 style="color:#fff;">Síguenos</h5>
          <div class="social">
            <a href="#" aria-label="Instagram">◎</a><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="YouTube">▶</a>
          </div>
        </div>
      </div>
      <div class="footer-cols">
        <div>
          <h5>El Resort</h5>
          <ul>
            <li><a href="${BASE}index.html">Quiénes somos</a></li>
            <li><a href="${BASE}index.html">Sostenibilidad</a></li>
            <li><a href="${BASE}index.html">Galería</a></li>
            <li><a href="${BASE}index.html">Contacto</a></li>
          </ul>
        </div>
        <div>
          <h5>Hoteles</h5>
          <ul>
            <li><a href="${BASE}hotel-manantial.html">Hotel Manantial</a></li>
            <li><a href="${BASE}hotel-caldas.html">Hotel Caldas</a></li>
          </ul>
        </div>
        <div>
          <h5>Aguas Termales</h5>
          <ul>
            <li><a href="${BASE}balneario.html">Balneario</a></li>
            <li><a href="${BASE}balneario.html">Tratamientos</a></li>
          </ul>
        </div>
        <div>
          <h5>Experiencias</h5>
          <ul>
            <li><a href="${BASE}balneario.html">Wellness &amp; Spa</a></li>
            <li><a href="${BASE}entorno.html">Naturaleza</a></li>
            <li><a href="${BASE}restauracion.html">Gastronomía</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 Caldes de Boí Balneari Thermal Resort</span>
        <span><a href="#">Política de privacidad</a> · <a href="#">Política de cookies</a></span>
      </div>
    </div>`;
}

/* ---- Aplica las imágenes de IMAGES (config.js) a cada elemento marcado ---- */
function applyImages() {
  document.querySelectorAll("[data-img-key]").forEach((el) => {
    const key = el.getAttribute("data-img-key");
    const url = IMAGES[key];
    if (!url) {
      console.warn(`[config.js] No existe la clave de imagen "${key}"`);
      return;
    }
    if (el.tagName === "IMG") {
      el.src = url;
      if (!el.hasAttribute("alt")) {
        console.warn(`[a11y] <img data-img-key="${key}"> no tiene atributo alt; tratada como decorativa.`);
        el.alt = "";
      }
    } else {
      el.style.backgroundImage = `url('${url}')`;
    }
  });
}

/* Vídeo de fondo del hero (opcional, ver HERO_VIDEO en config.js) */
function applyHeroVideo() {
  const video = document.querySelector("[data-hero-video]");
  if (!video || !HERO_VIDEO) return;
  video.poster = IMAGES.heroHome;
  video.src = HERO_VIDEO;
  // Si el vídeo no puede reproducirse (red, formato, etc.) se queda la
  // imagen de fondo del propio .hero (heroHome) como respaldo.
  video.addEventListener("error", () => video.remove());
}

/* =========================================================================
   MOTOR DE RESERVAS — capa de integración parametrizada
   buildBookingUrl() es el ÚNICO sitio que hay que adaptar cuando se
   contrate el motor real de cada hotel. Hoy soporta un formato "generic"
   de query-string; añadid un `case` por proveedor si el motor definitivo
   necesita otro formato de URL.
   ========================================================================= */
function buildBookingUrl(hotelId, params) {
  const engine = BOOKING_ENGINES[hotelId];
  if (!engine) throw new Error(`No hay motor de reservas configurado para "${hotelId}"`);

  const qs = new URLSearchParams();
  qs.set("hotel", engine.hotelCode);
  if (params.checkin) qs.set("checkin", params.checkin);
  if (params.checkout) qs.set("checkout", params.checkout);
  if (params.guests) qs.set("guests", params.guests);

  switch (engine.provider) {
    // Ejemplo de cómo se adaptaría un proveedor concreto el día de mañana:
    // case "avirato":
    //   qs.set("hid", engine.hotelCode);
    //   qs.set("arrival", params.checkin);
    //   qs.set("departure", params.checkout);
    //   break;
    case "generic":
    default:
      break;
  }
  return `${engine.baseUrl}?${qs.toString()}`;
}

let modalLastFocusedEl = null;

function showBookingModal({ hotelLabel, hotelId, checkin, checkout, guests }) {
  const engine = BOOKING_ENGINES[hotelId];
  const url = buildBookingUrl(hotelId, { checkin, checkout, guests });
  const overlay = document.getElementById("booking-modal");
  overlay.querySelector("[data-m-hotel]").textContent = hotelLabel;
  overlay.querySelector("[data-m-engine]").textContent = engine.engineName;
  overlay.querySelector("[data-m-checkin]").textContent = checkin || "—";
  overlay.querySelector("[data-m-checkout]").textContent = checkout || "—";
  overlay.querySelector("[data-m-guests]").textContent = guests || "—";
  overlay.querySelector("[data-m-url]").textContent = url;
  overlay.classList.add("open");

  // Accesibilidad del diálogo: recordar el foco anterior y moverlo dentro
  // del modal (WCAG 2.4.3 / 4.1.2), para restaurarlo al cerrar.
  modalLastFocusedEl = document.activeElement;
  overlay.querySelector(".modal-box .btn").focus();
}

function closeBookingModal() {
  const overlay = document.getElementById("booking-modal");
  if (overlay) overlay.classList.remove("open");
  if (modalLastFocusedEl) {
    modalLastFocusedEl.focus();
    modalLastFocusedEl = null;
  }
}

/* Engancha el formulario .booking-widget (si existe en la página) al conector */
function initBookingWidget() {
  const form = document.querySelector(".booking-widget");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const hotelSelection = data.get("hotel") || form.dataset.fixedHotel;
    const checkin = data.get("checkin");
    const checkout = data.get("checkout");
    const guests = data.get("guests");

    if (!hotelSelection || hotelSelection === "any") {
      // "Cualquiera": de momento mostramos ambos motores; con datos reales
      // se podría lanzar un buscador combinado.
      showBookingModal({
        hotelLabel: "Cualquiera de los dos hoteles",
        hotelId: "manantial",
        checkin, checkout, guests,
      });
      return;
    }
    const hotel = HOTELS[hotelSelection];
    showBookingModal({
      hotelLabel: hotel.name,
      hotelId: hotel.bookingEngine,
      checkin, checkout, guests,
    });
  });
}

function injectBookingModal() {
  if (document.getElementById("booking-modal")) return;
  const div = document.createElement("div");
  div.id = "booking-modal";
  div.className = "modal-overlay";
  div.innerHTML = `
    <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="booking-modal-title">
      <span class="eyebrow">Simulación · conexión con motor de reservas</span>
      <h3 id="booking-modal-title" data-m-hotel>Hotel</h3>
      <p style="margin-bottom:0;">Este paso, en producción, redirige (o abre en un iframe) el motor de reservas real configurado en <code>js/config.js</code>.</p>
      <div class="row"><span>Motor asignado</span><strong data-m-engine></strong></div>
      <div class="row"><span>Entrada</span><strong data-m-checkin></strong></div>
      <div class="row"><span>Salida</span><strong data-m-checkout></strong></div>
      <div class="row"><span>Huéspedes</span><strong data-m-guests></strong></div>
      <div class="url-box" data-m-url></div>
      <div class="modal-actions">
        <button class="btn btn-light btn-sm" onclick="closeBookingModal()">Cerrar</button>
      </div>
    </div>`;
  document.body.appendChild(div);
}

document.addEventListener("DOMContentLoaded", () => {
  const headerEl = document.getElementById("site-header");
  const footerEl = document.getElementById("site-footer");
  if (headerEl) headerEl.innerHTML = renderHeader(document.body.dataset.page || "");
  if (footerEl) footerEl.innerHTML = renderFooter();

  applyImages();
  applyHeroVideo();
  injectBookingModal();
  initBookingWidget();

  document.querySelectorAll("[data-scroll-booking]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const widget = document.querySelector(".booking-widget");
      if (widget) widget.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  // Cerrar el modal de reservas con Escape (WCAG 2.1.1 / 2.1.2)
  document.addEventListener("keydown", (e) => {
    const overlay = document.getElementById("booking-modal");
    if (e.key === "Escape" && overlay && overlay.classList.contains("open")) {
      closeBookingModal();
    }
  });

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    });
    // Cerrar el menú móvil con Escape y devolver el foco al botón
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menú");
        toggle.focus();
      }
    });
  }
});
