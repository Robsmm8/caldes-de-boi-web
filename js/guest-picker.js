/* =========================================================================
   GUEST-PICKER.JS — desplegable de huéspedes del buscador de disponibilidad
   (adultos, niños, habitaciones y mascotas, con contadores +/-).

   Cualquier elemento con [data-guest-picker] se convierte automáticamente
   en uno de estos selectores: solo hace falta que dentro tenga los mismos
   data-attributes que en index.html / hotel-manantial.html / hotel-caldas.html
   (ver esos archivos para la plantilla completa).

   Límites recomendados para un buscador de hotel de este tipo (ajustables
   aquí mismo si el hotel prefiere otros máximos):
   ========================================================================= */
const GUEST_LIMITS = {
  adults: { min: 1, max: 6 },
  children: { min: 0, max: 4 },
  rooms: { min: 1, max: 4 },
  pets: { min: 0, max: 2 },
};

function guestPickerPluralWord(n, key) {
  const t = UI_STRINGS[getLang()] || UI_STRINGS.ca;
  return n === 1 ? t[`gp_${key}_singular`] : t[`gp_${key}_plural`];
}

function updateGuestPickerSummary(picker) {
  const vals = {};
  Object.keys(GUEST_LIMITS).forEach((k) => {
    vals[k] = parseInt(picker.querySelector(`[data-gp-input="${k}"]`).value, 10) || 0;
  });
  const parts = [
    `${vals.adults} ${guestPickerPluralWord(vals.adults, "adult")}`,
    `${vals.rooms} ${guestPickerPluralWord(vals.rooms, "room")}`,
  ];
  if (vals.children > 0) parts.push(`${vals.children} ${guestPickerPluralWord(vals.children, "child")}`);
  if (vals.pets > 0) parts.push(`${vals.pets} ${guestPickerPluralWord(vals.pets, "pet")}`);
  const trigger = picker.querySelector("[data-gp-summary]");
  if (trigger) trigger.textContent = parts.join(", ");
}

function updateGuestPickerButtons(picker, key) {
  const limits = GUEST_LIMITS[key];
  const val = parseInt(picker.querySelector(`[data-gp-input="${key}"]`).value, 10);
  const decBtn = picker.querySelector(`[data-gp-dec="${key}"]`);
  const incBtn = picker.querySelector(`[data-gp-inc="${key}"]`);
  if (decBtn) decBtn.disabled = val <= limits.min;
  if (incBtn) incBtn.disabled = val >= limits.max;
}

function renderGuestPicker(picker) {
  Object.keys(GUEST_LIMITS).forEach((k) => {
    const val = picker.querySelector(`[data-gp-input="${k}"]`).value;
    const countEl = picker.querySelector(`[data-gp-count="${k}"]`);
    if (countEl) countEl.textContent = val;
    updateGuestPickerButtons(picker, k);
  });
  updateGuestPickerSummary(picker);
}

function closeAllGuestPickers() {
  document.querySelectorAll(".guest-picker-panel").forEach((p) => (p.hidden = true));
  document.querySelectorAll(".guest-picker-trigger").forEach((t) => t.setAttribute("aria-expanded", "false"));
}

function initGuestPickers() {
  document.querySelectorAll("[data-guest-picker]").forEach((picker) => {
    if (picker.dataset.wired) return;
    picker.dataset.wired = "true";

    const trigger = picker.querySelector(".guest-picker-trigger");
    const panel = picker.querySelector(".guest-picker-panel");

    renderGuestPicker(picker);

    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const willOpen = panel.hidden;
      closeAllGuestPickers();
      panel.hidden = !willOpen;
      trigger.setAttribute("aria-expanded", String(willOpen));
    });
    panel.addEventListener("click", (e) => e.stopPropagation());

    picker.querySelectorAll("[data-gp-inc], [data-gp-dec]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.gpInc || btn.dataset.gpDec;
        const dir = btn.dataset.gpInc ? 1 : -1;
        const limits = GUEST_LIMITS[key];
        const input = picker.querySelector(`[data-gp-input="${key}"]`);
        const val = Math.max(limits.min, Math.min(limits.max, parseInt(input.value, 10) + dir));
        input.value = val;
        picker.querySelector(`[data-gp-count="${key}"]`).textContent = val;
        updateGuestPickerButtons(picker, key);
        updateGuestPickerSummary(picker);
      });
    });

    const applyBtn = picker.querySelector(".gp-apply");
    if (applyBtn) {
      applyBtn.addEventListener("click", () => {
        panel.hidden = true;
        trigger.setAttribute("aria-expanded", "false");
        trigger.focus();
      });
    }
  });
}

document.addEventListener("click", (e) => {
  if (!e.target.closest("[data-guest-picker]")) closeAllGuestPickers();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeAllGuestPickers();
});

/* Al cambiar de idioma (ver js/i18n.js), solo hay que refrescar las
   etiquetas/resumen; los valores numéricos elegidos por el usuario se
   mantienen tal cual. */
window.rerenderGuestPickers = () => {
  document.querySelectorAll("[data-guest-picker]").forEach(renderGuestPicker);
};

document.addEventListener("DOMContentLoaded", initGuestPickers);
