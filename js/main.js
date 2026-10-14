/* =========================================================================
   MAIN.JS — comportamiento común a todas las páginas
   Header/footer (con selector de idioma y teléfono), aplicación de imágenes
   desde config.js, marcadores [[PENDIENTE]], modal de reservas y conector
   parametrizado hacia los motores de reserva.
   El buscador de disponibilidad vive en js/booking-widget.js.
   Requiere que config.js, i18n.js e icons.js se carguen ANTES que este archivo.
   ========================================================================= */

/* BASE se antepone a todos los enlaces internos para que el header/footer
   funcionen igual desde la raíz que desde subcarpetas (p. ej. restaurantes/).
   Cada página define window.SITE_BASE antes de cargar main.js si vive en
   una subcarpeta (ver restaurantes/restaurante.html); por defecto es "". */
const BASE = window.SITE_BASE || "";

function uiDict() {
  return UI_STRINGS[getLang()] || UI_STRINGS.ca;
}

/* Desplazamiento suave salvo que el usuario pida menos movimiento. */
function scrollBehavior() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

/* ---- teléfono de reservas (config.js -> SITE_INFO) ---- */
function phoneHtml(className) {
  const t = uiDict();
  if (SITE_INFO.phone) {
    const label = SITE_INFO.phoneDisplay || SITE_INFO.phone;
    return `<a class="${className}" href="tel:${SITE_INFO.phone}" aria-label="${t.phone_aria}: ${label}">${icon("phone")}<span class="phone-text">${label}</span></a>`;
  }
  return `<span class="${className} is-pending">${icon("phone")}<span class="phone-text">${pendingText("teléfono de reservas")}</span></span>`;
}

/* Banderas del selector de idioma (SVG propio, decorativas: el botón ya lleva
   el nombre del idioma en su aria-label). ca = senyera, en = Reino Unido. */
const FLAG_SVG = {
  ca: '<rect width="24" height="16" fill="#FCDD09"/><g fill="#DA121A"><rect y="1.78" width="24" height="1.78"/><rect y="5.33" width="24" height="1.78"/><rect y="8.89" width="24" height="1.78"/><rect y="12.44" width="24" height="1.78"/></g>',
  es: '<rect width="24" height="16" fill="#AA151B"/><rect y="4" width="24" height="8" fill="#F1BF00"/>',
  en: '<rect width="24" height="16" fill="#012169"/><path d="M0 0 24 16M24 0 0 16" stroke="#fff" stroke-width="3.2"/><path d="M0 0 24 16M24 0 0 16" stroke="#C8102E" stroke-width="1.2"/><path d="M12 0v16M0 8h24" stroke="#fff" stroke-width="5"/><path d="M12 0v16M0 8h24" stroke="#C8102E" stroke-width="2.8"/>',
  fr: '<rect width="8" height="16" fill="#0055A4"/><rect x="8" width="8" height="16" fill="#fff"/><rect x="16" width="8" height="16" fill="#EF4135"/>',
};

function flagHtml(lang) {
  return `<svg class="lang-flag" viewBox="0 0 24 16" preserveAspectRatio="none" aria-hidden="true" focusable="false">${FLAG_SVG[lang] || ""}</svg>`;
}

function renderHeader(activePage) {
  const t = uiDict();
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
    .map((l) => `<a href="${l.href}"${l.key === activePage ? ' class="is-active" aria-current="page"' : ""}>${l.label}</a>`)
    .join("");

  const langHtml = LANGS
    .map((l) => `<button type="button" class="lang-btn${l === getLang() ? " active" : ""}" data-lang="${l}" lang="${l}" aria-label="${LANG_LABELS[l]}" aria-current="${l === getLang() ? "true" : "false"}"><span class="lang-code">${l.toUpperCase()}</span>${flagHtml(l)}<span class="lang-name">${LANG_LABELS[l]}</span></button>`)
    .join("");
  // En móvil el selector se pliega en un desplegable (bandera + código actual); en escritorio se ven los 4 botones.
  const current = getLang();
  const langSwitchHtml = `
        <div class="lang-switch" role="group" aria-label="Idioma / Language">
          <button type="button" class="lang-toggle" aria-haspopup="true" aria-expanded="false" aria-controls="lang-menu" aria-label="Idioma / Language: ${LANG_LABELS[current]}">${flagHtml(current)}<span class="lang-code">${current.toUpperCase()}</span>${icon("chevron")}</button>
          <div class="lang-menu" id="lang-menu">${langHtml}</div>
        </div>`;

  return `
    <div class="container">
      <a href="${BASE}index.html" class="brand">
        <img class="brand-logo" src="${BASE}assets/img/logo-resort-240.png" width="58" height="56" decoding="async" alt="${t.brand_alt}" />
      </a>
      <nav class="main-nav" id="main-nav" aria-label="${t.nav_aria}">
        ${navHtml}
        <a class="nav-reserve" href="${BASE}index.html#reservar">${t.nav_reservar}</a>
        ${phoneHtml("nav-phone")}
      </nav>
      <div class="header-actions">
        ${phoneHtml("header-phone")}
        ${langSwitchHtml}
        <button type="button" class="btn btn-primary btn-sm header-reserve" data-scroll-booking>${t.nav_reservar}</button>
        <button type="button" class="nav-toggle" aria-label="${t.nav_menu_open}" aria-expanded="false" aria-controls="main-nav">${icon("menu")}</button>
      </div>
    </div>`;
}

const SOCIAL_NETWORKS = [
  { key: "facebook", name: "Facebook", icon: "facebook" },
  { key: "instagram", name: "Instagram", icon: "instagram" },
  { key: "youtube", name: "YouTube", icon: "youtube" },
  { key: "twitter", name: "X (Twitter)", icon: "x" },
  { key: "linkedin", name: "LinkedIn", icon: "linkedin" },
];

function socialHtml(t) {
  return SOCIAL_NETWORKS.filter((n) => SITE_INFO.social[n.key])
    .map((n) => `<a href="${SITE_INFO.social[n.key]}" target="_blank" rel="noopener" aria-label="${n.name} (${t.opens_new_tab})">${icon(n.icon)}</a>`)
    .join("");
}

function renderFooter() {
  const t = uiDict();
  const legal = SITE_INFO.legalLinks[getLang()] || SITE_INFO.legalLinks.ca;
  return `
    <div class="container">
      <div class="footer-top">
        <div class="footer-newsletter">
          <h5 id="newsletter-heading">${t.footer_newsletter_title}</h5>
          <p class="footer-note">${t.footer_newsletter_desc}</p>
          <form class="newsletter-form">
            <label for="newsletter-email" class="sr-only">${t.footer_email_label}</label>
            <input type="email" id="newsletter-email" placeholder="${t.footer_email_placeholder}" aria-describedby="newsletter-heading" required />
            <button class="btn btn-primary btn-sm" type="submit">${t.footer_suscribirme}</button>
          </form>
          <p class="newsletter-msg" role="status"></p>
        </div>
        <div class="footer-contact">
          <h5>${t.footer_contacto}</h5>
          <address>
            <p>${icon("pin")} <span>${SITE_INFO.address.street} · ${SITE_INFO.address.postalCode} ${SITE_INFO.address.locality} (${SITE_INFO.address.province})</span></p>
            ${SITE_INFO.phone ? `<p>${icon("phone")} <a href="tel:${SITE_INFO.phone}">${SITE_INFO.phoneDisplay || SITE_INFO.phone}</a></p>` : ""}
            <p>${icon("mail")} <a href="mailto:${SITE_INFO.email}">${SITE_INFO.email}</a></p>
          </address>
          <h5 class="footer-follow">${t.footer_seguinos}</h5>
          <div class="social">${socialHtml(t)}</div>
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
        <span>${t.footer_copyright}<br />${SITE_INFO.legalName} · CIF ${SITE_INFO.cif}</span>
        <span>
          <a href="${legal.legal}" target="_blank" rel="noopener">${t.footer_privacidad}<span class="sr-only"> (${t.opens_new_tab})</span></a> ·
          <a href="${legal.cookies}" target="_blank" rel="noopener">${t.footer_cookies}<span class="sr-only"> (${t.opens_new_tab})</span></a>
        </span>
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
      // Todo lo que no es la primera pantalla se carga en diferido. Para
      // forzar carga inmediata en una imagen concreta: loading="eager".
      if (!el.hasAttribute("loading")) el.loading = "lazy";
      if (!el.hasAttribute("decoding")) el.decoding = "async";
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

/* ---- Precios "des de" (hoteles y paquetes). null = pendiente ---- */
function formatPriceFrom(price, key) {
  const value = price == null ? pendingText("tarifa") : price;
  return uiDict()[key || "price_from"].replace("{price}", value);
}

/* =========================================================================
   MARCADORES [[PENDIENTE: ...]]
   Cualquier texto con ese formato se resalta en amarillo para que no pase
   por contenido definitivo. Se re-aplica solo cuando cambia el DOM.
   ========================================================================= */
const PENDING_SPLIT = /(\[\[PENDIENTE[^\]]*\]\])/;
const PENDING_TEST = /\[\[PENDIENTE/;

function markPending(root) {
  const walker = document.createTreeWalker(root || document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!PENDING_TEST.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
      const parent = node.parentElement;
      if (!parent || parent.closest("mark.pending-mark, script, style, noscript, option, textarea, title")) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    const frag = document.createDocumentFragment();
    node.nodeValue.split(PENDING_SPLIT).forEach((part) => {
      if (!part) return;
      if (PENDING_TEST.test(part)) {
        const mark = document.createElement("mark");
        mark.className = "pending-mark";
        mark.textContent = part;
        frag.appendChild(mark);
      } else {
        frag.appendChild(document.createTextNode(part));
      }
    });
    node.parentNode.replaceChild(frag, node);
  });
}

function watchPending() {
  let scheduled = false;
  new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      markPending();
    });
  }).observe(document.body, { childList: true, subtree: true, characterData: true });
  markPending();
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
  if (params.adults) qs.set("adults", params.adults);
  if (params.children) qs.set("children", params.children);
  if (params.rooms) qs.set("rooms", params.rooms);
  if (params.pets) qs.set("pets", params.pets);
  if (params.room) qs.set("room", params.room);

  switch (engine.provider) {
    // case "avirato": qs.set("hid", engine.hotelCode); break;
    case "generic":
    default:
      break;
  }
  return `${engine.baseUrl}?${qs.toString()}`;
}

let modalLastFocusedEl = null;

/* rows: [{ label, value }, ...] — las filas varían según sea alojamiento o circuito termal. */
function showBookingModal({ title, engineName, url, rows }) {
  const overlay = document.getElementById("booking-modal");
  overlay.querySelector("[data-m-hotel]").textContent = title;
  overlay.querySelector("[data-m-engine]").textContent = engineName;
  const list = overlay.querySelector("[data-m-rows]");
  list.textContent = "";
  rows.forEach((r) => {
    const row = document.createElement("div");
    row.className = "row";
    const label = document.createElement("span");
    label.textContent = r.label;
    const value = document.createElement("strong");
    value.textContent = r.value || "—";
    row.append(label, value);
    list.appendChild(row);
  });
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

function injectBookingModal() {
  if (document.getElementById("booking-modal")) return;
  const div = document.createElement("div");
  div.id = "booking-modal";
  div.className = "modal-overlay";
  div.innerHTML = `
    <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="booking-modal-title">
      <span class="eyebrow" data-i18n="modal_sim_label">Simulación · conexión con motor de reservas</span>
      <h3 id="booking-modal-title" data-m-hotel>Hotel</h3>
      <p class="modal-desc" data-i18n="modal_sim_desc">Este paso, en producción, redirige (o abre en un iframe) el motor de reservas real configurado en js/config.js.</p>
      <div class="row"><span data-i18n="modal_motor">Motor asignado</span><strong data-m-engine></strong></div>
      <div data-m-rows></div>
      <div class="url-box" data-m-url></div>
      <div class="modal-actions">
        <button type="button" class="btn btn-light btn-sm" data-i18n="modal_cerrar" data-m-close>Cerrar</button>
      </div>
    </div>`;
  document.body.appendChild(div);
  div.querySelector("[data-m-close]").addEventListener("click", closeBookingModal);
  div.addEventListener("click", (e) => {
    if (e.target === div) closeBookingModal();
  });
}

/* ---- Interacciones globales (delegadas: sobreviven a re-render del header) ---- */
function goToBooking() {
  const widget = document.querySelector("[data-booking-widget]");
  if (widget) widget.scrollIntoView({ behavior: scrollBehavior(), block: "center" });
  else window.location.href = `${BASE}index.html#reservar`; // páginas sin buscador
}

function setNavOpen(open) {
  const nav = document.getElementById("main-nav");
  const toggle = document.querySelector(".nav-toggle");
  if (!nav || !toggle) return;
  const t = uiDict();
  nav.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? t.nav_menu_close : t.nav_menu_open);
  toggle.innerHTML = icon(open ? "close" : "menu");
}

function wireGlobalInteractions() {
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-scroll-booking]")) {
      goToBooking();
      return;
    }
    const langToggle = e.target.closest(".lang-toggle");
    if (langToggle) {
      setLangMenuOpen(!langToggle.closest(".lang-switch").classList.contains("open"));
      return;
    }
    const langBtn = e.target.closest(".lang-btn");
    if (langBtn) {
      setLang(langBtn.dataset.lang); // re-pinta la cabecera, lo que también cierra el menú
      return;
    }
    if (!e.target.closest(".lang-switch")) setLangMenuOpen(false);
    if (e.target.closest(".nav-toggle")) {
      setNavOpen(!document.getElementById("main-nav").classList.contains("open"));
      return;
    }
    if (e.target.closest("#main-nav a")) setNavOpen(false);
  });

  document.addEventListener("submit", (e) => {
    if (!e.target.matches(".newsletter-form")) return;
    e.preventDefault();
    // Demostración: aún no hay servicio de newsletter conectado.
    e.target.closest(".footer-newsletter").querySelector(".newsletter-msg").textContent = uiDict().footer_newsletter_ok;
    e.target.reset();
  });

  // Escape: cierra primero el modal de reservas, después el menú móvil.
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const overlay = document.getElementById("booking-modal");
    if (overlay && overlay.classList.contains("open")) {
      closeBookingModal();
      return;
    }
    const langSwitch = document.querySelector(".lang-switch.open");
    if (langSwitch) {
      setLangMenuOpen(false);
      langSwitch.querySelector(".lang-toggle").focus();
      return;
    }
    const nav = document.getElementById("main-nav");
    if (nav && nav.classList.contains("open")) {
      setNavOpen(false);
      document.querySelector(".nav-toggle").focus();
    }
  });
}

/* Desplegable de idioma (solo visible en móvil, ver css/style.css) */
function setLangMenuOpen(open) {
  const sw = document.querySelector(".lang-switch");
  if (!sw) return;
  sw.classList.toggle("open", open);
  sw.querySelector(".lang-toggle").setAttribute("aria-expanded", String(open));
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
  wireGlobalInteractions();
  watchPending();
});
