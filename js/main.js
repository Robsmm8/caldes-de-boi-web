/* =========================================================================
   MAIN.JS — comportamiento común a todas las páginas
   Header/footer (con selector de idioma), aplicación de imágenes desde
   config.js, y el conector parametrizado hacia los dos motores de reserva.
   Requiere que js/i18n.js y js/config.js se carguen ANTES que este archivo.
   ========================================================================= */

/* BASE se antepone a todos los enlaces internos para que el header/footer
   funcionen igual desde la raíz que desde subcarpetas (p. ej. restaurantes/).
   Cada página define window.SITE_BASE antes de cargar main.js si vive en
   una subcarpeta (ver restaurantes/restaurante.html); por defecto es "". */
const BASE = window.SITE_BASE || "";

function renderHeader(activePage) {
  const t = UI_STRINGS[getLang()] || UI_STRINGS.ca;
  const links = [
    { href: `${BASE}index.html`, label: t.nav_resort, key: "home" },
    { href: `${BASE}index.html#hoteles`, label: t.nav_hoteles, key: "hoteles" },
    { href: `${BASE}balneario.html`, label: t.nav_termal, key: "balneario" },
    { href: `${BASE}index.html#experiencias`, label: t.nav_experiencias, key: "experiencias" },
    { href: `${BASE}entorno.html`, label: t.nav_entorno, key: "entorno" },
    { href: `${BASE}restauracion.html`, label: t.nav_restauracion, key: "restauracion" },
    { href: `${BASE}ofertas.html`, label: t.nav_ofertas, key: "ofertas" },
  ];
  const navHtml = links
    .map((l) => `<a href="${l.href}" style="${l.key === activePage ? "color:#c8935a;" : ""}">${l.label}</a>`)
    .join("");

  const langHtml = LANGS
    .map((l) => `<button type="button" class="lang-btn${l === getLang() ? " active" : ""}" data-lang="${l}" aria-current="${l === getLang() ? "true" : "false"}">${l.toUpperCase()}</button>`)
    .join("");

  return `
    <div class="container">
      <a href="${BASE}index.html" class="brand">
        <img class="brand-logo" src="${BASE}assets/img/logo-resort.png" alt="${t.brand_alt}" />
      </a>
      <nav class="main-nav" id="main-nav">${navHtml}</nav>
      <div class="header-actions">
        <div class="lang-switch" role="group" aria-label="Idioma / Language">${langHtml}</div>
        <button type="button" class="btn btn-primary btn-sm" data-scroll-booking>${t.nav_reservar}</button>
        <button type="button" class="nav-toggle" aria-label="${t.nav_menu_open}" aria-expanded="false" aria-controls="main-nav">☰</button>
      </div>
    </div>`;
}

function renderFooter() {
  const t = UI_STRINGS[getLang()] || UI_STRINGS.ca;
  return `
    <div class="container">
      <div class="footer-top">
        <div class="footer-newsletter">
          <h5 id="newsletter-heading">${t.footer_newsletter_title}</h5>
          <p style="color:#9aa79a;max-width:340px;">${t.footer_newsletter_desc}</p>
          <form onsubmit="event.preventDefault(); alert('Gracias por suscribirte (demo).');">
            <label for="newsletter-email" class="sr-only">${t.footer_email_label}</label>
            <input type="email" id="newsletter-email" placeholder="${t.footer_email_placeholder}" aria-describedby="newsletter-heading" required />
            <button class="btn btn-primary btn-sm" type="submit">${t.footer_suscribirme}</button>
          </form>
        </div>
        <div>
          <h5 style="color:#fff;">${t.footer_seguinos}</h5>
          <div class="social">
            <a href="#" aria-label="Instagram">◎</a><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="YouTube">▶</a>
          </div>
        </div>
      </div>
      <div class="footer-cols">
        <div>
          <h5>${t.footer_col_resort}</h5>
          <ul>
            <li><a href="${BASE}index.html">${t.footer_quienes}</a></li>
            <li><a href="${BASE}index.html">${t.footer_sostenibilidad}</a></li>
            <li><a href="${BASE}index.html">${t.footer_galeria}</a></li>
            <li><a href="${BASE}index.html">${t.footer_contacto}</a></li>
          </ul>
        </div>
        <div>
          <h5>${t.footer_col_hoteles}</h5>
          <ul>
            <li><a href="${BASE}hotel-manantial.html">Hotel Manantial</a></li>
            <li><a href="${BASE}hotel-caldas.html">Hotel Caldas</a></li>
          </ul>
        </div>
        <div>
          <h5>${t.footer_col_termal}</h5>
          <ul>
            <li><a href="${BASE}balneario.html">${t.footer_balneario}</a></li>
            <li><a href="${BASE}balneario.html#programas">${t.footer_tratamientos}</a></li>
          </ul>
        </div>
        <div>
          <h5>${t.footer_col_exp}</h5>
          <ul>
            <li><a href="${BASE}balneario.html">${t.exp_wellness}</a></li>
            <li><a href="${BASE}entorno.html">${t.footer_naturaleza}</a></li>
            <li><a href="${BASE}restauracion.html">${t.footer_gastronomia}</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>${t.footer_copyright}</span>
        <span><a href="#">${t.footer_privacidad}</a> · <a href="#">${t.footer_cookies}</a></span>
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
  video.addEventListener("error", () => video.remove());
}

/* =========================================================================
   MOTOR DE RESERVAS — capa de integración parametrizada
   buildBookingUrl() es el ÚNICO sitio que hay que adaptar cuando se
   contrate el motor real de cada hotel.
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
    // case "avirato": qs.set("hid", engine.hotelCode); break;
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
    const t = UI_STRINGS[getLang()] || UI_STRINGS.ca;

    if (!hotelSelection || hotelSelection === "any") {
      showBookingModal({
        hotelLabel: t.modal_cualquiera,
        hotelId: "manantial",
        checkin, checkout, guests,
      });
      return;
    }
    const hotel = HOTELS[hotelSelection];
    showBookingModal({
      hotelLabel: tr(hotel.name),
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
      <span class="eyebrow" data-i18n="modal_sim_label">Simulación · conexión con motor de reservas</span>
      <h3 id="booking-modal-title" data-m-hotel>Hotel</h3>
      <p style="margin-bottom:0;" data-i18n="modal_sim_desc">Este paso, en producción, redirige (o abre en un iframe) el motor de reservas real configurado en js/config.js.</p>
      <div class="row"><span data-i18n="modal_motor">Motor asignado</span><strong data-m-engine></strong></div>
      <div class="row"><span data-i18n="modal_entrada">Entrada</span><strong data-m-checkin></strong></div>
      <div class="row"><span data-i18n="modal_salida">Salida</span><strong data-m-checkout></strong></div>
      <div class="row"><span data-i18n="modal_huespedes">Huéspedes</span><strong data-m-guests></strong></div>
      <div class="url-box" data-m-url></div>
      <div class="modal-actions">
        <button class="btn btn-light btn-sm" data-i18n="modal_cerrar" onclick="closeBookingModal()">Cerrar</button>
      </div>
    </div>`;
  document.body.appendChild(div);
}

/* Vuelve a enganchar los eventos de los botones que viven DENTRO del header
   (se regeneran cada vez que cambia el idioma, así que hay que rehacer los
   listeners solo de esa parte — el resto de la página no se re-renderiza). */
function wireHeaderInteractions() {
  const headerEl = document.getElementById("site-header");
  if (!headerEl) return;

  headerEl.querySelectorAll("[data-scroll-booking]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const widget = document.querySelector(".booking-widget");
      if (widget) widget.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  headerEl.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });

  const toggle = headerEl.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const nav = document.getElementById("main-nav");
      const t = UI_STRINGS[getLang()] || UI_STRINGS.ca;
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? t.nav_menu_close : t.nav_menu_open);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const headerEl = document.getElementById("site-header");
  const footerEl = document.getElementById("site-footer");
  if (headerEl) headerEl.innerHTML = renderHeader(document.body.dataset.page || "");
  if (footerEl) footerEl.innerHTML = renderFooter();

  applyI18n();
  applyImages();
  applyHeroVideo();
  injectBookingModal();
  applyI18n(); // vuelve a pasar tras inyectar el modal, para traducir su contenido
  initBookingWidget();
  wireHeaderInteractions();

  // Botones "Reservar" fuera del header (hero, páginas de hotel...): no se
  // regeneran nunca, así que basta con engancharlos una vez aquí.
  document.querySelectorAll("[data-scroll-booking]:not(#site-header [data-scroll-booking])").forEach((btn) => {
    btn.addEventListener("click", () => {
      const widget = document.querySelector(".booking-widget");
      if (widget) widget.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  // Cerrar modal de reservas y menú móvil con Escape (busca los elementos
  // en el momento del evento, para que siga funcionando tras un cambio de
  // idioma que haya regenerado el header).
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const overlay = document.getElementById("booking-modal");
    if (overlay && overlay.classList.contains("open")) {
      closeBookingModal();
      return;
    }
    const nav = document.getElementById("main-nav");
    const toggle = document.querySelector(".nav-toggle");
    if (nav && nav.classList.contains("open")) {
      const t = UI_STRINGS[getLang()] || UI_STRINGS.ca;
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", t.nav_menu_open);
      toggle.focus();
    }
  });
});
