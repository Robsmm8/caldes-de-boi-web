/* =========================================================================
   BOOKING-WIDGET.JS — buscador de disponibilidad (único para todas las páginas)

   Cada página incluye solo un contenedor vacío:
     <div class="booking-panel container" id="reservar" data-booking-widget data-mode="home"></div>
   y este script lo rellena. Modos (data-mode):
     home  -> pestañas Allotjament / Circuit termal, selector de hotel   (index.html)
     spa   -> igual que home, con "Circuit termal" abierto por defecto   (balneario.html)
     hotel -> solo alojamiento, hotel fijado por <body data-hotel-id>    (hotel-*.html)

   Qué hace:
   - Fechas con `min` dinámico (llegada >= hoy; salida >= llegada + 1) y
     validación al enviar (mensajes traducidos, foco en el campo erróneo).
   - Aviso claro si las fechas caen fuera de temporada (SEASONS en config.js).
   - Si BOOKING_ENGINES[x].live es true, redirige al motor real; si no,
     abre el modal de simulación (showBookingModal en js/main.js).
   Requiere config.js, i18n.js e icons.js ANTES, y guest-picker.js DESPUÉS
   (el selector de huéspedes se engancha sobre el HTML que se genera aquí).
   ========================================================================= */

/* ---- utilidades de fecha (siempre en hora local) ---- */
function isoFromDate(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function todayISO() {
  return isoFromDate(new Date());
}
function addDaysISO(iso, n) {
  const [y, m, d] = iso.split("-").map(Number);
  return isoFromDate(new Date(y, m - 1, d + n));
}
function formatISODate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(getLang(), { day: "numeric", month: "short", year: "numeric" });
}

/* ---- temporada ---- */
function formatSeasonRanges(hotelId) {
  return (SEASONS[hotelId] || []).map((r) => `${formatISODate(r.from)} – ${formatISODate(r.to)}`).join(", ");
}

function seasonNoteText(hotelId) {
  const ids = hotelId ? [hotelId] : Object.keys(SEASONS);
  const parts = ids.map((id) => {
    if (!(SEASONS[id] || []).length) return null;
    return ids.length > 1 ? `${tr(HOTELS[id].name)}: ${formatSeasonRanges(id)}` : formatSeasonRanges(id);
  });
  if (parts.every((p) => !p)) return pendingText("fechas de apertura de cada hotel");
  return parts.map((p, i) => p || `${tr(HOTELS[ids[i]].name)}: ${pendingText("fechas de apertura")}`).join(" · ");
}

/* Devuelve la lista de hoteles a mencionar si las fechas caen fuera de
   temporada, o null si están dentro o si aún no hay datos de temporada. */
function outOfSeasonHotels(hotel, checkin, checkout) {
  const ids = hotel === "any" ? Object.keys(SEASONS) : [hotel];
  if (ids.some((id) => !(SEASONS[id] || []).length)) return null; // sin datos: no se valida
  const open = ids.some((id) => SEASONS[id].some((r) => checkin >= r.from && checkout <= r.to));
  return open ? null : ids;
}

/* ---- plantilla ---- */
function bwText(key) {
  return `<span data-i18n="${key}">${UI_STRINGS.ca[key]}</span>`;
}

function bwStepperRow(key, singular, defaultValue, noteKey) {
  const ca = UI_STRINGS.ca;
  return `
      <div class="gp-row">
        <div class="gp-label">
          <span data-i18n="gp_${key}">${ca["gp_" + key]}</span>
          ${noteKey ? `<span class="gp-note" data-i18n="${noteKey}">${ca[noteKey]}</span>` : ""}
        </div>
        <div class="stepper">
          <button type="button" class="stepper-btn" data-gp-dec="${key}" data-i18n-aria-label="gp_remove_${singular}" aria-label="${ca["gp_remove_" + singular]}">${icon("minus")}</button>
          <span class="stepper-count" data-gp-count="${key}" aria-live="polite">${defaultValue}</span>
          <button type="button" class="stepper-btn" data-gp-inc="${key}" data-i18n-aria-label="gp_add_${singular}" aria-label="${ca["gp_add_" + singular]}">${icon("plus")}</button>
        </div>
      </div>`;
}

function bwGuestPicker() {
  return `
    <div class="bw-field guest-picker" data-guest-picker>
      <label id="bw-guests-label" for="bw-guests-btn">${icon("user")} ${bwText("bw_huespedes")}</label>
      <button type="button" id="bw-guests-btn" class="guest-picker-trigger" aria-haspopup="true" aria-expanded="false"
        aria-controls="bw-guests-panel" aria-labelledby="bw-guests-label bw-guests-btn" data-gp-summary>2 adults, 1 habitació</button>
      <div class="guest-picker-panel" id="bw-guests-panel" role="group" data-i18n-aria-label="gp_panel_aria" aria-label="${UI_STRINGS.ca.gp_panel_aria}" hidden>
        ${bwStepperRow("adults", "adult", 2, "gp_adults_note")}
        ${bwStepperRow("children", "child", 0, "gp_children_note")}
        ${bwStepperRow("rooms", "room", 1)}
        ${bwStepperRow("pets", "pet", 0, "gp_pets_note")}
        <button type="button" class="btn btn-dark btn-sm gp-apply" data-i18n="gp_apply">${UI_STRINGS.ca.gp_apply}</button>
      </div>
      <input type="hidden" name="adults" value="2" data-gp-input="adults" />
      <input type="hidden" name="children" value="0" data-gp-input="children" />
      <input type="hidden" name="rooms" value="1" data-gp-input="rooms" />
      <input type="hidden" name="pets" value="0" data-gp-input="pets" />
    </div>`;
}

function bwStayForm(mode, hotelId) {
  const ca = UI_STRINGS.ca;
  const hotelField =
    mode === "hotel"
      ? `<input type="hidden" name="hotel" value="${hotelId}" />`
      : `<div class="bw-field">
      <label for="bw-hotel">${icon("building")} ${bwText("bw_hotel")}</label>
      <select id="bw-hotel" name="hotel">
        <option value="any" data-i18n="bw_hotel_any">${ca.bw_hotel_any}</option>
        <option value="manantial">${tr(HOTELS.manantial.name)}</option>
        <option value="caldas">${tr(HOTELS.caldas.name)}</option>
      </select>
    </div>`;
  const ariaKey = mode === "hotel" ? "bw_aria_hotel" : "bw_aria_home";
  const submitKey = mode === "hotel" ? "bw_submit_hotel" : "bw_submit";
  return `
  <!-- [[PENDIENTE: URL y parámetros del motor de reservas]] — hasta entonces el envío lo gestiona booking-widget.js
       (modal de simulación). Con BOOKING_ENGINES[x].live = true redirige a la URL real. -->
  <form class="booking-widget" data-form="stay" method="get" action="#" novalidate
    data-i18n-aria-label="${ariaKey}" aria-label="${ca[ariaKey]}">
    <div class="bw-field">
      <label for="bw-checkin">${icon("calendar")} ${bwText("bw_llegada")}</label>
      <input type="date" id="bw-checkin" name="checkin" required aria-describedby="bw-stay-msg" />
    </div>
    <div class="bw-field">
      <label for="bw-checkout">${icon("calendar")} ${bwText("bw_salida")}</label>
      <input type="date" id="bw-checkout" name="checkout" required aria-describedby="bw-stay-msg" />
    </div>
    ${bwGuestPicker()}
    ${hotelField}
    ${mode === "hotel" ? '<p class="bw-room-note" data-room-note hidden></p>' : ""}
    <div class="bw-submit">
      <button type="submit" class="btn btn-dark" data-i18n="${submitKey}">${ca[submitKey]}</button>
    </div>
    <p class="bw-message" id="bw-stay-msg" role="alert"></p>
  </form>
  <div class="bw-meta">
    <span class="bw-meta-item">${icon("calendar")} <span><strong data-i18n="bw_season_label">${ca.bw_season_label}</strong>: <span data-season-note></span></span></span>
    <span class="bw-meta-item bw-best-price">${icon("shield")} ${bwText("bw_best_price")}</span>
  </div>`;
}

function bwThermalForm() {
  const ca = UI_STRINGS.ca;
  const slotOptions = THERMAL_SLOTS.length
    ? THERMAL_SLOTS.map((s) => `<option value="${s.value}">${s.label}</option>`).join("")
    : `<option value="">${pendingText("franjas horarias del circuito")}</option>`;
  const peopleOptions = [1, 2, 3, 4, 5, 6].map((n) => `<option value="${n}"${n === 2 ? " selected" : ""}>${n}</option>`).join("");
  return `
  <form class="booking-widget" data-form="thermal" method="get" action="#" novalidate
    data-i18n-aria-label="bw_aria_thermal" aria-label="${ca.bw_aria_thermal}">
    <div class="bw-field">
      <label for="bw-th-date">${icon("calendar")} ${bwText("bw_date_thermal")}</label>
      <input type="date" id="bw-th-date" name="date" required aria-describedby="bw-thermal-msg" />
    </div>
    <div class="bw-field">
      <label for="bw-th-slot">${icon("clock")} ${bwText("bw_slot")}</label>
      <select id="bw-th-slot" name="slot">${slotOptions}</select>
    </div>
    <div class="bw-field">
      <label for="bw-th-people">${icon("users")} ${bwText("bw_people")}</label>
      <select id="bw-th-people" name="people">${peopleOptions}</select>
    </div>
    <div class="bw-submit">
      <button type="submit" class="btn btn-dark" data-i18n="bw_submit_thermal">${ca.bw_submit_thermal}</button>
    </div>
    <p class="bw-message" id="bw-thermal-msg" role="alert"></p>
  </form>`;
}

function renderBookingWidget(root) {
  const mode = root.dataset.mode || "home";
  const hotelId = mode === "hotel" ? document.body.dataset.hotelId : null;
  const hasTabs = mode !== "hotel";
  const ca = UI_STRINGS.ca;

  root.classList.toggle("has-tabs", hasTabs);
  root.innerHTML = `
    ${
      hasTabs
        ? `<div class="bw-tabs" role="tablist" data-i18n-aria-label="bw_tablist_aria" aria-label="${ca.bw_tablist_aria}">
      <button type="button" role="tab" class="bw-tab" id="bw-tab-stay" data-tab="stay" aria-controls="bw-panel-stay" aria-selected="true">${icon("bed")} ${bwText("bw_tab_stay")}</button>
      <button type="button" role="tab" class="bw-tab" id="bw-tab-thermal" data-tab="thermal" aria-controls="bw-panel-thermal" aria-selected="false" tabindex="-1">${icon("drop")} ${bwText("bw_tab_thermal")}</button>
    </div>`
        : ""
    }
    <div class="bw-panel" id="bw-panel-stay"${hasTabs ? ' role="tabpanel" aria-labelledby="bw-tab-stay"' : ""}>${bwStayForm(mode, hotelId)}</div>
    ${hasTabs ? `<div class="bw-panel" id="bw-panel-thermal" role="tabpanel" aria-labelledby="bw-tab-thermal" hidden>${bwThermalForm()}</div>` : ""}
  `;

  const stayForm = root.querySelector('[data-form="stay"]');
  const thermalForm = root.querySelector('[data-form="thermal"]');

  wireStayDates(stayForm, "checkin", "checkout");
  stayForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleStaySubmit(stayForm);
  });
  if (thermalForm) {
    const dateInput = thermalForm.querySelector('[name="date"]');
    dateInput.min = todayISO();
    thermalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleThermalSubmit(thermalForm);
    });
  }
  if (hasTabs) wireTabs(root, mode === "spa" ? "thermal" : "stay");

  const refreshSeason = () => {
    const note = root.querySelector("[data-season-note]");
    if (note) note.textContent = seasonNoteText(hotelId);
  };
  refreshSeason();
  document.addEventListener("langchange", () => {
    refreshSeason();
    root.querySelectorAll(".bw-message").forEach((m) => (m.textContent = ""));
  });

  if (location.hash === "#reservar") {
    requestAnimationFrame(() => root.scrollIntoView({ behavior: "smooth", block: "center" }));
  }
}

/* ---- fechas ---- */
function wireStayDates(form, inName, outName) {
  const ci = form.querySelector(`[name="${inName}"]`);
  const co = form.querySelector(`[name="${outName}"]`);
  const today = todayISO();
  ci.min = today;
  co.min = addDaysISO(today, 1);
  ci.addEventListener("change", () => {
    if (!ci.value) {
      co.min = addDaysISO(today, 1);
      return;
    }
    const minOut = addDaysISO(ci.value, 1);
    co.min = minOut;
    if (co.value && co.value <= ci.value) co.value = minOut;
  });
}

/* ---- pestañas (patrón WAI-ARIA: flechas, Inicio, Fin) ---- */
function wireTabs(root, initial) {
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  function select(name) {
    tabs.forEach((tab) => {
      const on = tab.dataset.tab === name;
      tab.setAttribute("aria-selected", String(on));
      tab.tabIndex = on ? 0 : -1;
      root.querySelector("#" + tab.getAttribute("aria-controls")).hidden = !on;
    });
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => select(tab.dataset.tab));
    tab.addEventListener("keydown", (e) => {
      let j = null;
      if (e.key === "ArrowRight") j = (i + 1) % tabs.length;
      else if (e.key === "ArrowLeft") j = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === "Home") j = 0;
      else if (e.key === "End") j = tabs.length - 1;
      if (j === null) return;
      e.preventDefault();
      select(tabs[j].dataset.tab);
      tabs[j].focus();
    });
  });
  select(initial);
}

/* ---- validación y envío ---- */
function bwDict() {
  return UI_STRINGS[getLang()] || UI_STRINGS.ca;
}

function bwShowError(form, text, field) {
  const msg = form.querySelector(".bw-message");
  msg.textContent = text;
  msg.className = "bw-message is-error";
  if (field) {
    field.setAttribute("aria-invalid", "true");
    field.focus();
  }
  return false;
}

function bwReset(form) {
  form.querySelectorAll("[aria-invalid]").forEach((el) => el.removeAttribute("aria-invalid"));
  const msg = form.querySelector(".bw-message");
  msg.textContent = "";
  msg.className = "bw-message";
}

function handleStaySubmit(form) {
  bwReset(form);
  const t = bwDict();
  const data = new FormData(form);
  const ci = form.querySelector('[name="checkin"]');
  const co = form.querySelector('[name="checkout"]');
  const checkin = data.get("checkin");
  const checkout = data.get("checkout");

  if (!checkin || !checkout) return bwShowError(form, t.bw_err_dates_required, !checkin ? ci : co);
  if (checkin < todayISO()) return bwShowError(form, t.bw_err_past, ci);
  if (checkout <= checkin) return bwShowError(form, t.bw_err_checkout, co);

  const hotel = data.get("hotel") || "any";
  const closed = outOfSeasonHotels(hotel, checkin, checkout);
  if (closed) {
    const detail = closed.length > 1 ? closed.map((id) => `${tr(HOTELS[id].name)}: ${formatSeasonRanges(id)}`).join(" · ") : formatSeasonRanges(closed[0]);
    return bwShowError(form, `${t.bw_out_of_season} ${detail}`, ci);
  }

  const roomNote = form.querySelector("[data-room-note]");
  const room = roomNote ? roomNote.dataset.roomValue : undefined;
  const guestsSummary = form.querySelector("[data-gp-summary]").textContent;
  const hotelKey = hotel === "any" ? "manantial" : hotel; // sin preferencia: se usa el motor del Manantial
  const hotelLabel = hotel === "any" ? t.modal_cualquiera : tr(HOTELS[hotel].name);
  const engineId = HOTELS[hotelKey].bookingEngine;
  const engine = BOOKING_ENGINES[engineId];
  const url = buildBookingUrl(engineId, {
    checkin, checkout, room,
    adults: data.get("adults"), children: data.get("children"), rooms: data.get("rooms"), pets: data.get("pets"),
  });

  if (engine.live) {
    window.location.href = url;
    return;
  }
  const rows = [];
  if (room) rows.push({ label: t.modal_habitacion, value: room });
  rows.push(
    { label: t.modal_entrada, value: checkin },
    { label: t.modal_salida, value: checkout },
    { label: t.modal_huespedes, value: guestsSummary }
  );
  showBookingModal({ title: hotelLabel, engineName: engine.engineName, url, rows });
}

function handleThermalSubmit(form) {
  bwReset(form);
  const t = bwDict();
  const data = new FormData(form);
  const dateInput = form.querySelector('[name="date"]');
  const date = data.get("date");

  if (!date) return bwShowError(form, t.bw_err_thermal_date, dateInput);
  if (date < todayISO()) return bwShowError(form, t.bw_err_thermal_past, dateInput);

  const slotSelect = form.querySelector('[name="slot"]');
  const slotLabel = slotSelect.options[slotSelect.selectedIndex].text;
  const qs = new URLSearchParams({ date, slot: data.get("slot") || "", people: data.get("people") });
  const url = `${THERMAL_BOOKING.baseUrl}?${qs.toString()}`;

  if (THERMAL_BOOKING.live) {
    window.location.href = url;
    return;
  }
  showBookingModal({
    title: t.bw_tab_thermal,
    engineName: THERMAL_BOOKING.engineName,
    url,
    rows: [
      { label: t.bw_date_thermal, value: date },
      { label: t.bw_slot, value: slotLabel },
      { label: t.bw_people, value: data.get("people") },
    ],
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("[data-booking-widget]");
  if (root) renderBookingWidget(root);
});
